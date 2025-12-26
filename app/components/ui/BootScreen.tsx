"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  
  const bootText = [
    "INITIALIZING MK_OS KERNEL...",
    "LOADING MEMORY MODULES... [OK]",
    "MOUNTING FILE SYSTEM... [OK]",
    "ESTABLISHING SECURE CONNECTION... [OK]",
    "CALIBRATING WAVE GRID PHYSICS...",
    "STARTING INTERFACE SERVICE...",
    "SYSTEM READY."
  ];

  useEffect(() => {
    let delay = 0;
    bootText.forEach((text, i) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        if (i === bootText.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#020408] flex items-center justify-center font-mono text-xs md:text-sm text-[#06B6D4]">
      <div className="w-full max-w-md p-8">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        <div className="animate-pulse mt-2">_</div>
      </div>
    </div>
  );
}