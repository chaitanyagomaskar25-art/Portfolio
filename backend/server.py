import asyncio
import logging
import os
from contextlib import suppress
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional, Annotated

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Query, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pymongo import ASCENDING, DESCENDING, IndexModel
from pydantic import BaseModel, Field, ConfigDict, EmailStr, BeforeValidator
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'portfolio')]

INDEXES: dict[str, list[IndexModel]] = {
    "status_checks": [
        IndexModel([("id", ASCENDING)], name="id", unique=True),
        IndexModel([("timestamp", DESCENDING)], name="timestamp_desc"),
    ],
    "contact_messages": [
        IndexModel([("created_at", DESCENDING)], name="created_at_desc"),
    ],
}


async def ensure_indexes() -> None:
    for collection, models in INDEXES.items():
        for model in models:
            try:
                await db[collection].create_indexes([model])
            except Exception as exc:
                logging.getLogger(__name__).warning("ensure_indexes(%s.%s): %s", collection, model.document.get("name"), exc)


def _coerce_object_id(v):
    if isinstance(v, object) and type(v).__name__ == "ObjectId":
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(lambda v: str(v) if type(v).__name__ == "ObjectId" else v)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(extra="ignore", populate_by_name=True)

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    def to_mongo(self) -> dict:
        d = self.model_dump(by_alias=True, exclude_none=True)
        d.pop("_id", None)  # let MongoDB generate the _id on insert
        return d

    @classmethod
    def from_mongo(cls, doc: dict):
        return cls(**doc)


app = FastAPI(title="Portfolio API")
api_router = APIRouter(prefix="/api")


class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(__import__("uuid").uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactMessage(BaseDocument):
    name: str
    email: EmailStr
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=150)
    message: str = Field(min_length=10, max_length=5000)


@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    try:
        _ = await db.status_checks.insert_one(doc)
    except Exception as exc:
        logging.getLogger(__name__).error("Failed to insert status check: %s", exc)
        raise HTTPException(status_code=500, detail="Database error")
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks(limit: int = Query(20, ge=1, le=100)):
    try:
        status_checks = await db.status_checks.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit).to_list(limit)
        for check in status_checks:
            if isinstance(check['timestamp'], str):
                check['timestamp'] = datetime.fromisoformat(check['timestamp'])
        return status_checks
    except Exception as exc:
        logging.getLogger(__name__).error("Failed to fetch status checks: %s", exc)
        return []


@api_router.post("/contact", response_model=ContactMessage, status_code=201)
async def create_contact_message(input: ContactMessageCreate):
    msg = ContactMessage(**input.model_dump())
    try:
        result = await db.contact_messages.insert_one(msg.to_mongo())
        msg.id = str(result.inserted_id)
    except Exception as exc:
        logging.getLogger(__name__).error("Failed to insert contact message: %s", exc)
        raise HTTPException(status_code=500, detail="Database error")
    return msg


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def start_index_build():
    app.state.index_task = asyncio.create_task(ensure_indexes())


@app.on_event("shutdown")
async def shutdown_db_client():
    if hasattr(app.state, "index_task"):
        app.state.index_task.cancel()
        with suppress(asyncio.CancelledError):
            await app.state.index_task
    client.close()


if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
