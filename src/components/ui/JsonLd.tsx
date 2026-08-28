/** Bettet strukturierte Daten ein. Inhalt stammt ausschliesslich aus eigenem Code. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Die Daten werden serverseitig aus typisierten Objekten erzeugt.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
