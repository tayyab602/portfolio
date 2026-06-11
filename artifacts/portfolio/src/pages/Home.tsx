import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { ParticleCanvas } from "@/components/ParticleCanvas";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ParticleCanvas />
      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="relative z-10 py-8 border-t border-white/5 text-center text-muted-foreground font-mono text-sm">
        <p>TAYYAB NAVEED AKHTAR &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
