import { motion } from "framer-motion";
import profilePhoto from "@assets/tayyab_nobg.png";
import { APPLE_EASE, staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto pt-24 pb-0">
        <div className="grid lg:grid-cols-[1fr_45%] gap-6 lg:gap-0 items-end">

          {/* ── Left: text ── */}
          <motion.div
            variants={staggerContainer(0.13, 0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5 pb-16 lg:pb-28 self-center"
          >
            {/* Arabic/Urdu greeting */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.05 }}
              className="leading-none"
            >
              <span
                className="text-4xl sm:text-5xl md:text-6xl text-primary/90"
                style={{ fontFamily: "'Noto Nastaliq Urdu', serif", direction: 'rtl' }}
              >
                السلام علیکم
              </span>
            </motion.div>

            {/* I'm Tayyab */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: APPLE_EASE, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                I'm{" "}
                <span className="text-gradient">Tayyab</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.35 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground font-light max-w-md leading-relaxed"
            >
              Computer Science student at{" "}
              <span className="text-foreground font-medium">Air University, Kamra</span>
              {" "}— building digital experiences from code and commerce.
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={staggerItem}
              className="flex flex-wrap gap-4 pt-1"
            >
              <a
                href="#projects"
                className="px-7 py-3.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="px-7 py-3.5 bg-white/5 border border-white/10 font-bold rounded-lg hover:bg-white/10 transition-colors"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Location tag */}
            <motion.div
              variants={staggerItem}
              className="font-mono text-sm tracking-wider text-white/50 border-l-2 border-primary pl-3"
            >
              BASED IN KAMRA, PK
            </motion.div>
          </motion.div>

          {/* ── Right: photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: APPLE_EASE }}
            className="relative flex items-end justify-center self-end"
            style={{ height: "min(88vh, 800px)" }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-40 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/5 h-24 bg-accent/15 rounded-full blur-2xl pointer-events-none" />
            <img
              src={profilePhoto}
              alt="Tayyab Naveed Akhtar"
              className="relative z-10 h-full w-auto object-contain object-bottom select-none"
              style={{ filter: "drop-shadow(0 0 50px rgba(0,255,255,0.15))" }}
              draggable={false}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
