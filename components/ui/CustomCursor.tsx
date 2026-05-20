"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const onEnterInteractive = () => {
      cursorRef.current?.classList.add("cursor-hover");
    };
    const onLeaveInteractive = () => {
      cursorRef.current?.classList.remove("cursor-hover");
    };

    const updateInteractiveListeners = () => {
      document
        .querySelectorAll("a, button, [role='button'], input, textarea, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", onEnterInteractive);
          el.addEventListener("mouseleave", onLeaveInteractive);
        });
    };

    let rafId: number;
    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.12;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    updateInteractiveListeners();
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor {
          position: fixed;
          top: -20px;
          left: -20px;
          width: 40px;
          height: 40px;
          border: 1px solid var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 99999;
          mix-blend-mode: difference;
          transition: width 0.2s ease, height 0.2s ease, background 0.2s ease;
          will-change: transform;
        }
        .custom-cursor.cursor-hover {
          width: 56px;
          height: 56px;
          top: -28px;
          left: -28px;
          background: var(--accent);
          opacity: 0.15;
        }
        .cursor-dot {
          position: fixed;
          top: -3px;
          left: -3px;
          width: 6px;
          height: 6px;
          background: var(--accent);
          border-radius: 50%;
          pointer-events: none;
          z-index: 100000;
          will-change: transform;
        }
        @media (hover: none) {
          .custom-cursor, .cursor-dot { display: none; }
        }
      `}</style>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
