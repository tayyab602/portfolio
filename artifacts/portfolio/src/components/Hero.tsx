import { motion } from "framer-motion";
import profilePhoto from "@assets/9cd625bc-eec2-494a-9b82-e2f36c55d1a4-removebg-preview_1781191936109.png";
import { APPLE_EASE } from "@/lib/animations";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-stretch overflow-hidden"
    >
      {/* Warm orange glow behind photo */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "50%",
          height: "100%",
          background:
            "radial-gradient(ellipse at 80% 60%, rgba(224,114,48,0.13) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* OPTION F: Giant ghost Arabic outline — full background layer */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "'Noto Kufi Arabic', sans-serif",
          fontSize: "clamp(220px, 30vw, 380px)",
          fontWeight: 800,
          color: "transparent",
          WebkitTextStroke: "1px rgba(224,114,48,0.5)",
          direction: "rtl",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        سلام
      </div>

      <div className="container px-6 mx-auto grid lg:grid-cols-[1fr_auto] items-end pt-20">
        {/* Left: text */}
        <div className="flex flex-col justify-center gap-4 pb-20 lg:pb-28 self-center z-10">
          {/* Small solid Arabic سلام، on top of the ghost */}
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: APPLE_EASE, delay: 0.05 }}
            style={{
              fontFamily: "'Noto Kufi Arabic', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
              color: "#E07230",
              lineHeight: 1,
              direction: "rtl",
              textAlign: "left",
              marginBottom: "-4px",
            }}
          >
            سلام،
          </motion.p>

          {/* Thin orange rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.22 }}
            style={{
              width: "48px",
              height: "2px",
              background: "#E07230",
              transformOrigin: "left",
              borderRadius: "2px",
              margin: "2px 0",
            }}
          />

          {/* I'M TAYYAB! */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: APPLE_EASE, delay: 0.28 }}
            style={{
              fontFamily: "'Unbounded', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 6.5vw, 6.2rem)",
              lineHeight: 0.95,
              letterSpacing: "-1px",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "var(--foreground, #fdf6f0)" }}>I'M </span>
            <span style={{ color: "#E07230" }}>TAYYAB!</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: APPLE_EASE, delay: 0.42 }}
            className="text-muted-foreground text-base sm:text-lg max-w-sm leading-relaxed"
          >
            Computer Science student at{" "}
            <span className="text-foreground font-medium">
              Air University, Kamra
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: APPLE_EASE, delay: 0.55 }}
            className="flex flex-wrap gap-3 pt-1"
          >
            <a
              href="#contact"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "#E07230",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                textDecoration: "none",
                transition: "box-shadow 0.25s ease, opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                  "0 0 24px rgba(224,114,48,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="border border-border text-sm font-semibold rounded-lg hover:bg-muted transition-colors"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                fontSize: "14px",
                fontWeight: 600,
                borderRadius: "8px",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              See My Work
            </a>
          </motion.div>

          {/* Location tag */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="font-mono text-xs tracking-widest text-muted-foreground pl-3 mt-1"
            style={{ borderLeft: "2px solid #E07230" }}
          >
            SKP → KAMRA, PK
          </motion.p>
        </div>

        {/* Right: photo desktop */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: APPLE_EASE }}
          className="relative self-end hidden lg:flex items-end justify-center"
          style={{ height: "min(92vh, 860px)" }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "180px",
              background:
                "linear-gradient(to top, #1a1209 0%, transparent 100%)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <img
            src={profilePhoto}
            alt="Tayyab Naveed Akhtar"
            className="relative h-full w-auto object-contain object-bottom select-none"
            style={{ zIndex: 0 }}
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
