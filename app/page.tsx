"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Terminal, Cpu, Zap, FolderOpen, User, X, ExternalLink, Github, Mail, Globe, Code, Eye, Activity, Server, Database, Network, Settings as SettingsIcon } from "lucide-react";
import Link from "next/link";

// COMPONENT IMPORTS
import CyberBackground from "./components/visuals/CyberBackground";
import InteractiveTerminal from "./components/ui/InteractiveTerminal";
import ProjectCard from "./components/ui/ProjectCard";
import GlitchText from "./components/ui/GlitchText";
import FluxGrid from "./components/visuals/FluxGrid"; 
import DashboardWidget from "./components/ui/DashboardWidget";
import useSciFiSound from "./hooks/useSciFiSound";
import CodeWindow from "./components/ui/CodeWindow";
import TechTicker from "./components/ui/TechTicker";
import LogStream from "./components/ui/LogStream";
import SkillGraph from "./components/visuals/SkillGraph";
import CommandPalette from "./components/ui/CommandPalette";
import ContactForm from "./contact/page"; 
import SystemSettings from "./components/ui/SystemSettings"; 
import MatrixRain from "./components/visuals/MatrixRain";
import useKonamiCode from "./hooks/useKonamiCode";
import SystemToast, { Toast } from "./components/ui/SystemToast"; 
import Typewriter from "./components/ui/Typewriter";
import MagneticButton from "./components/ui/MagneticButton";
import Radar from "./components/visuals/Radar";
import EyeTracker from "./components/visuals/EyeTracker"; // <--- NEW IMPORT

// --- DATA ---
const PROJECTS = [
  {
    title: "CryptoPlace",
    description: "High-frequency crypto tracking engine. Features real-time WebSocket data streams.",
    link: "https://crypto-place-brown.vercel.app/",
    image: "/crypto-preview.png",
    stack: ["React", "WebSocket", "Tailwind"],
    code: `export const useCryptoStream = (currencyPair: string) => {
  const [price, setPrice] = useState<number>(0);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    socket.current = new WebSocket('wss://stream.binance.com:9443/ws');
    socket.current.onmessage = (event) => {
      const { p } = JSON.parse(event.data);
      setPrice(parseFloat(p));
    };
    return () => socket.current?.close();
  }, [currencyPair]);
  return { price };
};`
  },
  {
    title: "Arguely",
    description: "AI-driven debate arena. Utilizes Llama-3 to referee logic and scoring in real-time.",
    link: "https://debate-again.vercel.app/",
    image: "/Arguely.png",
    stack: ["Next.js", "Llama-3", "Groq"],
    code: `export async function adjudicateRound(transcript: Message[]) {
  const llm = new ChatGroq({ model: "llama3-70b-8192" });
  const analysis = await llm.invoke(transcript);
  return { 
    score: calculateScore(analysis), 
    winner: determineWinner(analysis) 
  };
}`
  },
  {
    title: "Framework",
    description: "Experimental web infrastructure designed for component modularity and instant scalability.",
    link: "https://framework-seven-steel.vercel.app/",
    image: "/framework.png",
    stack: ["Architecture", "System Design"],
    code: `class ComponentRegistry {
  private components: Map<string, Component> = new Map();
  register(name: string, c: Component) { this.components.set(name, c); }
  hydrate(root: HTMLElement) { 
    root.querySelectorAll('[data-comp]').forEach(el => this.mount(el));
  }
}`
  },
  {
    title: "Focus.bits",
    description: "Gamified productivity engine with retro arcade integration.",
    link: "https://timer-rho-khaki.vercel.app/",
    image: "/timer.png",
    stack: ["React", "Game Dev"],
    code: `const calculateLevel = (totalXP: number) => Math.floor(Math.sqrt(totalXP / 100));

export const useProductivity = () => {
  const [xp, setXp] = useState(0);
  return { level: calculateLevel(xp) };
};`
  },
  {
    title: "Truth is Optional",
    description: "Data-driven framework exploring perception programmability.",
    link: "https://truthis-optional.vercel.app/",
    image: "/truth.png",
    stack: ["Data Viz", "Essay"],
    code: `function distortData(dataset: Data[], bias: number) {
  return dataset.map(d => ({
    ...d, 
    value: d.value * (1 + (d.sentiment * bias))
  }));
}`
  }
];

const ContentFade = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.4 }}
    className="h-full w-full"
  >
    {children}
  </motion.div>
);

