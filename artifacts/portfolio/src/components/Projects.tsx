import { motion } from "framer-motion";
import { ExternalLink, Github, ShoppingBag } from "lucide-react";

const projects = [
  {
    title: "WhatsApp Beauty Store",
    type: "Business & Commerce",
    description: "A fully operational e-commerce venture run primarily through WhatsApp. Handled product sourcing, customer relations, order fulfillment, and marketing. A real-world lesson in customer behavior and business operations.",
    tech: ["WhatsApp Business", "Social Media Marketing", "Inventory Management", "Logistics"],
    icon: ShoppingBag,
    color: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/30"
  },
  {
    title: "Automated Inventory Tracker",
    type: "Software Project",
    description: "Built a custom dashboard to track inventory levels for the beauty store, replacing manual spreadsheets. Integrates sales data and provides low-stock alerts.",
    tech: ["React", "Node.js", "Express", "PostgreSQL"],
    icon: ExternalLink,
    color: "from-primary/20 to-blue-600/20",
    border: "border-primary/30"
  },
  {
    title: "University Portal Scraper",
    type: "Tool",
    description: "A Python script that securely authenticates with the university portal, scrapes new result postings, and sends automated notifications to students.",
    tech: ["Python", "BeautifulSoup", "Selenium", "Telegram API"],
    icon: Github,
    color: "from-accent/20 to-indigo-600/20",
    border: "border-accent/30"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-4"><span className="text-primary">/</span> FEATURED WORK</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-transparent" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-card border ${project.border} overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <span className="font-mono text-sm tracking-wider text-muted-foreground">{project.type}</span>
                  <project.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-white/5 rounded-full text-xs font-mono text-white/70">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
