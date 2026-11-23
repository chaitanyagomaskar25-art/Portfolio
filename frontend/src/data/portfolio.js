// ============================================================================
// PLACEHOLDER CONTENT — swap every value here for your real details, projects
// and links. Nothing in this file is verified personal information.
// ============================================================================

export const PROFILE = {
  name: "Chaitanya Gomaskar",
  role: "Full-Stack Developer",
  detailedRole: "Full-Stack Developer",
  location: "Your location · Remote",
  timezone: "UTC",
  email: "chaitanya@example.com",
  resume: "/Chaitanya_Gomaskar_Resume.pdf",
  intro:
    "I build complete, working products — responsive, animated interfaces on the front, dependable APIs and data on the back.",
  about: [
    "I'm a full-stack developer who likes owning the whole path: shaping interfaces people enjoy using, then engineering the APIs and data behind them so they stay fast and dependable.",
    "I care about clean code, simple systems and shipping things that actually work. My skills, projects and experience live in the sections below.",
  ],
  philosophy: "Simple systems, built well, are the ones that last.",
};

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS = [
  { name: "GitHub", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "X (Twitter)", href: "#" },
];

export const MARQUEE_ITEMS = [
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "GraphQL",
  "Docker",
  "AWS",
  "Redis",
  "Next.js",
  "Tailwind CSS",
];

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    index: "01",
    title: "Frontend Development",
    blurb: "Responsive, animated, stateful user interfaces & component systems.",
    skills: ["HTML", "CSS", "JavaScript", "React.js", "React Native", "Tailwind CSS", "Redux", "Framer Motion"],
  },
  {
    id: "backend",
    index: "02",
    title: "Backend Development",
    blurb: "Scalable microservices, real-time protocols & RESTful architectures.",
    skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Socket.IO", "Nodemailer"],
  },
  {
    id: "databases",
    index: "03",
    title: "Databases",
    blurb: "Document & relational data stores, indexing and querying.",
    skills: ["MongoDB", "SQL"],
  },
  {
    id: "languages",
    index: "04",
    title: "Programming Languages",
    blurb: "Core syntax, object-oriented, asynchronous & functional paradigms.",
    skills: ["Python", "JavaScript"],
  },
  {
    id: "ai",
    index: "05",
    title: "Data Science & AI",
    blurb: "Numerical computation, data analysis & interactive machine learning apps.",
    skills: ["NumPy", "Pandas", "Streamlit"],
  },
  {
    id: "tools",
    index: "06",
    title: "Tools & Platforms",
    blurb: "Version control, automated deployment pipelines & API testing.",
    skills: ["Git", "GitHub", "Vercel", "Postman"],
  },
];

export const EXTRA_SKILLS = ["HTML", "CSS", "JavaScript", "Python", "Git", "GitHub"];

export const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "Jaswik Technology",
    period: "October 2026 — Present",
    status: "Present",
    isCurrent: true,
    type: "Internship",
    points: [
      "Working on frontend development and building responsive user interfaces.",
      "Contributing to backend development and API integration.",
      "Working with React Native for mobile application development.",
      "Collaborating with the development team on real-world software projects.",
      "Learning and implementing full-stack development concepts.",
    ],
    tech: ["React.js", "React Native", "Frontend", "Backend APIs", "Full-Stack"],
  },
  {
    role: "Academic Facilitator",
    company: "Navgurukul",
    period: "March 2026 — August 2026",
    status: "Completed",
    isCurrent: false,
    type: "Academic Mentorship",
    points: [
      "Supported students in their learning and academic development.",
      "Developed strong communication and interpersonal skills.",
      "Improved leadership, teamwork and collaboration abilities.",
      "Strengthened problem-solving, mentoring and time-management skills.",
      "Built confidence in public speaking and guiding others.",
    ],
    tech: ["Mentorship", "Leadership", "Communication", "Problem Solving", "Teamwork"],
  },
];

export const EDUCATION_CARDS = [
  {
    id: "bsc",
    icon: "degree",
    degree: "B.S. Computer Science",
    school: "State University",
    period: "2014 — 2018",
    note: "Focus on distributed systems and human-computer interaction.",
  },
  {
    id: "spec",
    icon: "learning",
    degree: "Full-Stack Engineering Specialization",
    school: "Self-directed & online programs",
    period: "Ongoing",
    note: "Continuous coursework across cloud, security and systems design — swap in your own credentials.",
  },
];

