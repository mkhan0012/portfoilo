"use client";
import { motion } from "framer-motion";
import { Bug } from "lucide-react";

export default function BugEnemy({ x, y, duration, onKill, onReachTarget }: any) {
    return (
        <motion.div
            initial={{ left: x, top: y, scale: 0 }}
            animate={{ left: '50%', top: '50%', scale: [0, 1, 1] }}
            transition={{ duration: duration, ease: "linear" }}
            onAnimationComplete={onReachTarget}
            onClick={(e) => { e.stopPropagation(); onKill(); }}
            className="absolute z-[100] cursor-crosshair group"
            style={{ x: '-50%', y: '-50%' }}
        >
            <div className="p-2 bg-red-500/20 rounded-full border border-red-500 animate-pulse group-hover:bg-red-500 group-hover:scale-125 transition-all">
                <Bug size={24} className="text-red-500 group-hover:text-black" />
            </div>
        </motion.div>
    );
}