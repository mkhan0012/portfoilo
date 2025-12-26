"use client";
import { useState, useEffect } from "react";
import { Settings, Volume2, VolumeX, Monitor, Activity, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const THEMES = [
  { id: "cyan", color: "#06B6D4", label: "PROTOCOL_ALPHA" }, // Default
  { id: "emerald", color: "#10B981", label: "PROTOCOL_BIO" }, // Hacker Green
  { id: "amber", color: "#F59E0B", label: "PROTOCOL_HAZARD" }, // Industrial Orange
  { id: "rose", color: "#F43F5E", label: "PROTOCOL_CRIMSON" }, // Red Alert
  { id: "violet", color: "#8B5CF6", label: "PROTOCOL_SYNTH" }, // Vaporwave
];

export default function SystemSettings({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [activeTheme, setActiveTheme] = useState("cyan");
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Apply Theme Logic
  const handleThemeChange = (themeId: string, color: string) => {
    setActiveTheme(themeId);
    document.documentElement.style.setProperty("--accent", color);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed top-24 right-6 z-[90] w-72 bg-[#0F172A]/90 backdrop-blur-xl border border-[var(--accent)] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden font-mono"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1E293B] bg-[#020408]/50">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <Settings size={16} />
              <span className="text-xs font-bold tracking-widest">SYS_CONFIG</span>
            </div>
            <div className="flex gap-1">
               <div className="w-2 h-2 rounded-full bg-red-500 cursor-pointer hover:opacity-80" onClick={onClose}></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-6">
            
            {/* 1. Theme Selector */}
            <div>
              <div className="text-[10px] text-[#94A3B8] mb-3 uppercase tracking-widest">Interface Protocol</div>
              <div className="space-y-2">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id, t.color)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition-all ${
                      activeTheme === t.id 
                        ? "bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent)]" 
                        : "bg-transparent border-[#1E293B] text-[#94A3B8] hover:border-[#94A3B8]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                      <span>{t.label}</span>
                    </div>
                    {activeTheme === t.id && <Check size={12} />}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Audio Toggle */}
            <div>
               <div className="text-[10px] text-[#94A3B8] mb-3 uppercase tracking-widest">Audio Subsystem</div>
               <button 
                 onClick={() => setSoundEnabled(!soundEnabled)}
                 className="flex items-center justify-between w-full px-3 py-2 bg-[#020408] border border-[#1E293B] rounded-lg text-xs text-[#E2E8F0] hover:border-[var(--accent)] transition-colors"
               >
                  <span className="flex items-center gap-2">
                    {soundEnabled ? <Volume2 size={14}/> : <VolumeX size={14}/>}
                    {soundEnabled ? "AUDIO: ENABLED" : "AUDIO: MUTED"}
                  </span>
                  <div className={`w-8 h-4 rounded-full relative transition-colors ${soundEnabled ? "bg-[var(--accent)]" : "bg-[#1E293B]"}`}>
                     <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${soundEnabled ? "left-4.5" : "left-0.5"}`}></div>
                  </div>
               </button>
            </div>

            {/* 3. System Info */}
            <div className="pt-4 border-t border-[#1E293B] flex justify-between items-center text-[9px] text-[#94A3B8]">
               <div className="flex items-center gap-1">
                  <Monitor size={10}/> <span>RES: 4K_READY</span>
               </div>
               <div className="flex items-center gap-1">
                  <Activity size={10}/> <span>FPS: 60</span>
               </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}