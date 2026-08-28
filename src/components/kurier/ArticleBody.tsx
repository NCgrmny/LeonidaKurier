import type { ArticleBlock } from "@/lib/types";

/** Rendert die Blockstruktur eines Beitrags – kein HTML aus dem Content. */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose-kurier">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return <h2 key={index}>{block.text}</h2>;
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-2 border-coral-400/60 py-1 pl-5"
              >
                <p className="headline text-xl text-paper-50">„{block.text}“</p>
                {block.attribution ? (
                  <cite className="mt-2 block font-mono text-[11px] uppercase not-italic tracking-[0.14em] text-paper-500">
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
            return <p key={index}>{block.text}</p>;
        }
      })}
    </div>
  );
}
