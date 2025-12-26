"use client";
import { useState, useEffect, useRef, ReactNode } from "react"; // 1. Import ReactNode

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"];
const PATHS = ["/api/v1/users", "/auth/session", "/api/projects", "/ws/socket", "/db/query", "/graphql"];
const STATUS = [200, 201, 204, 304, 401, 403, 500];

export default function LogStream() {
  // 2. Change type from <string[]> to <ReactNode[]>
  const [logs, setLogs] = useState<ReactNode[]>([]); 
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const addLog = () => {
      const timestamp = new Date().toISOString().split("T")[1].slice(0, -1);
      const method = METHODS[Math.floor(Math.random() * METHODS.length)];
      const path = PATHS[Math.floor(Math.random() * PATHS.length)];
      const status = STATUS[Math.floor(Math.random() * STATUS.length)];
      const latency = Math.floor(Math.random() * 150) + 10;
      
      const color = status >= 500 ? "text-red-500" : status >= 400 ? "text-yellow-500" : "text-green-500";
      
      const line = (
        <div className="flex gap-2 font-mono text-[10px] whitespace-nowrap">
          <span className="text-slate-500">[{timestamp}]</span>
          <span className="text-cyan-600 w-8">{method}</span>
          <span className="text-slate-300 flex-1 truncate">{path}</span>
          <span className={`${color} w-8`}>{status}</span>
          <span className="text-slate-500 w-10 text-right">{latency}ms</span>
        </div>
      );

      setLogs(prev => [...prev.slice(-15), line]);
    };

    const interval = setInterval(addLog, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div ref={scrollRef} className="h-full w-full overflow-hidden flex flex-col justify-end pointer-events-none mask-gradient-b">
      {logs.map((log, i) => (
        <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          {log}
        </div>
      ))}
    </div>
  );
}