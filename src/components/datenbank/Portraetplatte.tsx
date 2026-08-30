import { cx } from "@/lib/format";

/**
 * Platte statt Porträt.
 *
 * Zu den Figuren aus Grand Theft Auto VI gibt es kein Bildmaterial, das der
 * Kurier verwenden darf: Rockstar-Material ist nicht freigegeben, fremde
 * Fan-Artworks sind nicht unsere. Eine Landschaft als Ersatz zu zeigen wäre
 * die schlechteste Lösung – sie sieht aus wie ein Porträt und ist keines.
 *
 * Also steht hier, was im Blattsatz seit jeher an dieser Stelle steht, wenn
 * ein Bild fehlt: eine Satzplatte mit den Initialen, dem Namen und der
 * Angabe, warum kein Bild da ist.
 */
export function Portraetplatte({
  name,
  rolle,
  className,
}: {
  name: string;
  rolle?: string;
  className?: string;
}) {
  const initialen = initialenAus(name);

  return (
    <div
      className={cx(
        "relative flex size-full flex-col justify-between overflow-hidden bg-ink-900 p-4 text-paper-100",
        className,
      )}
    >
      {/* Feines Raster – die Anmutung einer gesetzten Fläche, kein Foto. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 7px)",
        }}
      />
      <p className="relative font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-coral-400">
        Ohne Porträt
      </p>
      <p
        aria-hidden
        className="relative text-center font-title text-[3.4rem] leading-none text-paper-100/90"
      >
        {initialen}
      </p>
      <p className="relative font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-paper-300">
        {rolle ? `${rolle} · ` : ""}Kein freigegebenes Bildmaterial
      </p>
    </div>
  );
}

function initialenAus(name: string): string {
  const teile = name.trim().split(/\s+/).filter(Boolean);
  if (teile.length === 0) return "?";
  const buchstaben = [teile[0], teile.at(-1)!]
    .map((teil) => teil[0]?.toUpperCase() ?? "")
    .join("");
  // Einnamige Figuren behalten nur einen Buchstaben, statt ihn zu verdoppeln.
  return teile.length === 1 ? buchstaben[0] : buchstaben;
}
