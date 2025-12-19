"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X, Play } from "lucide-react";

type GameItem = {
  id: number;
  x: number;
  y: number;
  type: "good" | "bad";
  speed: number;
  size: number;
  char: string;
};

export default function DataRunner({ isActive, onClose }: { isActive: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);
  const playerX = useRef(0);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    scoreRef.current = 0;
    gameOverRef.current = false;
  };

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let items: GameItem[] = [];
    let frameCount = 0;
    const playerY = height - 100;
    const playerSize = 20;
    playerX.current = width / 2;

    const handleMove = (x: number) => { playerX.current = x; };
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });

    const render = () => {
      if (gameOverRef.current) return;
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      // Player
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#22c55e";
      ctx.fillStyle = "#22c55e";
      ctx.beginPath();
      ctx.moveTo(playerX.current, playerY);
      ctx.lineTo(playerX.current - playerSize, playerY + playerSize * 1.5);
      ctx.lineTo(playerX.current + playerSize, playerY + playerSize * 1.5);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Spawn
      if (frameCount % 30 === 0) {
        const isGood = Math.random() > 0.7;
        items.push({
          id: Math.random(),
          x: Math.random() * width,
          y: -50,
          type: isGood ? "good" : "bad",
          speed: (Math.random() * 3 + 4) + (scoreRef.current / 500),
          size: isGood ? 20 : 30,
          char: isGood ? "♦" : "█",
        });
      }

      // Draw Items
      items.forEach((item, index) => {
        item.y += item.speed;
        ctx.font = `bold ${item.size}px monospace`;
        ctx.fillStyle = item.type === "good" ? "#00ffff" : "#ef4444";
        ctx.fillText(item.char, item.x, item.y);

        // Collision
        const dist = Math.hypot(playerX.current - item.x, playerY - item.y);
        if (dist < playerSize + item.size) {
          if (item.type === "good") {
            scoreRef.current += 50;
            setScore(scoreRef.current);
            items.splice(index, 1);
          } else {
            gameOverRef.current = true;
            setGameOver(true);
          }
        }
        if (item.y > height) items.splice(index, 1);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <button onClick={onClose} className="absolute top-6 right-6 z-50 p-3 bg-red-500/20 rounded-full border border-red-500 text-red-500">
        <X size={24} />
      </button>

      {!gameOver && (
        <div className="absolute top-6 left-6 z-50 font-mono text-cyan-400 text-xl font-bold tracking-widest pointer-events-none">
          SCORE: {score}
        </div>
      )}

      {gameOver && (
        <div className="relative z-50 bg-black border border-red-500 p-8 rounded-2xl text-center space-y-6 shadow-[0_0_50px_rgba(239,68,68,0.5)]">
          <h2 className="text-4xl font-black text-red-500">SYSTEM FAILURE</h2>
          <p className="text-white font-mono text-xl">SCORE: {score}</p>
          <button onClick={restartGame} className="w-full py-3 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
            <Play size={20} /> RETRY
          </button>
        </div>
      )}
    </div>
  );
}