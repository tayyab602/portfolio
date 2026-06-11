import { motion } from "framer-motion";
import profilePhoto from "@assets/9cd625bc-eec2-494a-9b82-e2f36c55d1a4-removebg-preview_1781191936109.png";
import { APPLE_EASE } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-stretch overflow-hidden"
    >
      {/* background glow blobs */}
      <div className="absolute top-1/3 left-1/4 w-[40vw] h-[40vw] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[28vw] h-[28vw] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-6 mx-auto grid lg:grid-cols-[1fr_auto] items-end pt-20">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center gap-5 pb-20 lg:pb-28 z-10 self-center">

          {/* Salam calligraphy — big display greeting like "Hello," */}
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.05 }}
            style={{
              fontFamily: "'Noto Nastaliq Urdu', serif",
              direction: "rtl",
              textAlign: "left",
              fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              lineHeight: 1.5,
              color: "hsl(190,85%,55%)",
              textShadow: "0 0 40px rgba(0,220,255,0.35), 0 0 80px rgba(0,220,255,0.15)",
              letterSpacing: "0.02em",
            }}
          >
            السلام علیکم
          </motion.p>

          {/* I'm Tayyab! — main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: APPLE_EASE, delay: 0.2 }}
            className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.6rem, 8vw, 7rem)" }}
          >
            I'm{" "}
            <span className="text-gradient">Tayyab!</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.35 }}
            className="text-muted-foreground font-light text-base sm:text-lg max-w-xs leading-relaxed"
          >
            Computer Science student —{" "}
            <span className="text-foreground/80">Air University, Kamra</span>
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: APPLE_EASE, delay: 0.48 }}
            className="flex flex-wrap gap-4 pt-1"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 border border-white/20 text-sm font-semibold rounded-lg hover:bg-white/8 transition-colors tracking-wide"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-8 py-3.5 bg-primary/10 border border-primary/30 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors tracking-wide"
            >
              See My Work
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-mono text-xs tracking-widest text-white/30 border-l-2 border-primary/50 pl-3 mt-1"
          >
            SKP → KAMRA, PK
          </motion.div>
        </div>

        {/* ── Right: photo — flush to bottom edge ── */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: APPLE_EASE }}
          className="relative self-end hidden lg:flex items-end justify-center"
          style={{ height: "min(95vh, 900px)", width: "auto" }}
        >
          {/* glow under feet */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="relative z-10 h-full w-auto object-contain object-bottom select-none"
            style={{ filter: "drop-shadow(0 0 60px rgba(0,255,255,0.15))" }}
            draggable={false}
          />
        </motion.div>

        {/* Mobile photo — shown below text */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: APPLE_EASE }}
          className="lg:hidden flex justify-center pb-6"
        >
          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="h-72 w-auto object-contain select-none"
            style={{ filter: "drop-shadow(0 0 40px rgba(0,255,255,0.15))" }}
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