export const ACHIEVEMENTS = [
  {
    id: "award",
    icon: "award",
    title: "Innovation Award",
    org: "Nova Systems",
    period: "2023",
    description: "Sample entry — team recognition for improving the delivery workflow.",
  },
  {
    id: "cert",
    icon: "medal",
    title: "AWS Certified Developer — Associate",
    org: "Amazon Web Services",
    period: "2021",
    description: "Sample certification — replace with your real credentials.",
  },
  {
    id: "oss",
    icon: "star",
    title: "Open Source Contributor",
    org: "Community projects",
    period: "Ongoing",
    description: "Sample entry — contributions to tools and libraries you use daily.",
  },
  {
    id: "hack",
    icon: "trophy",
    title: "Hackathon Finalist",
    org: "Community hackathon",
    period: "2019",
    description: "Sample entry — swap in your real placements and awards.",
  },
];

export const ABOUT_IMAGE = {
  url: "https://images.unsplash.com/photo-1596128045726-c802b5373928?crop=entropy&cs=srgb&fm=jpg&q=85",
  alt: "Dark desk setup with glowing screens",
};

export const CURRENT_STRIP = [
  { label: "Currently exploring", value: "Rust & WebGPU" },
  { label: "Based in", value: "San Francisco" },
  { label: "Open to", value: "Remote & on-site" },
];

