import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, GitFork, Users, BookOpen } from "lucide-react";

interface GHStats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
}

function CountUp({ target, duration = 1.4 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{val}</span>;
}

export function GitHubStats() {
  const [stats, setStats] = useState<GHStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/tayyab602")
      .then(r => r.json())
      .then(async user => {
        const reposResp = await fetch("https://api.github.com/users/tayyab602/repos?per_page=100");
        const repos = await reposResp.json();
        const stars = Array.isArray(repos) ? repos.reduce((s: number, r: any) => s + (r.stargazers_count || 0), 0) : 0;
        const forks = Array.isArray(repos) ? repos.reduce((s: number, r: any) => s + (r.forks_count || 0), 0) : 0;
        setStats({
          repos: user.public_repos || 0,
          stars,
          forks,
          followers: user.followers || 0,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const items = stats ? [
    { icon: BookOpen, label: "Repositories", value: stats.repos },
    { icon: Star,     label: "Stars",        value: stats.stars },
    { icon: GitFork,  label: "Forks",        value: stats.forks },
    { icon: Users,    label: "Followers",    value: stats.followers },
  ] : [];

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map(({ icon: Icon, label, value }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
        >
          <Icon className="w-4 h-4 text-primary" />
          <p className="font-black text-2xl tabular-nums">
            <CountUp target={value} />
          </p>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</p>
        </motion.div>
      ))}
    </div>
  );
}
