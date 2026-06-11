import { motion } from "framer-motion";
import profilePhoto from "@assets/tayyab_nobg.png";
import { APPLE_EASE, staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-4 items-end relative z-10">
        <motion.div
          variants={staggerContainer(0.14, 0.1)}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 pb-16 lg:pb-0 lg:self-center"
        >
          <motion.div
            variants={staggerItem}
            className="inline-block w-fit px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs tracking-wider text-primary mb-2"
          >
            AVAILABLE FOR OPPORTUNITIES
          </motion.div>

          <div className="space-y-0 overflow-hidden">
            {["TAYYAB", "NAVEED", "AKHTAR"].map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.2 + i * 0.1 }}
              >
                <h1
                  className={`text-5xl md:text-7xl font-black tracking-tight leading-tight ${
                    i === 1 ? "text-gradient" : ""
                  }`}
                >
                  {word}
                </h1>
              </motion.div>
            ))}
          </div>

          <motion.p
            variants={staggerItem}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-lg leading-relaxed"
          >
            Software Engineer & Entrepreneur. Building digital experiences from code and commerce.
          </motion.p>

          <motion.div variants={staggerItem} className="flex flex-wrap gap-4 pt-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: APPLE_EASE }}
          className="relative mx-auto lg:ml-auto flex items-end justify-center"
          style={{ height: "min(85vh, 700px)" }}
        >
          {/* Ambient glow under the figure */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-32 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-20 bg-accent/15 rounded-full blur-2xl pointer-events-none" />

          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="relative z-10 h-full w-auto object-contain object-bottom select-none drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 40px rgba(0,255,255,0.12))" }}
            draggable={false}
          />

          <div className="absolute bottom-6 left-0 z-20">
            <div className="font-mono text-sm tracking-wider text-white/60 border-l-2 border-primary pl-3">
              BASED IN KAMRA, PK
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
