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
            return (
              <blockquote key={index} className="border-l-4 border-coral-500 py-1 pl-5">
                <p className="subhead text-[1.4rem] text-ink-900">„{block.text}“</p>
                {block.attribution ? (
                  <cite className="meta mt-2 block not-italic">{block.attribution}</cite>
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
