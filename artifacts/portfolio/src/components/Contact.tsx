import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative bg-card/30 border-t border-white/5">
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6">LET'S BUILD SOMETHING</h2>
          <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto">
            Whether it's a software project, a business opportunity, or just a chat about tech — my inbox is open.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-3 gap-6 mb-16"
        >
          <a 
            href="https://www.linkedin.com/in/tayyab-naveed-akhtar-922721313/" 
            target="_blank" 
            rel="noreferrer"
            className="flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <Linkedin className="w-8 h-8 mb-4 text-white/50 group-hover:text-[#0A66C2] transition-colors" />
            <span className="font-medium">LinkedIn</span>
            <span className="text-xs text-muted-foreground mt-2 font-mono">/tayyab-naveed-akhtar</span>
          </a>

          <a 
            href="mailto:contact@example.com" 
            className="flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 transition-all group"
          >
            <Mail className="w-8 h-8 mb-4 text-white/50 group-hover:text-primary transition-colors" />
            <span className="font-medium">Email</span>
            <span className="text-xs text-muted-foreground mt-2 font-mono">Say hello</span>
          </a>

          <div className="flex flex-col items-center p-8 rounded-2xl bg-white/5 border border-white/10 group">
            <MapPin className="w-8 h-8 mb-4 text-white/50 group-hover:text-accent transition-colors" />
            <span className="font-medium">Location</span>
            <span className="text-xs text-muted-foreground mt-2 font-mono">Kamra, Pakistan</span>
          </div>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-primary text-sm tracking-widest"
        >
          &gt; // READY FOR NEW CHALLENGES_
        </motion.p>
      </div>
    </section>
  );
}
