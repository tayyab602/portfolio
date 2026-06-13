import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>

      <footer className="border-t border-border bg-card/30">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-mono tracking-wide">
            TAYYAB NAVEED AKHTAR &copy; {new Date().getFullYear()}
          </p>
          <a
            href="https://wa.me/c/923350602602"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-[#25D366]/50 hover:text-[#25D366] transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Catalogue
          </a>
        </div>
      </footer>
    </div>
  );
}
