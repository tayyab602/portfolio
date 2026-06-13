import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const THEME_ICONS = { light: Sun, dark: Moon, system: Monitor };
const THEME_LABELS = { light: "Light", dark: "Dark", system: "System" };

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, cycle } = useTheme();
  const Icon = THEME_ICONS[theme];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <a
          href="#hero"
          className="text-4xl text-primary select-none leading-none"
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          Tayyab
        </a>

        {/* Nav links + theme toggle */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm font-medium tracking-wide">
            {[
              ["#about",      "About"],
              ["#experience", "Path"],
              ["#skills",     "Skills"],
              ["#projects",   "Projects"],
              ["#contact",    "Contact"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={cycle}
            title={`Theme: ${THEME_LABELS[theme]} — click to cycle`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-sm text-muted-foreground hover:text-foreground"
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono text-xs">{THEME_LABELS[theme]}</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
