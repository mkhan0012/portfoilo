"use client";
import { useEffect, useRef } from "react";

export default function WaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let scanY = 0;
    const speed = 3; // Slightly faster for better impact

    // Physics Config
    const gridSize = 40;
    const waveRadius = 150; 
    const waveAmplitude = 10; 

    // DOM Interaction Cache
    let targets: HTMLElement[] = [];
    
    const updateTargets = () => {
      // Find all elements meant to react to the wave
      targets = Array.from(document.querySelectorAll(".scan-target")) as HTMLElement[];
    };

    // Initial fetch and update on resize
    updateTargets();
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      updateTargets();
    };
    window.addEventListener("resize", handleResize);
    
    // Observer to update targets if DOM changes (e.g. expanding a card)
    const observer = new MutationObserver(updateTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // 1. Move Scanline
      scanY += speed;
      if (scanY > height + waveRadius) scanY = -waveRadius;

      // 2. Draw Scanline Beam
      const gradient = ctx.createLinearGradient(0, scanY, width, scanY);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.5)"); // Cyan beam
      gradient.addColorStop(1, "transparent");
      
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#06B6D4";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 3. Draw Grid Points (Background)
      for (let x = 0; x <= width; x += gridSize) {
        for (let y = 0; y <= height; y += gridSize) {
          const dy = y - scanY;
          const dist = Math.abs(dy);
          
          let drawY = y;
          let alpha = 0.1;
          let color = "30, 41, 59"; // Slate-800 default

          if (dist < waveRadius) {
             const wave = Math.cos((dist / waveRadius) * Math.PI * 2);
             drawY = y - (wave * waveAmplitude); 
             const intensity = 1 - (dist / waveRadius);
             alpha = 0.1 + (intensity * 0.5);
             color = "6, 182, 212"; 
          }

          ctx.beginPath();
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.arc(x, drawY, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. INTERACT WITH DOM ELEMENTS (The "Floating Wood" Logic)
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        
        // Calculate the center Y of the element
        const elCenterY = rect.top + rect.height / 2;
        const dist = Math.abs(elCenterY - scanY);

        if (dist < waveRadius) {
          // Calculate Wave Physics
          // Peak (1.0) when scanline is exactly at center
          const intensity = Math.max(0, 1 - (dist / waveRadius));
          
          // Sine wave for the "Bobbing" motion
          // We map the distance to a phase 0..2PI
          const wavePhase = (dist / waveRadius) * Math.PI * 2;
          const offsetY = -Math.cos(wavePhase) * (waveAmplitude * 0.8); // 80% of grid amplitude

          // Write directly to CSS Variables for performance
          // We avoid el.style.transform to play nice with Framer Motion
          el.style.setProperty("--scan-intensity", intensity.toFixed(3));
          el.style.setProperty("--scan-offset", `${offsetY.toFixed(2)}px`);
        } else {
          // Reset if out of range
          el.style.setProperty("--scan-intensity", "0");
          el.style.setProperty("--scan-offset", "0px");
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}