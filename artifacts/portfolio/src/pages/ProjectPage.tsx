import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SiteHeader, SiteFooter, ProjectVisual } from "./PortfolioHome";
export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p=>p.slug === slug);
  return <div className="portfolio"><SiteHeader/><main className="shell case-study"><Link className="text-link" href="/"> <ArrowLeft size={16}/> Back to selected work</Link>
    {!project ? <><h1>Project not found.</h1><p>Choose a project from the portfolio.</p></> : <>
    <p className="eyebrow case-eyebrow">{project.category}</p><h1>{project.name}<span>.</span></h1><p className="case-intro">{project.summary}</p><div className="button-row">{project.live && <a className="button primary" href={project.live} target="_blank" rel="noopener noreferrer">Visit live website <ArrowUpRight size={17}/></a>}{project.source && <a className="button secondary" href={project.source} target="_blank" rel="noopener noreferrer">Explore the source <ArrowUpRight size={17}/></a>}{project.slug === "tictactoe" && <Link className="button primary" href="/play">Play browser edition <ArrowUpRight size={17}/></Link>}{project.slug === "numzoo" && <a className="button primary" href="mailto:tayyabnaveed13@gmail.com?subject=Tell%20me%20about%20Numzoo">Ask about Numzoo <ArrowUpRight size={17}/></a>}</div><ProjectVisual project={project}/>
    <div className="case-content"><aside><p className="eyebrow">MY ROLE</p><p>{project.role}</p><p className="eyebrow">PROJECT FOCUS</p><div className="tags">{project.stack.map(s=><span key={s}>{s}</span>)}</div></aside><div><h2>The project</h2><p>{project.context}</p><h2>What’s inside</h2><ul>{project.features.map(f=><li key={f}>{f}</li>)}</ul><h2>Why this work matters to me</h2><p>{project.takeaway}</p></div></div></>}
    </main><SiteFooter/></div>;
}
