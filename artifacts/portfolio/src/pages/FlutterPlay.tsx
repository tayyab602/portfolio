import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowUpRight, Trophy, RotateCcw, Maximize } from "lucide-react";
import { SiteHeader, SiteFooter } from "./PortfolioHome";
import "@/game/flutter-game.css";
type Entry = {id:string;name:string;points:number;wins:number;draws:number;losses:number};
export default function FlutterPlay() {
  const [difficulty,setDifficulty]=useState('easy');
  const [entries,setEntries]=useState<Entry[]>([]);
  const [status,setStatus]=useState<'loading'|'ready'|'offline'>('loading');
  const [refresh,setRefresh]=useState(0);
  const [gameStatus,setGameStatus]=useState<'loading'|'ready'|'slow'>('loading');
  const [gameKey,setGameKey]=useState(0);
  const frame=useRef<HTMLIFrameElement>(null);
  useEffect(()=>{
    let active=true;
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),15000);
    setStatus('loading');setEntries([]);
    fetch(`/api/game?difficulty=${difficulty}`,{signal:controller.signal}).then(async res=>{
      if(!res.ok)throw new Error('Offline');
      const data=await res.json();
      if(active){setEntries(data.entries);setStatus('ready');}
    }).catch(()=>{if(active)setStatus('offline');});
    return ()=>{active=false;clearTimeout(timer);controller.abort();};
  },[difficulty,refresh]);
  useEffect(()=>{
    setGameStatus('loading');
    const timer=setTimeout(()=>setGameStatus(s=>s==='ready' ? s : 'slow'),45000);
    function receive(event:MessageEvent){if(event.origin===window.location.origin && event.source===frame.current?.contentWindow && event.data?.type==='tic-tac-toe-ready'){clearTimeout(timer);setGameStatus('ready');}}
    window.addEventListener('message',receive);
    return ()=>{clearTimeout(timer);window.removeEventListener('message',receive);};
  },[gameKey]);
  return <div className="portfolio"><SiteHeader/><main className="shell flutter-play"><Link href="/" className="text-link"><ArrowLeft size={16}/> Back to the portfolio</Link><div className="flutter-title"><div><p className="eyebrow">MY FLUTTER GAME. RIGHT HERE IN YOUR BROWSER.</p><h1>Tic Tac Toe <em>Pro.</em></h1><p>Play a friend. Challenge the AI. Or take five ranked rounds and leave your mark.</p></div><a className="text-link" href="https://github.com/tayyab602/tictactoe-pro-ultimate" target="_blank" rel="noopener noreferrer">View original source <ArrowUpRight size={17}/></a></div>
    <div className="game-toolbar"><span>Original Flutter app · Web build</span><button className="text-link plain-button" onClick={()=>{void frame.current?.requestFullscreen?.().catch(()=>window.open('/games/tictactoe/','_blank','noopener,noreferrer'));}}><Maximize size={15}/> Full screen</button></div>
    <div className="flutter-embed"><iframe key={gameKey} ref={frame} src="/games/tictactoe/" title="Tic Tac Toe Pro — Tayyab’s original Flutter game" allow="fullscreen" allowFullScreen/>{gameStatus!=='ready' && <div className="game-loading" role="status"><span className="loading-mark" aria-hidden="true">× ○</span><h2>{gameStatus==='slow' ? 'The game is taking a little longer.' : 'Setting up the board…'}</h2><p>{gameStatus==='slow' ? 'Try opening the game directly or reloading it.' : 'Loading the Flutter game. The first visit may take a moment.'}</p>{gameStatus==='slow' && <div className="button-row"><button className="button primary" onClick={()=>setGameKey(n=>n+1)}>Reload game</button><a className="text-link" href="/games/tictactoe/" target="_blank" rel="noopener noreferrer">Open game <ArrowUpRight size={16}/></a></div>}</div>}</div>
    <p className="game-help">Use <strong>LAUNCH GAME</strong> for casual play. For the leaderboard, choose <strong>PvE</strong>, pick a difficulty, and select <strong>RANKED CHALLENGE</strong>.</p>
    <section className="ranked-layout" aria-label="Leaderboard and challenge rules"><div className="leaderboard-panel"><div className="leaderboard-heading"><div><p className="eyebrow">LEAVE YOUR MARK</p><h2>The leaderboard</h2></div><Trophy size={27}/></div><div className="rank-controls"><label>Difficulty <select value={difficulty} onChange={e=>setDifficulty(e.target.value)}>{['easy','medium','hard'].map(d=><option key={d} value={d}>{d[0].toUpperCase()+d.slice(1)}</option>)}</select></label><button className="text-link plain-button" onClick={()=>setRefresh(n=>n+1)} disabled={status==='loading'}><RotateCcw size={14}/> Refresh scores</button></div><div className="leaderboard-state" aria-live="polite">{status==='loading' ? <p>Loading scores…</p> : status==='offline' ? <div className="empty-board"><h3>The board is taking a break.</h3><p>Ranked scores are unavailable right now. You can still play the original casual game above.</p></div> : !entries.length ? <div className="empty-board"><h3>The first spot could be yours.</h3><p>Finish a ranked {difficulty} challenge, then choose Save score.</p></div> : <ol className="score-list">{entries.map((entry,i)=><li key={entry.id}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{entry.name}</strong><small>{entry.wins}W · {entry.draws}D · {entry.losses}L</small></div><b>{entry.points}<small> pts</small></b></li>)}</ol>}</div></div><aside className="ranked-rules"><p className="eyebrow">A LEVEL PLAYING FIELD</p><h2>Five rounds.<br/>Make them count.</h2><div className="point-guide"><span><strong>+3</strong>Win</span><span><strong>+1</strong>Draw</span><span><strong>0</strong>Loss</span></div><p>Ranked play uses a 3×3 board, no hints, and no turn timer. You play X. The first move alternates each round.</p><p>Each difficulty has a separate top 20. Equal scores are ordered by earliest submission. Challenges expire after two hours.</p><p>Your display name is optional and public; names aren’t verified accounts. Refresh the board after saving.</p><Link className="text-link" href="/projects/tictactoe">Read about this project <ArrowUpRight size={16}/></Link></aside></section>
    </main><SiteFooter/></div>;
}
