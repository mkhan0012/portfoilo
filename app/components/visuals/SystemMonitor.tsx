"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, Wifi, Cpu, HardDrive } from "lucide-react";

export default function SystemMonitor() {
  const [logs, setLogs] = useState<string[]>([]);
  const [bars, setBars] = useState<number[]>(new Array(20).fill(10));

  useEffect(() => {
    // Generate random logs
    const interval = setInterval(() => {
      const actions = ["FETCH", "PING", "TRACE", "ALLOC", "FREE", "PACKET"];
      const targets = ["192.168.0.1", "API_GATEWAY", "KERNEL_THREAD", "MEMORY_BLOCK"];
      const newLog = `[${new Date().toLocaleTimeString()}] ${actions[Math.floor(Math.random() * actions.length)]} >> ${targets[Math.floor(Math.random() * targets.length)]}`;
      
      setLogs(prev => [newLog, ...prev].slice(0, 15));
    }, 800);

    const barInterval = setInterval(() => {
        setBars(prev => prev.map(() => Math.random() * 100));
    }, 200);

    return () => { clearInterval(interval); clearInterval(barInterval); };
  }, []);

  return (
    <div className="hidden xl:flex flex-col gap-6 fixed right-8 top-32 bottom-12 w-64 border-l border-white/5 pl-6 font-mono text-[10px] text-zinc-500 pointer-events-none z-0">
      
      {/* CPU */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-wider font-bold">
            <Cpu size={14}/> Core Processing
        </div>
        <div className="grid grid-cols-4 gap-1">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="h-8 bg-white/5 rounded-sm overflow-hidden relative">
                    <motion.div 
                        animate={{ height: ["20%", "80%", "40%"] }} 
                        transition={{ duration: 1 + Math.random(), repeat: Infinity }}
                        className="absolute bottom-0 w-full bg-cyan-500/20"
                    />
                </div>
            ))}
        </div>
      </div>

      {/* NETWORK */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-wider font-bold">
            <Wifi size={14}/> Network I/O
        </div>
        <div className="flex items-end gap-1 h-16 border-b border-white/10 pb-1">
            {bars.map((h, i) => (
                <div key={i} className="flex-1 bg-green-500/20" style={{ height: `${h}%` }}></div>
            ))}
        </div>
      </div>

      {/* LOGS */}
      <div className="flex-1 overflow-hidden relative">
         <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-wider font-bold mb-2">
            <Activity size={14}/> Kernel Log
         </div>
         <div className="flex flex-col gap-1 opacity-70">
            {logs.map((log, i) => (
                <div key={i} className="whitespace-nowrap">{log}</div>
            ))}
         </div>
         <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#030303] to-transparent"></div>
      </div>

      {/* MEMORY */}
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-zinc-400 uppercase tracking-wider font-bold">
            <HardDrive size={14}/> Memory Heap
         </div>
         <div className="flex flex-wrap gap-1">
            {[...Array(40)].map((_, i) => (
                <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: Math.random() * 2 + 1, repeat: Infinity }}
                    className={`w-2 h-2 rounded-sm ${Math.random() > 0.8 ? 'bg-red-500' : 'bg-zinc-700'}`}
                />
            ))}
         </div>
      </div>

    </div>
  );
}