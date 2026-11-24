<div align="center">

# ⚡ Chaitanya Gomaskar — Developer Portfolio

**Full-Stack Software Developer · Modern Web Systems & Scalable APIs**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Live Demo](#-live-demo) • [Key Features](#-key-features) • [Tech Stack](#-tech-stack) • [Projects Showcase](#-projects-showcase) • [Architecture](#-project-structure) • [Getting Started](#-getting-started) • [Contact](#-connect-with-me)

---

</div>

## 📌 Overview

A luxury-tech, high-performance developer portfolio built with **React 18**, **Tailwind CSS**, and **Framer Motion**. Designed with an **Obsidian, Champagne Gold, and Arctic Platinum** design system, interactive 3D WebGL mathematical background simulations, physics-based cursor spotlight effects, and smooth responsive layouts across all device form factors.

---

## ✨ Key Features

- **🎨 Distinctive Luxury Visual Theme**:
  - **Dark Obsidian Canvas** (`#06080D` / `#070B12`) with Champagne Gold (`#F59E0B`) & Emerald highlights.
  - **Light Architectural Platinum Mode** with high-contrast editorial typography and refined surfaces.
  - Zero generic neon blues or flat purple templates.

- **🌌 Live Interactive 3D Background**:
  - Hardware-accelerated 3D Euler matrix engine rendering 6 rotating geometric polyhedra (Icosahedron, Octahedron, Gemstone Crystal, 4D Tesseract, and Celestial Gyro).
  - 90-particle 3D constellation field with cursor gravitation, proximity mesh connections, and interactive shockwaves.
  - Undulating perspective horizon wireframe that creates real-time gravity ripples under the cursor.

- **🎯 Cursor-Tracking Spotlight Physics**:
  - Dynamic spring-interpolated glare lighting across all cards: **Skills**, **Projects**, **Experience**, **Education**, and **Achievements**.

- **📱 Interactive Project Showcase Carousel**:
  - Dynamic responsive pagination: **3 cards on desktop**, **2 on tablet**, **1 on mobile**.
  - Smooth direction-aware sliding transitions with Framer Motion `AnimatePresence`.
  - Filter by domain: Full Stack, Frontend, Backend / Python, Real-Time, Hackathon.
  - Interactive project detail modal modals with live demo and GitHub source links.

- **📌 Sticky Two-Column Timeline Architecture**:
  - Matching layout implementation across **Experience**, **Education**, and **Moments Worth Highlighting (Certifications)**.
  - Sticky left-side navigation summary that gracefully unpins at the section threshold.

- **💻 "Beyond the Code" Coding Profiles**:
  - Direct integration with verified competitive programming & developer platforms:
    - **LeetCode**
    - **CodeChef**
    - **GitHub**
    - **LinkedIn**
    - **HackerRank**

---

## 🛠 Tech Stack

### Frontend & UI
- **Library**: [React 18](https://react.dev/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Animation**: [Framer Motion 11](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis Smooth Scroll](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/) + Custom Vector Brand SVGs
- **Toasts**: [Sonner](https://sonner.emilkowal.ski/)

### Engineering Competencies Showcased
- **Frontend**: HTML5, CSS3, JavaScript (ES2022+), React.js, React Native, Tailwind CSS, Redux, Framer Motion
- **Backend & APIs**: Node.js, Express.js, FastAPI, RESTful APIs, WebSockets (Socket.IO), Nodemailer
- **Databases**: MongoDB, Mongoose ODM, MongoDB Atlas, SQL, MySQL
- **Data & AI**: Python, NumPy, Pandas, Streamlit
- **DevOps & Tools**: Git, GitHub, Vercel, Postman

---

## 🚀 Projects Showcase

| Project | Category | Tech Stack | Highlights |
|---|---|---|---|
| **Expense Tracker API** | Backend / Python | FastAPI, Python, Streamlit, SQLite | RESTful budget and transaction analytics engine with visual dashboards |
| **RationSaathi** | Full Stack | Node.js, Express, MongoDB, EJS | Public food distribution management & inventory allocation platform |
| **Nexora Chat** | Real-Time | Node.js, Socket.IO, Express, Tailwind | Sub-50ms latency bidirectional messaging with room encryption |
| **Connectly** | Full Stack | React.js, Node.js, Express, MongoDB | Modern developer community platform with post feeds, reactions & profiles |
| **Photo Gallery App** | Frontend | React.js, Tailwind CSS, LocalStorage | Responsive multimedia curation tool with tag filtering & masonry grid |
| **Acoustic Player** | Frontend | JavaScript (ES6+), Web Audio API, CSS3 | Custom audio processing engine with waveform animations and playlist queue |
| **FS CollabSphere** | Full Stack | MERN Stack, JWT Auth, REST APIs | Team workspace suite with role-based access control and live task boards |
| **Agile Issue Tracker** | Full Stack | React, Node.js, Express, MongoDB | Sprint planning dashboard with Kanban boards and issue tracking |
| **TeamFlow** | Full Stack | React.js, Tailwind CSS, Express, MongoDB | Multi-workspace resource orchestration and team velocity tracking |
| **CareCircle** | Full Stack | MERN Stack, Nodemailer, REST | Community volunteer coordination & emergency relief logistics platform |

---

## 📂 Project Structure

```text
Portfolio/
├── package.json              # Root orchestration scripts
├── README.md                 # Project documentation
└── frontend/                 # React application root
    ├── index.html            # HTML entry point with SEO meta tags
    ├── jsconfig.json         # Module resolution & path aliases (@/*)
    ├── package.json          # Frontend dependencies & scripts
    ├── vite.config.js        # Vite build & alias configurations
    ├── tailwind.config.js    # Tailwind theme extensions & tokens
    ├── public/               # Static assets & public documents
    │   ├── Chaitanya.png     # Developer profile portrait
    │   ├── Chaitanya_Gomaskar_FSDI_Resume.pdf  # Resume PDF
    │   └── projects/         # Project showcase thumbnails (.png / .webp)
    └── src/
        ├── App.jsx           # Main application composition
        ├── index.css         # Design tokens, themes & typography
        ├── components/       # Reusable UI & section components
        │   ├── Hero.jsx            # Interactive hero banner with CTAs
        │   ├── Projects.jsx        # Responsive project carousel & modals
        │   ├── Skills.jsx          # Categorized engineering toolkit
        │   ├── Experience.jsx      # Sticky two-column career timeline
        │   ├── Education.jsx       # Academic qualifications & scores
        │   ├── Achievements.jsx    # Certifications & recognitions
        │   ├── CodingProfiles.jsx  # "Beyond the Code" platforms (LeetCode, GitHub, etc.)
        │   ├── Contact.jsx         # Contact form & social connections
        │   ├── GlobalBackground.jsx # 3D WebGL/Canvas interactive engine
        │   └── Navbar.jsx          # Fixed glassmorphic navigation bar
        ├── data/
        │   └── portfolio.js  # Centralized profile data & project schemas
        └── lib/
            ├── scroll.js     # Scroll utilities
            └── theme.js      # Dark / Light theme state manager
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (Recommended: v20+)
- **npm**: v9.0.0 or later

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/chaitanyagomaskar25-art/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install --prefix frontend
   ```

3. **Start the local development server**:
   ```bash
   npm start
   # Or: cd frontend && npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   # Or: cd frontend && npm run build
   ```
   The production-ready artifacts will be generated in `frontend/dist/`.

---

## 📬 Connect With Me

- **Name**: Chaitanya Gomaskar
- **Email**: [chaitanyagomaskar25@navgurukul.org](mailto:chaitanyagomaskar25@navgurukul.org)
- **LinkedIn**: [linkedin.com/in/chaitanya-gomaskar](https://www.linkedin.com/in/chaitanya-gomaskar-347189361/)
- **GitHub**: [@chaitanyagomaskar25-art](https://github.com/chaitanyagomaskar25-art)
- **LeetCode**: [leetcode.com/u/ymxfLhID6P](https://leetcode.com/u/ymxfLhID6P/)
- **HackerRank**: [hackerrank.com/profile/chaitanyagomask1](https://www.hackerrank.com/profile/chaitanyagomask1)
- **CodeChef**: [codechef.com/users/nice_whimsy_56](https://www.codechef.com/users/nice_whimsy_56)
- **Resume**: [View on Google Drive](https://drive.google.com/file/d/145xNp0vnIFFa-L9jKzIDXZC16hn9maWa/view?usp=sharing)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
