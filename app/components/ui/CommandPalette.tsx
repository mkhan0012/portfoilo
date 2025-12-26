"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Copy, Terminal, FileText, Github, Mail, Hash } from "lucide-react";

const COMMANDS = [
  { id: "home", label: "Go to Home", icon: Hash, action: "nav", target: "identity" },
  { id: "projects", label: "View Deployments", icon: Terminal, action: "nav", target: "projects" },
  { id: "stack", label: "Inspect Tech Stack", icon: Hash, action: "nav", target: "skills" },
  { id: "contact", label: "Contact Me", icon: Mail, action: "nav", target: "contact" },
  { id: "email", label: "Copy Email Address", icon: Copy, action: "copy", value: "moshink0786@gmail.com" },
  { id: "github", label: "Open Github", icon: Github, action: "link", value: "https://github.com/mkhan0012" },
  { id: "resume", label: "View Resume", icon: FileText, action: "link", value: "/resume" }, // Opens the new page
];

export default function CommandPalette({ isOpen, onClose, onNavigate, onToast }: { isOpen: boolean, onClose: () => void, onNavigate: (id: string) => void, onToast: (msg: string, type: "success" | "error" | "info") => void}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  
  // Filter commands based on search
  const filteredCommands = COMMANDS.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands]);

  const executeCommand = (cmd: any) => {
    if (!cmd) return;
    
    if (cmd.action === "nav") {
      onNavigate(cmd.target);
    } else if (cmd.action === "link") {
      window.open(cmd.value, "_blank");
    } else if (cmd.action === "copy") {
      navigator.clipboard.writeText(cmd.value);
      // alert("Email copied!");  <--- REMOVE THIS
      onToast("Frequency copied to clipboard.", "success"); // <--- ADD THIS
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh] bg-[#020408]/80 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-full max-w-lg bg-[#0F172A] border border-[#1E293B] rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 px-4 py-4 border-b border-[#1E293B]">
              <Search className="text-[#94A3B8]" size={18} />
              <input 
                autoFocus
                type="text" 
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-[#E2E8F0] placeholder-[#475569] outline-none text-sm font-medium"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="text-[10px] font-mono text-[#94A3B8] border border-[#1E293B] px-1.5 py-0.5 rounded">ESC</div>
            </div>

            {/* Results List */}
            <div className="max-h-[300px] overflow-y-auto p-2 custom-scrollbar">
              {filteredCommands.length === 0 ? (
                <div className="p-8 text-center text-[#94A3B8] text-xs">No commands found.</div>
              ) : (
                filteredCommands.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => executeCommand(cmd)}
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-all duration-200 group ${
                      i === selectedIndex ? "bg-[#06B6D4] text-[#020408]" : "text-[#94A3B8] hover:bg-[#1E293B]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <cmd.icon size={16} className={i === selectedIndex ? "text-[#020408]" : "text-[#06B6D4]"} />
                      <span className="font-medium">{cmd.label}</span>
                    </div>
                    {i === selectedIndex && <ArrowRight size={14} className="animate-in slide-in-from-left-2" />}
                  </button>
                ))
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 bg-[#020408]/50 border-t border-[#1E293B] flex justify-between items-center text-[10px] text-[#94A3B8] font-mono">
               <span>mkhan_system_v2.0</span>
               <div className="flex gap-3">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}