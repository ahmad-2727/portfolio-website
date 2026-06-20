"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all | unread

  const loadMessages = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/messages");
    if (res.status === 401) {
      router.push("/admin/login");
      return;
    }
    const data = await res.json();
    setMessages(data.messages || []);
    setLoading(false);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const handleMarkRead = async (id, read) => {
    await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read } : m))
    );
  };

  const handleDelete = async (id) => {
    await fetch("/api/admin/messages", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const visibleMessages =
    filter === "unread" ? messages.filter((m) => !m.read) : messages;
  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <main className="min-h-screen bg-bg px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs text-cyan terminal-label mb-1">
              admin
            </p>
            <h1 className="font-display text-2xl font-semibold text-text">
              Inbox
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="font-mono text-xs px-4 py-2 rounded-full border border-border text-muted hover:text-text hover:border-cyan/40 transition-colors"
          >
            Log out
          </button>
        </div>

        <div className="flex items-center gap-3 mb-6 font-mono text-xs">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-full border ${
              filter === "all"
                ? "border-cyan/50 text-cyan"
                : "border-border text-muted"
            }`}
          >
            All ({messages.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-3 py-1.5 rounded-full border ${
              filter === "unread"
                ? "border-cyan/50 text-cyan"
                : "border-border text-muted"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {loading ? (
          <p className="text-muted font-mono text-sm">Loading...</p>
        ) : visibleMessages.length === 0 ? (
          <div className="bg-surface border border-dashed border-border rounded-2xl p-10 text-center">
            <p className="text-muted text-sm font-mono">
              No messages here yet. New contact form submissions will show up
              in this list.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleMessages.map((m) => (
              <div
                key={m.id}
                className={`bg-surface border rounded-2xl p-5 ${
                  m.read ? "border-border" : "border-cyan/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-display font-semibold text-text">
                      {m.name}{" "}
                      {!m.read && (
                        <span className="ml-2 font-mono text-[10px] px-2 py-0.5 rounded-full bg-cyan/10 text-cyan border border-cyan/30">
                          new
                        </span>
                      )}
                    </p>
                    <a
                      href={`mailto:${m.email}`}
                      className="font-mono text-xs text-cyan hover:underline"
                    >
                      {m.email}
                    </a>
                  </div>
                  <p className="font-mono text-[11px] text-muted whitespace-nowrap">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-mono text-xs text-violet mb-2">
                  {m.subject}
                </p>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  {m.message}
                </p>
                <div className="flex gap-3 font-mono text-xs">
                  <button
                    onClick={() => handleMarkRead(m.id, !m.read)}
                    className="text-muted hover:text-cyan transition-colors"
                  >
                    Mark as {m.read ? "unread" : "read"}
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-muted hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
