"use client";
import { motion } from "framer-motion";

const TECHS = [
  "Next.js 15", "React 19", "TypeScript", "Node.js", "PostgreSQL", 
  "Docker", "Kubernetes", "AWS Lambda", "Redis", "Prisma ORM", 
  "Tailwind CSS", "Framer Motion", "GraphQL", "WebSockets", "Python"
];

export default function TechTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#020408]/80 border-y border-[#1E293B] py-2 relative select-none">
      {/* Fade Gradients */}
      <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#020408] to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#020408] to-transparent z-10"></div>

      <motion.div 
        className="flex whitespace-nowrap gap-12"
        animate={{ x: [0, -1000] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 30 
        }}
      >
        {/* Double the list to create seamless loop */}
        {[...TECHS, ...TECHS].map((tech, i) => (
          <div key={i} className="flex items-center gap-2 text-[#94A3B8] font-mono text-xs uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-[#1E293B] rotate-45"></span>
            {tech}
          </div>
        ))}
      </motion.div>
    </div>
  );
}