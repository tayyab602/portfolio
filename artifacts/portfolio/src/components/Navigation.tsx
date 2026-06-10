import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#hero" className="font-black text-xl tracking-tighter">
          T<span className="text-primary">N</span>A
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-mono text-sm tracking-wider">
          <a href="#about" className="text-muted-foreground hover:text-white transition-colors">ABOUT</a>
          <a href="#experience" className="text-muted-foreground hover:text-white transition-colors">PATH</a>
          <a href="#skills" className="text-muted-foreground hover:text-white transition-colors">SKILLS</a>
          <a href="#projects" className="text-muted-foreground hover:text-white transition-colors">PROJECTS</a>
          <a href="#contact" className="text-primary font-bold hover:text-primary/80 transition-colors">CONTACT</a>
        </div>
      </div>
    </motion.nav>
  );
}
