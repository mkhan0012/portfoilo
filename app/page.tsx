"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Wifi, Battery, Signal, User, MapPin, Mail, Github, Linkedin, ExternalLink, X, ChevronLeft, Send, Search, Terminal, LayoutGrid, Music, Briefcase, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// --- COMPONENTS ---

// 1. STATUS BAR (Top)
const StatusBar = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }));
    };
    updateTime();
    setInterval(updateTime, 1000);
  }, []);

  return (
    <div className="fixed top-0 w-full px-6 py-2 flex justify-between items-center text-white z-50 text-sm font-medium mix-blend-difference">
      <span>{time}</span>
      <div className="flex items-center gap-2">
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={16} />
      </div>
    </div>
  );
};

// 2. DYNAMIC ISLAND (Notification Area)
const DynamicIsland = ({ status }: { status: string }) => {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        layout
        className="bg-black rounded-[2rem] flex items-center justify-center px-4 py-2 min-w-[120px] h-[35px] text-white text-xs transition-all duration-300 shadow-xl"
      >
        <span className="font-semibold tracking-wide">{status}</span>
      </motion.div>
    </div>
  );
};

// 3. WIDGETS
const LargeWidget = () => (
  <div className="col-span-2 row-span-2 bg-white/20 backdrop-blur-xl rounded-[2rem] p-6 text-white flex flex-col justify-between border border-white/10 shadow-lg hover:scale-[1.02] transition-transform duration-300">
    <div className="flex items-start justify-between">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-xl font-bold">MK</div>
      <div className="text-right">
        <h2 className="text-xs font-medium opacity-70 uppercase tracking-widest">Profile</h2>
        <p className="text-2xl font-bold">Md Moshin</p>
        <p className="text-xl font-light">Khan</p>
      </div>
    </div>
    <div>
      <p className="text-sm opacity-90 leading-relaxed font-medium">
        Full Stack Developer & UX Designer.
        <br/><span className="opacity-60">Building logic with soul.</span>
      </p>
    </div>
  </div>
);

const MediumWidget = ({ icon: Icon, title, sub, color }: any) => (
  <div className={`col-span-1 row-span-1 ${color} backdrop-blur-xl rounded-[1.5rem] p-4 text-white flex flex-col justify-between border border-white/5 shadow-lg hover:scale-[1.02] transition-transform duration-300`}>
    <Icon size={24} className="opacity-80"/>
    <div>
      <p className="text-xs opacity-60 uppercase font-bold mb-1">{title}</p>
      <p className="text-sm font-semibold">{sub}</p>
    </div>
  </div>
);

// 4. APP ICON
const AppIcon = ({ icon: Icon, label, color, onClick }: any) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 group">
    <div className={`w-[64px] h-[64px] rounded-[1.2rem] ${color} flex items-center justify-center text-white shadow-lg group-active:scale-90 transition-transform duration-200 border border-white/10`}>
      <Icon size={30} strokeWidth={1.5} />
    </div>
    <span className="text-xs text-white font-medium drop-shadow-md group-hover:opacity-100 opacity-90">{label}</span>
  </button>
);

// --- APPS (FULL SCREEN MODALS) ---

// HIRE ME APP
const HireMeApp = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed inset-0 bg-[#f2f2f7] dark:bg-black z-[100] flex flex-col"
  >
    {/* Header */}
    <div className="px-4 py-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md sticky top-0 z-10 pt-12">
      <button onClick={onClose} className="flex items-center text-blue-500 font-medium">
        <ChevronLeft size={20}/> Back
      </button>
      <h1 className="font-semibold text-black dark:text-white">Contact</h1>
      <div className="w-8"></div>
    </div>

    {/* Content */}
    <div className="flex-1 overflow-y-auto p-4 bg-[#f2f2f7] dark:bg-black text-black dark:text-white">
      
      <div className="flex flex-col items-center py-8">
         <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-green-400 to-blue-500 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-xl">
            MK
         </div>
         <h2 className="text-2xl font-bold">Md Moshin Khan</h2>
         <p className="text-zinc-500">Full Stack Developer</p>
         
         <div className="flex gap-4 mt-6">
            <a href="mailto:moshink0786@gmail.com" className="flex flex-col items-center gap-1">
               <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center"><Mail size={18}/></div>
               <span className="text-[10px] text-blue-500 font-medium">mail</span>
            </a>
            <a href="https://linkedin.com/in/md-moshin-khan-65510a24b" target="_blank" className="flex flex-col items-center gap-1">
               <div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center"><Linkedin size={18}/></div>
               <span className="text-[10px] text-blue-700 font-medium">linkedIn</span>
            </a>
            <a href="https://github.com/mkhan0012" target="_blank" className="flex flex-col items-center gap-1">
               <div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center"><Github size={18}/></div>
               <span className="text-[10px] text-zinc-500 font-medium">gitHub</span>
            </a>
         </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden mb-6">
         <div className="p-4 border-b border-zinc-100 dark:border-zinc-800">
            <label className="text-xs text-zinc-500 uppercase font-bold">Status</label>
            <p className="text-green-500 font-medium flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Available for Hire</p>
         </div>
         <div className="p-4">
            <label className="text-xs text-zinc-500 uppercase font-bold">Location</label>
            <p className="font-medium">Odisha, India (Open to Remote)</p>
         </div>
      </div>

      <a href="mailto:moshink0786@gmail.com" className="w-full py-3 bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
         <Send size={18}/> Send Message
      </a>

    </div>
  </motion.div>
);

