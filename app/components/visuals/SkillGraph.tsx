"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Defined relationships (Nodes and Edges)
const NODES = [
  { id: "react", x: 20, y: 30, label: "React" },
  { id: "next", x: 40, y: 20, label: "Next.js" },
  { id: "ts", x: 60, y: 40, label: "TS" },
  { id: "node", x: 80, y: 70, label: "Node" },
  { id: "db", x: 50, y: 80, label: "SQL" },
  { id: "aws", x: 20, y: 70, label: "AWS" },
];

const LINKS = [
  { from: "react", to: "next" },
  { from: "next", to: "ts" },
  { from: "next", to: "node" },
  { from: "node", to: "db" },
  { from: "node", to: "aws" },
  { from: "react", to: "ts" },
];

export default function SkillGraph() {
  return (
    <div className="relative w-full h-full min-h-[150px]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {LINKS.map((link, i) => {
          const start = NODES.find(n => n.id === link.from);
          const end = NODES.find(n => n.id === link.to);
          if (!start || !end) return null;
          return (
            <motion.line
              key={i}
              x1={`${start.x}%`}
              y1={`${start.y}%`}
              x2={`${end.x}%`}
              y2={`${end.y}%`}
              stroke="#1E293B"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}
      </svg>

      {NODES.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-[#020408] border border-[#06B6D4] rounded-full px-2 py-1 text-[9px] text-[#06B6D4] font-mono shadow-[0_0_10px_rgba(6,182,212,0.2)] z-10"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: i * 0.1 }}
          whileHover={{ scale: 1.2, borderColor: "#E2E8F0", color: "#E2E8F0", zIndex: 50 }}
        >
          {node.label}
        </motion.div>
      ))}
    </div>
  );
}