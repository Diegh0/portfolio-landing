import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main
        id="main-content"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-6">
            Error 404
          </p>
          <h1 className="font-syne font-800 text-8xl lg:text-[12rem] tracking-[-0.05em] text-text mb-6">
            404
          </h1>
          <p className="font-mono text-sm text-text-muted mb-10">
            Esta página no existe. Quizás se mudó, quizás nunca existió.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-accent text-bg font-syne font-700 text-sm uppercase tracking-[0.08em] px-6 py-3 hover:bg-accent-dim transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
