import { createParser } from "eventsource-parser";
import { flushSync } from "react-dom";

type ImageEventPayload =
  | {
      type: "image_generation.partial_image";
      b64_json: string;
      partial_image_index: number;
      created_at: number;
    }
  | {
      type: "image_generation.completed";
      b64_json: string;
      created_at: number;
    };

export async function streamImage(
  endpoint: string,
  prompt: string,
  onFrame: (dataUrl: string, isFinal: boolean) => void,
  signal?: AbortSignal,
  image?: string,
): Promise<void> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(image ? { prompt, image } : { prompt }),
    signal,
  });

  if (!res.ok || !res.body) {
    const msg = await res.text().catch(() => "");
    throw new Error(msg || `Falló la generación (${res.status})`);
  }

  let sawCompleted = false;
  let lastDataUrl: string | null = null;
  const parser = createParser({
    onEvent(event) {
      if (
        event.event !== "image_generation.partial_image" &&
        event.event !== "image_generation.completed"
      )
        return;
      let payload: ImageEventPayload;
      try {
        payload = JSON.parse(event.data) as ImageEventPayload;
      } catch {
        return;
      }
      const isFinal = event.event === "image_generation.completed";
      const dataUrl = `data:image/png;base64,${payload.b64_json}`;
      lastDataUrl = dataUrl;
      flushSync(() => {
        onFrame(dataUrl, isFinal);
      });
      if (isFinal) sawCompleted = true;
    },
  });

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      parser.feed(value);
    }
  } finally {
    reader.cancel().catch(() => {});
  }
  if (!sawCompleted) {
    // Algunos modelos (p. ej. Gemini) cierran el stream sin emitir
    // "image_generation.completed". Si tenemos al menos un frame,
    // lo marcamos como final para habilitar la descarga.
    if (lastDataUrl) {
      flushSync(() => {
        onFrame(lastDataUrl!, true);
      });
    } else {
      throw new Error("La transmisión terminó sin generar la imagen");
    }
  }
}
