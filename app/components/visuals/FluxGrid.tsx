"use client";
import { useEffect, useRef } from "react";

export default function FluxGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const clicks = useRef<{ x: number; y: number; age: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let points: Point[] = [];

    // Configuration
    const GAP = 40; // Distance between points
    const RADIUS = 1.5; // Dot size
    const SPRING = 0.1; // Snap back speed
    const FRICTION = 0.90; // Dampening
    const REPULSION = 100; // Mouse push radius

    class Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;

      constructor(x: number, y: number) {
        this.x = this.originX = x;
        this.y = this.originY = y;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        // 1. Mouse Interaction (Repulsion)
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let force = 0;
        let angle = 0;

        if (distance < REPULSION) {
          force = (REPULSION - distance) / REPULSION;
          angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 2;
          this.vy -= Math.sin(angle) * force * 2;
        }

        // 2. Click Shockwaves
        clicks.current.forEach(click => {
            const cdx = click.x - this.x;
            const cdy = click.y - this.y;
            const cDist = Math.sqrt(cdx * cdx + cdy * cdy);
            // The wave is a ring at radius 'click.age * 10'
            const waveRadius = click.age * 20; 
            const distFromWave = Math.abs(cDist - waveRadius);
            
            if (distFromWave < 30) {
                const waveForce = (30 - distFromWave) / 30;
                const cAngle = Math.atan2(cdy, cdx);
                this.vx -= Math.cos(cAngle) * waveForce * 5;
                this.vy -= Math.sin(cAngle) * waveForce * 5;
            }
        });

        // 3. Spring back to origin
        const homeDx = this.originX - this.x;
        const homeDy = this.originY - this.y;
        
        this.vx += homeDx * SPRING;
        this.vy += homeDy * SPRING;

        // 4. Physics
        this.vx *= FRICTION;
        this.vy *= FRICTION;
        this.x += this.vx;
        this.y += this.vy;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Calculate total displacement for color intensity
        const displacement = Math.sqrt(
            Math.pow(this.x - this.originX, 2) + Math.pow(this.y - this.originY, 2)
        );
        
        // Get accent color from CSS variable or fallback
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim() || '#06B6D4';

        ctx.beginPath();
        ctx.arc(this.x, this.y, RADIUS, 0, Math.PI * 2);
        
        // Color logic: Grey by default, Accent color when moved
        if (displacement > 2) {
            ctx.fillStyle = accent;
            ctx.globalAlpha = Math.min(displacement / 20, 1);
        } else {
            ctx.fillStyle = "#334155"; // Slate-700
            ctx.globalAlpha = 0.2;
        }
        
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Initialize Grid
    const init = () => {
      points = [];
      for (let x = 0; x < width; x += GAP) {
        for (let y = 0; y < height; y += GAP) {
          points.push(new Point(x, y));
        }
      }
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      points.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      // Update Shockwaves
      clicks.current = clicks.current.filter(c => c.age < 50); // Remove old waves
      clicks.current.forEach(c => c.age++);

      requestAnimationFrame(animate);
    };

    init();
    animate();

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    const handleClick = (e: MouseEvent) => {
        clicks.current.push({ x: e.clientX, y: e.clientY, age: 0 });
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}