"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILL_FACTS: Record<string, string> = {
  "React.js": "Virtual DOM architecture for high-speed UI updates.",
  "Next.js 15": "Hybrid static & server rendering with App Router.",
  "Tailwind": "Utility-first CSS for rapid, custom design.",
  "Framer Motion": "Production-ready animation library for React.",
  "Node.js": "Asynchronous event-driven JavaScript runtime.",
  "MongoDB": "NoSQL document database for scalable apps.",
  "PostgreSQL": "ACID-compliant relational database system.",
  "Prisma": "Type-safe ORM for Node.js & TypeScript.",
  "TypeScript": "Statically typed superset of JavaScript.",
  "Python": "Powerful language for AI, data & backend.",
  "Llama-3": "Meta's advanced open-source LLM architecture.",
  "Groq": "LPU Inference Engine for instant AI responses.",
  "BCA Graduate": "Bachelor of Computer Applications, 2024.",
  "IMS 2024": "Institute of Management Study.",
  "Full Stack": "Frontend + Backend + Database architecture.",
  "Odisha, India": "Based in the eastern tech hub of India.",
  "Open to Remote": "Available for global remote collaborations.",
  "Hybrid": "Flexible for on-site/remote hybrid roles.",
  "Google UX Cert": "Certified in user empathy & design thinking.",
  "Figma": "Industry standard for interface prototyping.",
  "UI/UX": "Crafting intuitive digital experiences."
};

export default function SkillPill({ item }: { item: string }) {
  const [showFact, setShowFact] = useState(false);
  const fact = SKILL_FACTS[item] || "Core system module active.";

  return (
    <div className="relative inline-block">
      <AnimatePresence>
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -10, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 w-48 bg-black/90 border border-green-500/50 text-green-400 p-3 rounded-md text-[10px] font-mono text-center z-50 shadow-[0_0_15px_rgba(34,197,94,0.3)] backdrop-blur-md"
          >
            {fact}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-green-500/50"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={() => setShowFact(!showFact)}
        onBlur={() => setShowFact(false)}
        className="px-2 py-1 text-[10px] font-mono bg-white/5 border border-white/10 rounded hover:bg-white/10 hover:border-green-500/50 hover:text-green-400 transition-all cursor-pointer focus:outline-none focus:border-green-500 select-none active:scale-95"
      >
        {item}
      </button>
    </div>
  );
}