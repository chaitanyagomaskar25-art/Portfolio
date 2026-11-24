import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Code2,
  Cpu,
  Database,
  Layers,
  Layout,
  Server,
  Wrench,
} from "lucide-react";
import Reveal from "./Reveal";
import { EmTitle } from "./SectionHeading";

// Vector SVG Logos for all 24 technical skills
function TechIcon({ id, className = "h-4 w-4" }) {
  switch (id) {
    case "html":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="HTML5">
          <path fill="#E34F26" d="M3 2l1.8 17.8L12 22l7.2-2.2L21 2H3z" />
          <path fill="#EF652A" d="M12 3.8v16.3l5.5-1.7 1.5-14.6H12z" />
          <path fill="#FFF" d="M7.5 7h9l-.2 2.3H10l.3 2.5h6l-.6 6.3-3.7 1.1-3.7-1.1-.3-3H10l.1 1.5 1.9.5 1.9-.5.2-2.5H7.5z" />
        </svg>
      );
    case "css":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="CSS3">
          <path fill="#1572B6" d="M3 2l1.8 17.8L12 22l7.2-2.2L21 2H3z" />
          <path fill="#33A9DC" d="M12 3.8v16.3l5.5-1.7 1.5-14.6H12z" />
          <path fill="#FFF" d="M7.5 7h9l-.3 2.5h-6.2l.2 2.3h5.7l-.6 6.3-3.7 1.1-3.7-1.1-.3-3H10l.1 1.5 1.9.5 1.9-.5.3-3.5H7.5z" />
        </svg>
      );
    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="JavaScript">
          <rect width="24" height="24" rx="4" fill="#F7DF1E" />
          <path fill="#000" d="M12.5 17.5c.5.8 1.2 1.4 2.2 1.4 1 0 1.6-.5 1.6-1.2 0-.8-.6-1.1-1.7-1.6l-.6-.2c-1.7-.7-2.8-1.6-2.8-3.5 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.6.5 3.3 1.8l-1.6 1c-.4-.7-.8-1-1.7-1-.8 0-1.3.5-1.3 1.1 0 .7.5 1 1.6 1.4l.6.2c2 .9 3 1.7 3 3.6 0 2.1-1.6 3.3-3.8 3.3-2.1 0-3.4-1-4-2.2l1.7-1zm-6 .2c.3.5.7.9 1.4.9.7 0 1.2-.3 1.2-1.4V9.5h2.1v7.6c0 2.2-1.3 3.2-3.2 3.2-1.7 0-2.7-.9-3.2-2l1.7-1z" />
        </svg>
      );
    case "react":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="React.js">
          <circle cx="12" cy="12" r="2.2" fill="#61DAFB" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.5" transform="rotate(120 12 12)" />
        </svg>
      );
    case "reactnative":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="React Native">
          <rect x="5" y="2" width="14" height="20" rx="3" stroke="#61DAFB" strokeWidth="1.5" className="fill-[#070D18] light-rn-bg" />
          <circle cx="12" cy="11.5" r="1.4" fill="#61DAFB" />
          <ellipse cx="12" cy="11.5" rx="4.8" ry="1.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(45 12 11.5)" />
          <ellipse cx="12" cy="11.5" rx="4.8" ry="1.8" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(-45 12 11.5)" />
          <line x1="10" y1="18.5" x2="14" y2="18.5" stroke="#61DAFB" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "tailwind":
      return (
        <svg viewBox="0 0 24 24" fill="#38BDF8" className={className} aria-label="Tailwind CSS">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" />
        </svg>
      );
    case "redux":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Redux">
          <path fill="#764ABC" d="M15.7 13.2c.4-.7.6-1.5.6-2.4 0-2.8-2.3-5-5-5-.9 0-1.7.2-2.4.6l1.5 1.5c.3-.1.6-.2.9-.2 1.7 0 3 1.3 3 3 0 .3-.1.6-.2.9l1.6 1.6zm-7.4-2.4c0-.9.2-1.7.6-2.4L7.3 6.8C6.5 7.6 6 8.7 6 10c0 2.8 2.3 5 5 5 .9 0 1.7-.2 2.4-.6l-1.5-1.5c-.3.1-.6.2-.9.2-1.7 0-3-1.3-3-3.1zm3.7-7.8C6.9 3 2.9 7 2.9 12s4 9 9.1 9c4.2 0 7.8-2.8 8.8-6.7l-2-.5c-.8 3.1-3.6 5.3-6.8 5.3-3.9 0-7.1-3.1-7.1-7.1S10 5 13.9 5c2.4 0 4.6 1.2 5.8 3.1l1.8-1C20.1 4.5 16.2 3 12 3z" />
        </svg>
      );
    case "framermotion":
      return (
        <svg viewBox="0 0 24 24" fill="#A855F7" className={className} aria-label="Framer Motion">
          <path d="M4 2h16v7h-8L4 2zm0 7h8v7H4V9zm8 7h8l-8 7v-7z" />
        </svg>
      );
    case "node":
      return (
        <svg viewBox="0 0 24 24" fill="#22C55E" className={className} aria-label="Node.js">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4zm-1 3.5h2v8.4h-2V7.8z" />
        </svg>
      );
    case "express":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-slate-100 text-slate-100 light-icon-express`} aria-label="Express.js">
          <path d="M14.7 6.4c-1.4 0-2.4.7-3.1 1.7-.6-1-1.7-1.7-3.1-1.7-2.1 0-3.8 1.7-3.8 4s1.7 4 3.8 4c1.4 0 2.5-.7 3.1-1.7.6 1 1.7 1.7 3.1 1.7 2.1 0 3.8-1.7 3.8-4s-1.7-4-3.8-4zm-6.2 6.2c-1.2 0-2-.9-2-2.2s.8-2.2 2-2.2 2 .9 2 2.2-.8 2.2-2 2.2zm6.2 0c-1.2 0-2-.9-2-2.2s.8-2.2 2-2.2 2 .9 2 2.2-.8 2.2-2 2.2zM21 7l-2.5 3.5L21 14h-2l-1.5-2.2-1.5 2.2h-2l2.5-3.5L14 7h2l1.5 2.2L19 7h2z" />
        </svg>
      );
    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="FastAPI">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" fill="#009688" />
          <path d="M13 7L8.5 12.5H12V17l4.5-5.5H13V7z" fill="#FFF" />
        </svg>
      );
    case "rest":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="REST APIs">
          <circle cx="6" cy="6" r="3" fill="#0EA5E9" fillOpacity="0.25" />
          <circle cx="6" cy="18" r="3" fill="#0EA5E9" fillOpacity="0.25" />
          <circle cx="18" cy="12" r="3" fill="#0EA5E9" fillOpacity="0.25" />
          <path d="M9 6h2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9" />
          <path d="M15 12h-4" />
        </svg>
      );
    case "socketio":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Socket.IO">
          <circle cx="12" cy="12" r="10" stroke="#F59E0B" strokeWidth="1.5" className="fill-[#1C1917] light-socket-bg" />
          <path d="M13.5 6L8 13.5h4L10.5 18 16 10.5h-4L13.5 6z" fill="#F59E0B" />
        </svg>
      );
    case "nodemailer":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Nodemailer">
          <rect x="3" y="5" width="18" height="14" rx="2" fill="#064E3B" fillOpacity="0.25" />
          <polyline points="3 7 12 13 21 7" />
          <line x1="12" y1="13" x2="12" y2="19" strokeDasharray="2 2" />
        </svg>
      );
    case "mongodb":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MongoDB">
          <path d="M12 2C11.5 5 8 9 8 13.5c0 3 2 5.5 4 6.5 2-1 4-3.5 4-6.5C16 9 12.5 5 12 2z" fill="#10B981" />
          <path d="M12 2v18c.2-.1.4-.2.6-.3 1.8-.9 3.4-3.2 3.4-6.2 0-4.5-3.5-8.5-4-11.5z" fill="#059669" />
          <path d="M12 18.5v3.5c0 .6-.4 1-.9 1-.4 0-.8-.3-.9-.8L12 18.5z" fill="#34D399" />
        </svg>
      );
    case "mongoose":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Mongoose">
          {/* Mongoose ODM leaping silhouette */}
          <path
            d="M21 13.8c-.3-1.1-1.1-2-2.2-2.4.2-.6.1-1.2-.2-1.7-.4-.7-1-1.1-1.8-1.1-.4 0-.8.2-1.2.4-.7-.6-1.7-.9-2.6-.8-1.3.2-2.4 1-2.9 2.2-.6.2-1.2.6-1.6 1.1-.5.7-.7 1.4-.7 2.2.1.5.3 1 .6 1.4-1 .4-1.7 1.2-2 2.2-.4 1-.3 2 .1 3 .5 1 1.4 1.8 2.5 2.2 1.1.4 2.3.4 3.4 0 1.1-.4 2-1 2.5-2 .5-.9.8-2 .7-3.1 0-.3 0-.5-.1-.8.9-.3 1.6-1 2-1.8.5-.8.6-1.8.4-2.7.7.5 1.2 1.3 1.4 2.1.2.9 0 1.8-.5 2.5-.5.7-1.2 1.2-2.1 1.4v1.6c1.3-.3 2.5-1 3.3-2.1.7-1.1 1-2.5.7-3.8z"
            fill="#880000"
          />
          <circle cx="16.2" cy="9.8" r="0.75" fill="#FFFFFF" />
          <path
            d="M5 14c.2-1.5 1.4-2.7 2.9-2.9 1.5-.2 3 .5 3.8 1.8"
            stroke="#EF4444"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case "mongodbatlas":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MongoDB Atlas">
          {/* Cloud cluster container */}
          <path
            d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"
            fill="#023430"
            stroke="#00ED64"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* MongoDB leaf inside cloud */}
          <path d="M12 7.5C11.6 9.8 9.5 12.2 9.5 15c0 1.8 1.1 3 2.5 3.5 1.4-.5 2.5-1.7 2.5-3.5 0-2.8-2.1-5.2-2.5-7.5z" fill="#00ED64" />
          <path d="M12 7.5V18.5c.2 0 .4-.1.6-.2 1.1-.6 1.9-1.8 1.9-3.3 0-2.8-2.1-5.2-2.5-7.5z" fill="#00684A" />
          <path d="M12 18v2.2c0 .4-.2.6-.5.6-.2 0-.4-.2-.5-.5L12 18z" fill="#00ED64" />
        </svg>
      );
    case "sql":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="SQL">
          <ellipse cx="12" cy="5" rx="9" ry="3" fill="#1E3A8A" fillOpacity="0.25" />
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        </svg>
      );
    case "mysql":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="MySQL">
          {/* Sakila the Dolphin */}
          <path
            d="M18.8 6.5c-.8-.9-1.9-1.4-3.1-1.5.3-.8.1-1.7-.3-2.3-.5.3-1 .7-1.4 1.3-1.6-.5-3.4-.3-4.9.4-1.3.6-2.3 1.6-3 2.8-.7 1.2-.9 2.6-.7 4 .2 1.4.9 2.6 1.9 3.5.7.6 1.5 1 2.4 1.2l-.3 1.8c-.1.5.2 1 .7 1.1.5.1 1-.2 1.1-.7l.4-2.1c1.2-.2 2.3-.8 3.1-1.7.8-.9 1.3-2.1 1.4-3.3.1-1.6-.4-3.1-1.2-4.4l.6-.2z"
            fill="#00758F"
          />
          <circle cx="14.8" cy="7" r="0.75" fill="#FFFFFF" />
          {/* Sakila orange fin splash */}
          <path
            d="M8.5 13.5c-.8.8-1.5 1.8-1.8 2.9-.1.4.1.8.5.9.4.1.8-.1.9-.5.3-.9.9-1.7 1.6-2.3l-1.2-1z"
            fill="#F29111"
          />
          {/* Ocean wave ripples */}
          <path
            d="M2.5 19.5c2-1 4-1 6 0s4 1 6 0 4-1 6 0"
            stroke="#00758F"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M5.5 22c1.8-.8 3.5-.8 5.3 0s3.5.8 5.3 0"
            stroke="#F29111"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} aria-label="Python">
          <path fill="#3776AB" d="M11.9 2c-4 0-3.8 1.7-3.8 1.7v1.8h3.9v.6H6.4S4 5.8 4 9.9c0 4.1 2.1 4 2.1 4h1.2v-1.7s-.1-2 2-2h3.9s1.9 0 1.9-1.9V4.1S15.4 2 11.9 2zm-1.1 1.2c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" />
          <path fill="#FFD43B" d="M12.1 22c4 0 3.8-1.7 3.8-1.7v-1.8h-3.9v-.6h5.6s2.4.3 2.4-3.8c0-4.1-2.1-4-2.1-4h-1.2v1.7s.1 2-2 2H10.8s-1.9 0-1.9 1.9v2.1s-.3 2.2 3.2 2.2zm1.1-1.2c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" />
        </svg>
      );
    case "numpy":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="NumPy">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#013243" stroke="#38BDF8" strokeWidth="1.2" />
          <path d="M12 2v10l9-5M12 12l-9-5M12 12v10" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="2" fill="#38BDF8" />
        </svg>
      );
    case "pandas":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Pandas">
          <rect x="3" y="4" width="4" height="16" rx="1.5" fill="#E70488" />
          <rect x="10" y="8" width="4" height="12" rx="1.5" fill="#FFD43B" />
          <rect x="17" y="2" width="4" height="18" rx="1.5" fill="#150458" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="5" cy="8" r="1" fill="#FFF" />
          <circle cx="12" cy="12" r="1" fill="#1C1917" />
          <circle cx="19" cy="6" r="1" fill="#FFF" />
        </svg>
      );
    case "streamlit":
      return (
        <svg viewBox="0 0 24 24" fill="#FF4B4B" className={className} aria-label="Streamlit">
          <path d="M8.7 13.4l-4.4 2.8 1.7 3.8 6.4-1.2-3.7-5.4zm3.6-7.4l-3.3 5.4 3.7 5.4 6.7-1.3-7.1-9.5zm-5 4.3l-3.3 2.1.8 1.7 4.1-1.4-1.6-2.4zm10.7 4.9l-5.6 1.1 2.3 3.3 5.3-1.6-2-2.8z" />
        </svg>
      );
    case "git":
      return (
        <svg viewBox="0 0 24 24" fill="#F05032" className={className} aria-label="Git">
          <path d="M21.7 10.7L13.3 2.3c-.4-.4-1.1-.4-1.5 0L9.4 4.7l2.8 2.8c.4-.1.9 0 1.2.3.4.4.5 1 .3 1.5l2.7 2.7c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.6-2.6v5.2c.2.2.3.5.3.8 0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5c0-.4.2-.7.4-1V9.7L8.2 7.1 2.3 13c-.4.4-.4 1.1 0 1.5l8.4 8.4c.4.4 1.1.4 1.5 0l9.5-9.5c.4-.4.4-1.1 0-1.5z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-slate-100 text-slate-100 light-icon-github`} aria-label="GitHub">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case "vercel":
      return (
        <svg viewBox="0 0 24 24" className={`${className} fill-slate-100 text-slate-100 light-icon-vercel`} aria-label="Vercel">
          <path d="M12 1L24 22H0L12 1Z" />
        </svg>
      );
    case "postman":
      return (
        <svg viewBox="0 0 24 24" fill="#FF6C37" className={className} aria-label="Postman">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.8 5.7a1.8 1.8 0 1 1-1.8 1.8 1.8 1.8 0 0 1 1.8-1.8zm-7.6 0a1.8 1.8 0 1 1 1.8 1.8 1.8 1.8 0 0 1-1.8-1.8zm6.6 8.3a4.8 4.8 0 0 1-5.6 0 .8.8 0 1 1 .9-1.3 3.3 3.3 0 0 0 3.8 0 .8.8 0 1 1 .9 1.3z" />
        </svg>
      );
    default:
      return <Code2 className={className} />;
  }
}

