"use client";

import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion";
import { 
  ArrowRight, Github, Linkedin, Mail, GraduationCap, Layers, Cpu, 
  Zap, MapPin, ExternalLink, Play, Command, BarChart3
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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

// --- ANIMATION CONFIGURATION ---
const SMOOTH_EASE = [0.25, 0.1, 0.25, 1.0] as const; 

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { 
      duration: 1.2, 
      ease: SMOOTH_EASE
    }
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

// --- CREATIVE COMPONENTS ---

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

const HyperText = ({ text, className, delay = 0, trigger = false }: { text: string, className?: string, delay?: number, trigger?: boolean }) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(false);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CYBER_CHARS[Math.floor(Math.random() * CYBER_CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
      }

      iteration += 1 / 3;
    }, 30);
  };

  useEffect(() => {
    // Scramble on mount
    const timeout = setTimeout(() => {
      scramble();
      isMounted.current = true;
    }, delay * 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Scramble on external trigger (hover)
    if (isMounted.current && trigger) {
      scramble();
    }
  }, [trigger]);

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
    </span>
  );
};

// Project Card Wrapper to handle Hover State for HyperText
const ProjectCard = ({ project, index }: { project: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: SMOOTH_EASE, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <SpotlightCard className="p-0 overflow-hidden group h-full border border-white/5 hover:border-white/20 transition-colors" spotlightColor={`rgba(${project.color === 'cyan' ? '6, 182, 212' : project.color === 'purple' ? '168, 85, 247' : project.color === 'green' ? '34, 197, 94' : project.color === 'orange' ? '249, 115, 22' : '99, 102, 241'}, 0.15)`} drag={false}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
            
            {/* PREVIEW IMAGE SECTION */}
            <div className={`${project.reverse ? 'order-2 lg:order-1' : ''} relative h-72 lg:h-auto bg-zinc-900 overflow-hidden border-t lg:border-t-0 ${project.reverse ? 'lg:border-r' : 'lg:border-l'} border-white/5 group`}>
                
                {/* Main Image with Scale & Rotate */}
                <div className="relative w-full h-full overflow-hidden">
                   <Image 
                     src={project.img} 
                     alt={project.title} 
                     fill 
                     className="object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] group-hover:scale-110 group-hover:rotate-1 opacity-60 group-hover:opacity-100 filter grayscale group-hover:grayscale-0" 
                   />
                </div>

                {/* Cyber Scanline Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out z-10 pointer-events-none"></div>
                
                {/* Color Tint Overlay */}
                <div className={`absolute inset-0 bg-${project.color}-500/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
            </div>

            {/* CONTENT SECTION */}
            <div className={`${project.reverse ? 'order-1 lg:order-2' : ''} p-8 md:p-12 flex flex-col justify-center space-y-6 bg-black/20`}>
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full bg-${project.color}-400 animate-pulse`}></span>
                  <span className={`text-xs font-bold text-${project.color}-400 uppercase tracking-wider`}>{project.tag}</span>
                </div>
                
                <h3 className="text-4xl font-black text-white h-12 flex items-center">
                  {/* Scramble Text on Card Hover */}
                  <HyperText text={project.title} trigger={isHovered} />
                </h3>
                
                <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                  {project.desc}
                </p>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  className={`relative inline-flex items-center gap-2 text-sm font-bold text-white overflow-hidden group/btn px-6 py-3 rounded-lg bg-white/5 hover:bg-${project.color}-500/20 border border-white/10 hover:border-${project.color}-500/50 transition-all duration-300 w-fit`}
                >
                  <span className={`absolute inset-0 bg-${project.color}-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out`}></span>
                  <span className="relative z-10 flex items-center gap-2">
                    LIVE PREVIEW <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform"/>
                  </span>
                </a>
            </div>
          </div>
      </SpotlightCard>
    </motion.div>
  );
};

