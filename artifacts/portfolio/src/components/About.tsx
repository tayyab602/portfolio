import { motion } from "framer-motion";
import { Code2, Store, GraduationCap } from "lucide-react";
import {
  VIEWPORT,
  staggerContainer,
  staggerItem,
  slideLeft,
  fadeUp,
  lineReveal,
} from "@/lib/animations";

const aboutCards = [
  {
    icon: GraduationCap,
    title: "Computer Science",
    desc: "Undergraduate at Air University Aerospace and Aviation Campus, Kamra. Building strong foundations in algorithms, data structures, and software engineering.",
    color: "text-primary",
  },
  {
    icon: Code2,
    title: "Developer",
    desc: "Hands-on experience across mobile (Flutter), desktop (Java, C#), backend (Node.js), and databases (MySQL, MongoDB, Firebase). I build things that work.",
    color: "text-primary",
  },
  {
    icon: Store,
    title: "Entrepreneur",
    desc: "Running a WhatsApp-based beauty store — managing inventory, customer relations, and digital marketing. I understand both the technical and business sides.",
    color: "text-primary",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-16 md:mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-primary">/</span> ABOUT ME
          </motion.h2>
          <motion.div variants={lineReveal} className="w-16 h-0.5 bg-primary" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:col-span-5 space-y-5 text-base text-muted-foreground leading-relaxed"
          >
            {[
              <>I'm a CS student at <span className="text-foreground font-semibold">Air University AAC, Kamra</span>. I started learning to code in Fall 2024 and have been building real projects since.</>,
              <>My stack grew semester by semester — from C++ and Java to Flutter, databases, and now backend development with Node.js. I learn by building.</>,
              <>Alongside my studies, I run a WhatsApp-based beauty store back home in SKP. It taught me that software is only useful when it solves real problems.</>,
            ].map((para, i) => (
              <motion.p key={i} variants={slideLeft}>
                {para}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={staggerContainer(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-4"
          >
            {aboutCards.map((card, idx) => (
              <motion.div
                key={card.title}
                variants={staggerItem}
                className={`p-6 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all ${
                  idx === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <card.icon className={`w-6 h-6 mb-3 ${card.color}`} />
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
