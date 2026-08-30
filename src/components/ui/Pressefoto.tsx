import Image from "next/image";
import {
  bezugshinweis,
  bildnachweis,
  brauchtUrhebernennung,
  type Pressebild,
} from "@/lib/bilder";
import { cx } from "@/lib/format";

/**
 * Foto mit Pflichtnachweis.
 *
 * Unter dem Bild stehen zwei Zeilen: der Lizenznachweis und der Bezug. Die
 * zweite Zeile unterscheidet, ob der Eintrag diesen realen Ort als Vorbild
 * führt oder ob es nur dieselbe Landschaft ist – ein Waldbild aus Nordflorida
 * belegt nicht, wie ein Nationalpark im Spiel aussieht.
 *
 * Der Nachweis ist nicht optional und steht deshalb im selben Bauteil wie das
 * Bild: Wer das Foto einbindet, bindet die Zuschreibung mit ein. Bei CC-BY
 * hängt die Lizenz daran – ohne Nennung erlischt sie.
 *
 * Zusätzlich steht immer der reale Aufnahmeort dabei. Ein Foto der Küste
 * Floridas illustriert das Vorbild, es zeigt nicht Leonida; diese Trennung
 * muss am Bild sichtbar sein, nicht nur im Impressum.
 */
export function Pressefoto({
  bild,
  className,
  prioritaet = false,
}: {
  bild: Pressebild;
  className?: string;
  /** Für das Aufmacherbild – lädt ohne Verzögerung. */
  prioritaet?: boolean;
}) {
  return (
    <figure className={cx("relative m-0 size-full overflow-hidden bg-night-950", className)}>
      <Image
        src={`/bilder/${bild.datei}`}
        alt={`${bild.beschreibung} – ${bild.aufnahmeort}`}
        fill
        sizes="(min-width: 1024px) 55vw, 100vw"
        priority={prioritaet}
        className="object-cover"
      />
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8">
        <span className="block font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-white/85">
          {bildnachweis(bild)}
          {brauchtUrhebernennung(bild.lizenz) && bild.lizenzUrl ? (
            <>
              {" "}
              <a
                href={bild.lizenzUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline underline-offset-2 hover:text-coral-300"
              >
                Lizenz
              </a>
            </>
          ) : null}
        </span>
        <span className="mt-0.5 block font-mono text-[9px] uppercase leading-tight tracking-[0.12em] text-white/60">
          {bezugshinweis(bild)}
        </span>
      </figcaption>
    </figure>
  );
}
