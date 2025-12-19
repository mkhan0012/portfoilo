"use client";
import { useEffect, useRef } from "react";

export default function MatrixRain({ isAlert }: { isAlert: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const columns = Math.floor(width / 20);
    const drops: number[] = new Array(columns).fill(1);
    const chars = "010101XYZSYSTEM_FAILURE警告するエラー";

    const draw = () => {
      ctx.fillStyle = isAlert ? "rgba(20, 0, 0, 0.1)" : "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = isAlert ? "#ef4444" : "#22c55e"; 
      ctx.font = "15px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    const handleResize = () => {
       width = canvas.width = window.innerWidth;
       height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, [isAlert]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none transition-opacity duration-1000" />;
}