"use client";
import { motion } from "framer-motion";

export default function Radar() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      
      {/* Radar Grid Circles */}
      <div className="absolute border border-[var(--accent)]/20 w-[140%] h-[140%] rounded-full"></div>
      <div className="absolute border border-[var(--accent)]/20 w-[90%] h-[90%] rounded-full"></div>
      <div className="absolute border border-[var(--accent)]/20 w-[45%] h-[45%] rounded-full"></div>
      
      {/* Crosshairs */}
      <div className="absolute w-full h-[1px] bg-[var(--accent)]/20"></div>
      <div className="absolute h-full w-[1px] bg-[var(--accent)]/20"></div>

      {/* The Scanning Beam */}
      <div className="absolute w-full h-full animate-spin-slow origin-center">
        <div className="w-1/2 h-1/2 bg-gradient-to-l from-[var(--accent)]/40 to-transparent absolute top-0 left-1/2 origin-bottom-left" style={{ transform: "skewX(-20deg)" }}></div>
      </div>

      {/* Blip 1 (Random Target) */}
      <motion.div 
        className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_10px_#ef4444]"
        style={{ top: "30%", left: "60%" }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      />

      {/* Blip 2 */}
      <motion.div 
        className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_10px_#facc15]"
        style={{ top: "70%", left: "30%" }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
      />
    </div>
  );
}