"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function EyeTracker() {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      // Get eye center position
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      // Calculate angle and distance
      const dx = e.clientX - eyeX;
      const dy = e.clientY - eyeY;
      const angle = Math.atan2(dy, dx);
      
      // Limit the movement radius (so pupil stays inside)
      const maxRadius = rect.width / 4; 
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), maxRadius); // dynamic distance
      
      // Calculate final x/y
      const x = Math.cos(angle) * 12; // 12px max movement
      const y = Math.sin(angle) * 12;

      setPupilPos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer Tactical Ring */}
      <div className="w-24 h-24 rounded-full border border-[var(--accent)]/30 flex items-center justify-center relative">
        
        {/* Rotating Dashed Ring (Scanner Effect) */}
        <div className="absolute inset-0 border-t border-[var(--accent)] rounded-full animate-spin duration-[3s]" />
        
        {/* The Eye Globe */}
        <div 
          ref={eyeRef}
          className="w-16 h-16 bg-[#020408] rounded-full border border-[var(--accent)] relative overflow-hidden flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]"
        >
          {/* Grid lines inside eye */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:4px_4px] opacity-30"></div>

          {/* The Moving Pupil */}
          <motion.div
            className="w-6 h-6 bg-[var(--accent)] rounded-full shadow-[0_0_15px_var(--accent)] relative z-10"
            animate={{ x: pupilPos.x, y: pupilPos.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
          >
            {/* Pupil Glint */}
            <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}