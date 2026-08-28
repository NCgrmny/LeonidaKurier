/**
 * Ehrlicher Leerzustand: Wo nichts belegt ist, steht kein erfundener Eintrag,
 * sondern die Begründung – gesetzt wie eine Aktennotiz.
 */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border border-dashed border-ink-900/25 bg-paper-200/50 px-6 py-10 text-center">
      <p className="meta">Keine Einträge</p>
      <p className="subhead mt-2 text-lg">{title}</p>
      <p className="standfirst mx-auto mt-2 max-w-xl text-sm">{description}</p>
    </div>
  );
}
