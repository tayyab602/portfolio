import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  APPLE_EASE,
  VIEWPORT,
  staggerContainer,
  staggerItem,
  fadeUp,
} from "@/lib/animations";

const contactLinks = [
  {
    href: "https://www.linkedin.com/in/tayyab-naveed-akhtar-922721313/",
    icon: Linkedin,
    label: "LinkedIn",
    sub: "/tayyab-naveed-akhtar",
    iconColor: "text-[#0A66C2]",
    borderHover: "hover:border-[#0A66C2]/50",
    isExternal: true,
  },
  {
    href: "mailto:tayyabnaveed13@gmail.com",
    icon: Mail,
    label: "Email",
    sub: "tayyabnaveed13@gmail.com",
    iconColor: "text-primary",
    borderHover: "hover:border-primary/50",
    isExternal: false,
  },
  {
    href: "https://wa.me/c/923350602602",
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "+92 335 060 2602",
    iconColor: "text-[#25D366]",
    borderHover: "hover:border-[#25D366]/50",
    isExternal: true,
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-muted/20 border-t border-border">
      <div className="container px-4 mx-auto max-w-4xl text-center">

        {/* Heading */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-14"
        >
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-5">
            LET'S BUILD SOMETHING
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether it's a software project, a business opportunity, or just a chat about tech — reach out any time.
          </motion.p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          {contactLinks.map(({ href, icon: Icon, label, sub, iconColor, borderHover, isExternal }) => (
            <motion.a
              key={label}
              variants={staggerItem}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              whileHover={{ y: -4, transition: { duration: 0.25, ease: APPLE_EASE } }}
              className={`flex flex-col items-center p-7 rounded-xl bg-card border border-border ${borderHover} hover:shadow-md transition-all group cursor-pointer`}
            >
              {/* Icon in a visible container */}
              <div className={`w-12 h-12 mb-4 rounded-xl border border-border bg-muted flex items-center justify-center group-hover:border-current transition-colors ${iconColor}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-semibold text-sm">{label}</span>
              <span className="text-xs text-muted-foreground mt-1.5 font-mono break-all">{sub}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* Location — blue accent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.55, ease: APPLE_EASE, delay: 0.3 }}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border bg-card"
        >
          <MapPin className="w-4 h-4 text-[#0A66C2]" />
          <span className="text-sm font-medium text-[#0A66C2]">SKP → Kamra, Pakistan</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: APPLE_EASE, delay: 0.4 }}
          className="font-mono text-primary text-sm tracking-widest mt-14"
        >
          &gt; // READY FOR NEW CHALLENGES_
        </motion.p>
      </div>
    </section>
  );
}
