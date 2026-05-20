import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { PERSONAL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="border-t border-border mt-32"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <p className="font-mono text-xs text-text-muted uppercase tracking-[0.1em]">
            © {year} Diego Fuertes Moreno
          </p>
          <p className="font-mono text-xs text-text-muted mt-1">
            Diseñado y construido por{" "}
            <span className="text-accent">Diego Fuertes</span>
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={PERSONAL.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="LinkedIn de Diego Fuertes"
          >
            <Linkedin size={16} />
          </a>
          <a
            href={PERSONAL.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="GitHub de Diego Fuertes"
          >
            <Github size={16} />
          </a>
          <a
            href={`mailto:${PERSONAL.email}`}
            className="text-text-muted hover:text-accent transition-colors"
            aria-label="Enviar email a Diego Fuertes"
          >
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
