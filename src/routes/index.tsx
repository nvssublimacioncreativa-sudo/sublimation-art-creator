import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { streamImage } from "@/lib/streamImage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Sparkles, Loader2, Upload, X } from "lucide-react";

import { SiteNav, SiteFooter } from "@/components/SiteNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sublimarte — Imágenes para sublimar con IA" },
      {
        name: "description",
        content: "Genera diseños PNG listos para sublimar: Día del Padre, Mundial y más.",
      },
    ],
  }),
  component: Index,
});

type Preset = {
  label: string;
  emoji: string;
  prompt: string;
};

const PRESETS: Preset[] = [
  {
    label: "Día del Padre — Clásico",
    emoji: "👔",
    prompt:
      "Diseño para sublimar en taza/playera: 'FELIZ DÍA PAPÁ' tipografía vintage retro, corbata, bigote, lentes, sombrero, paleta café/azul marino/dorado, estilo cricut, líneas limpias, alta resolución, sobre fondo blanco sólido",
  },
  {
    label: "Día del Padre — Súper Papá",
    emoji: "🦸",
    prompt:
      "Diseño para sublimación: 'SÚPER PAPÁ' con capa de superhéroe, escudo estilo cómic, colores rojo, azul y amarillo vibrantes, ilustración vectorial limpia, alto contraste, fondo blanco sólido",
  },
  {
    label: "Día del Padre — Pesca/BBQ",
    emoji: "🎣",
    prompt:
      "Diseño sublimación: 'EL MEJOR PAPÁ' con caña de pescar, parrilla BBQ, cerveza, estilo retro americano años 70, paleta naranja mostaza y verde bosque, ilustración vectorial, fondo blanco",
  },
  {
    label: "Mundial — México",
    emoji: "🇲🇽",
    prompt:
      "Diseño para sublimar playera: 'MÉXICO MUNDIAL 2026' con balón de fútbol, águila azteca estilizada, bandera de México, tipografía deportiva moderna, verde blanco y rojo, estilo grunge deportivo, fondo blanco sólido",
  },
  {
    label: "Mundial — Aficionado",
    emoji: "⚽",
    prompt:
      "Diseño sublimación playera: balón de fútbol en llamas, trofeo del mundial, confeti, 'WORLD CUP 2026' tipografía bold deportiva, colores vibrantes oro y rojo, estilo ilustración vectorial premium, fondo blanco sólido",
  },
  {
    label: "Mundial — Vintage",
    emoji: "🏆",
    prompt:
      "Diseño retro vintage para sublimar: escudo de fútbol con balón clásico, banderines, '26' grande, tipografía college americana, paleta sepia crema y rojo vino, textura desgastada, fondo blanco sólido",
  },
];

function Index() {
  const [prompt, setPrompt] = useState("");
  const [src, setSrc] = useState<string | null>(null);
  const [isFinal, setIsFinal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setError("Solo se permiten imágenes");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("La imagen debe pesar menos de 8MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
    setError(null);
  }

  async function generate(p: string) {
    if (!p.trim() || loading) return;
    setLoading(true);
    setError(null);
    setSrc(null);
    setIsFinal(false);
    try {
      await streamImage(
        "/api/generate-image",
        p,
        (dataUrl, final) => {
          setSrc(dataUrl);
          if (final) setIsFinal(true);
        },
        undefined,
        uploadedImage ?? undefined,
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  async function download() {
    if (!src || !isFinal) return;
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `sublimacion-${Date.now()}.png`;
      a.rel = "noopener";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch {
      setError(
        "No se pudo iniciar la descarga. Mantén presionada la imagen y elige “Guardar imagen”.",
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      <SiteNav />

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        <section className="text-center space-y-3">
          <Badge variant="secondary" className="gap-1">
            <Sparkles className="size-3" /> Día del Padre · Mundial 2026
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Crea tus diseños para sublimar
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Elige una plantilla o describe tu propio diseño. La IA genera un PNG que puedes
            descargar.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Plantillas rápidas
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                disabled={loading}
                onClick={() => {
                  setPrompt(p.prompt);
                  generate(p.prompt);
                }}
                className="group text-left rounded-xl border border-border bg-card hover:border-primary hover:shadow-md transition-all p-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="text-2xl mb-1">{p.emoji}</div>
                <div className="font-medium text-sm leading-tight">{p.label}</div>
              </button>
            ))}
          </div>
        </section>

        <Card className="p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Sube una foto (opcional)</label>
            {uploadedImage ? (
              <div className="relative inline-block">
                <img
                  src={uploadedImage}
                  alt="Foto subida"
                  className="max-h-40 rounded-lg border border-border"
                />
                <button
                  type="button"
                  onClick={() => setUploadedImage(null)}
                  disabled={loading}
                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 shadow"
                  aria-label="Quitar imagen"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer p-4 text-sm text-muted-foreground transition-colors">
                <Upload className="size-4" />
                Haz clic para subir una foto
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={loading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(f);
                  }}
                />
              </label>
            )}
            <p className="text-xs text-muted-foreground">
              Si subes una foto, la IA la usará como referencia para crear tu diseño.
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Describe tu diseño</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={
                uploadedImage
                  ? "Ej: Convierte esta foto en un diseño estilo cartoon para sublimar en playera, fondo blanco"
                  : "Ej: Taza día del padre con balón de fútbol y 'El mejor coach de la vida'..."
              }
              rows={3}
              disabled={loading}
            />
          </div>

          <Button
            onClick={() => generate(prompt)}
            disabled={loading || !prompt.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> Generando...
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> Generar imagen
              </>
            )}
          </Button>
        </Card>

        {(src || error) && (
          <Card className="p-4 sm:p-6 space-y-4">
            {error && (
              <div className="rounded-md bg-destructive/10 text-destructive text-sm p-3">
                {error}
              </div>
            )}
            {src && (
              <>
                <div className="relative aspect-square w-full max-w-xl mx-auto rounded-lg overflow-hidden bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-muted to-secondary">
                  <img
                    src={src}
                    alt="Diseño generado"
                    className={
                      "w-full h-full object-contain transition-[filter] duration-500 " +
                      (isFinal ? "blur-0" : "blur-xl")
                    }
                  />
                  {!isFinal && (
                    <div className="absolute inset-0 grid place-items-center pointer-events-none">
                      <div className="bg-background/80 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 text-sm">
                        <Loader2 className="size-4 animate-spin" />
                        Renderizando...
                      </div>
                    </div>
                  )}
                </div>
                <Button
                  onClick={download}
                  disabled={!isFinal}
                  variant="secondary"
                  className="w-full"
                  size="lg"
                >
                  <Download className="size-4" />
                  {isFinal ? "Descargar PNG" : "Esperando imagen final..."}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Tip: para sublimación usa 300 DPI y recorta el fondo blanco con tu programa de
                  edición.
                </p>
              </>
            )}
          </Card>
        )}
        <section className="grid sm:grid-cols-2 gap-3 pt-4">
          <Link
            to="/dia-del-padre"
            className="rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
          >
            <div className="text-2xl mb-1">👔</div>
            <div className="font-semibold">Diseños Día del Padre →</div>
            <p className="text-sm text-muted-foreground mt-1">
              Plantillas e ideas listas para sublimar.
            </p>
          </Link>
          <Link
            to="/mundial-2026"
            className="rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors"
          >
            <div className="text-2xl mb-1">⚽</div>
            <div className="font-semibold">Mundial 2026 →</div>
            <p className="text-sm text-muted-foreground mt-1">
              Diseños deportivos para playeras y tazas.
            </p>
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