// 6 Organized Categories with all specified technologies
const SKILL_GROUPS = [
  {
    id: "frontend",
    number: "01",
    title: "Frontend Development",
    titleEm: "Interfaces",
    tagline: "Component architectures, responsive layout engines & reactive state",
    accent: "cyan",
    accentColor: "#38BDF8",
    accentBg: "rgba(56, 189, 248, 0.12)",
    accentBorder: "border-sky-400/35",
    glow: "rgba(56, 189, 248, 0.18)",
    icon: Layout,
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React.js", icon: "react" },
      { name: "React Native", icon: "reactnative" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Redux", icon: "redux" },
      { name: "Framer Motion", icon: "framermotion" },
    ],
  },
  {
    id: "backend",
    number: "02",
    title: "Backend Development",
    titleEm: "Services",
    tagline: "High-throughput asynchronous APIs, real-time WebSockets & mail transports",
    accent: "emerald",
    accentColor: "#10B981",
    accentBg: "rgba(16, 185, 129, 0.12)",
    accentBorder: "border-emerald-400/35",
    glow: "rgba(16, 185, 129, 0.18)",
    icon: Server,
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "REST APIs", icon: "rest" },
      { name: "Socket.IO", icon: "socketio" },
      { name: "Nodemailer", icon: "nodemailer" },
    ],
  },
  {
    id: "databases",
    number: "03",
    title: "Databases",
    titleEm: "Storage",
    tagline: "Document schemas, cloud clusters, ORM/ODMs & relational SQL engines",
    accent: "teal",
    accentColor: "#14B8A6",
    accentBg: "rgba(20, 184, 166, 0.14)",
    accentBorder: "border-teal-400/40",
    glow: "rgba(20, 184, 166, 0.22)",
    icon: Database,
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "Mongoose", icon: "mongoose" },
      { name: "SQL", icon: "sql" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB Atlas", icon: "mongodbatlas", span: 2, badge: "Cloud DB" },
    ],
  },
  {
    id: "languages",
    number: "04",
    title: "Programming Languages",
    titleEm: "Syntax",
    tagline: "Object-oriented, asynchronous event-driven & procedural programming",
    accent: "amber",
    accentColor: "#F59E0B",
    accentBg: "rgba(245, 158, 11, 0.12)",
    accentBorder: "border-amber-400/35",
    glow: "rgba(245, 158, 11, 0.18)",
    icon: Code2,
    skills: [
      { name: "Python", icon: "python" },
      { name: "JavaScript", icon: "javascript" },
    ],
  },
  {
    id: "ai",
    number: "05",
    title: "Data Science & AI",
    titleEm: "Analytics",
    tagline: "Multi-dimensional numerical computing, DataFrame pipelines & ML UI apps",
    accent: "purple",
    accentColor: "#A855F7",
    accentBg: "rgba(168, 85, 247, 0.12)",
    accentBorder: "border-purple-400/35",
    glow: "rgba(168, 85, 247, 0.18)",
    icon: Cpu,
    skills: [
      { name: "NumPy", icon: "numpy" },
      { name: "Pandas", icon: "pandas" },
      { name: "Streamlit", icon: "streamlit" },
    ],
  },
  {
    id: "tools",
    number: "06",
    title: "Tools & Platforms",
    titleEm: "Workflows",
    tagline: "Distributed version control, edge cloud hosting & automated API diagnostics",
    accent: "orange",
    accentColor: "#FB923C",
    accentBg: "rgba(251, 146, 60, 0.12)",
    accentBorder: "border-orange-400/35",
    glow: "rgba(251, 146, 60, 0.18)",
    icon: Wrench,
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Vercel", icon: "vercel" },
      { name: "Postman", icon: "postman" },
    ],
  },
];

