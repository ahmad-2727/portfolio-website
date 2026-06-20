"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        about
      </motion.p>

      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-semibold leading-tight mb-6">
            Two disciplines,
            <br />
            <span className="text-gradient">one build process.</span>
          </h2>
          <p className="text-muted text-lg leading-relaxed">
            {profile.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="bg-surface border border-border rounded-2xl p-6"
        >
          <div className="font-mono text-xs text-muted mb-4">
            // current focus
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan shrink-0" />
              <span>Building e-commerce platforms with React &amp; Node.js</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet shrink-0" />
              <span>Maintaining Python desktop systems for real businesses</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan shrink-0" />
              <span>Working independently, end-to-end, on every project</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
