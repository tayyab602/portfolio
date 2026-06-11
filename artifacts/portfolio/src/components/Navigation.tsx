import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      {/* Nav content sits in the upper portion; extra height lets signature drip below */}
      <div className="container mx-auto px-4 flex items-start justify-between pt-4 pb-0">

        {/* Signature logo — drips below the nav border */}
        <a
          href="#hero"
          className="relative block leading-none select-none"
          style={{ marginBottom: '-18px' }}
        >
          <span
            className="block text-5xl text-primary drop-shadow-[0_0_12px_rgba(0,255,255,0.5)]"
            style={{ fontFamily: "'Great Vibes', cursive", lineHeight: 1.15 }}
          >
            Tayyab
          </span>
          {/* Underline pen-stroke decoration */}
          <span
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-primary/80 via-primary/40 to-transparent"
            style={{ bottom: '6px' }}
          />
        </a>

        {/* Nav links — vertically centred to the upper bar */}
        <div className="flex items-center gap-8 font-mono text-sm tracking-wider pt-2 hidden md:flex">
          <a href="#about"      className="text-muted-foreground hover:text-white transition-colors">ABOUT</a>
          <a href="#experience" className="text-muted-foreground hover:text-white transition-colors">PATH</a>
          <a href="#skills"     className="text-muted-foreground hover:text-white transition-colors">SKILLS</a>
          <a href="#projects"   className="text-muted-foreground hover:text-white transition-colors">PROJECTS</a>
          <a href="#contact"    className="text-primary font-bold hover:text-primary/80 transition-colors">CONTACT</a>
        </div>
      </div>
    </motion.nav>
  );
}
