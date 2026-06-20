"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-28 px-6 max-w-6xl mx-auto"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        testimonials
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-semibold mb-12"
      >
        What clients say.
      </motion.h2>

      {testimonials.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-dashed border-border rounded-2xl p-10 text-center"
        >
          <p className="text-muted text-sm font-mono">
            No testimonials yet this space fills in as projects wrap up.
          </p>
        </motion.div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface border border-border rounded-2xl p-6"
            >
              <p className="text-sm text-muted leading-relaxed mb-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="font-mono text-xs text-cyan">{t.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
