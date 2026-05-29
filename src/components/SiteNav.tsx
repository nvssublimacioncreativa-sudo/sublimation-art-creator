import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/dia-del-padre", label: "Día del Padre" },
  { to: "/mundial-2026", label: "Mundial 2026" },
  { to: "/como-sublimar", label: "Guía" },
  { to: "/faq", label: "FAQ" },
] as const;

export function SiteNav() {
  return (
    <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
        <Link to="/" className="flex items-center gap-2 mr-auto">
          <div className="size-9 rounded-lg bg-primary text-primary-foreground grid place-items-center">
            <Sparkles className="size-5" />
          </div>
          <div>
            <div className="font-bold text-lg leading-tight">Sublimarte</div>
            <div className="text-xs text-muted-foreground">Diseños IA para sublimar</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1 flex-wrap text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              activeProps={{ className: "px-3 py-1.5 rounded-md bg-accent text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 mt-12">
      <div className="max-w-5xl mx-auto px-4 py-8 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-2 justify-between">
        <span>© {new Date().getFullYear()} Sublimarte · Hecho con IA</span>
        <nav className="flex gap-4">
          <Link to="/como-sublimar" className="hover:text-foreground">Guía de sublimación</Link>
          <Link to="/faq" className="hover:text-foreground">FAQ</Link>
        </nav>
      </div>
    </footer>
  );
}
