"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/content";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 px-6 max-w-6xl mx-auto"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        experience
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-semibold mb-12"
      >
        How I work.
      </motion.h2>

      <div className="space-y-6">
        {experience.map((e, i) => (
          <motion.div
            key={e.role}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-l-2 border-cyan/30 pl-6 py-2"
          >
            <span className="font-mono text-xs text-violet w-32 shrink-0">
              {e.duration}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold">
                {e.role}
                <span className="text-muted font-body text-base font-normal">
                  {" "}
                  | {e.place}
                </span>
              </h3>
              <p className="text-sm text-muted mt-1 max-w-2xl">
                {e.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
