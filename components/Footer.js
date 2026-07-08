import { profile } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-5 font-mono text-xs text-muted">
          <a href={profile.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            GitHub
          </a>
          <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            LinkedIn
          </a>
          <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
}