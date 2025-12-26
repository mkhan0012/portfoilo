"use client";

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#020408] overflow-hidden pointer-events-none transform-gpu">
      
      {/* 1. TOP-RIGHT: Electric Cyan */}
      <div className="absolute -top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[#06B6D4] blur-[140px] opacity-20 animate-blob-1 mix-blend-screen"></div>

      {/* 2. BOTTOM-LEFT: Royal Blue */}
      <div className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-[#3B82F6] blur-[160px] opacity-15 animate-blob-2 mix-blend-screen"></div>

      {/* 3. CENTER: Pale Indigo */}
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-[#818CF8] blur-[120px] opacity-5 animate-blob-1 mix-blend-screen"></div>

      {/* 4. TEXTURE: Cinematic Grain */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* 5. VIGNETTE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020408_110%)]"></div>
    </div>
  );
}