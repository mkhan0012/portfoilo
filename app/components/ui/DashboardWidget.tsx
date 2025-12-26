"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React from "react";

export default function DashboardWidget({ title, icon: Icon, children, onClick, className, layoutId, style }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPct = (clientX - left) / width - 0.5;
    const yPct = (clientY - top) / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layoutId={layoutId}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", ...style }}
      // ADDED 'overflow-hidden' HERE TO FIX THE LEAK
      className={`relative glass-panel border border-[#1E293B] rounded-3xl p-6 cursor-pointer group hover:border-[#06B6D4] hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] transition-colors duration-500 flex flex-col overflow-hidden ${className}`}
    >
      {/* 3D Depth Layer for Header */}
      <div style={{ transform: "translateZ(30px)" }} className="flex justify-between items-start mb-4 z-20">
        <div className="flex items-center gap-2">
          <Icon className="text-[#3B82F6] group-hover:text-[#06B6D4] transition-colors duration-300" size={18} />
          <h3 className="text-[#94A3B8] font-mono text-xs uppercase tracking-widest group-hover:text-[#E2E8F0] transition-colors duration-300">{title}</h3>
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] group-hover:bg-[#06B6D4] transition-colors duration-300 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
      </div>
      
      {/* Inner Content - Now safely clipped */}
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 flex-grow flex flex-col h-full overflow-hidden">
        {children}
      </div>

      {/* Holographic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#06B6D4]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: "translateZ(10px)" }}></div>
    </motion.div>
  );
}