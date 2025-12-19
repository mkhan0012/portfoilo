"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import SkillPill from "./SkillPill";
import useSound from "@/app/hooks/useSound";
import React from "react";

export default function HudCard({ title, icon: Icon, items, align = "left", colorClass = "border-green-500/30 text-green-400" }: any) {
  // Sound Effect
  const playHover = useSound("/sounds/hover.mp3", 0.2);

  // 3D Tilt Logic
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
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
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
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative group w-full md:w-72 bg-black/40 backdrop-blur-md border ${colorClass} p-5 rounded-sm hover:bg-black/60 transition-colors perspective-1000`}
    >
      {/* Decorative Corner Lines (Now with slight depth) */}
      <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 ${colorClass.split(" ")[0]} opacity-50 group-hover:opacity-100 transition-opacity`} style={{ transform: "translateZ(20px)" }}></div>
      <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 ${colorClass.split(" ")[0]} opacity-50 group-hover:opacity-100 transition-opacity`} style={{ transform: "translateZ(20px)" }}></div>

      {/* Header */}
      <div className={`flex items-center gap-3 mb-4 ${align === "right" ? "flex-row-reverse text-right" : ""}`} style={{ transform: "translateZ(30px)" }}>
        <Icon size={20} className="animate-pulse" />
        <h4 className="font-mono text-sm uppercase tracking-[0.2em] font-bold">{title}</h4>
        <div className="flex-1 h-px bg-current opacity-20"></div>
      </div>

      {/* Content Grid */}
      <div className={`flex flex-wrap gap-2 ${align === "right" ? "justify-end" : "justify-start"}`} style={{ transform: "translateZ(40px)" }}>
        {/* FIX: Changed JSX.Element to React.ReactNode */}
        {items.map((item: string | React.ReactNode, i: number) => (
            typeof item === 'string' ? <SkillPill key={i} item={item} /> : <div key={i}>{item}</div>
        ))}
      </div>

      {/* Subtle holographic scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity rounded-sm" style={{ transform: "translateZ(10px)" }}></div>
    </motion.div>
  );
}