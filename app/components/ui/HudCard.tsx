"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillPill from "./SkillPill";
import useSound from "@/app/hooks/useSound";
import React from "react";

export default function HudCard({ title, icon: Icon, items, align = "left", colorClass = "border-green-500/30 text-green-400", className = "" }: any) {
  const playHover = useSound("/sounds/hover.mp3", 0.2);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => playHover()}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative group w-full h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 p-6 rounded-3xl overflow-hidden hover:border-white/10 transition-colors perspective-1000 ${className} ${colorClass}`}
    >
      {/* Dynamic Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Header */}
      <div className={`flex items-center gap-3 mb-6 relative z-10 ${align === "right" ? "flex-row-reverse text-right" : ""}`} style={{ transform: "translateZ(20px)" }}>
        <div className="p-2 rounded-lg bg-white/5 text-current shadow-sm">
           <Icon size={18} />
        </div>
        <h4 className="font-mono text-xs uppercase tracking-[0.2em] font-bold opacity-70">{title}</h4>
      </div>

      {/* Content */}
      <div className={`flex flex-wrap gap-2 relative z-10 ${align === "right" ? "justify-end" : "justify-start"}`} style={{ transform: "translateZ(30px)" }}>
        {items.map((item: string | React.ReactNode, i: number) => (
            typeof item === 'string' ? <SkillPill key={i} item={item} /> : <div key={i}>{item}</div>
        ))}
      </div>
    </motion.div>
  );
}