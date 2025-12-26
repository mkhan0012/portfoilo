"use client";
import { Copy, Terminal } from "lucide-react";

export default function CodeWindow({ code, language = "typescript" }: { code: string, language?: string }) {
  return (
    <div className="w-full rounded-xl overflow-hidden border border-[#1E293B] bg-[#020408]/90 font-mono text-sm shadow-2xl relative group">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-[#1E293B]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span className="text-[#94A3B8] text-xs ml-2 flex items-center gap-1">
            <Terminal size={10} /> source.tsx
          </span>
        </div>
        <div className="text-[10px] text-[#06B6D4] opacity-50 uppercase">{language}</div>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="text-[#E2E8F0] leading-relaxed">
          <code>
            {code.split('\n').map((line, i) => (
              <div key={i} className="table-row">
                <span className="table-cell text-right pr-4 select-none text-[#1E293B] w-8">{i + 1}</span>
                <span className="table-cell">
                  {/* Simple Syntax Highlighting Simulation */}
                  {line.split(' ').map((word, j) => {
                    if (word.includes('import') || word.includes('export') || word.includes('const') || word.includes('return')) 
                      return <span key={j} className="text-[#C084FC] mr-1.5">{word}</span>;
                    if (word.includes('function') || word.includes('=>')) 
                      return <span key={j} className="text-[#06B6D4] mr-1.5">{word}</span>;
                    if (word.includes('"') || word.includes("'") || word.includes('`')) 
                      return <span key={j} className="text-[#34D399] mr-1.5">{word}</span>;
                    if (word.includes('//')) 
                      return <span key={j} className="text-[#475569] mr-1.5 italic">{word} {line.split('//')[1]}</span>;
                    return <span key={j} className="mr-1.5">{word}</span>;
                  })}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
      
      {/* Copy Button */}
      <button className="absolute top-12 right-4 p-2 rounded bg-[#1E293B]/50 text-[#94A3B8] hover:text-[#E2E8F0] opacity-0 group-hover:opacity-100 transition-all">
        <Copy size={14} />
      </button>
    </div>
  );
}