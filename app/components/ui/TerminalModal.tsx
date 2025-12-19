"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";
import useSound from "@/app/hooks/useSound";

const COMMANDS = {
  help: "Available commands: help, whoami, projects, contact, clear",
  whoami: "MD Moshin Khan. Full Stack Developer. UX Certified based in Odisha.",
  projects: "Examples: CryptoPlace (React/API), Arguely (Next.js/AI). See homepage for details.",
  contact: "Email: moshink0786@gmail.com | LinkedIn: md-moshin-khan-65510a24b",
};

export default function TerminalModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "init", output: "Welcome to MK-OS Terminal. Type 'help' for commands." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Sounds
  const playKeySound = useSound("/sounds/click.mp3", 0.2); // Lower volume for typing

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    playKeySound();
    if (e.key === "Enter") {
      const cmd = input.trim().toLowerCase();
      let output = "";

      if (cmd === "clear") {
        setHistory([]);
      } else if (cmd in COMMANDS) {
        output = COMMANDS[cmd as keyof typeof COMMANDS];
        setHistory([...history, { cmd, output }]);
      } else if (cmd !== "") {
        output = `Command not found: ${cmd}. Type 'help'.`;
        setHistory([...history, { cmd, output }]);
      }
      setInput("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <div 
            className="w-full max-w-2xl bg-[#0c0c0c] border border-green-500/50 rounded-lg shadow-[0_0_30px_rgba(34,197,94,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-green-500/10 border-b border-green-500/20">
              <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                <Terminal size={16} /> MK-OS TERMINAL
              </div>
              <button onClick={onClose} className="text-green-400 hover:text-white"><X size={18} /></button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-80 overflow-y-auto font-mono text-sm text-green-300 selection:bg-green-500/30 scrollbar-thin scrollbar-thumb-green-500/50 scrollbar-track-transparent">
              {history.map((line, i) => (
                <div key={i} className="mb-2">
                  <div className="flex gap-2">
                     <span className="text-green-500">$</span>
                     <span className="text-white">{line.cmd}</span>
                  </div>
                  <div className="ml-4 whitespace-pre-wrap opacity-80">{line.output}</div>
                </div>
              ))}
              
              {/* Input Line */}
              <div className="flex gap-2 items-center mt-4">
                <span className="text-green-500">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-white caret-green-500"
                  autoFocus
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}