// Interactive Skill Card with Subtle 3D Tilt and Cursor-Following Spotlight Highlight
function CompactSkillCard({ skill, glow, accentColor }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 22, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), springConfig);

  const glareBg = useMotionTemplate`radial-gradient(180px circle at ${useTransform(
    mouseX,
    [0, 1],
    [0, 100]
  )}% ${useTransform(mouseY, [0, 1], [0, 100])}%, ${glow}, transparent 75%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const isWide = skill.span === 2;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -3, scale: 1.025 }}
      whileTap={{ scale: 0.98 }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      className={`group skill-item-card relative flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#0E1524] p-2.5 sm:px-3 sm:py-2.5 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:shadow-[0_10px_25px_-6px_rgba(0,0,0,0.7)] cursor-default select-none overflow-hidden ${
        isWide ? "col-span-2" : "col-span-1"
      }`}
    >
      {/* Cursor-Following dynamic highlight matching Beyond the Code */}
      <motion.div
        className="skill-card-glow pointer-events-none absolute inset-0 rounded-xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: glareBg,
        }}
        aria-hidden="true"
      />

      {/* Brand Logo Container with 3D Z-Lift */}
      <div
        style={{ transform: "translateZ(14px)" }}
        className="skill-icon-badge flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03] p-1 shadow-sm transition-transform duration-300 group-hover:scale-110"
      >
        <TechIcon id={skill.icon} className="h-4 w-4" />
      </div>

      {/* Technology Name */}
      <div style={{ transform: "translateZ(10px)" }} className="min-w-0 flex-1">
        <p className="skill-name-text truncate font-display text-xs sm:text-[13px] font-semibold text-slate-200 transition-colors duration-200 group-hover:text-white">
          {skill.name}
        </p>
      </div>

      {/* Optional badge or indicator dot */}
      {skill.badge ? (
        <span
          style={{ transform: "translateZ(8px)", borderColor: `${accentColor}40`, color: accentColor }}
          className="skill-badge-pill shrink-0 rounded-md border bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wider"
        >
          {skill.badge}
        </span>
      ) : (
        <span
          style={{ backgroundColor: accentColor }}
          className="h-1 w-1 shrink-0 rounded-full opacity-30 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </motion.div>
  );
}

// Category Section Card with Ambient Header and Grid
function CategoryCard({ category }) {
  const cardRef = useRef(null);
  const Icon = category.icon;

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const glareBg = useMotionTemplate`radial-gradient(380px circle at ${useTransform(
    mouseX,
    [0, 1],
    [0, 100]
  )}% ${useTransform(mouseY, [0, 1], [0, 100])}%, ${category.glow}, transparent 70%)`;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-testid={`skill-category-${category.id}`}
      className="group/card skill-category-card relative flex h-full flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#070B12]/85 p-5 sm:p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85)]"
    >
      {/* Top ambient highlight line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
        aria-hidden="true"
      />

      {/* Dynamic Cursor-Following ambient background accent glow */}
      <motion.div
        className="skill-category-glow pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-60 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background: glareBg,
        }}
        aria-hidden="true"
      />

      <div>
        {/* Category Header */}
        <div className="flex items-start justify-between gap-3 border-b border-white/[0.06] pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`skill-icon-box flex h-9 w-9 items-center justify-center rounded-xl border ${category.accentBorder} category-icon-box-${category.accent}`}
              style={{ backgroundColor: category.accentBg, color: category.accentColor }}
            >
              <Icon className="h-4 w-4" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="skill-category-num font-mono text-[10px] font-bold text-slate-500">
                  {category.number}
                </span>
                <span className="skill-category-dot h-1 w-1 rounded-full bg-white/20" />
                <span
                  style={{ color: category.accentColor }}
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] font-semibold category-accent-${category.accent}`}
                >
                  Domain
                </span>
              </div>
              <h3 className="skill-category-title mt-0.5 font-display text-lg sm:text-[19px] font-bold tracking-tight text-slate-100">
                {category.title}{" "}
                <em className="text-gradient pr-1 font-serif font-normal italic text-sm">
                  {category.titleEm}
                </em>
              </h3>
            </div>
          </div>

          {/* Technology count pill */}
          <span className="skill-tool-count-pill shrink-0 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-slate-400">
            {category.skills.length} tools
          </span>
        </div>

        {/* Tagline */}
        <p className="skill-category-tagline mt-3 text-xs leading-relaxed text-slate-400">
          {category.tagline}
        </p>

        {/* Compact 3D Skill Tiles Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-2.5">
          {category.skills.map((skill) => (
            <CompactSkillCard
              key={skill.name}
              skill={skill}
              glow={category.glow}
              accentColor={category.accentColor}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("all");

  const filterTabs = [
    { id: "all", label: "All Skills", count: 24 },
    { id: "frontend", label: "Frontend", count: 8 },
    { id: "backend", label: "Backend", count: 6 },
    { id: "databases", label: "Databases", count: 5 },
    { id: "languages", label: "Languages", count: 2 },
    { id: "ai", label: "Data & AI", count: 3 },
    { id: "tools", label: "Tools", count: 4 },
  ];

  const visibleGroups = SKILL_GROUPS.filter((g) => {
    if (activeTab === "all") return true;
    return g.id === activeTab;
  });

  return (
    <section id="skills" className="relative border-t border-white/[0.04] py-24 sm:py-28 overflow-hidden">
      {/* Ambient background atmosphere glow */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/3 -left-32 h-[420px] w-[420px] rounded-full bg-emerald-500/[0.04] blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 h-[420px] w-[420px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
        <div className="absolute inset-0 grid-lines opacity-20 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-blue-400" aria-hidden="true" />
              03 — Technical Skills
            </p>
            <EmTitle text="Engineering *toolkit* & technologies." className="mt-3 text-3xl sm:text-4xl lg:text-[44px]" />
            <p className="mt-2 text-sm text-slate-400 max-w-lg">
              A comprehensive toolkit spanning client interfaces, distributed backends, databases, AI computation, and deployment platforms.
            </p>
          </Reveal>

          {/* Interactive Category Filter Tabs - Fully Responsive Scroll Container */}
          <Reveal delay={0.08} className="w-full lg:w-auto">
            <div className="skill-filter-outer relative -mx-5 px-5 sm:mx-0 sm:px-0">
              <div
                className="skill-filter-wrapper flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth rounded-2xl sm:rounded-full border border-white/[0.08] bg-[#0A0F1A]/85 p-1.5 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl max-w-full"
                role="tablist"
                aria-label="Skill category filters"
              >
                {filterTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      role="tab"
                      aria-selected={isActive}
                      data-testid={`skill-filter-${tab.id}`}
                      className={`skill-filter-btn relative flex shrink-0 items-center gap-2 rounded-xl sm:rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 select-none ${
                        isActive
                          ? "text-emerald-300 font-bold skill-active-tab"
                          : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSkillTab"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          className="skill-active-tab-indicator absolute inset-0 rounded-xl sm:rounded-full border border-emerald-400/50 bg-gradient-to-r from-emerald-500/20 via-emerald-400/15 to-teal-500/20 shadow-[0_0_18px_rgba(16,185,129,0.3),inset_0_1px_0_rgba(255,255,255,0.15)]"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                      <span
                        className={`relative z-10 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 font-mono text-[9.5px] font-semibold transition-colors ${
                          isActive
                            ? "bg-emerald-400/25 text-emerald-200 border border-emerald-400/40"
                            : "bg-white/[0.05] text-slate-400 border border-white/[0.06]"
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Responsive 3-Column / 2-Column Grid */}
        <motion.div
          layout
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
          data-testid="skills-ledger"
        >
          <AnimatePresence mode="popLayout">
            {visibleGroups.map((group, index) => (
              <motion.div
                key={group.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <CategoryCard category={group} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
