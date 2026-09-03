import { useEffect, useState } from "react";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import CodeShowcase from "./components/CodeShowcase";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import CustomCursor from "./components/CustomCursor";
import type { Project } from "./data/projects";

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <Nav onOpenSearch={() => setSearchOpen(true)} />

      <main>
        <Hero onOpenSearch={() => setSearchOpen(true)} />
        <About />
        <Experience />
        <Skills />
        <CodeShowcase />
        <Projects
          selected={selectedProject}
          onSelect={setSelectedProject}
          onClose={() => setSelectedProject(null)}
        />
        <Contact />
      </main>

      <Footer />

      <CommandPalette
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onOpenProject={setSelectedProject}
      />
    </div>
  );
}
