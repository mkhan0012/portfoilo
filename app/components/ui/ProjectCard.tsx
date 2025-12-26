"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scan, ChevronDown, ExternalLink, Hash, Code2 } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ title, description, stack, image, link, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      layout
      onClick={() => setIsOpen(!isOpen)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // THE FIX: Precise spring physics instead of linear duration
      transition={{ 
        layout: { type: "spring", stiffness: 100, damping: 15 },
        opacity: { duration: 0.3 }
      }}
      className={`group relative h-full flex flex-col rounded-xl border cursor-pointer overflow-hidden transition-colors duration-500
        ${isOpen 
          ? "bg-gradient-to-b from-[#0F172A] to-[#020617] border-[#06B6D4] shadow-[0_0_50px_rgba(6,182,212,0.15)] z-10" 
          : "bg-gradient-to-b from-[#0F172A]/80 to-[#020617]/80 border-[#1E293B]/60 hover:border-[#06B6D4] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]"
        }`}
    >
      {/* IMAGE SECTION */}
      <motion.div layout className="relative w-full aspect-video overflow-hidden border-b border-[#1E293B]/50 bg-[#020408]">
         <Image 
           src={image} 
           alt={title} 
           fill 
           className={`object-cover object-top transition-all duration-700 ease-in-out
             ${isOpen 
               ? "scale-100 opacity-100 filter-none" 
               : "scale-110 opacity-60 group-hover:scale-100 group-hover:opacity-100 grayscale-[0.8] group-hover:grayscale-0"
             }`} 
         />
         
         {/* System ID Badge */}
         <div className="absolute top-3 right-3 px-2 py-1 bg-[#020408]/80 backdrop-blur-md border border-[#1E293B] rounded text-[10px] font-mono text-[#06B6D4] flex items-center gap-1 z-10">
            <Hash size={10} /> {`SYS_0${index + 1}`}
         </div>

         {/* Overlay Prompt */}
         <div className={`absolute inset-0 bg-[#020408]/60 flex items-center justify-center transition-all duration-500 ${!isOpen ? "opacity-0 group-hover:opacity-100 backdrop-blur-[2px]" : "opacity-0 pointer-events-none"}`}>
            <div className="px-5 py-2 rounded border border-[#06B6D4] bg-[#0F172A]/90 text-xs font-bold text-[#E2E8F0] tracking-[0.2em] flex items-center gap-3 shadow-[0_0_20px_rgba(6,182,212,0.3)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <Scan size={14} className="text-[#06B6D4] animate-pulse"/>
               ACCESS NODE
            </div>
         </div>
      </motion.div>

      {/* CONTENT SECTION */}
      <motion.div layout className="p-6 flex flex-col flex-grow relative">
         
         <motion.div layout="position" className="flex justify-between items-start gap-4">
            <div className="space-y-1">
                <h3 className={`text-2xl font-bold leading-none tracking-tight transition-colors duration-300 ${isOpen ? "text-[#06B6D4]" : "text-[#E2E8F0]"}`}>
                  {title}
                </h3>
                {!isOpen && (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }} 
                     transition={{ duration: 0.5 }}
                     className="text-[10px] font-mono text-[#3B82F6] uppercase tracking-widest"
                   >
                      /// SECURE CONNECTION
                   </motion.div>
                )}
            </div>
            
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0 }} 
              transition={{ duration: 0.4 }}
              className={`flex-shrink-0 p-2 rounded border transition-colors duration-300 ${isOpen ? "bg-[#06B6D4] border-[#06B6D4] text-[#020408]" : "bg-transparent border-[#1E293B] text-[#94A3B8] group-hover:border-[#06B6D4] group-hover:text-[#06B6D4]"}`}
            >
               <ChevronDown size={18} strokeWidth={3} />
            </motion.div>
         </motion.div>

         <AnimatePresence>
            {isOpen && (
               <motion.div 
                 initial={{ opacity: 0, height: 0, marginTop: 0 }} 
                 animate={{ opacity: 1, height: "auto", marginTop: 20 }} 
                 exit={{ opacity: 0, height: 0, marginTop: 0 }} 
                 // Smooth expansion easing
                 transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }} 
                 className="flex flex-col gap-6"
               >
                  <div className="relative h-px w-full bg-[#1E293B]">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "25%" }}
                       transition={{ duration: 1, delay: 0.2 }}
                       className="absolute left-0 top-0 h-full bg-[#06B6D4]"
                     />
                  </div>
                  
                  <p className="text-[#94A3B8] text-sm leading-7 font-light tracking-wide">
                    {description}
                  </p>
                  
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 text-[10px] font-bold text-[#3B82F6] uppercase tracking-widest">
                        <Code2 size={12}/> Modules
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {stack.map((tech: any, i: number) => (
                           <span key={i} className="px-3 py-1.5 bg-[#020408]/30 text-[#E2E8F0] text-[10px] font-mono rounded border border-[#1E293B] hover:border-[#06B6D4]/50 transition-colors cursor-default backdrop-blur-sm">
                             {tech.name || tech}
                           </span>
                        ))}
                     </div>
                  </div>
                  
                  <a href={link} target="_blank" onClick={(e) => e.stopPropagation()} className="group/btn relative mt-2 w-full flex items-center justify-center gap-3 px-6 py-4 rounded border border-[#06B6D4] bg-[#06B6D4]/10 text-[#06B6D4] font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-300 hover:bg-[#06B6D4] hover:text-[#020408] shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                      <span className="relative z-10 flex items-center gap-2">Execute <ExternalLink size={14} strokeWidth={3}/></span>
                  </a>
               </motion.div>
            )}
         </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}