import { motion } from "framer-motion";
import profilePhoto from "@assets/9cd625bc-eec2-494a-9b82-e2f36c55d1a4-removebg-preview_1781191936109.png";
import { APPLE_EASE } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-stretch overflow-hidden"
    >
      <div className="container px-6 mx-auto grid lg:grid-cols-[1fr_auto] items-end pt-20">

        {/* ── Left: text ── */}
        <div className="flex flex-col justify-center gap-5 pb-20 lg:pb-28 self-center z-10">

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.05 }}
            className="font-black tracking-tight leading-none text-primary"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)" }}
          >
            Salam,
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: APPLE_EASE, delay: 0.18 }}
            className="font-black tracking-tight leading-none"
            style={{ fontSize: "clamp(2.8rem, 8vw, 7rem)" }}
          >
            I'm Tayyab!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.32 }}
            className="text-muted-foreground text-base sm:text-lg max-w-sm leading-relaxed"
          >
            Computer Science student at{" "}
            <span className="text-foreground font-medium">Air University, Kamra</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: APPLE_EASE, delay: 0.45 }}
            className="flex flex-wrap gap-3 pt-1"
          >
            <a
              href="#contact"
              className="px-7 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="px-7 py-3 border border-border text-sm font-semibold rounded-lg hover:bg-muted transition-colors"
            >
              See My Work
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="font-mono text-xs tracking-widest text-muted-foreground border-l-2 border-primary pl-3 mt-1"
          >
            SKP → KAMRA, PK
          </motion.p>
        </div>

        {/* ── Right: photo ── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: APPLE_EASE }}
          className="relative self-end hidden lg:flex items-end justify-center"
          style={{ height: "min(92vh, 860px)" }}
        >
          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="relative h-full w-auto object-contain object-bottom select-none"
            draggable={false}
          />
        </motion.div>

        {/* Mobile photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: APPLE_EASE }}
          className="lg:hidden flex justify-center pb-8"
        >
          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="h-64 w-auto object-contain select-none"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
