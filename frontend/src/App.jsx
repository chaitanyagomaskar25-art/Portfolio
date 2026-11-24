import { Component, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import CodingProfiles from "./components/CodingProfiles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingBackToTop from "./components/FloatingBackToTop";
import CustomCursor from "./components/CustomCursor";
import GlobalBackground from "./components/GlobalBackground";
import { initLenis } from "./lib/scroll";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#05070C] font-mono text-sm text-slate-400">
          Something went wrong. Please refresh the page.
        </div>
      );
    }
    return this.props.children;
  }
}

function Portfolio() {
  useEffect(() => initLenis(), []);

  useEffect(() => {
    try {
      if (localStorage.getItem("theme") === "light") {
        document.documentElement.classList.add("light");
      }
    } catch (e) {}
  }, []);

  return (
    <div id="top" className="relative min-h-screen bg-[#06080D] text-[#ECEFF4] selection:bg-amber-500/30">
      <GlobalBackground />
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <CodingProfiles />
        <Experience />
        <Education />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <FloatingBackToTop />
      <CustomCursor />
      <Toaster theme="dark" position="bottom-right" richColors closeButton />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}
