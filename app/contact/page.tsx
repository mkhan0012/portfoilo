"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Mail, Github, Linkedin, MapPin, Send, Terminal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  // This handles the form submission via Formspree
  async function handleSubmit(event: any) {
    event.preventDefault();
    setFormStatus("submitting");

    const formData = new FormData(event.target);
    
    // REPLACE 'YOUR_FORMSPREE_ID' WITH YOUR ACTUAL ID FROM formspree.io
    const response = await fetch("https://formspree.io/f/mnnjqlqz", { // I added a placeholder ID, replace it!
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setFormStatus("success");
      event.target.reset();
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden selection:bg-green-500/30 flex items-center justify-center p-4 md:p-8">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
        
        {/* LEFT: Contact Info & Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group mb-8">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
            <span className="font-mono text-sm uppercase tracking-widest">Return to Base</span>
          </Link>

          <div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
              Let's <span className="text-green-500">Connect</span>.
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              I am currently open to <span className="text-white font-semibold">Remote, Onsite, and Hybrid</span> opportunities.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-2xl space-y-6 backdrop-blur-md">
             <a href="mailto:moshink0786@gmail.com" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
               <div className="p-3 bg-white/5 rounded-full group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                 <Mail size={20} />
               </div>
               <div>
                 <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">Email</span>
                 <span className="text-lg">moshink0786@gmail.com</span>
               </div>
             </a>

             <a href="https://linkedin.com/in/md-moshin-khan-65510a24b" target="_blank" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
               <div className="p-3 bg-white/5 rounded-full group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                 <Linkedin size={20} />
               </div>
               <div>
                 <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">LinkedIn</span>
                 <span className="text-lg">Connect on LinkedIn</span>
               </div>
             </a>

             <a href="https://github.com/mkhan0012" target="_blank" className="flex items-center gap-4 text-zinc-300 hover:text-white transition-colors group">
               <div className="p-3 bg-white/5 rounded-full group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors">
                 <Github size={20} />
               </div>
               <div>
                 <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">GitHub</span>
                 <span className="text-lg">Check my Repos</span>
               </div>
             </a>

             <div className="flex items-center gap-4 text-zinc-300">
               <div className="p-3 bg-white/5 rounded-full">
                 <MapPin size={20} />
               </div>
               <div>
                 <span className="block text-xs font-mono text-zinc-500 uppercase tracking-wider">Location</span>
                 <span className="text-lg">Odisha, India (Open to Relocate)</span>
               </div>
             </div>
          </div>
        </motion.div>

        {/* RIGHT: Interactive Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl blur opacity-20 pointer-events-none"></div>
          
          <form 
            onSubmit={handleSubmit}
            className="relative bg-black border border-white/10 p-8 rounded-2xl space-y-6 shadow-2xl"
          >
            <div className="flex items-center gap-2 text-green-500 mb-6">
               <Terminal size={18} />
               <span className="text-xs font-mono uppercase tracking-widest">Secure Transmission</span>
            </div>

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-mono text-zinc-500 uppercase">Identity</label>
              <input 
                type="text" 
                name="name" 
                id="name"
                required
                placeholder="Your Name"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-mono text-zinc-500 uppercase">Frequency (Email)</label>
              <input 
                type="email" 
                name="email" 
                id="email"
                required
                placeholder="your@email.com"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-mono text-zinc-500 uppercase">Transmission Data</label>
              <textarea 
                name="message" 
                id="message"
                rows={5}
                required
                placeholder="Tell me about your project..."
                className="w-full bg-zinc-900/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-700 resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={formStatus === "submitting" || formStatus === "success"}
              className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2
                ${formStatus === "success" 
                  ? "bg-green-500 text-black cursor-default" 
                  : "bg-white text-black hover:bg-zinc-200"
                }`}
            >
              {formStatus === "submitting" ? (
                "Sending..."
              ) : formStatus === "success" ? (
                "Message Sent Successfully"
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {formStatus === "success" && (
              <p className="text-center text-green-500 text-sm font-mono animate-pulse">
                // Transmission Received. I will respond shortly.
              </p>
            )}
          </form>
        </motion.div>

      </div>
    </main>
  );
}