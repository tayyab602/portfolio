import { motion } from "framer-motion";
import profilePhoto from "@assets/9cd625bc-eec2-494a-9b82-e2f36c55d1a4-removebg-preview_1781191936109.png";
import { APPLE_EASE, staggerContainer, staggerItem } from "@/lib/animations";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[30vw] h-[30vw] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto pt-20 pb-0">
        <div className="grid lg:grid-cols-[55%_45%] gap-0 items-end">

          {/* ── Left: text ── */}
          <motion.div
            variants={staggerContainer(0.13, 0.1)}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-4 pb-16 lg:pb-24 self-center z-10"
          >
            {/* Calligraphy — Nastaliq style matching reference 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: APPLE_EASE, delay: 0.05 }}
              className="leading-none"
            >
              <p
                className="text-4xl sm:text-5xl md:text-6xl max-w-xs sm:max-w-sm"
                style={{
                  fontFamily: "'Noto Nastaliq Urdu', serif",
                  direction: "rtl",
                  textAlign: "right",
                  color: "hsl(190,85%,55%)",
                  textShadow: "0 0 30px rgba(0,220,255,0.4), 0 0 60px rgba(0,220,255,0.2)",
                  lineHeight: 1.5,
                }}
              >
                السلام علیکم
              </p>
            </motion.div>

            {/* I'm Tayyab */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: APPLE_EASE, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
                I'm <span className="text-gradient">Tayyab</span>
              </h1>
            </motion.div>

            {/* Subtitle — clean & simple */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.35 }}
              className="text-base sm:text-lg text-muted-foreground font-light max-w-sm leading-relaxed"
            >
              Computer Science student at{" "}
              <span className="text-foreground font-medium">Air University, Kamra</span>
            </motion.p>

            {/* Buttons */}
            <motion.div variants={staggerItem} className="flex flex-wrap gap-4 pt-2">
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

            <motion.div
              variants={staggerItem}
              className="font-mono text-sm tracking-wider text-white/40 border-l-2 border-primary pl-3"
            >
              SKP → KAMRA, PK
            </motion.div>
          </motion.div>

          {/* ── Right: photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: APPLE_EASE }}
            className="relative flex items-end justify-start self-end -ml-8 lg:-ml-20"
            style={{ height: "min(98vh, 920px)" }}
          >
            <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-4/5 h-40 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 -translate-x-1/2 w-3/5 h-24 bg-accent/15 rounded-full blur-2xl pointer-events-none" />
            <img
              src={profilePhoto}
              alt="Tayyab Naveed Akhtar"
              className="relative z-10 h-full w-auto object-contain object-bottom select-none"
              style={{ filter: "drop-shadow(0 0 50px rgba(0,255,255,0.18))" }}
              draggable={false}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
