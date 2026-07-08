"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/content";

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 px-6 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        projects
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl sm:text-4xl font-semibold mb-12"
      >
        Things I&apos;ve shipped.
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group bg-surface border border-border rounded-2xl p-7 hover:border-cyan/40 transition-colors flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-display text-xl font-semibold">
                {p.name}
              </h3>
              <span
                className={`font-mono text-[10px] px-2 py-1 rounded-full border shrink-0 ml-2 ${
                  p.status === "In Progress"
                    ? "border-violet/40 text-violet"
                    : "border-cyan/40 text-cyan"
                }`}
              >
                {p.status}
              </span>
            </div>
            <p className="font-mono text-xs text-muted mb-3">{p.type}</p>
            <p className="text-sm text-muted leading-relaxed mb-5 flex-1">
              {p.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-surface-2 text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-full border border-cyan/40 text-cyan hover:bg-cyan/10 transition-colors w-fit mt-auto"
              >
                Visit website ↗
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}