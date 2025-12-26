"use client";
import { Download, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import CyberBackground from "../components/visuals/CyberBackground";
import WaveGrid from "../components/visuals/WaveGrid";

export default function ResumePage() {
  return (
    <main className="h-screen w-full bg-[#020408] overflow-hidden relative font-sans">
      
      {/* BACKGROUND LAYERS */}
      <CyberBackground />
      <WaveGrid />
      <div className="fixed inset-0 pointer-events-none z-[10] bg-[radial-gradient(circle_at_center,transparent_40%,#020408_100%)]"></div>

      {/* HEADER */}
      <div className="relative z-20 flex justify-between items-center px-8 py-6 border-b border-[#1E293B] bg-[#020408]/80 backdrop-blur-md">
         <Link href="/" className="flex items-center gap-2 text-[#94A3B8] hover:text-[#06B6D4] transition-colors">
            <ArrowLeft size={18} />
            <span className="font-mono text-xs font-bold tracking-widest">RETURN TO BASE</span>
         </Link>
         
         <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-[#06B6D4] animate-pulse">
               <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]"></div>
               <span className="text-[10px] font-mono">SECURE_VIEWER_ACTIVE</span>
            </div>
            <a 
              href="/resume.pdf" 
              download
              className="flex items-center gap-2 px-4 py-2 bg-[#06B6D4] text-[#020408] text-xs font-bold rounded hover:bg-[#38BDF8] transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
               <Download size={14} />
               <span>SAVE FILE</span>
            </a>
         </div>
      </div>

      {/* PDF VIEWER CONTAINER */}
      <div className="relative z-20 h-[calc(100vh-80px)] p-4 md:p-8 flex justify-center">
         <div className="w-full max-w-5xl h-full bg-[#0F172A] border border-[#1E293B] rounded-2xl overflow-hidden shadow-2xl relative group">
            
            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#06B6D4] z-30"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#06B6D4] z-30"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#06B6D4] z-30"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#06B6D4] z-30"></div>

            {/* The PDF Embed */}
            <iframe 
              src="/resume.pdf" 
              className="w-full h-full border-none bg-white/90"
              title="Resume PDF"
            />
            
            {/* Overlay if PDF fails to load or for style */}
            <div className="absolute inset-0 pointer-events-none border border-[#06B6D4]/20 rounded-2xl z-20"></div>
         </div>
      </div>
    </main>
  );
}