import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const URL = "https://sublimation-art-creator.lovable.app/dia-del-padre";
const TITLE = "Diseños para sublimar Día del Padre 2026 — Sublimarte";
const DESC =
  "Plantillas y diseños PNG listos para sublimar en tazas y playeras del Día del Padre. Genera ideas únicas con IA en segundos.";

export const Route = createFileRoute("/dia-del-padre")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Page,
});

const IDEAS = [
  { emoji: "👔", title: "Papá clásico", desc: "Corbata, bigote y lentes con tipografía vintage." },
  { emoji: "🦸", title: "Súper Papá", desc: "Capa de superhéroe y escudo estilo cómic." },
  { emoji: "🎣", title: "Pesca y BBQ", desc: "Caña de pescar, parrilla y estilo retro americano." },
  { emoji: "🍺", title: "Cervecero", desc: "Tarro, lúpulo y tipografía cervecera artesanal." },
  { emoji: "⚙️", title: "Mecánico", desc: "Herramientas, llaves y estilo industrial." },
  { emoji: "🎸", title: "Rockero", desc: "Guitarra, calaveras y estilo grunge." },
];

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <SiteNav />
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Diseños para sublimar Día del Padre
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Crea tazas, playeras y regalos personalizados con plantillas listas para sublimar. Genera variaciones únicas con IA y descárgalas en PNG de alta calidad.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="size-4" /> Generar mi diseño
            </Button>
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Ideas más buscadas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {IDEAS.map((i) => (
              <Card key={i.title} className="p-4 space-y-2">
                <div className="text-3xl">{i.emoji}</div>
                <div className="font-semibold">{i.title}</div>
                <p className="text-sm text-muted-foreground">{i.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Cómo usar estos diseños en sublimación</h2>
          <p>
            Todos los diseños se generan en PNG con fondo blanco para que sea fácil recortarlo en tu programa de edición. Para mejores resultados imprime a <strong>300 DPI</strong> con tinta de sublimación y usa papel específico. Aprende más en nuestra <Link to="/como-sublimar">guía paso a paso</Link>.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