// PROJECTS APP
const ProjectsApp = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", damping: 25 }}
    className="fixed inset-0 bg-white dark:bg-[#1c1c1e] z-[100] flex flex-col"
  >
     <div className="px-6 py-4 flex items-center justify-between pt-12">
        <h1 className="text-3xl font-bold dark:text-white">Projects</h1>
        <button onClick={onClose} className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-500">
           <X size={16}/>
        </button>
     </div>

     <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Project 1 */}
        <div className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm">
           <div className="h-48 bg-cyan-900/20 relative">
               <Image src="/crypto-preview.png" alt="Crypto" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
           </div>
           <div className="p-6">
               <div className="flex justify-between items-start mb-2">
                   <h2 className="text-2xl font-bold dark:text-white">CryptoPlace</h2>
                   <a href="https://crypto-place-brown.vercel.app/" target="_blank" className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">OPEN</a>
               </div>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">Real-time cryptocurrency tracking dashboard with live API integration.</p>
               <div className="flex gap-2">
                   <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded text-zinc-600 dark:text-zinc-300">React</span>
                   <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded text-zinc-600 dark:text-zinc-300">Tailwind</span>
               </div>
           </div>
        </div>

        {/* Project 2 */}
        <div className="group relative bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-sm">
           <div className="h-48 bg-purple-900/20 relative">
               <Image src="/arguely-preview.png" alt="Arguely" fill className="object-cover group-hover:scale-105 transition-transform duration-500"/>
           </div>
           <div className="p-6">
               <div className="flex justify-between items-start mb-2">
                   <h2 className="text-2xl font-bold dark:text-white">Arguely</h2>
                   <a href="https://debate-again.vercel.app/" target="_blank" className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">OPEN</a>
               </div>
               <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-4">AI-powered debate arena with logic scoring engine.</p>
               <div className="flex gap-2">
                   <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded text-zinc-600 dark:text-zinc-300">Next.js</span>
                   <span className="px-2 py-1 bg-zinc-200 dark:bg-zinc-800 text-xs rounded text-zinc-600 dark:text-zinc-300">AI</span>
               </div>
           </div>
        </div>
     </div>
  </motion.div>
);

// --- MAIN HOME SCREEN ---
export default function IOSPortfolio() {
  const [activeApp, setActiveApp] = useState<string | null>(null);

  return (
    <main className="min-h-screen w-full bg-black overflow-hidden relative font-sans selection:bg-blue-500/30">
      
      {/* IOS WALLPAPER */}
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 scale-105 blur-sm"></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/50 to-transparent"></div>

      <StatusBar />
      <DynamicIsland status={activeApp ? "App Active" : "System Ready"} />

      {/* HOME SCREEN GRID */}
      <div className="relative z-10 pt-16 px-6 max-w-md mx-auto h-screen flex flex-col">
        
        {/* Top Widgets Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8">
           <LargeWidget />
           <MediumWidget icon={MapPin} title="Location" sub="Odisha, IN" color="bg-green-500/80" />
           <MediumWidget icon={Music} title="Vibe" sub="Lo-Fi Coding" color="bg-red-500/80" />
        </div>

        {/* App Icons Grid */}
        <div className="grid grid-cols-4 gap-x-4 gap-y-8">
           <AppIcon icon={Briefcase} label="Projects" color="bg-zinc-800" onClick={() => setActiveApp("PROJECTS")} />
           <AppIcon icon={Terminal} label="Skills" color="bg-zinc-800" onClick={() => setActiveApp("SKILLS")} />
           <AppIcon icon={Github} label="GitHub" color="bg-black" onClick={() => window.open('https://github.com/mkhan0012', '_blank')} />
           <AppIcon icon={Linkedin} label="LinkedIn" color="bg-[#0077b5]" onClick={() => window.open('https://linkedin.com/in/md-moshin-khan-65510a24b', '_blank')} />
        </div>

        {/* Bottom Area (Spacer) */}
        <div className="flex-1"></div>

        {/* DOCK */}
        <div className="mb-6 mx-2 p-4 bg-white/20 backdrop-blur-2xl rounded-[2.5rem] flex justify-around items-end border border-white/10 shadow-2xl">
           <AppIcon icon={LayoutGrid} label="" color="bg-green-500" onClick={() => setActiveApp("PROJECTS")} />
           <AppIcon icon={Search} label="" color="bg-zinc-500" onClick={() => {}} />
           <AppIcon icon={Mail} label="" color="bg-blue-500" onClick={() => setActiveApp("HIRE_ME")} />
           <AppIcon icon={User} label="" color="bg-gray-400" onClick={() => setActiveApp("HIRE_ME")} />
        </div>

      </div>

      {/* --- ACTIVE APPS OVERLAY --- */}
      <AnimatePresence>
         {activeApp === "HIRE_ME" && <HireMeApp onClose={() => setActiveApp(null)} />}
         {activeApp === "PROJECTS" && <ProjectsApp onClose={() => setActiveApp(null)} />}
      </AnimatePresence>

    </main>
  );
}