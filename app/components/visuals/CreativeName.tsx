"use client";
import { useState } from "react";

export default function CreativeName({ text }: { text: string }) {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";

  const scramble = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 5; 
    }, 60);
  };

  return (
    <div className="relative group inline-block cursor-help" onMouseEnter={scramble} onClick={scramble}>
      <span className="relative z-10">{display}</span>
    </div>
  );
}