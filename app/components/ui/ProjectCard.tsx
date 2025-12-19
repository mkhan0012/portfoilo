"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, ChevronDown, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ title, description, stack, image, link, colorClass, borderColor }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      className={`relative rounded-3xl overflow-hidden border backdrop-blur-sm cursor-pointer transition-colors duration-500 ${isOpen ? `bg-zinc-900 border-${borderColor}-500` : "bg-zinc-900/60 border-white/10 hover:border-white/30"}`}
    >
      <motion.div layout className="relative w-full aspect-video overflow-hidden">
         <Image src={image} alt={title} fill className={`object-cover object-top transition-all duration-700 ${isOpen ? "scale-100 opacity-100" : "scale-105 opacity-80 group-hover:scale-100 group-hover:opacity-100"}`} />
         {!isOpen && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
               <div className="bg-black/80 px-4 py-2 rounded-full border border-white/20 text-xs font-mono flex items-center gap-2">
                  <Scan size={14} className="text-green-500 animate-pulse"/>
                  CLICK TO DECRYPT
               </div>
            </div>
         )}
      </motion.div>

      <motion.div layout className="p-6 md:p-8">
         <motion.div layout="position" className="flex justify-between items-start mb-4">
            <h3 className={`text-3xl font-bold text-white ${isOpen ? colorClass : ""}`}>{title}</h3>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={`p-2 rounded-full ${isOpen ? "bg-white/10" : "bg-transparent"}`}>
               <ChevronDown size={24} className={isOpen ? "text-white" : "text-zinc-500"}/>
            </motion.div>
         </motion.div>

         <AnimatePresence>
            {isOpen && (
               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="space-y-6">
                  <div className="h-px w-full bg-white/10"></div>
                  <div className="text-zinc-300 leading-relaxed text-sm whitespace-pre-line">{description}</div>
                  <div className="flex flex-wrap gap-2">
                     {stack.map((tech: any, i: number) => (
                        <span key={i} className={`px-3 py-1 bg-opacity-10 text-xs font-mono rounded-full border border-opacity-20 ${tech.color}`}>{tech.name}</span>
                     ))}
                  </div>
                  <a href={link} target="_blank" onClick={(e) => e.stopPropagation()} className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all ${colorClass === "text-cyan-400" ? "bg-cyan-600 hover:bg-cyan-500" : "bg-purple-600 hover:bg-purple-500"} text-white`}>
                     Launch Project <ExternalLink size={16}/>
                  </a>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}