"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HudOverlay() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [targetName, setTargetName] = useState("");

  useEffect(() => {
    // 1. Track Mouse Position
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
      
      // 2. Check what we are hovering over
      const target = e.target as HTMLElement;
      // Look for clickable elements or their parents
      const clickable = target.closest("a, button, .scan-target");
      
      if (clickable) {
        setIsHovering(true);
        // Try to get a label for the UI
        setTargetName(clickable.tagName.toLowerCase() === "a" ? "LINK_DETECTED" : "INTERACTIVE_NODE");
      } else {
        setIsHovering(false);
        setTargetName("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      
      {/* 1. CROSSHAIR LINES (Follows Mouse) */}
      <div 
        className="absolute top-0 bottom-0 w-px bg-[#06B6D4]/20" 
        style={{ left: mouse.x }}
      ></div>
      <div 
        className="absolute left-0 right-0 h-px bg-[#06B6D4]/20" 
        style={{ top: mouse.y }}
      ></div>

      {/* 2. THE CURSOR HUD */}
      <div 
        className="absolute w-0 h-0"
        style={{ transform: `translate(${mouse.x}px, ${mouse.y}px)` }}
      >
        {/* Dynamic Brackets that expand/contract on hover */}
        <motion.div 
          className="absolute -top-4 -left-4 w-8 h-8 border border-transparent"
          animate={{
            borderColor: isHovering ? "#06B6D4" : "transparent",
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0
          }}
          transition={{ duration: 0.2 }}
        >
           {/* Corner pieces */}
           <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#06B6D4]" />
           <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#06B6D4]" />
           <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#06B6D4]" />
           <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#06B6D4]" />
        </motion.div>

        {/* Data Label next to cursor */}
        <div className="absolute top-4 left-4 flex flex-col items-start space-y-1">
           <div className="flex items-center gap-2">
              <span className="text-[8px] font-mono text-[#06B6D4] bg-[#06B6D4]/10 px-1">
                 X:{mouse.x.toString().padStart(4, '0')} Y:{mouse.y.toString().padStart(4, '0')}
              </span>
              {isHovering && (
                <span className="text-[8px] font-bold font-mono text-[#020408] bg-[#06B6D4] px-1 animate-pulse">
                   {targetName}
                </span>
              )}
           </div>
        </div>
      </div>

    </div>
  );
}