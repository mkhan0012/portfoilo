"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, MapPin, Send, Terminal, User, MessageSquare } from "lucide-react";

// Updated Interface to accept onToast
interface ContactFormProps {
  onToast?: (msg: string, type: "success" | "error") => void;
}

export default function ContactForm({ onToast }: ContactFormProps) {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormStatus("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xjgbkeoj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus("success");
        // Trigger Success Toast
        if (onToast) onToast("Transmission sent successfully.", "success");
        
        form.reset();
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        // Handle non-200 responses
        if (onToast) onToast("Transmission rejected by server.", "error");
        setFormStatus("idle");
      }
    } catch (error) {
      console.error("Submission failed", error);
      // Trigger Error Toast
      if (onToast) onToast("Network Failure. Transmission aborted.", "error");
      setFormStatus("idle");
    }
  }

  return (
    <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 relative overflow-y-auto custom-scrollbar">
      
      {/* Background Grid for Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* LEFT: INFO TERMINAL */}
      <div className="space-y-8 relative z-10 flex flex-col justify-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-xs font-mono mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)]"></span>
            SIGNAL_STRENGTH: 100%
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-[#E2E8F0] mb-4">
            INITIALIZE <br/> <span className="text-[var(--accent)]">HANDSHAKE</span>
          </h1>
          <p className="text-[#94A3B8] text-lg font-light leading-relaxed max-w-md border-l-2 border-[#1E293B] pl-4">
            I am currently available for <span className="text-[var(--accent)] font-bold">Remote & Hybrid</span> architectural roles.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="space-y-4">
            {[
              { icon: Mail, label: "EMAIL FREQUENCY", val: "moshink0786@gmail.com", href: "mailto:moshink0786@gmail.com" },
              { icon: Linkedin, label: "LINKEDIN NETWORK", val: "Connect Profile", href: "https://linkedin.com/in/md-moshin-khan-65510a24b" },
              { icon: Github, label: "CODE REPOSITORY", val: "github.com/mkhan0012", href: "https://github.com/mkhan0012" },
              { icon: MapPin, label: "OPERATIONAL BASE", val: "Odisha, India", href: "#" }
            ].map((item, i) => (
              <a key={i} href={item.href} target={item.icon !== MapPin ? "_blank" : "_self"} className="flex items-center gap-4 p-4 bg-[#020408]/50 border border-[#1E293B] rounded-xl hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group">
                <div className="p-3 bg-[#1E293B]/50 rounded-lg text-[var(--accent)] group-hover:scale-110 transition-transform">
                  <item.icon size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest">{item.label}</span>
                  <span className="text-[#E2E8F0] font-medium group-hover:text-[var(--accent)] transition-colors">{item.val}</span>
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* RIGHT: TRANSMISSION FORM */}
      <div className="relative z-10">
        <form 
          onSubmit={handleSubmit}
          className="bg-[#0F172A]/50 backdrop-blur-md border border-[#1E293B] p-8 rounded-3xl space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.2)] relative group"
        >
          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[var(--accent)]/30 rounded-tr-3xl group-hover:border-[var(--accent)] transition-colors"></div>

          <div className="flex items-center gap-2 text-[var(--accent)] mb-8 border-b border-[#1E293B] pb-4">
             <Terminal size={18} />
             <span className="text-xs font-mono uppercase tracking-widest">SECURE_TRANSMISSION_UPLINK</span>
          </div>

          <div className="space-y-6">
            <div className="group/input">
              <label className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-2 block group-focus-within/input:text-[var(--accent)]">Identity Name</label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 text-[#94A3B8] group-focus-within/input:text-[var(--accent)]" size={18} />
                <input 
                  type="text" 
                  name="name" 
                  required
                  placeholder="Enter identification..."
                  className="w-full bg-[#020408] border border-[#1E293B] rounded-xl py-3 pl-12 pr-4 text-[#E2E8F0] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder:text-[#94A3B8]/30 font-mono text-sm"
                />
              </div>
            </div>

            <div className="group/input">
              <label className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-2 block group-focus-within/input:text-[var(--accent)]">Comms Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-[#94A3B8] group-focus-within/input:text-[var(--accent)]" size={18} />
                <input 
                  type="email" 
                  name="email" 
                  required
                  placeholder="name@sector.com"
                  className="w-full bg-[#020408] border border-[#1E293B] rounded-xl py-3 pl-12 pr-4 text-[#E2E8F0] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder:text-[#94A3B8]/30 font-mono text-sm"
                />
              </div>
            </div>

            <div className="group/input">
              <label className="text-[10px] font-mono text-[#94A3B8] uppercase tracking-widest mb-2 block group-focus-within/input:text-[var(--accent)]">Data Packet</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-3.5 text-[#94A3B8] group-focus-within/input:text-[var(--accent)]" size={18} />
                <textarea 
                  name="message" 
                  rows={4}
                  required
                  placeholder="Enter transmission data..."
                  className="w-full bg-[#020408] border border-[#1E293B] rounded-xl py-3 pl-12 pr-4 text-[#E2E8F0] focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all placeholder:text-[#94A3B8]/30 font-mono text-sm resize-none"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={formStatus === "submitting" || formStatus === "success"}
            className={`w-full py-4 rounded-xl font-bold font-mono tracking-widest transition-all flex items-center justify-center gap-2 border
              ${formStatus === "success" 
                ? "bg-[var(--accent)]/20 border-[var(--accent)] text-[var(--accent)] cursor-default" 
                : "bg-[var(--accent)] border-[var(--accent)] text-[#020408] hover:brightness-110 hover:scale-[1.02]"
              }`}
          >
            {formStatus === "submitting" ? (
              <span className="animate-pulse">SENDING_PACKET...</span>
            ) : formStatus === "success" ? (
              "TRANSMISSION_COMPLETE"
            ) : (
              <>
                INITIATE_SEND <Send size={16} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}