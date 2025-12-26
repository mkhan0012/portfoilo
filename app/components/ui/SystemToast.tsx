"use client";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle, Info, X } from "lucide-react";
import { useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

export default function SystemToast({ toasts, removeToast }: { toasts: Toast[], removeToast: (id: string) => void }) {
  return (
    <div className="fixed bottom-12 right-6 z-[200] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            layout
            className="pointer-events-auto min-w-[300px] bg-[#0F172A]/90 backdrop-blur-md border border-[#1E293B] p-4 rounded-xl shadow-2xl flex items-start gap-3 group relative overflow-hidden"
          >
            {/* Type Color Strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${
              toast.type === "success" ? "bg-green-500" : 
              toast.type === "error" ? "bg-red-500" : "bg-[#06B6D4]"
            }`}></div>

            {/* Icon */}
            <div className={`mt-0.5 ${
              toast.type === "success" ? "text-green-500" : 
              toast.type === "error" ? "text-red-500" : "text-[#06B6D4]"
            }`}>
              {toast.type === "success" && <CheckCircle size={16} />}
              {toast.type === "error" && <AlertCircle size={16} />}
              {toast.type === "info" && <Info size={16} />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className={`text-xs font-bold font-mono uppercase ${
                toast.type === "success" ? "text-green-500" : 
                toast.type === "error" ? "text-red-500" : "text-[#06B6D4]"
              }`}>
                {toast.type === "success" ? "SUCCESS" : toast.type === "error" ? "SYSTEM_ERROR" : "INFO_LOG"}
              </h4>
              <p className="text-xs text-[#E2E8F0] mt-1">{toast.message}</p>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-[#94A3B8] hover:text-[#E2E8F0] transition-colors"
            >
              <X size={14} />
            </button>

            {/* Auto-Close Timer Bar */}
            <motion.div 
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-0.5 ${
                toast.type === "success" ? "bg-green-500/50" : 
                toast.type === "error" ? "bg-red-500/50" : "bg-[#06B6D4]/50"
              }`}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}