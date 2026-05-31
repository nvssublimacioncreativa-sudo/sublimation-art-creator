import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/generate-image")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { prompt, image } = (await request.json()) as {
          prompt?: string;
          image?: string; // data URL opcional
        };
        if (!prompt || typeof prompt !== "string") {
          return new Response("Prompt requerido", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Falta LOVABLE_API_KEY", { status: 500 });

        const sublimationPrompt = [
          prompt.trim(),
          "Crea un diseño premium para sublimación, listo para imprimir en PNG.",
          "Usa colores vivos, alto contraste, bordes limpios, estilo profesional y composición centrada.",
          "El resultado debe tener fondo transparente o fondo blanco puro fácil de recortar, sin mockups, sin marca de agua, sin texto extra no solicitado.",
        ].join(" ");

        // Si hay imagen, usar Gemini (soporta edición/inspiración a partir de imagen).
        // Si no, usar gpt-image-2 con calidad rápida.
        const body = image
          ? {
              model: "google/gemini-3.1-flash-image-preview",
              modalities: ["image", "text"],
              stream: true,
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: sublimationPrompt },
                    { type: "image_url", image_url: { url: image } },
                  ],
                },
              ],
            }
          : {
              model: "openai/gpt-image-2",
              prompt: sublimationPrompt,
              size: "1024x1024",
              quality: "low",
              n: 1,
              stream: true,
              partial_images: 2,
            };

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/images/generations", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          signal: request.signal,
        });

        if (!upstream.ok || !upstream.body) {
          const text = await upstream.text().catch(() => "");
          return new Response(text || "Error del proveedor", {
            status: upstream.status,
          });
        }

        return new Response(upstream.body, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
          },
        });
      },
    },
  },
});
