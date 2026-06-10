import { motion } from "framer-motion";
import { Code2, Store, GraduationCap } from "lucide-react";

const aboutCards = [
  {
    icon: GraduationCap,
    title: "Computer Science",
    desc: "Undergraduate student at Air University Aerospace and Aviation Campus, Kamra. Deep diving into algorithms, system architecture, and modern software development.",
    color: "text-primary"
  },
  {
    icon: Code2,
    title: "Full-Stack Dev",
    desc: "Passionate about building performant, scalable applications. I write clean code that solves real problems, focusing on robust architectures and polished user experiences.",
    color: "text-accent"
  },
  {
    icon: Store,
    title: "Entrepreneur",
    desc: "Running a successful WhatsApp-based beauty store. Managing inventory, customer relations, and digital marketing. I understand business needs as well as technical constraints.",
    color: "text-pink-500"
  }
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4"><span className="text-primary">/</span> ABOUT ME</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I don't just write code; I build solutions. As a developer who also runs a business, I bring a unique perspective to software engineering. I understand that technology is a tool to create value.
            </p>
            <p>
              My journey started with a curiosity about how things work under the hood. Today, I'm pursuing my CS degree at <span className="text-foreground font-semibold">Air University AAC</span> while balancing my entrepreneurial ventures.
            </p>
            <p>
              Whether it's optimizing a database query, designing a modern frontend, or fulfilling orders for my store, I operate with the same conviction: do it well, or don't do it at all.
            </p>
          </motion.div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {aboutCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-colors ${idx === 2 ? 'sm:col-span-2' : ''}`}
              >
                <card.icon className={`w-8 h-8 mb-4 ${card.color}`} />
                <h3 className="text-xl font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
