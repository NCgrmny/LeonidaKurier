import { bilder } from "@/content/bilder";
import type { Pressebild } from "@/lib/bilder";

/**
 * Welches Foto gehört zu diesem Slug?
 *
 * Solange der Bestand leer ist, liefert das nie etwas – die Oberfläche fällt
 * dann auf Standortkarte oder Satzplatte zurück. Genau so ist es gedacht:
 * Fotos ergänzen die Bildsprache, sie ersetzen sie nicht.
 */
export function fotoFuer(slug: string): Pressebild | null {
  return bilder.find((bild) => bild.fuer.includes(slug)) ?? null;
}
