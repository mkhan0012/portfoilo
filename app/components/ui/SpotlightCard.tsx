"use client";
import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  drag?: boolean;
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(205, 28, 24, 0.25)", // Default to #CD1C18 (Vibrant Red)
  drag = true
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      drag={drag}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1} // Reduced elasticity for a "heavier" premium feel
      onMouseMove={handleMouseMove}
      // Base Styles: Burgundy Background (#38000A), Muted Red Border (#9B1313)
      className={`relative rounded-2xl border border-[#9B1313]/50 bg-[#38000A] overflow-hidden group transition-colors duration-500 hover:border-[#CD1C18] ${className} ${drag ? 'cursor-grab active:cursor-grabbing' : ''}`}
      whileHover={{ y: -4, scale: 1.01, zIndex: 10 }} // Subtle lift instead of just scale
      whileTap={{ scale: 0.98 }}
    >
      {/* SPOTLIGHT LAYER */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* NOISE TEXTURE OVERLAY (Optional - adds grit) */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      <div className="relative h-full z-10">{children}</div>
    </motion.div>
  );
}