"use client";
import { useState, useRef, useEffect } from "react";
import { X, Minus, Square } from "lucide-react";

interface Line {
  type: "input" | "output" | "system";
  content: React.ReactNode;
}

// Added onCommand prop to the interface
export default function InteractiveTerminal({ onClose, onCommand }: { onClose: () => void, onCommand?: (cmd: string) => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", content: "Last login: " + new Date().toUTCString() + " on ttys001" },
    { type: "system", content: "Welcome to MK_KERNEL v2.0.4. Type 'help' for commands." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [lines]);

  // Focus input on click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const args = cmd.trim().toLowerCase().split(" ");
    const command = args[0];

    const outputLines: Line[] = [{ type: "input", content: cmd }];

    switch (command) {
      case "help":
        outputLines.push({ 
          type: "output", 
          content: (
            <div className="grid grid-cols-2 gap-4 max-w-sm text-[#06B6D4]">
              <span>about</span> <span>Who am I?</span>
              <span>projects</span> <span>List modules</span>
              <span>contact</span> <span>Open channel</span>
              <span>clear</span> <span>Clear buffer</span>
              <span>matrix</span> <span>???</span>
              <span>exit</span> <span>Close shell</span>
            </div>
          )
        });
        break;
      case "about":
        outputLines.push({ type: "output", content: "Full Stack Architect specializing in React, Node.js, and System Design." });
        break;
      case "projects":
        outputLines.push({ 
          type: "output", 
          content: (
            <div className="flex flex-col gap-1">
              <span>drwxr-x---  CryptoPlace</span>
              <span>drwxr-x---  Arguely</span>
              <span>drwxr-x---  Framework</span>
              <span>drwxr-x---  Focus.bits</span>
            </div>
          ) 
        });
        break;
      case "contact":
        outputLines.push({ type: "output", content: "Opening mail client..." });
        window.open("mailto:moshink0786@gmail.com");
        break;
      
      // NEW MATRIX COMMAND
      case "matrix":
        outputLines.push({ type: "output", content: "Wake up, Neo..." });
        if (onCommand) onCommand("matrix");
        setTimeout(onClose, 1000); 
        break;

      case "clear":
        setLines([]);
        return; // Skip adding input line
      case "exit":
        onClose();
        return;
      case "":
        break;
      default:
        outputLines.push({ type: "output", content: `command not found: ${command}` });
    }

    setLines(prev => [...prev, ...outputLines]);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020408]/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl h-[600px] bg-[#020408]/95 border border-[#1E293B] rounded-lg shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
        
        {/* Title Bar (Mac/Linux Style) */}
        <div className="bg-[#0F172A] border-b border-[#1E293B] p-3 flex items-center justify-between select-none">
          <div className="flex gap-2">
            <div onClick={onClose} className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-[#94A3B8] text-xs">guest@mkhan-system:~</div>
          <div className="w-10"></div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="flex-1 p-4 overflow-y-auto text-[#E2E8F0] space-y-2 custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, i) => (
            <div key={i} className="break-words">
              {line.type === "input" && <span className="text-[#06B6D4] mr-2">➜ ~</span>}
              {line.type === "system" && <span className="text-[#94A3B8] block mb-2">{line.content}</span>}
              {line.type !== "system" && line.content}
            </div>
          ))}
          
          {/* Active Input Line */}
          <div className="flex items-center">
            <span className="text-[#06B6D4] mr-2">➜ ~</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-[#E2E8F0]"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        </div>
      </div>
    </div>
  );
}