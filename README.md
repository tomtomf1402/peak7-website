# peak7-website

Statische Website für peak7 (peak7.co.at). Reines HTML/CSS, ein kleines Skript, kein Build-Step.

## Aufbau

```
public/              ← alles, was online geht (Cloudflare-Ausgabeordner)
  index.html         One-Pager: Hero, Leistungen, Arbeiten, Kontakt
  impressum.html
  datenschutz.html
  404.html
  css/style.css      Farben und Abstände als Variablen ganz oben
  js/video.js        Zwei-Klick-Videoeinbettung
  img/               Logo, Favicon, Vorschaubilder (img/thumbs/)
  _headers           Sicherheits-Header für Cloudflare Pages
DEPLOY.md            Cloudflare Pages + DNS bei INWX
```

## Lokal ansehen

```bash
python -m http.server 8080 --directory public
```

Dann http://localhost:8080 öffnen.

## Änderungen veröffentlichen

Datei bearbeiten, committen, nach GitHub pushen – Cloudflare baut automatisch neu (ca. 1 Minute).

## Logo

Bildmarke: Gratlinie mit Auslauf in Salbeigrün, daneben der Schriftzug PEAK7.
Zeichen und Schrift stehen bewusst mit Abstand, damit der Grat nicht als „M" gelesen wird.

- `img/logo.svg` – Grat grün, Schrift hell, für die dunkle Website
- `img/logo-schwarz.svg` – alles schwarz, für helle Hintergründe und Einfarbdruck
- `img/favicon.svg` – nur der Grat ohne Auslauf, kräftiger, auf dunklem Quadrat

Für Rechnungen, Dokumente usw. liegen alle Logo-Varianten als SVG und transparentes PNG in `logo/`,
darunter `peak7-logo-heller-grund` mit dunklerem Grün `#517b5d` (ausreichend Kontrast auf Weiß).

Visitenkarten (Druckvorlage, Render, PDFs) liegen in `visitenkarten/`, ältere Entwürfe in
`visitenkarten/entwuerfe/`.

Akzentfarbe der Website: Salbeigrün `#8fb59a` (`--accent` in `css/style.css`).

## Ausgeblendet und Platzhalter

Unfertige Teile sind mit dem Attribut `hidden` ausgeblendet. Sie bleiben im Code und erscheinen,
sobald man `hidden` entfernt (im Code nach `AUSGEBLENDET` suchen):

- **Telefon** im Kontaktbereich.

Videokacheln ohne `data-id` zeigen „Demnächst" statt des Abspielknopfs. Sobald eine Video-ID
eingetragen ist, erscheint automatisch der Zwei-Klick-Player.

Was noch fehlt, ist pink gestrichelt markiert (`class="ph"` oder `PLATZHALTER`):

- **Videos**: siehe unten.
- **Kontakt**: Telefon (auch im `tel:`-Link) und Ort.
- **Impressum / Datenschutz**: Firmendaten, UID, Gewerbe, Behörde, WKO-Bundesland, Stand-Datum.

## Video tauschen oder hinzufügen

In `index.html` im Abschnitt „Arbeiten":

```html
<div class="video" data-provider="youtube" data-id="VIDEO-ID" data-title="Titel">
  <img src="img/thumbs/name.jpg" alt="" width="1280" height="720">
</div>
```

- YouTube: `youtube.com/watch?v=VIDEO-ID`
- Vimeo: `data-provider="vimeo" data-id="123456789"`; bei nicht gelisteten Videos zusätzlich `data-hash="…"` (der Teil nach dem zweiten `/`).
- Vorschaubild **lokal** ablegen (1280×720 JPG, ca. 100–200 KB). Nicht direkt von YouTube/Vimeo verlinken – sonst wird schon beim Seitenaufruf eine Verbindung dorthin aufgebaut.

Das erste Video läuft über die volle Breite, die weiteren zweispaltig. Bei einer geraden Anzahl weiterer Videos sieht es am ruhigsten aus.
