# Leonida Kurier betreiben

Die Plattform läuft überall dort, wo Node oder Docker verfügbar ist. Vercel ist
bequem, aber nicht nötig.

**Eine Einschränkung gilt überall:** Reines Statik-Hosting reicht nicht.
`src/proxy.ts` liest den Host-Header und liefert Besuchern von
`leonidakompass.de` direkt den Kartenbereich aus. Dafür braucht es einen
laufenden Server oder eine Edge-Funktion.

---

## 1. Nur ansehen (lokal, ohne Server)

```bash
git clone https://github.com/NCgrmny/LeonidaKurier.git
cd LeonidaKurier
npm install
npm run dev
```

Dann `http://localhost:3000` öffnen. Für den Kompass-Einstieg unter der zweiten
Domain lokal testen:

```bash
curl -H "Host: leonidakompass.de" http://localhost:3000/
```

## 2. Eigener Server mit Docker (empfohlen)

Voraussetzung: Docker und Docker Compose auf dem Server, Ports 80 und 443 frei.

```bash
git clone https://github.com/NCgrmny/LeonidaKurier.git
cd LeonidaKurier
docker compose up -d --build
```

Das startet zwei Container:

- **app** – der eigenständige Next.js-Server auf Port 3000 (nicht nach außen)
- **caddy** – Reverse Proxy auf 80/443, holt und erneuert die TLS-Zertifikate
  selbst

Caddy reicht den Host-Header unverändert weiter; nur so greift die Erkennung der
Kompass-Domain. Die Domains stehen in der `Caddyfile` – dort ändern, falls
andere verwendet werden.

Logs und Neustart:

```bash
docker compose logs -f app
docker compose restart app
docker compose up -d --build   # nach einem git pull
```

## 3. Eigener Server ohne Docker

```bash
npm ci
npm run build

# Der Build erzeugt .next/standalone. Statische Dateien dazulegen:
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0 \
  node .next/standalone/server.js
```

Davor gehört ein Reverse Proxy (Caddy, nginx, Traefik), der TLS terminiert und
den **Host-Header durchreicht**. Bei nginx ist das nicht der Standard:

```nginx
proxy_set_header Host $host;
proxy_pass http://127.0.0.1:3000;
```

Für Dauerbetrieb empfiehlt sich eine systemd-Unit oder ein Prozessmanager.

---

## Umgebungsvariablen

Beide sind optional – ohne sie greifen Standardwerte –, sollten in Produktion
aber gesetzt sein, damit Canonicals, Sitemap und Domain-Erkennung stimmen:

```
NEXT_PUBLIC_SITE_URL=https://leonidakurier.de
NEXT_PUBLIC_COMPASS_HOST=leonidakompass.de
```

## DNS

Beide Domains müssen auf den Server zeigen. Bei einem eigenen Server sind das
A-Records auf dessen IPv4-Adresse (und AAAA auf die IPv6, falls vorhanden):

| Type | Host | Answer |
| --- | --- | --- |
| A | *(leer)* | IP des Servers |
| A | `www` | IP des Servers |

Für **beide** Domains. Vorhandene Parkeinträge des Registrars vorher löschen.

Bei Vercel stattdessen: `A` auf `76.76.21.21` und `CNAME www` auf
`cname.vercel-dns.com`; die konkreten Werte zeigt das Vercel-Dashboard beim
Hinzufügen der Domain an.