export default function Portfolio() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false); 
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview"); 
  
  const [toasts, setToasts] = useState<Toast[]>([]);

  const { playSound } = useSciFiSound();
  const { triggered: isMatrixMode, setTriggered: setMatrixMode } = useKonamiCode();

  // --- TOAST LOGIC ---
  const addToast = useCallback((message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, message, type }]);
    playSound(type === "error" ? "click" : "open");

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, [playSound]);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleOpen = (id: string) => {
    playSound("open");
    setSelectedId(id);
    setViewMode("preview");
  };

  const handleTerminal = () => {
    playSound("click");
    setTerminalOpen(true);
  };

  const handleTerminalCommand = (cmd: string) => {
    if (cmd === "matrix") {
        setMatrixMode(true);
        addToast("Matrix Protocol Initiated.", "info");
    }
  };

  useEffect(() => {
    if (isMatrixMode) {
      document.documentElement.style.setProperty("--accent", "#00FF00"); 
      playSound("open");
    } else {
      document.documentElement.style.setProperty("--accent", "#06B6D4"); 
    }
  }, [isMatrixMode, playSound]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="h-screen w-full bg-[#020408] text-[#E2E8F0] overflow-hidden relative selection:bg-[var(--accent)] selection:text-[#020408] font-sans">
      
      {/* 1. BACKGROUND SWAP LOGIC */}
      <AnimatePresence mode="wait">
        {isMatrixMode ? (
          <motion.div 
            key="matrix"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <MatrixRain />
          </motion.div>
        ) : (
          <motion.div 
            key="cyber"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <CyberBackground />
            
            {/* PHYSICS GRID BACKGROUND */}
            <FluxGrid /> 
            
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-[10] bg-[radial-gradient(circle_at_center,transparent_40%,#020408_100%)]"></div>

      {/* --- NOTIFICATION LAYER --- */}
      <SystemToast toasts={toasts} removeToast={removeToast} />

      {/* --- FLOATING SETTINGS BUTTON (MAGNETIC) --- */}
      <MagneticButton className="fixed top-6 right-6 z-[80]">
        <button 
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="p-3 rounded-full bg-[#0F172A]/80 border border-[#1E293B] text-[#94A3B8] hover:text-[var(--accent)] hover:border-[var(--accent)] hover:rotate-90 transition-all duration-500"
        >
          <SettingsIcon size={20} />
        </button>
      </MagneticButton>

      {/* MODALS */}
      <AnimatePresence>
        {terminalOpen && (
          <InteractiveTerminal 
            onClose={() => setTerminalOpen(false)} 
            onCommand={handleTerminalCommand} 
          />
        )}
      </AnimatePresence>
      
      <CommandPalette 
        isOpen={paletteOpen} 
        onClose={() => setPaletteOpen(false)} 
        onNavigate={handleOpen} 
        onToast={addToast} 
      />

      <SystemSettings 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* GOD MODE EXIT BUTTON */}
      <AnimatePresence>
        {isMatrixMode && (
          <motion.button
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            onClick={() => setMatrixMode(false)}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-2 bg-red-500/20 border border-red-500 text-red-500 font-mono text-xs font-bold rounded hover:bg-red-500 hover:text-black transition-all"
          >
            DISABLE_GOD_MODE
          </motion.button>
        )}
      </AnimatePresence>

      {/* --- DASHBOARD GRID --- */}
      <div className="relative z-20 h-full max-w-7xl mx-auto p-6 pb-24 grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 perspective-1000">
        
        {/* 1. IDENTITY WITH EYE TRACKER */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-2 md:row-span-2 contents">
          <DashboardWidget 
            title="IDENTITY_CORE" 
            icon={User} 
            layoutId="identity"
            className="md:col-span-2 md:row-span-2 justify-end relative overflow-hidden" 
            onClick={() => handleOpen('identity')}
          >
            {/* NEW: EYE TRACKER POSITIONED IN BACKGROUND OR CORNER */}
            <div className="absolute top-6 right-6 pointer-events-none opacity-50 md:opacity-100">
               <EyeTracker />
            </div>

            <div className="mt-auto space-y-4 pointer-events-none relative z-10">
               <h2 className="text-xs font-mono text-[var(--accent)] tracking-[0.2em] mb-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                 STATUS: ONLINE
               </h2>
               <div className="text-5xl lg:text-7xl font-black text-[#E2E8F0] tracking-tighter leading-[0.85] pointer-events-auto mix-blend-screen">
                 <GlitchText text="MD MOSHIN" /> <br /> 
                 <GlitchText text="KHAN" />
               </div>
               <div className="flex items-center gap-4 mt-6 text-[#94A3B8]">
                  {/* TYPEWRITER EFFECT */}
                  <div className="text-sm font-light leading-relaxed border-l-2 border-[#1E293B] pl-4 max-w-md min-h-[60px] flex flex-col justify-center">
                    <Typewriter text="Full Stack Architect." delay={500} className="text-[#E2E8F0] font-bold block" />
                    <Typewriter text="Designing resilient systems." delay={1500} speed={30} />
                  </div>
                  
                  <div className="hidden lg:flex flex-col gap-1">
                     <span className="text-[9px] font-mono border border-[#1E293B] px-2 py-1 rounded bg-[#020408]/50 text-[var(--accent)]">CMD+K</span>
                     <span className="text-[9px] font-mono text-[#94A3B8] opacity-50">TO NAVIGATE</span>
                  </div>
               </div>
            </div>
          </DashboardWidget>
        </div>

        {/* 2. DEPLOYMENTS */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-1 md:row-span-2 contents">
          <DashboardWidget 
            title="DEPLOYMENTS" 
            icon={FolderOpen} 
            layoutId="projects"
            className="md:col-span-1 md:row-span-2"
            onClick={() => handleOpen('projects')}
          >
            <div className="mt-4 space-y-0 flex-grow overflow-y-auto custom-scrollbar relative pointer-events-auto pr-1">
              {PROJECTS.map((p, i) => (
                <div key={i} className="flex flex-col py-3 border-b border-[#1E293B]/50 last:border-0 opacity-80 hover:opacity-100 transition-all cursor-pointer group/item">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs text-[#E2E8F0] group-hover/item:text-[var(--accent)] transition-colors font-bold">{p.title}</span>
                    <span className="text-[var(--accent)] text-[10px] opacity-0 group-hover/item:opacity-100 transition-opacity">↗</span>
                  </div>
                  <div className="text-[10px] text-[#94A3B8] truncate">{p.description}</div>
                </div>
              ))}
            </div>
            <div className="pt-4 flex justify-between items-end border-t border-[#1E293B]">
               <span className="text-[10px] text-[#94A3B8] font-mono">ACTIVE_NODES</span>
               <span className="text-xl font-bold text-[var(--accent)] font-mono">{PROJECTS.length.toString().padStart(2, '0')}</span>
            </div>
          </DashboardWidget>
        </div>

        {/* 3. SYS STATUS */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-1 md:row-span-1 contents">
          <DashboardWidget title="TELEMETRY" icon={Activity} layoutId="system" className="md:col-span-1 md:row-span-1">
            <div className="flex flex-col h-full pointer-events-none overflow-hidden relative">
               <div className="absolute top-0 right-0 text-[9px] font-mono text-[var(--accent)] opacity-70">LIVE_FEED</div>
               <LogStream />
            </div>
          </DashboardWidget>
        </div>

        {/* 4. TERMINAL */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-1 md:row-span-1 contents">
          <DashboardWidget 
            title="TERMINAL" 
            icon={Terminal} 
            layoutId="terminal"
            className="md:col-span-1 md:row-span-1 group"
            onClick={handleTerminal}
          >
             <div className="flex flex-col h-full justify-between">
               <div className="font-mono text-[10px] opacity-70 space-y-1 text-[var(--accent)] pointer-events-none">
                 <p>&gt; sys_integrity_check</p>
                 <p>&gt; <span className="text-[#34D399]">OK</span></p>
                 <p>&gt; <span className="animate-pulse bg-[var(--accent)] text-[#020408] px-1">READY</span></p>
               </div>
               <div className="w-full py-2 bg-[#1E293B]/30 border border-[#1E293B] rounded flex items-center justify-center gap-2 text-xs font-bold text-[#94A3B8] group-hover:text-[var(--accent)] group-hover:border-[var(--accent)]/50 transition-all pointer-events-none">
                  <Terminal size={12}/>
                  <span>LAUNCH SHELL</span>
               </div>
             </div>
          </DashboardWidget>
        </div>

        {/* 5. ARSENAL */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-3 md:row-span-1 contents">
          <DashboardWidget title="NEURAL_ARCHITECTURE" icon={Network} layoutId="skills" className="md:col-span-3 md:row-span-1" onClick={() => handleOpen('skills')}>
             <div className="w-full h-full pointer-events-none flex items-center gap-8 relative overflow-hidden">
                <div className="w-1/3 h-full border-r border-[#1E293B] pr-4 flex flex-col justify-center">
                   <div className="text-[10px] text-[#94A3B8] font-mono mb-2">PRIMARY_STACK</div>
                   <div className="flex flex-wrap gap-2">
                      {["Next.js", "TypeScript", "Node.js", "PostgreSQL"].map(s => (
                        <span key={s} className="px-2 py-1 bg-[#020408] border border-[#1E293B] text-[#E2E8F0] text-[10px] rounded">{s}</span>
                      ))}
                   </div>
                </div>
                <div className="flex-1 h-full relative">
                   <div className="absolute top-0 right-0 text-[9px] font-mono text-[var(--accent)] opacity-50">RELATIONSHIP_GRAPH_V1</div>
                   <SkillGraph />
                </div>
             </div>
          </DashboardWidget>
        </div>

        {/* 6. COORDINATES / RADAR / CONTACT (MAGNETIC) */}
        <div onMouseEnter={() => playSound("hover")} className="md:col-span-1 md:row-span-1 contents">
          <DashboardWidget title="ACTIVE_SCAN" icon={MapPin} layoutId="contact" className="md:col-span-1 md:row-span-1 p-0 overflow-hidden relative" onClick={() => handleOpen('contact')}>
             
             {/* THE RADAR VISUAL */}
             <div className="absolute inset-0 opacity-50 pointer-events-none">
                <Radar />
             </div>

             <div className="absolute bottom-4 left-6 right-6 z-10 pointer-events-none">
               <div className="flex justify-between items-end">
                  <div>
                    <div className="text-xl font-bold text-[#E2E8F0] tracking-tight">ODISHA</div>
                    <div className="text-[10px] font-mono text-[#94A3B8]">INDIA</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[var(--accent)]">20.95° N</div>
                    <div className="text-[10px] font-mono text-[var(--accent)]">85.09° E</div>
                  </div>
               </div>
               
               {/* MAGNETIC CONTACT BUTTON */}
               <div className="pointer-events-auto mt-2">
                 <MagneticButton onClick={() => handleOpen('contact')}>
                    <div className="w-full py-2 bg-[var(--accent)] text-[#020408] rounded font-bold text-xs flex items-center justify-center gap-2 group-hover:brightness-110 transition-all shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                       <Mail size={14} /> INITIALIZE_HANDSHAKE
                    </div>
                 </MagneticButton>
               </div>
             </div>
          </DashboardWidget>
        </div>

      </div>

      {/* --- FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-[#020408]/95 backdrop-blur-md border-t border-[#1E293B]">
         <TechTicker />
         <div className="flex justify-between items-center px-6 py-1.5 text-[10px] font-mono text-[#94A3B8]">
            <div className="flex gap-6">
               <span className="flex items-center gap-1.5"><Server size={10} className="text-[var(--accent)]"/> REGION: AP-SOUTH-1</span>
               <span className="flex items-center gap-1.5"><Activity size={10} className="text-green-500"/> LATENCY: 24ms</span>
               <span className="flex items-center gap-1.5"><Database size={10} className="text-yellow-500"/> DB: CONNECTED</span>
            </div>
            <div className="text-[var(--accent)] opacity-80">MK_OS V.2.0.4 [STABLE]</div>
         </div>
      </div>

      {/* --- EXPANDED OVERLAY --- */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#020408]/80 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedId(null)}
          >
            <motion.div 
              layoutId={selectedId}
              transition={{ type: "spring", stiffness: 90, damping: 15 }}
              className="w-full max-w-6xl h-[85vh] bg-[#0F172A] border border-[var(--accent)] rounded-3xl overflow-hidden flex flex-col shadow-[0_0_100px_rgba(6,182,212,0.15)] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#1E293B] bg-[#020408]/50 shrink-0">
                <div>
                   <h2 className="text-2xl font-black uppercase text-[#E2E8F0] tracking-tighter">
                     {selectedId === 'identity' ? 'IDENTITY_CORE' : selectedId === 'projects' ? 'DEPLOYMENT_LOG' : selectedId === 'skills' ? 'TECHNICAL_ARSENAL' : 'TRANSMISSION_UPLINK'}
                   </h2>
                   <div className="flex items-center gap-2 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse"></span>
                      <p className="text-[10px] font-mono text-[var(--accent)]">SECURE_CONNECTION_ESTABLISHED</p>
                   </div>
                </div>
                <button 
                  onClick={() => { playSound("click"); setSelectedId(null); }} 
                  className="p-2 rounded-lg bg-[#1E293B]/50 border border-[#1E293B] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[#020408] transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[url('/noise.png')]">
                
                {selectedId === 'contact' ? (
                  // --- CONTACT FORM with TOASTS ---
                  <ContentFade>
                    <ContactForm onToast={addToast} />
                  </ContentFade>
                ) : selectedId === 'projects' ? (
                  <ContentFade>
                    <div className="flex justify-end mb-6">
                       <div className="inline-flex bg-[#020408] border border-[#1E293B] rounded-lg p-1">
                          <button onClick={() => setViewMode("preview")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold transition-all ${viewMode === "preview" ? "bg-[var(--accent)] text-[#020408]" : "text-[#94A3B8] hover:text-[#E2E8F0]"}`}><Eye size={12}/> PREVIEW</button>
                          <button onClick={() => setViewMode("code")} className={`flex items-center gap-2 px-4 py-2 rounded-md text-[10px] font-bold transition-all ${viewMode === "code" ? "bg-[var(--accent)] text-[#020408]" : "text-[#94A3B8] hover:text-[#E2E8F0]"}`}><Code size={12}/> SOURCE</button>
                       </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                       {PROJECTS.map((project, i) => (
                         <div key={i} className="h-full min-h-[350px]" onMouseEnter={() => playSound("hover")}>
                           {viewMode === "preview" ? (
                             <ProjectCard {...project} index={i} />
                           ) : (
                             <div className="h-full flex flex-col gap-4">
                                <div className="flex items-center justify-between mb-1 px-1"><span className="text-sm font-bold text-[#E2E8F0]">{project.title}</span><span className="text-[10px] text-[var(--accent)] font-mono">architecture.tsx</span></div>
                                <CodeWindow code={project.code || "// Loading..."} />
                             </div>
                           )}
                         </div>
                       ))}
                    </div>
                  </ContentFade>
                ) : selectedId === 'identity' ? (
                  <ContentFade>
                    <div className="max-w-3xl mx-auto space-y-12">
                       <p className="text-3xl md:text-5xl text-[#E2E8F0] leading-tight font-light">
                         I am a <span className="text-[var(--accent)] font-bold">Full Stack Architect</span>. <br/>
                        I design systems that feel like magic — where technology, perception, and interaction blend seamlessly.
                       </p>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#1E293B] pt-8">
                          <div>
                             <h3 className="text-sm font-mono text-[#3B82F6] mb-4">CURRENT_MISSION</h3>
                             <p className="text-lg text-[#94A3B8]">Exploring new problem spaces and conceptual frameworks while reflecting on insights gained from past work..</p>
                          </div>
                           <div>
                             <h3 className="text-sm font-mono text-[#3B82F6] mb-4">Recent Project</h3>
                             <p className="text-lg text-[#94A3B8]">Truth is Optional — a completed conceptual study on data manipulation, perception engineering, and the fragile boundary between truth and narrative..</p>
                          </div>
                          <div>
                             <h3 className="text-sm font-mono text-[#3B82F6] mb-4">OPERATIONAL_BASE</h3>
                             <p className="text-lg text-[#94A3B8]">Odisha, India (IST / UTC+5:30)</p>
                          </div>
                       </div>
                    </div>
                  </ContentFade>
                ) : (
                   <ContentFade>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                          { cat: "Core Infrastructure", items: ["Next.js 15", "React", "TypeScript", "Tailwind CSS"] },
                          { cat: "Backend Systems", items: ["Node.js", "PostgreSQL", "Prisma ORM", "Redis"] },
                          { cat: "AI & Intelligence", items: ["Python", "Llama-3", "Groq Cloud", "LangChain"] }
                        ].map((skillGroup, idx) => (
                          <div key={idx} className="p-8 border border-[#1E293B] rounded-2xl bg-[#020408]/30 hover:border-[var(--accent)]/50 transition-colors">
                             <h3 className="text-[var(--accent)] font-bold uppercase tracking-widest mb-6 border-b border-[#1E293B] pb-2">{skillGroup.cat}</h3>
                             <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map(skill => (
                                  <span key={skill} className="px-4 py-2 text-sm font-mono text-[#E2E8F0] border border-[#1E293B] rounded-lg bg-[#0F172A]/50">
                                    {skill}
                                  </span>
                                ))}
                             </div>
                          </div>
                        ))}
                     </div>
                   </ContentFade>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}