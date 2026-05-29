import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const URL = "https://sublimation-art-creator.lovable.app/como-sublimar";
const TITLE = "Cómo sublimar paso a paso: guía completa 2026 — Sublimarte";
const DESC =
  "Guía práctica de sublimación: materiales, temperatura, tiempo y consejos para tazas y playeras. Aprende a imprimir tus diseños PNG.";

export const Route = createFileRoute("/como-sublimar")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Cómo sublimar una taza o playera paso a paso",
          description: DESC,
          step: [
            { "@type": "HowToStep", name: "Genera el diseño", text: "Crea tu PNG en Sublimarte con fondo blanco." },
            { "@type": "HowToStep", name: "Imprime", text: "Usa impresora con tinta de sublimación y papel sublimable a 300 DPI." },
            { "@type": "HowToStep", name: "Prensa", text: "Aplica calor con plancha o prensa según material." },
            { "@type": "HowToStep", name: "Enfría y revela", text: "Despega con cuidado y deja enfriar." },
          ],
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <SiteNav />
      <main className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Cómo sublimar paso a paso
          </h1>
          <p className="text-muted-foreground">
            Una guía rápida para imprimir tus diseños generados con IA en tazas, playeras y más.
          </p>
        </header>

        <article className="prose prose-sm dark:prose-invert max-w-none">
          <h2>1. Genera tu diseño</h2>
          <p>
            Entra al <Link to="/">generador</Link>, elige una plantilla o describe tu idea. Asegúrate de que el PNG tenga fondo blanco o transparente.
          </p>
          <h2>2. Imprime con tinta de sublimación</h2>
          <p>
            Usa una impresora compatible (Epson EcoTank o similar) con <strong>tinta de sublimación</strong> y <strong>papel sublimable</strong>. Configura a 300 DPI y modo espejo si lo indica tu impresora.
          </p>
          <h2>3. Prensa térmica</h2>
          <ul>
            <li><strong>Tazas:</strong> 180–200 °C durante 3–4 minutos.</li>
            <li><strong>Playeras de poliéster:</strong> 190 °C durante 45–60 segundos.</li>
            <li><strong>Llaveros MDF:</strong> 180 °C durante 60 segundos.</li>
          </ul>
          <h2>4. Enfría y revela</h2>
          <p>
            Retira el papel con cuidado mientras aún está tibio (o frío, según material). Deja reposar antes de manipular.
          </p>
          <h2>Tips finales</h2>
          <ul>
            <li>Trabaja siempre sobre superficie limpia y seca.</li>
            <li>Usa papel teflón para proteger la prensa.</li>
            <li>Haz pruebas con sobrantes antes del producto final.</li>
          </ul>
        </article>

        <div className="text-center pt-4">
          <Link to="/">
            <Button size="lg" className="gap-2">
              <Sparkles className="size-4" /> Probar el generador
            </Button>
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
