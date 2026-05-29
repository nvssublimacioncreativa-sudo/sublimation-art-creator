import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/SiteNav";

const URL = "https://sublimation-art-creator.lovable.app/faq";
const TITLE = "Preguntas frecuentes — Sublimarte";
const DESC =
  "Resolvemos dudas sobre sublimación, generación de diseños con IA, formatos de imagen, derechos de uso y más.";

const FAQS = [
  {
    q: "¿Los diseños generados son gratis?",
    a: "Sí, puedes generar y descargar diseños PNG sin costo desde el generador.",
  },
  {
    q: "¿Puedo usar los diseños para vender productos?",
    a: "Sí, los diseños generados son tuyos. Te recomendamos modificarlos para hacerlos únicos y revisar que no incluyan marcas registradas.",
  },
  {
    q: "¿En qué formato se descargan?",
    a: "Se descargan como PNG de alta resolución con fondo blanco, ideales para sublimación.",
  },
  {
    q: "¿Qué impresora necesito para sublimar?",
    a: "Cualquier impresora compatible con tinta de sublimación (por ejemplo Epson EcoTank reconvertida) sirve. Consulta nuestra guía en /como-sublimar.",
  },
  {
    q: "¿Puedo pedir un diseño personalizado?",
    a: "Sí, escribe tu propio prompt en el generador describiendo colores, estilo y elementos. La IA creará una variación única.",
  },
  {
    q: "¿Funciona en celular?",
    a: "Sí, la aplicación es totalmente responsive y puedes generar y descargar desde tu móvil.",
  },
];

export const Route = createFileRoute("/faq")({
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
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Preguntas frecuentes</h1>
          <p className="text-muted-foreground">
            Lo que más nos preguntan sobre Sublimarte y sublimación.
          </p>
        </header>
        <div className="space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-lg border border-border bg-card p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
