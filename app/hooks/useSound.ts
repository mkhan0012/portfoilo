"use client";
import { useCallback, useEffect, useRef } from "react";

export default function useSound(soundPath: string, volume: number = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only create audio if we are in the browser
    if (typeof window !== "undefined") {
      const audio = new Audio(soundPath);
      audio.volume = volume;
      
      // Safety: Catch errors if file is missing/unsupported
      audio.onerror = () => {
        console.warn(`Audio missing: ${soundPath}`);
      };

      audioRef.current = audio;
    }
  }, [soundPath, volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      // Check if the audio is ready to play
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Suppress "NotSupportedError" or "Autoplay" errors
          // console.error("Audio playback failed:", error); 
        });
      }
      
      audioRef.current.currentTime = 0;
    }
  }, []);

  return play;
}