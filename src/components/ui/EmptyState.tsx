/**
 * Ehrlicher Leerzustand: Wo nichts belegt ist, steht kein erfundener Eintrag,
 * sondern die Begründung.
 */
export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-[var(--rule)] bg-ink-900/40 px-6 py-10 text-center">
      <p className="kicker">Noch keine Einträge</p>
      <p className="headline mt-2 text-lg text-paper-50">{title}</p>
      <p className="standfirst mx-auto mt-2 max-w-xl text-sm">{description}</p>
    </div>
  );
}
