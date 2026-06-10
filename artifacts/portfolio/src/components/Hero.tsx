import { motion } from "framer-motion";
import profilePhoto from "@assets/IMG-20260601-WA0094_1781116618895.jpg";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs tracking-wider text-primary mb-4"
            >
              AVAILABLE FOR OPPORTUNITIES
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              TAYYAB<br />
              <span className="text-gradient">NAVEED</span><br />
              AKHTAR
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg leading-relaxed">
            Software Engineer & Entrepreneur. Building digital experiences from code and commerce.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a href="#projects" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.3)]">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-colors">
              Get in Touch
            </a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto lg:ml-auto max-w-md w-full aspect-[3/4]"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-2xl rotate-3 scale-105 opacity-50 blur-xl"></div>
          <div className="relative h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-card shadow-2xl">
            <img 
              src={profilePhoto} 
              alt="Tayyab Naveed Akhtar" 
              className="w-full h-full object-cover object-center"
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-mono text-sm tracking-wider text-white/80 border-l-2 border-primary pl-3">
                BASED IN KAMRA, PK
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
