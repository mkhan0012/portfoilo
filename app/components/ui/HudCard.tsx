"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import SkillPill from "./SkillPill";
import React from "react";

export default function HudCard({ title, icon: Icon, items, align = "left", colorClass = "text-green-400", className = "" }: any) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className={`relative group w-full h-full bg-white/5 border border-white/10 p-6 rounded-3xl overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              300px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.3),
              transparent 80%
            )
          `,
          maskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          WebkitMaskImage: `linear-gradient(black, black) content-box, linear-gradient(black, black)`,
          maskComposite: `exclude`,
          WebkitMaskComposite: `xor`,
        }}
      />

      <div className={`flex items-center gap-3 mb-6 relative z-10 ${align === "right" ? "flex-row-reverse text-right" : ""}`}>
        <div className="p-2 rounded-lg bg-white/5 text-current shadow-sm border border-white/5">
           <Icon size={18} className={colorClass.split(" ")[0]} />
        </div>
        <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold opacity-70">{title}</h4>
      </div>

      <div className={`flex flex-wrap gap-2 relative z-10 ${align === "right" ? "justify-end" : "justify-start"}`}>
        {items.map((item: string | React.ReactNode, i: number) => (
            typeof item === 'string' ? <SkillPill key={i} item={item} /> : <div key={i}>{item}</div>
        ))}
      </div>
    </div>
  );
}