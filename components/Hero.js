"use client";

import { motion } from "framer-motion";
import Hero3D from "./Hero3D";
import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 grid-fade pointer-events-none" />
      <Hero3D />
      <div className="absolute inset-0 bg-gradient-to-b from-bg/10 via-transparent to-bg/70 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <motion.p
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm text-cyan mb-5 terminal-label"
        >
          status | available for freelance work
        </motion.p>

        <motion.h1
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold leading-[1.05] max-w-3xl text-white"
        >
          {profile.name.split(" ")[0]} {profile.name.split(" ")[1]}{" "}
          <span className="text-gradient">{profile.name.split(" ")[2]}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-muted max-w-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 1, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-cyan text-bg font-medium text-sm glow-cyan hover:scale-[1.03] transition-transform"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-border text-text font-medium text-sm hover:border-cyan/50 transition-colors"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-muted flex flex-col items-center gap-2"
      >
        <span>scroll</span>
        <span className="w-px h-8 bg-gradient-to-b from-cyan to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}