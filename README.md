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

## Platzhalter

Alles, was noch fehlt, ist pink gestrichelt markiert. Im Code: `class="ph"`, `class="ph-tag"` oder `PLATZHALTER`.

- **Logo**: `public/img/logo.svg` ablegen, in `index.html` (Kopfzeile + Hero) den Text gegen das `<img>` tauschen. Favicon `img/favicon.svg` ebenfalls ersetzen.
- **Akzentfarbe**: `--accent` in `css/style.css` auf die Logofarbe setzen.
- **Texte**: Hero-Satz und die vier Leistungstexte sind Entwürfe (`Entwurf`-Markierung entfernen, wenn passend).
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
