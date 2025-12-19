"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  const bootText = [
    "INITIALIZING KERNEL...",
    "LOADING MEMORY MODULES... [OK]",
    "MOUNTING FILE SYSTEM... [OK]",
    "CONNECTING TO NEURAL NET... [OK]",
    "LOADING USER PROFILE: MD MOSHIN KHAN...",
    "ACCESS GRANTED.",
    "SYSTEM READY."
  ];

  useEffect(() => {
    // Check if we already booted this session
    const hasBooted = sessionStorage.getItem("hasBooted");
    if (hasBooted) {
      setIsVisible(false);
      onComplete();
      return;
    }

    let delay = 0;
    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        // Scroll to bottom
        window.scrollTo(0, document.body.scrollHeight);
      }, delay);
    });

    // Finish boot
    setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("hasBooted", "true");
      onComplete();
    }, delay + 800);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] bg-black text-green-500 font-mono text-xs md:text-sm p-8 overflow-hidden flex flex-col justify-end"
        >
          {lines.map((line, i) => (
            <div key={i} className="mb-1">{`> ${line}`}</div>
          ))}
          <div className="animate-pulse">_</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}