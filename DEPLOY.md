# Veröffentlichen: GitHub → Cloudflare Pages → peak7.co.at

Ablauf einmalig einrichten, danach reicht ein `git push` für jede Änderung.

> **Wichtig:** Die MX- und TXT-Einträge für Zoho Mail bei INWX werden in keinem
> Schritt verändert. Vorher trotzdem einen Screenshot der kompletten DNS-Liste bei
> INWX machen – als Sicherung.

---

## 1. GitHub-Repository

1. Auf github.com → **New repository**
   - Name: `peak7-website`
   - Private oder Public (beides funktioniert mit Cloudflare)
   - **Kein** README, keine .gitignore, keine Lizenz anlegen (gibt es schon lokal)
2. Lokalen Ordner verbinden und hochladen:

```bash
git remote add origin https://github.com/DEIN-NAME/peak7-website.git
```

```bash
git push -u origin main
```

---

## 2. Cloudflare Pages mit dem Repo verbinden

1. Kostenloses Konto auf dash.cloudflare.com anlegen (falls noch nicht vorhanden).
2. Links **Workers & Pages** → **Create** → Reiter bzw. Link **Pages** →
   **Import an existing Git repository** (Cloudflare schlägt dort inzwischen gern
   „Workers" vor – für diese Seite ist **Pages** richtig).
3. **Connect GitHub** → die Cloudflare-App autorisieren. Bei „Repository access"
   **Only select repositories** → `peak7-website` wählen.
4. Repo auswählen → **Begin setup**:

   | Feld                   | Wert              |
   |------------------------|-------------------|
   | Project name           | `peak7-website`   |
   | Production branch      | `main`            |
   | Framework preset       | `None`            |
   | Build command          | *(leer lassen)*   |
   | Build output directory | `public`          |

5. **Save and Deploy**. Nach ca. einer Minute ist die Seite unter
   `https://peak7-website.pages.dev` erreichbar (genaue Adresse steht im Projekt).
6. **Web Analytics nicht aktivieren** (Projekt → Metrics). Sonst würde Cloudflare
   ein Skript einfügen – und die Datenschutzerklärung stimmt nicht mehr.

Ab jetzt: jeder Push auf `main` wird automatisch veröffentlicht. Andere Branches
erzeugen nur Vorschau-URLs.

---

## 3. Domain einrichten

**Die Einschränkung vorweg:** Cloudflare Pages kann die *Hauptdomain*
`peak7.co.at` (ohne www) nur bedienen, wenn die Nameserver der Domain bei
Cloudflare liegen. Solange das DNS bei INWX bleibt, geht direkt nur eine
*Subdomain* – also `www.peak7.co.at`. Daher zwei Varianten:

### Variante A (empfohlen): DNS bleibt bei INWX, Seite läuft auf www

Zoho bleibt völlig unberührt.

**Schritt 1 – zuerst in Cloudflare** (Reihenfolge ist wichtig, sonst Fehler 522):

1. Pages-Projekt → **Custom domains** → **Set up a custom domain**
2. `www.peak7.co.at` eingeben → **Continue**
3. Cloudflare zeigt den nötigen CNAME an → **Activate domain**

**Schritt 2 – bei INWX** (Domainliste → `peak7.co.at` → DNS / Nameserver-Einträge):

| Name  | Typ   | Wert                         | TTL  |
|-------|-------|------------------------------|------|
| `www` | CNAME | `peak7-website.pages.dev`    | 3600 |

- Gibt es schon einen Eintrag für `www` (A, AAAA oder CNAME, z. B. alte Wix-Werte),
  diesen **ändern** bzw. löschen – ein CNAME darf nicht neben anderen Einträgen
  mit demselben Namen stehen.
- Den Wert exakt so übernehmen, wie Cloudflare ihn in Schritt 1 anzeigt.
- **MX- und TXT-Einträge nicht anfassen** (auch nicht `_domainkey`, `_dmarc` o. ä.).
- Falls es **CAA-Einträge** gibt: Cloudflare braucht `letsencrypt.org`,
  `pki.goog` und `ssl.com`. Gibt es keine CAA-Einträge, ist nichts zu tun.

Nach einigen Minuten (selten bis zu 24 h) wechselt der Status in Cloudflare auf
**Active**, das HTTPS-Zertifikat wird automatisch ausgestellt.

**Schritt 3 – Hauptdomain auf www weiterleiten**

Bei INWX für `peak7.co.at` (Name leer bzw. `@`) eine **Webweiterleitung**
(Eintragstyp „URL", Weiterleitung 301) auf `https://www.peak7.co.at` anlegen.
Vorher eventuelle alte A/AAAA-Einträge der Hauptdomain (Wix) entfernen –
**nur** A/AAAA, MX und TXT bleiben stehen.

Danach testen:

- `http://peak7.co.at` → soll auf `https://www.peak7.co.at` landen
- `https://peak7.co.at` → ob das ohne Zertifikatswarnung klappt, hängt davon ab,
  ob INWX für Weiterleitungen HTTPS anbietet. Das konnte ich nicht verlässlich
  klären – im Zweifel INWX-Support fragen. Klappt es nicht, landen die meisten
  Besucher trotzdem richtig (Browser fallen auf http zurück); wer es sauber will,
  nimmt Variante B.

### Variante B: Nameserver zu Cloudflare (Hauptdomain direkt, ohne www-Umweg)

Die Domain bleibt bei INWX registriert, nur die DNS-Verwaltung zieht zu
Cloudflare. Dabei **müssen alle Zoho-Einträge 1:1 mit umziehen** – sie werden
nicht verändert, aber neu angelegt. Nur machen, wenn man das sorgfältig prüft.

1. Cloudflare → **Add a domain** → `peak7.co.at` → Free-Plan.
2. Cloudflare liest die bestehenden Einträge ein. **Zeile für Zeile mit dem
   INWX-Screenshot vergleichen**: alle MX (mit Priorität), SPF-TXT, DKIM-TXT,
   DMARC-TXT, Zoho-Verifizierungs-TXT. Fehlendes ergänzen. Mail-Einträge
   stehen auf „DNS only" (graue Wolke).
3. Bei INWX: falls **DNSSEC** aktiv ist, zuerst deaktivieren.
4. Bei INWX die Nameserver auf die zwei von Cloudflare genannten ändern.
5. Warten, bis Cloudflare die Domain als **Active** meldet.
6. Testmail an und von office@peak7.co.at schicken.
7. Pages-Projekt → **Custom domains** → `peak7.co.at` und `www.peak7.co.at`
   hinzufügen; Cloudflare legt die Einträge selbst an. www → Hauptdomain
   weiterleiten: Domain → Rules → Redirect Rules.

---

## 4. Abschlusskontrolle

- Seite über alle Adressen aufrufen (mit/ohne www, http/https).
- Browser-Entwicklertools → Application/Speicher → **Cookies**: muss leer sein.
- Netzwerk-Tab beim Laden: nur Anfragen an die eigene Domain.
- Ein Video anklicken: erst dann darf youtube-nocookie.com bzw. vimeo.com auftauchen.
- Testmail an office@peak7.co.at senden – Zoho muss weiter funktionieren.
