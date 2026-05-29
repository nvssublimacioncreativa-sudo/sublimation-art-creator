import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const URL = "https://sublimation-art-creator.lovable.app/mundial-2026";
const TITLE = "Diseños Mundial 2026 para sublimar playeras — Sublimarte";
const DESC =
  "Diseños PNG del Mundial 2026 listos para sublimar en playeras y tazas: México, banderas, balones, estilo vintage y deportivo.";

export const Route = createFileRoute("/mundial-2026")({
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
  { emoji: "🇲🇽", title: "México 2026", desc: "Águila, bandera y tipografía deportiva." },
  { emoji: "⚽", title: "Balón en llamas", desc: "Estilo dinámico con trofeo y confeti." },
  { emoji: "🏆", title: "Vintage retro", desc: "Escudos clásicos y tipografía college." },
  { emoji: "🎽", title: "Aficionado", desc: "Bufanda, número y nombre personalizable." },
  { emoji: "🔥", title: "Grunge deportivo", desc: "Textura desgastada y colores intensos." },
  { emoji: "🌎", title: "Tri-sede", desc: "México, USA y Canadá en un mismo diseño." },
];

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <SiteNav />
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Diseños para sublimar del Mundial 2026
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aprovecha la fiebre mundialista: vende playeras, tazas y souvenirs con diseños únicos generados con IA y listos para sublimación.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="size-4" /> Crear diseño mundialista
            </Button>
          </Link>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Estilos populares</h2>
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
          <h2>Tips para vender más en temporada mundialista</h2>
          <ul>
            <li>Ofrece <strong>personalización</strong> con nombre y número.</li>
            <li>Crea packs de taza + playera para regalos.</li>
            <li>Usa colores vibrantes que destaquen sobre tela blanca.</li>
          </ul>
          <p>
            Revisa también nuestra <Link to="/como-sublimar">guía de sublimación</Link> para asegurar la mejor calidad de impresión.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
