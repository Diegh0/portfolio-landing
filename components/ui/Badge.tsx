interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted" | "outline";
  className?: string;
}

const variants = {
  default: "bg-surface text-text-muted border border-border",
  accent: "bg-accent text-bg",
  muted: "text-text-muted border border-border",
  outline: "border border-accent text-accent",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
