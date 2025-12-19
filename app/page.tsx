"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Github, Linkedin, Mail, GraduationCap, Layers, Cpu, 
  Zap, MapPin, ExternalLink, Play, Command, BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// COMPONENT IMPORTS
import CreativeName from "./components/visuals/CreativeName";
import DataRunner from "./components/game/DataRunner";
import SpotlightCard from "./components/ui/SpotlightCard";
import TerminalModal from "./components/ui/TerminalModal";
import LiveClock from "./components/ui/LiveClock";
import Cursor from "./components/ui/Cursor";
import SkillPill from "./components/ui/SkillPill";
import CyberBackground from "./components/visuals/CyberBackground";
import BootScreen from "./components/visuals/BootScreen";
import SystemMonitor from "./components/visuals/SystemMonitor";
import ActivityGraph from "./components/visuals/ActivityGraph";

export default function Portfolio() {
  const [gameActive, setGameActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isBooted, setIsBooted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <BootScreen onComplete={() => setIsBooted(true)} />

      <AnimatePresence>
        {isBooted && (
          <motion.main 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1 }}
            className="min-h-screen text-white font-sans selection:bg-green-500/30 overflow-x-hidden relative cursor-none md:cursor-auto"
          >
            <Cursor />
            <CyberBackground />
            
            <SystemMonitor />

            <DataRunner isActive={gameActive} onClose={() => setGameActive(false)} />
            <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-[#030303]/40">
              <div 
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => setTerminalOpen(true)}
              >
                 <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-green-400/50 transition-colors">
                    <Command size={18} className="text-zinc-400 group-hover:text-green-400"/>
                 </div>
                 <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 hidden md:block tracking-widest">COMMAND MODE</span>
              </div>
              <Link href="/contact" className="px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-105 hover:bg-green-400 transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                 Hire Me <ArrowRight size={16}/>
              </Link>
            </nav>

            <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-24 xl:pr-72">

              {/* HERO HEADER */}
              <header className="flex flex-col items-center text-center gap-8">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }} 
                   className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 backdrop-blur-md shadow-lg"
                 >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online <div className="h-4 w-px bg-white/20"></div> <LiveClock />
                 </motion.div>

                 <div className="space-y-[-1rem] md:space-y-[-2rem] relative z-20">
                    <h1 className="text-[12vw] md:text-[8rem] font-black tracking-tighter text-white">
                       <CreativeName text="MD MOSHIN" />
                    </h1>
                    <h1 className="text-[12vw] md:text-[8rem] font-black tracking-tighter text-green-500 drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">
                       <CreativeName text="KHAN" />
                    </h1>
                 </div>

                 <p className="max-w-xl text-lg text-zinc-300 leading-relaxed font-light">
                    Full Stack Engineer & UX Architect. <br/>
                    Building <span className="text-green-400 font-medium border-b border-green-500/30">digital ecosystems</span> that feel alive.
                 </p>
              </header>

              {/* DRAGGABLE BENTO GRID */}
              <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 perspective-1000">
                 
                 <div className="col-span-1 md:col-span-2">
                    <SpotlightCard className="h-full p-8 flex flex-col justify-between" spotlightColor="rgba(34, 197, 94, 0.2)">
                       <div className="flex justify-between items-start">
                          <div className="p-3 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><GraduationCap size={24}/></div>
                          <span className="text-xs font-mono text-zinc-500">ID_CARD_01</span>
                       </div>
                       <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Full Stack Engineer</h3>
                          <div className="flex flex-wrap gap-2">
                             <SkillPill item="BCA Graduate" />
                             <SkillPill item="IMS 2024" />
                             <SkillPill item="UX Certified" />
                          </div>
                       </div>
                    </SpotlightCard>
                 </div>

                 <SpotlightCard className="p-8 flex flex-col justify-between h-full" spotlightColor="rgba(6, 182, 212, 0.2)">
                    <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit border border-cyan-500/20"><MapPin size={24}/></div>
                    <div>
                       <h3 className="text-xl font-bold text-white">Odisha, India</h3>
                       <p className="text-xs text-zinc-400 mt-1">Remote Available</p>
                    </div>
                 </SpotlightCard>

                 <div onClick={() => setGameActive(true)} className="cursor-pointer h-full">
                    <SpotlightCard className="p-8 flex flex-col justify-between h-full group" spotlightColor="rgba(239, 68, 68, 0.3)">
                       <div className="flex justify-between items-start">
                          <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20"><Zap size={24}/></div>
                          <Play size={20} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">INITIALIZE</h3>
                          <p className="text-xs text-zinc-500 mt-1">Start Data_Runner Protocol</p>
                       </div>
                    </SpotlightCard>
                 </div>

                 <div className="col-span-1 md:col-span-3 lg:col-span-4">
                    <SpotlightCard className="p-8" spotlightColor="rgba(168, 85, 247, 0.15)">
                       <div className="flex items-center gap-3 mb-6">
                          <Layers size={20} className="text-purple-400"/>
                          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Technical Arsenal</h3>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          <div className="space-y-3">
                             <h4 className="text-xs font-bold text-white border-l-2 border-cyan-500 pl-3">FRONTEND</h4>
                             <div className="flex flex-wrap gap-2">
                                {["React.js", "Next.js 15", "Tailwind", "Framer Motion"].map(s => (
                                   <span key={s} className="px-2 py-1 text-[10px] bg-white/5 rounded text-zinc-400 hover:text-white transition-colors cursor-default border border-white/5">{s}</span>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-xs font-bold text-white border-l-2 border-green-500 pl-3">BACKEND</h4>
                             <div className="flex flex-wrap gap-2">
                                {["Node.js", "PostgreSQL", "MongoDB", "Prisma ORM"].map(s => (
                                   <span key={s} className="px-2 py-1 text-[10px] bg-white/5 rounded text-zinc-400 hover:text-white transition-colors cursor-default border border-white/5">{s}</span>
                                ))}
                             </div>
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-xs font-bold text-white border-l-2 border-purple-500 pl-3">INTELLIGENCE</h4>
                             <div className="flex flex-wrap gap-2">
                                {["Python", "Llama-3", "Groq Cloud", "TypeScript"].map(s => (
                                   <span key={s} className="px-2 py-1 text-[10px] bg-white/5 rounded text-zinc-400 hover:text-white transition-colors cursor-default border border-white/5">{s}</span>
                                ))}
                             </div>
                          </div>
                       </div>
                    </SpotlightCard>
                 </div>
              </section>

              {/* ACTIVITY PROTOCOL */}
              <section className="space-y-6">
                 <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <BarChart3 size={16}/> Contribution Matrix
                    </h3>
                    <div className="text-xs font-mono text-zinc-600">LAST 365 CYCLES</div>
                 </div>
                 <SpotlightCard className="p-6 md:p-8" spotlightColor="rgba(34, 197, 94, 0.1)">
                     <ActivityGraph />
                     <div className="flex justify-between mt-4 text-[10px] text-zinc-500 font-mono uppercase">
                        <span>Initiation</span>
                        <span>Current Status: Active</span>
                     </div>
                 </SpotlightCard>
              </section>

              {/* PROJECTS */}
              <section id="work" className="space-y-12">
                 <div className="flex items-end justify-between border-b border-white/10 pb-6">
                    <div>
                       <h2 className="text-5xl font-bold text-white mb-2">Deployments</h2>
                       <p className="text-zinc-500 font-mono text-sm">/// CASE STUDIES</p>
                    </div>
                    <Link href="https://github.com/mkhan0012" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
                       GITHUB REPO <ExternalLink size={14}/>
                    </Link>
                 </div>

                 <div className="grid grid-cols-1 gap-12">
                    <SpotlightCard className="p-0 overflow-hidden group" spotlightColor="rgba(6, 182, 212, 0.2)" drag={false}>
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                             <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Fintech Dashboard</span>
                             </div>
                             <h3 className="text-4xl font-black text-white">CryptoPlace</h3>
                             <p className="text-zinc-400 leading-relaxed">
                                A real-time cryptocurrency tracking engine with live WebSocket data updates and interactive financial charting.
                             </p>
                             <a href="https://crypto-place-brown.vercel.app/" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-400 transition-colors mt-4">
                                LIVE PREVIEW <ArrowRight size={16}/>
                             </a>
                          </div>
                          <div className="relative h-64 lg:h-auto bg-zinc-900 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/5">
                             <Image src="/crypto-preview.png" alt="Crypto" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                          </div>
                       </div>
                    </SpotlightCard>
                    
                    <SpotlightCard className="p-0 overflow-hidden group" spotlightColor="rgba(168, 85, 247, 0.2)" drag={false}>
                       <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                          <div className="order-2 lg:order-1 relative h-64 lg:h-auto bg-zinc-900 overflow-hidden border-t lg:border-t-0 lg:border-r border-white/5">
                             <Image src="/arguely-preview.png" alt="Arguely" fill className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                          </div>
                          <div className="order-1 lg:order-2 p-8 md:p-12 flex flex-col justify-center space-y-6">
                             <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">AI Platform</span>
                             </div>
                             <h3 className="text-4xl font-black text-white">Arguely</h3>
                             <p className="text-zinc-400 leading-relaxed">
                                An automated debate arena powered by Llama-3, featuring an AI Referee for logic checking and scoring.
                             </p>
                             <a href="https://debate-again.vercel.app/" target="_blank" className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-purple-400 transition-colors mt-4">
                                LIVE PREVIEW <ArrowRight size={16}/>
                             </a>
                          </div>
                       </div>
                    </SpotlightCard>
                 </div>
              </section>

              {/* FOOTER */}
              <footer className="border-t border-white/10 pt-12 pb-20 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-center md:text-left">
                    <h4 className="font-bold text-white text-lg">Md Moshin Khan</h4>
                    <p className="text-zinc-500 text-xs font-mono mt-1">Based in Odisha, India.</p>
                 </div>
                 <div className="flex gap-4">
                    <Link href="mailto:moshink0786@gmail.com" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all border border-white/5"><Mail size={20}/></Link>
                    <Link href="https://github.com/mkhan0012" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all border border-white/5"><Github size={20}/></Link>
                    <Link href="https://linkedin.com/in/md-moshin-khan-65510a24b" target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all border border-white/5"><Linkedin size={20}/></Link>
                 </div>
              </footer>

            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}