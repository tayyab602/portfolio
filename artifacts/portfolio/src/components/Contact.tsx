import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";
import {
  APPLE_EASE,
  VIEWPORT,
  staggerContainer,
  staggerItem,
  fadeUp,
  scaleUp,
} from "@/lib/animations";

const contactLinks = [
  {
    href: "https://www.linkedin.com/in/tayyab-naveed-akhtar-922721313/",
    icon: Linkedin,
    label: "LinkedIn",
    sub: "/tayyab-naveed-akhtar",
    hoverColor: "group-hover:text-[#0A66C2]",
    isExternal: true,
  },
  {
    href: "mailto:tayyabnaveed13@gmail.com",
    icon: Mail,
    label: "Email",
    sub: "tayyabnaveed13@gmail.com",
    hoverColor: "group-hover:text-primary",
    isExternal: false,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-card/30 border-t border-white/5">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-12"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6">
            LET'S BUILD SOMETHING
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Whether it's a software project, a business opportunity, or just a chat about tech — my inbox is open.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-3 gap-6 mb-16"
        >
          {contactLinks.map(({ href, icon: Icon, label, sub, hoverColor, isExternal }) => (
            <motion.a
              key={label}
              variants={staggerItem}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              whileHover={{ y: -5, transition: { duration: 0.25, ease: APPLE_EASE } }}
              className="flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
            >
              <Icon className={`w-8 h-8 mb-4 text-white/50 transition-colors ${hoverColor}`} />
              <span className="font-medium">{label}</span>
              <span className="text-xs text-muted-foreground mt-2 font-mono break-all">{sub}</span>
            </motion.a>
          ))}

          <motion.div
            variants={scaleUp}
            className="flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 group"
          >
            <MapPin className="w-8 h-8 mb-4 text-white/50 group-hover:text-accent transition-colors" />
            <span className="font-medium">Location</span>
            <span className="text-xs text-muted-foreground mt-2 font-mono">SKP → Kamra, Pakistan</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: APPLE_EASE }}
          className="font-mono text-primary text-sm tracking-widest"
        >
          &gt; // READY FOR NEW CHALLENGES_
        </motion.p>
      </div>
    </section>
  );
}
