"use client";

import { motion } from "framer-motion";
// FIX: Added 'Play' to the imports below
import { 
  ArrowRight, Github, Linkedin, Mail, Globe, 
  GraduationCap, Database, Layers, Cpu, Terminal, 
  Zap, Code2, MapPin, ExternalLink, Play 
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

// COMPONENT IMPORTS
import useSound from "./hooks/useSound";
import MatrixRain from "./components/visuals/MatrixRain";
import CreativeName from "./components/visuals/CreativeName";
import DataRunner from "./components/game/DataRunner";
import HudCard from "./components/ui/HudCard";
import ProjectCard from "./components/ui/ProjectCard";
import TerminalModal from "./components/ui/TerminalModal";
import LiveClock from "./components/ui/LiveClock";

export default function Portfolio() {
  const [gameActive, setGameActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Sound Hooks
  const playClick = useSound("/sounds/click.mp3", 0.5);
  const playHover = useSound("/sounds/hover.mp3", 0.1);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        playClick();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playClick]);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-25">
         <MatrixRain isAlert={gameActive} />
      </div>
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-transparent via-[#050505]/90 to-[#050505] pointer-events-none"></div>
      
      {/* --- INTERACTIVE OVERLAYS --- */}
      <DataRunner isActive={gameActive} onClose={() => setGameActive(false)} />
      <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-sm border-b border-white/5 bg-[#050505]/50">
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setTerminalOpen(true)}
          onMouseEnter={playHover}
        >
           <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 transition-colors">
              <Terminal size={16} className="text-zinc-400 group-hover:text-cyan-400"/>
           </div>
           <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 hidden md:block">CMD [CTRL+K]</span>
        </div>

        <Link 
          href="/contact" 
          onClick={playClick}
          className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-cyan-400 transition-colors flex items-center gap-2"
        >
           Hire Me <ArrowRight size={16}/>
        </Link>
      </nav>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-24">

        {/* 1. HERO HEADER */}
        <header className="flex flex-col items-center text-center gap-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-400"
           >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              System Online <div className="h-3 w-px bg-white/10 mx-1"></div> <LiveClock />
           </motion.div>

           <div className="space-y-2">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                 <CreativeName text="MD MOSHIN" />
              </h1>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20">
                 <CreativeName text="KHAN" />
              </h1>
           </div>

           <p className="max-w-xl text-lg text-zinc-400 leading-relaxed">
              Full Stack Engineer & UX Architect. <br/>
              Building <span className="text-white font-medium">high-performance</span> digital experiences with modern stack intelligence.
           </p>
        </header>

        {/* 2. BENTO GRID (The Perfect Alignment) */}
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
           
           {/* Card A: Identity (Span 2) */}
           <div className="col-span-1 md:col-span-2">
              <HudCard 
                 title="Identity" 
                 icon={GraduationCap} 
                 items={["BCA Graduate", "IMS 2024", "Full Stack Developer"]} 
                 align="left" 
                 colorClass="bg-blue-950/10 border-blue-500/20 text-blue-400"
                 className="h-full"
              />
           </div>

           {/* Card B: Location */}
           <div className="col-span-1">
              <HudCard 
                 title="Base" 
                 icon={MapPin} 
                 items={["Odisha, India", "Remote Friendly"]} 
                 align="left" 
                 colorClass="bg-zinc-900/50 border-zinc-500/20 text-zinc-400"
              />
           </div>

           {/* Card C: Game Trigger (Interactive) */}
           <div 
              onClick={() => { playClick(); setGameActive(true); }}
              onMouseEnter={playHover}
              className="col-span-1 cursor-pointer group relative overflow-hidden rounded-3xl bg-red-950/10 border border-red-500/20 p-6 hover:border-red-500/50 transition-all flex flex-col justify-between min-h-[160px]"
           >
              <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/10 transition-colors"></div>
              <div className="relative z-10 p-3 bg-red-500/20 text-red-500 rounded-xl w-fit"><Zap size={20}/></div>
              <div className="relative z-10">
                 <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest">Protocol</h4>
                 <p className="text-xs text-red-400/60 font-mono mt-1 flex items-center gap-2">Start Data Run <Play size={10} className="fill-current"/></p>
              </div>
           </div>

           {/* Card D: Frontend Stack */}
           <div className="col-span-1 md:col-span-2">
              <HudCard 
                 title="Frontend Architecture" 
                 icon={Layers} 
                 items={["React.js", "Next.js 15", "Tailwind CSS", "Framer Motion"]} 
                 align="left" 
                 colorClass="bg-cyan-950/10 border-cyan-500/20 text-cyan-400"
              />
           </div>

           {/* Card E: Backend & AI (Span 2) */}
           <div className="col-span-1 md:col-span-2">
              <HudCard 
                 title="Backend & Intelligence" 
                 icon={Cpu} 
                 items={["Node.js", "PostgreSQL", "Llama-3 (AI)", "Python"]} 
                 align="left" 
                 colorClass="bg-purple-950/10 border-purple-500/20 text-purple-400"
              />
           </div>

        </section>

        {/* 3. SELECTED WORK */}
        <section id="work" className="border-t border-white/10 pt-20">
           <div className="flex items-end justify-between mb-12">
              <div>
                 <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">Selected Works</h2>
                 <p className="text-zinc-500 font-mono text-sm">/// DEPLOYED PROJECTS</p>
              </div>
              <Link href="https://github.com/mkhan0012" target="_blank" className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                 View GitHub <ArrowRight size={14}/>
              </Link>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <ProjectCard 
                 title="CryptoPlace" 
                 image="/crypto-preview.png" 
                 link="https://crypto-place-brown.vercel.app/" 
                 colorClass="text-cyan-400" 
                 borderColor="cyan" 
                 description="Real-time cryptocurrency tracking dashboard featuring live market data, interactive charts, and offline capabilities." 
                 stack={[{ name: "React" }, { name: "Tailwind" }, { name: "API" }]} 
              />
              <ProjectCard 
                 title="Arguely" 
                 image="/arguely-preview.png" 
                 link="https://debate-again.vercel.app/" 
                 colorClass="text-purple-400" 
                 borderColor="purple" 
                 description="AI-powered debate arena. Features an AI Referee for logic checking and automated scoring using Llama-3." 
                 stack={[{ name: "Next.js 15" }, { name: "Llama-3" }, { name: "PostgreSQL" }]} 
              />
           </div>
        </section>

        {/* 4. FOOTER */}
        <footer className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-zinc-700 rounded-full"></div>
              <span>© 2025 Md Moshin Khan</span>
           </div>
           
           <div className="flex gap-6">
              <a href="mailto:moshink0786@gmail.com" className="hover:text-white transition-colors flex items-center gap-2"><Mail size={16}/> Email</a>
              <a href="https://github.com/mkhan0012" target="_blank" className="hover:text-white transition-colors flex items-center gap-2"><Github size={16}/> GitHub</a>
              <a href="https://linkedin.com/in/md-moshin-khan-65510a24b" target="_blank" className="hover:text-white transition-colors flex items-center gap-2"><Linkedin size={16}/> LinkedIn</a>
           </div>
        </footer>

      </div>
    </main>
  );
}