export default function Portfolio() {
  const [gameActive, setGameActive] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [isBooted, setIsBooted] = useState(false);
  
  // Parallax Scroll Effect Hooks
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]); 
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]); 

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
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="min-h-screen text-white font-sans selection:bg-green-500/30 overflow-x-hidden relative cursor-none md:cursor-auto"
          >
            <Cursor />
            <CyberBackground />
            <SystemMonitor />

            <DataRunner isActive={gameActive} onClose={() => setGameActive(false)} />
            <TerminalModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />

            {/* NAVBAR */}
            <motion.nav 
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: SMOOTH_EASE, delay: 0.5 }}
              className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center backdrop-blur-md border-b border-white/5 bg-[#030303]/40"
            >
              <div 
                className="flex items-center gap-3 group cursor-pointer"
                onClick={() => setTerminalOpen(true)}
              >
                 <motion.div 
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.5, ease: SMOOTH_EASE }}
                    className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-green-400/50"
                 >
                    <Command size={18} className="text-zinc-400 group-hover:text-green-400 transition-colors"/>
                 </motion.div>
                 <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300 hidden md:block tracking-widest">COMMAND MODE</span>
              </div>
              <Link href="/contact" className="group px-6 py-2 rounded-full bg-white text-black font-bold text-sm hover:scale-105 hover:bg-green-400 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                 Hire Me <ArrowRight size={16} className="group-hover:-rotate-45 transition-transform duration-300"/>
              </Link>
            </motion.nav>

            <div className="relative z-10 pt-32 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-32 xl:pr-72">

              {/* PARALLAX HERO HEADER */}
              <motion.header 
                style={{ y: heroY, opacity: heroOpacity }} 
                className="flex flex-col items-center text-center gap-8 perspective-1000"
              >
                 <motion.div 
                   variants={fadeInUp}
                   initial="hidden"
                   animate="visible"
                   className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-widest text-zinc-300 backdrop-blur-md shadow-2xl hover:border-green-500/30 transition-colors"
                 >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    System Online <div className="h-4 w-px bg-white/20"></div> <LiveClock />
                 </motion.div>

                 <div className="space-y-[-1rem] md:space-y-[-2rem] relative z-20 mix-blend-difference flex flex-col items-center">
                    <h1 className="text-[12vw] md:text-[8rem] font-black tracking-tighter text-white overflow-hidden">
                       <HyperText text="MD MOSHIN" delay={0.2} />
                    </h1>
                    <h1 className="text-[12vw] md:text-[8rem] font-black tracking-tighter overflow-hidden">
                       <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-200 to-green-600 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] drop-shadow-[0_0_35px_rgba(34,197,94,0.4)]">
                         <HyperText text="KHAN" className="text-transparent bg-clip-text" delay={0.8} />
                       </span>
                    </h1>
                 </div>

                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="max-w-xl text-lg text-zinc-400 leading-relaxed font-light"
                 >
                    Full Stack Engineer & UX Architect. <br/>
                    Building <span className="text-green-400 font-medium border-b border-green-500/30 hover:bg-green-500/10 transition-colors px-1 rounded">digital ecosystems</span> that feel alive.
                 </motion.p>
              </motion.header>

              {/* BENTO GRID */}
              <motion.section 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                 <motion.div variants={fadeInUp} className="col-span-1 md:col-span-2">
                    <SpotlightCard className="h-full p-8 flex flex-col justify-between" spotlightColor="rgba(34, 197, 94, 0.2)">
                       <div className="flex justify-between items-start">
                          <div className="p-3 bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20"><GraduationCap size={24}/></div>
                          <span className="text-xs font-mono text-zinc-500">ID_CARD_01</span>
                       </div>
                       <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Full Stack Engineer</h3>
                          <div className="flex flex-wrap gap-2">
                             <SkillPill item="BCA Graduate" />
                             <SkillPill item="IMS 2025" />
                             <SkillPill item="UX Certified" />
                          </div>
                       </div>
                    </SpotlightCard>
                 </motion.div>

                 <motion.div variants={fadeInUp}>
                    <SpotlightCard className="p-8 flex flex-col justify-between h-full" spotlightColor="rgba(6, 182, 212, 0.2)">
                        <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-2xl w-fit border border-cyan-500/20"><MapPin size={24}/></div>
                        <div>
                           <h3 className="text-xl font-bold text-white">Odisha, India</h3>
                           <p className="text-xs text-zinc-400 mt-1">Remote Available</p>
                        </div>
                    </SpotlightCard>
                 </motion.div>

                 <motion.div variants={fadeInUp} onClick={() => setGameActive(true)} className="cursor-pointer h-full">
                    <SpotlightCard className="p-8 flex flex-col justify-between h-full group" spotlightColor="rgba(239, 68, 68, 0.3)">
                       <div className="flex justify-between items-start">
                          <div className="p-3 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 group-hover:bg-red-500 group-hover:text-white transition-colors duration-500"><Zap size={24}/></div>
                          <Play size={20} className="text-zinc-600 group-hover:text-red-500 transition-colors" />
                       </div>
                       <div>
                          <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors">INITIALIZE</h3>
                          <p className="text-xs text-zinc-500 mt-1">Start Data_Runner Protocol</p>
                       </div>
                    </SpotlightCard>
                 </motion.div>

                 <motion.div variants={fadeInUp} className="col-span-1 md:col-span-3 lg:col-span-4">
                    <SpotlightCard className="p-8" spotlightColor="rgba(168, 85, 247, 0.15)">
                       <div className="flex items-center gap-3 mb-6">
                          <Layers size={20} className="text-purple-400"/>
                          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Technical Arsenal</h3>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {["FRONTEND", "BACKEND", "INTELLIGENCE"].map((category, i) => (
                             <div key={category} className="space-y-3">
                                <h4 className={`text-xs font-bold text-white border-l-2 pl-3 ${i === 0 ? 'border-cyan-500' : i === 1 ? 'border-green-500' : 'border-purple-500'}`}>{category}</h4>
                                <div className="flex flex-wrap gap-2">
                                   {(i === 0 ? ["React.js", "Next.js 15", "Tailwind", "Framer Motion"] : 
                                     i === 1 ? ["Node.js", "PostgreSQL", "MongoDB", "Prisma ORM"] : 
                                     ["Python", "Llama-3", "Groq Cloud", "TypeScript"]).map(s => (
                                      <span key={s} className="px-2 py-1 text-[10px] bg-white/5 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-default border border-white/5">{s}</span>
                                   ))}
                                </div>
                             </div>
                          ))}
                       </div>
                    </SpotlightCard>
                 </motion.div>
              </motion.section>

              {/* ACTIVITY PROTOCOL */}
              <motion.section 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-6"
              >
                 <motion.div variants={fadeInUp} className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                        <BarChart3 size={16}/> Contribution Matrix
                    </h3>
                    <div className="text-xs font-mono text-zinc-600">LAST 365 CYCLES</div>
                 </motion.div>
                 <motion.div variants={fadeInUp}>
                   <SpotlightCard className="p-6 md:p-8" spotlightColor="rgba(34, 197, 94, 0.1)">
                       <ActivityGraph />
                       <div className="flex justify-between mt-4 text-[10px] text-zinc-500 font-mono uppercase">
                          <span>Initiation</span>
                          <span>Current Status: Active</span>
                       </div>
                   </SpotlightCard>
                 </motion.div>
              </motion.section>

              {/* PROJECTS */}
              <section id="work" className="space-y-12">
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: SMOOTH_EASE }}
                    className="flex items-end justify-between border-b border-white/10 pb-6"
                 >
                    <div>
                       <h2 className="text-5xl font-bold text-white mb-2">Deployments</h2>
                       <p className="text-zinc-500 font-mono text-sm">/// CASE STUDIES</p>
                    </div>
                    <Link href="https://github.com/mkhan0012" target="_blank" className="hidden md:flex items-center gap-2 text-sm font-bold text-white hover:text-green-400 transition-colors">
                       GITHUB REPO <ExternalLink size={14}/>
                    </Link>
                 </motion.div>

                 <div className="grid grid-cols-1 gap-20">
                    {[
                      {
                        title: "CryptoPlace",
                        desc: "A real-time cryptocurrency tracking engine with live WebSocket data updates and interactive financial charting.",
                        link: "https://crypto-place-brown.vercel.app/",
                        img: "/crypto-preview.png",
                        color: "cyan",
                        tag: "Fintech Dashboard"
                      },
                      {
                        title: "Arguely",
                        desc: "An automated debate arena powered by Llama-3, featuring an AI Referee for logic checking and scoring.",
                        link: "https://debate-again.vercel.app/",
                        img: "/arguely-preview.png",
                        color: "purple",
                        tag: "AI Platform",
                        reverse: true
                      },
                      {
                        title: "Focus.bits",
                        desc: "A gamified productivity engine featuring Zen Mode, XP tracking, and integrated retro arcade breaks.",
                        link: "https://timer-rho-khaki.vercel.app/",
                        img: "/timer.png",
                        color: "green",
                        tag: "Pamodoro Timer"
                      },
                      {
                        title: "Truth is Optional",
                        desc: "A data-driven framework exploring how perception is programmable. Runs verified data through \"perspective filters\" to demonstrate narrative distortion.",
                        link: "https://truthis-optional.vercel.app/",
                        img: "/truth.png",
                        color: "orange",
                        tag: "Perspective Engine",
                        reverse: true
                      },
                      {
                        title: "Framework",
                        desc: "A high-performance experimental web infrastructure designed for modular scalability and rapid component orchestration.",
                        link: "https://framework-seven-steel.vercel.app/",
                        img: "/framework.png",
                        color: "indigo",
                        tag: "System Architecture"
                      }
                    ].map((project, idx) => (
                      <ProjectCard key={idx} project={project} index={idx} />
                    ))}
                 </div>
              </section>

              {/* FOOTER */}
              <motion.footer 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="border-t border-white/10 pt-12 pb-20 flex flex-col md:flex-row justify-between items-center gap-6"
              >
                 <div className="text-center md:text-left">
                    <h4 className="font-bold text-white text-lg">Md Moshin Khan</h4>
                    <p className="text-zinc-500 text-xs font-mono mt-1">Based in Odisha, India.</p>
                 </div>
                 <div className="flex gap-4">
                    {[
                      { icon: Mail, href: "mailto:moshink0786@gmail.com" },
                      { icon: Github, href: "https://github.com/mkhan0012" },
                      { icon: Linkedin, href: "https://linkedin.com/in/md-moshin-khan-65510a24b" }
                    ].map((item, i) => (
                      <Link key={i} href={item.href} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all border border-white/5 hover:scale-110">
                        <item.icon size={20}/>
                      </Link>
                    ))}
                 </div>
              </motion.footer>

            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}