export const PROJECTS = [
  {
    id: "nexusflow",
    number: "01",
    title: "NexusFlow",
    titleEm: "Orchestration",
    category: "AI & Distributed Systems",
    filterCategories: ["all", "ai", "fullstack", "backend"],
    tagline: "Enterprise Multi-Agent LLM Execution Engine",
    description:
      "A distributed pipeline engine enabling engineering teams to chain multi-agent workflows, monitor token telemetry in real time, and deploy calibrated autonomous agents with deterministic fallback protocols and live state persistence.",
    fullDescription:
      "NexusFlow solves the challenge of non-deterministic failure modes in production multi-agent systems. When composing complex chains of generative agents, traditional sequential HTTP requests cause compounding latency, high error rates, and zero intermediate visibility. NexusFlow provides a resilient event-driven execution runtime built around directed acyclic graphs (DAGs), streaming tokens bidirectionally over WebSockets with automatic backpressure management and intermediate state recovery.",
    myContribution: [
      "Architected the reactive WebSocket streaming gateway in FastAPI, reducing end-to-end token latency to sub-40ms with backpressure throttling.",
      "Designed the dynamic DAG execution planner with topological cycle detection, step-level checkpointing, and deterministic fallback recovery.",
      "Built the full React 19 visual workflow graph editor with real-time node state indicators, execution step replays, and schema validation.",
      "Implemented a Redis-backed distributed task queue processing 50,000+ asynchronous agent evaluation jobs daily with zero dropped messages.",
      "Configured Docker containerization, automated GitHub Actions CI/CD, and structured multi-tenant MongoDB audit collections.",
    ],
    features: [
      {
        title: "Bidirectional Token Streaming",
        description: "Sub-40ms WebSocket streaming with backpressure handling for smooth UI rendering under heavy token bursts.",
      },
      {
        title: "Dynamic DAG Workflow Engine",
        description: "Visual node graph that compiles into executable Python worker pipelines with step-level rollback on failure.",
      },
      {
        title: "Live Token Telemetry & Cost Tracking",
        description: "Granular per-node token counting, latency flamecharts, and automated budget enforcement per tenant.",
      },
      {
        title: "Deterministic State Recovery",
        description: "Step-level execution snapshots stored in Redis and MongoDB to resume broken pipelines without re-running earlier steps.",
      },
    ],
    highlights: [
      "Sub-40ms WebSocket token streaming with reactive backpressure",
      "Distributed task execution queue handling 50k+ asynchronous jobs daily",
      "Dynamic DAG workflow builder with instant schema validation and state rollback",
    ],
    stats: [
      { label: "Throughput", value: "50k+ req/day" },
      { label: "Stream Latency", value: "< 40ms" },
      { label: "Uptime SLA", value: "99.98%" },
    ],
    techStack: {
      frontend: ["React 19", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Python", "FastAPI", "WebSockets", "Pydantic v2"],
      infrastructure: ["Redis", "MongoDB", "Docker", "Nginx"],
    },
    tech: ["React 19", "TypeScript", "FastAPI", "Python", "Redis", "Docker", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    urlPreview: "nexusflow.internal.dev",
    statusBadge: "Production v2.4",
    demoUrl: "https://github.com/chaitanya",
    githubUrl: "https://github.com/chaitanya",
    accent: "emerald",
  },
  {
    id: "aurapulse",
    number: "02",
    title: "AuraPulse",
    titleEm: "Observability",
    category: "Cloud Telemetry & Tracing",
    filterCategories: ["all", "cloud", "backend"],
    tagline: "High-Throughput Microservice Tracing Cockpit",
    description:
      "Modern cloud telemetry cockpit that aggregates billions of runtime events across Kubernetes clusters. Delivers automated anomaly detection, distributed tracing flamegraphs, and intelligent incident correlation in under a second.",
    fullDescription:
      "As microservices scale into hundreds of independent nodes, identifying network bottlenecks and cascaded failures becomes exponentially difficult. AuraPulse acts as a centralized telemetry cockpit, collecting OpenTelemetry spans, metrics, and logs across distributed container clusters. By leveraging columnar data storage with ClickHouse and high-throughput Kafka streaming, AuraPulse renders live system topology graphs and distributed flamecharts with sub-second query latency.",
    myContribution: [
      "Spearheaded the event ingestion pipeline with Apache Kafka and ClickHouse, capable of parsing and storing 10M+ events per minute.",
      "Engineered high-performance Canvas2D and WebGL flamegraph renderers capable of displaying 100,000+ span bars at 60 frames per second.",
      "Built automated root-cause correlation heuristics that group related microservice anomalies into single actionable incident alerts.",
      "Authored custom GraphQL federation gateways in Go and TypeScript to provide unified querying across distributed trace stores.",
      "Optimized query memory consumption by 35% through custom compression dictionaries and partition pruning.",
    ],
    features: [
      {
        title: "High-Throughput Event Ingestion",
        description: "Streams and partitions over 10 million telemetry events per minute without packet drop or message starvation.",
      },
      {
        title: "Hardware-Accelerated Flamegraphs",
        description: "Interactive canvas-rendered distributed call stacks allowing engineers to inspect bottleneck spans in milliseconds.",
      },
      {
        title: "Automated Incident Correlation",
        description: "Intelligent anomaly clustering algorithms that reduce alarm fatigue by grouping correlated cascading faults.",
      },
      {
        title: "Multi-Cluster Topology Map",
        description: "Live visual mapping of inter-service RPC latencies, error error budgets, and Kubernetes pod health statuses.",
      },
    ],
    highlights: [
      "Ingests 10M+ raw telemetry events/min with zero dropped packets",
      "Real-time flamegraph visualization powered by Canvas2D hardware acceleration",
      "Automated root-cause clustering reducing mean time to recovery (MTTR) by 45%",
    ],
    stats: [
      { label: "Event Ingestion", value: "10M+/min" },
      { label: "Query Resolution", value: "< 85ms" },
      { label: "Cluster Nodes", value: "240+ Live" },
    ],
    techStack: {
      frontend: ["Next.js", "TypeScript", "Canvas2D", "Tailwind CSS"],
      backend: ["Go", "Python", "GraphQL", "Apache Kafka"],
      infrastructure: ["ClickHouse", "Kubernetes", "Docker", "Prometheus"],
    },
    tech: ["Next.js", "TypeScript", "Go", "ClickHouse", "GraphQL", "Apache Kafka", "Docker"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    urlPreview: "aurapulse.cloud.telemetry",
    statusBadge: "Cluster Active",
    demoUrl: "https://github.com/chaitanya",
    githubUrl: "https://github.com/chaitanya",
    accent: "blue",
  },
  {
    id: "horizon",
    number: "03",
    title: "Horizon",
    titleEm: "Collaborative Canvas",
    category: "Multiplayer Architecture Tool",
    filterCategories: ["all", "fullstack", "cloud"],
    tagline: "Real-Time Distributed Systems Design Environment",
    description:
      "Infinite-scale interactive canvas for systems engineers to diagram cloud architectures, simulate packet flows, and instantly compile visual schematics into ready-to-apply Terraform and Kubernetes deployment manifests.",
    fullDescription:
      "Designing complex multi-region cloud infrastructures usually happens in static diagramming tools completely disconnected from the actual infrastructure code. Horizon bridges this gap: a multiplayer collaborative canvas where software architects diagram microservices, simulate realistic traffic spikes, and click a single button to compile the visual graph into clean, production-ready Terraform HCL and Kubernetes YAML definitions.",
    myContribution: [
      "Engineered real-time collaborative state synchronization using Yjs CRDTs and low-latency WebSocket rooms with zero merge conflicts.",
      "Developed a custom WebAssembly layout engine in Rust to simulate simulated packet flows across 5,000+ interactive system nodes at 60 FPS.",
      "Authored the visual-to-code compiler that parses the architecture graph and generates deterministic, linted Terraform and Kubernetes configurations.",
      "Designed the responsive React 19 UI with infinite pan/zoom viewport, custom magnetic connectors, and contextual property inspectors.",
      "Integrated multi-user presence indicators, live cursor streaming, and collaborative voice/annotation markers.",
    ],
    features: [
      {
        title: "Multiplayer CRDT Synchronization",
        description: "Zero-conflict peer editing powered by Yjs and WebSockets with optimistic UI updates and instant reconnections.",
      },
      {
        title: "Bidirectional IaC Compilation",
        description: "Translates visual node graphs directly into production Terraform HCL, Kubernetes manifests, and Docker Compose files.",
      },
      {
        title: "WebAssembly Simulation Engine",
        description: "Simulates traffic load, latency cascades, and failover routing directly in-browser using compiled Rust Wasm modules.",
      },
      {
        title: "Infinite Canvas Viewport",
        description: "Fluid 60 FPS pan and zoom rendering supporting thousands of interconnected cloud microservices.",
      },
    ],
    highlights: [
      "Zero-conflict multi-user state synchronization via Yjs CRDTs",
      "Bidirectional compilation: visual canvas ↔ production Terraform HCL",
      "Silky 60 FPS viewport rendering of 5,000+ interactive system nodes",
    ],
    stats: [
      { label: "Render Frame Rate", value: "60 FPS" },
      { label: "Sync Latency", value: "< 15ms" },
      { label: "Simulated Nodes", value: "5,000+" },
    ],
    techStack: {
      frontend: ["React 19", "TypeScript", "Tailwind CSS", "HTML5 Canvas"],
      backend: ["Node.js", "WebSockets", "Rust (Wasm)", "Yjs CRDTs"],
      infrastructure: ["Docker", "Terraform", "AWS", "Cloudflare Workers"],
    },
    tech: ["React 19", "TypeScript", "WebSockets", "Rust (Wasm)", "Tailwind CSS", "Node.js"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    urlPreview: "horizon.canvas.app",
    statusBadge: "Live Multiplayer",
    demoUrl: "https://github.com/chaitanya",
    githubUrl: "https://github.com/chaitanya",
    accent: "teal",
  },
  {
    id: "vaultmesh",
    number: "04",
    title: "VaultMesh",
    titleEm: "Zero-Knowledge Vault",
    category: "Cryptographic Infrastructure",
    filterCategories: ["all", "backend", "cloud"],
    tagline: "Decentralized Secret Management & Key Rotation",
    description:
      "Zero-knowledge cryptographic security suite offering client-side envelope encryption, automated secret rotation, and tamper-evident audit logging for sensitive production microservices and CI/CD runners.",
    fullDescription:
      "Managing sensitive credentials, API tokens, and database passwords across microservices often creates vulnerable attack surfaces. VaultMesh implements client-side envelope encryption where data is encrypted before leaving the client browser or microservice. Built-in automated secret rotation and immutable hash-chained audit trails ensure that even in the event of an infrastructure breach, secrets remain cryptographically unreadable without authorized multi-party key shards.",
    myContribution: [
      "Implemented client-side AES-256-GCM envelope encryption and Shamir's Secret Sharing threshold schemes in Python and WebCrypto.",
      "Designed an immutable cryptographic audit trail with SHA-256 hash chains, providing tamper-evident forensic verification.",
      "Built native synchronization bridges for AWS KMS, HashiCorp Vault, and Kubernetes Secrets with automated rotation cron jobs.",
      "Engineered fine-grained role-based access control (RBAC) with time-bound ephemeral secret leases and automatic expiration.",
      "Conducted extensive vulnerability assessments and cryptographic fuzz testing to ensure zero plaintext leakage.",
    ],
    features: [
      {
        title: "Client-Side Zero-Knowledge Enclave",
        description: "Payloads are encrypted on the client using AES-256-GCM before transport; the server never receives unencrypted keys.",
      },
      {
        title: "Shamir's Key Splitting",
        description: "Master administrative access keys are split across M-of-N quorum members to prevent single-point insider compromise.",
      },
      {
        title: "Automated Secret Rotation",
        description: "Scheduled and event-triggered key rotation with zero microservice downtime or restart requirements.",
      },
      {
        title: "Cryptographic Audit Ledger",
        description: "Tamper-evident log entries chained via cryptographic hashes for verifiable compliance and forensic analysis.",
      },
    ],
    highlights: [
      "Client-side AES-256-GCM encryption with Shamir's Secret Sharing threshold",
      "Cryptographically verified audit trail with immutable hash-chain validation",
      "Seamless native adapters for AWS KMS, HashiCorp Vault, and Kubernetes Secrets",
    ],
    stats: [
      { label: "Encryption", value: "AES-256-GCM" },
      { label: "Secret Rotation", value: "Automated" },
      { label: "Compliance", value: "SOC-2 Ready" },
    ],
    techStack: {
      frontend: ["React 19", "TypeScript", "Tailwind CSS", "WebCrypto API"],
      backend: ["Python", "FastAPI", "PostgreSQL", "Cryptography.io"],
      infrastructure: ["AWS KMS", "Docker", "HashiCorp Vault", "Redis"],
    },
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "AES-256", "AWS KMS", "Docker"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    urlPreview: "vaultmesh.security.io",
    statusBadge: "Encrypted Enclave",
    demoUrl: "https://github.com/chaitanya",
    githubUrl: "https://github.com/chaitanya",
    accent: "purple",
  },
];
