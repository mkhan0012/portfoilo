"use client";
import { motion } from "framer-motion";

export default function ActivityGraph() {
  const weeks = 52;
  const days = 7;
  
  return (
    <div className="w-full overflow-hidden">
       <div className="flex gap-1 justify-center md:justify-start">
          {[...Array(weeks)].map((_, w) => (
             <div key={w} className="flex flex-col gap-1">
                {[...Array(days)].map((_, d) => {
                    const active = Math.random() > 0.6;
                    const color = active 
                        ? (Math.random() > 0.8 ? "bg-green-400" : "bg-green-500/40")
                        : "bg-white/5";
                    return (
                        <motion.div 
                            key={d}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: (w * 0.01) + (d * 0.01) }}
                            className={`w-2 h-2 md:w-3 md:h-3 rounded-sm ${color}`}
                        />
                    );
                })}
             </div>
          ))}
       </div>
    </div>
  );
}