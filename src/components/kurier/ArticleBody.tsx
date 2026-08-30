import type { ArticleBlock } from "@/lib/types";

/** Rendert die Blockstruktur eines Beitrags – kein HTML aus dem Content. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index}>{block.text}</h2>;
          case "quote":
            // Zitatkasten wie im Blattsatz: schwarze Flaeche mitten im Text.
            // Der Leser findet die Stelle beim Ueberfliegen, ohne zu lesen.
            return (
              <blockquote
                key={index}
                className="border-y-4 border-double border-ink-900 bg-ink-900 px-6 py-6 text-paper-50 sm:px-8"
              >
                <span aria-hidden className="mb-4 block h-1 w-12 bg-coral-500" />
                {/* Kein <p>: im .body-text-Kontext wuerde die Fliesstextgroesse
                    die Zitatgroesse ueberschreiben. */}
                <span className="subhead block text-[1.35rem] leading-snug text-paper-50 sm:text-[1.6rem]">
                  {block.text}
                </span>
                {block.attribution ? (
                  <cite className="mt-4 block border-t border-paper-50/20 pt-3 font-mono text-[10px] font-bold uppercase not-italic tracking-[0.16em] text-paper-200">
                    {block.attribution}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "list":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          default:
            return (
              <p key={index} className={index === 0 ? "dropcap" : undefined}>
                {block.text}
              </p>
            );
        }
      })}
    </>
  );
}
