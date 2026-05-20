import Link from "next/link";
import { type ComponentProps } from "react";

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
}

const base =
  "inline-flex items-center gap-2 font-syne font-600 uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent";

const variants = {
  primary:
    "bg-accent text-bg hover:bg-accent-dim px-5 py-2.5 text-sm",
  secondary:
    "border border-border text-text hover:border-accent hover:text-accent px-5 py-2.5 text-sm",
  ghost: "text-text-muted hover:text-accent text-sm px-0 py-1",
};

const sizes = {
  sm: "text-xs px-4 py-2",
  md: "text-sm px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${size !== "md" ? sizes[size] : ""} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
