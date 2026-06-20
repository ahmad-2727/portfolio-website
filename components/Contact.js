"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/lib/content";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <section id="contact" className="relative py-28 px-6 max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono text-sm text-cyan terminal-label mb-4"
      >
        contact
      </motion.p>

      <div className="grid md:grid-cols-[1fr_1.3fr] gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6">
            Have a project in mind?
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            Send your details below and I&apos;ll get back to you directly,
            or email me at{" "}
            <a
              href={`mailto:${profile.email}`}
              className="text-cyan hover:underline"
            >
              {profile.email}
            </a>
            .
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="bg-surface border border-border rounded-2xl p-7 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="font-mono text-xs text-muted block mb-2">
                Your name
              </label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyan/50 transition-colors"
                placeholder="Ali Khan"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-muted block mb-2">
                Your email
              </label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyan/50 transition-colors"
                placeholder="ali@example.com"
              />
            </div>
          </div>

          <div>
            <label className="font-mono text-xs text-muted block mb-2">
              Subject
            </label>
            <input
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyan/50 transition-colors"
              placeholder="Project inquiry"
            />
          </div>

          <div>
            <label className="font-mono text-xs text-muted block mb-2">
              Message
            </label>
            <textarea
              required
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              className="w-full bg-surface-2 border border-border rounded-lg px-4 py-2.5 text-sm outline-none focus:border-cyan/50 transition-colors resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan text-bg font-medium text-sm glow-cyan hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {status === "sending" ? "Sending..." : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-sm text-cyan font-mono">
              Message sent. Thanks — I&apos;ll be in touch soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400 font-mono">{errorMsg}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
