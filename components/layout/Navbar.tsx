"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun, Download } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { NAV_LINKS, PERSONAL } from "@/lib/constants";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-syne font-800 text-base uppercase tracking-[0.12em] text-text hover:text-accent transition-colors"
          aria-label="Diego Fuertes — Inicio"
        >
          <span className="text-accent">D</span>F
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors link-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-4">
          {/* Available indicator */}
          <div className="hidden sm:flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-accent animate-blink"
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted">
              Disponible
            </span>
          </div>

          {/* CV download */}
          <a
            href={PERSONAL.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
            aria-label="Descargar CV"
          >
            <Download size={12} aria-hidden="true" />
            CV
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-text-muted hover:text-accent transition-colors"
            aria-label={
              theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-text-muted hover:text-accent transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Abrir menú"
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bg border-b border-border">
          <ul className="px-6 py-6 flex flex-col gap-6 list-none">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={PERSONAL.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-[0.1em] text-text-muted hover:text-accent transition-colors flex items-center gap-2"
              >
                <Download size={14} aria-hidden="true" />
                Descargar CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
