"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/content";

const categories = ["Web", "Desktop", "Database"];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 px-6 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        skills
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-semibold mb-12"
      >
        Tools I build with.
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-6">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
            className="bg-surface border border-border rounded-2xl p-6"
          >
            <div className="font-mono text-xs text-muted mb-5">{cat}</div>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.category === cat)
                .map((s) => (
                  <span
                    key={s.name}
                    className="font-mono text-xs px-3 py-1.5 rounded-md bg-surface-2 border border-border text-text hover:border-cyan/40 hover:text-cyan transition-colors"
                  >
                    {s.name}
                  </span>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
