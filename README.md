# JobMatch – Prototyp zur Optimierung des Bewerbungsprozesses

Klickbarer Web-Prototyp (React + Vite) für eine Plattform, die Arbeitgebende
und Arbeitnehmende bei Stellensuche und Bewerbung verbindet. Alle Daten sind
Mock-Daten im Frontend-State – es wird kein Backend benötigt.

## Setup

```bash
npm install
npm run dev
```

Die App läuft danach unter `http://localhost:5173`.

Weitere Skripte:

```bash
npm run build    # Produktions-Build nach dist/
npm run preview  # Build lokal ausliefern
```

## Rollen ausprobieren

Oben in der Kopfzeile lässt sich jederzeit zwischen **Arbeitnehmer:in** und
**Arbeitgeber:in** wechseln (simuliert Login/Rollenwechsel). Interessanter
Testpfad: Als Arbeitnehmer:in auf ein Inserat der Firma "Nordwind Logistik
AG" bewerben, dann als Arbeitgeber:in unter "Meine Inserate → Bewerbende
ansehen" den Status der eigenen Bewerbung ändern.

## Ordnerstruktur

```
src/
  data/          Mock-Daten (Firmen, Jobs, Kandidat:innen, Bewerbungen)
  services/      Datenzugriffsfunktionen – einzige Stelle für Backend-Anbindung
  context/       Globaler App-State (RoleContext, AppDataContext)
  hooks/         Kombinierte Datenzugriffs-Hooks (z.B. Job + Firma zusammenführen)
  utils/         Skill-Matching-Logik
  components/    UI-Bausteine, getrennt nach layout/common/employee/employer
  pages/         Routen-Ebene, verbindet Hooks/Context mit den Komponenten
  styles/        Design-Tokens (tokens.css), globale & Komponenten-Styles
```

## Später ein echtes Backend anbinden

Die Datenzugriffe sind bewusst in `src/services/*.js` gekapselt, nicht direkt
im UI-Code verstreut. Jede Service-Funktion (z.B. `fetchJobs`,
`createApplication`, `updateApplicationStatus`) simuliert aktuell einen
Netzwerk-Request gegen ein In-Memory-Array (`src/services/apiClient.js`,
Funktion `request()`).

Um ein echtes Backend anzubinden:

1. In `src/services/apiClient.js` die `BASE_URL` setzen und `request()`
   durch echte `fetch()`-Aufrufe ersetzen.
2. In den einzelnen `*Service.js`-Dateien die In-Memory-Arrays entfernen und
   stattdessen `fetch(`${BASE_URL}/jobs`)` etc. aufrufen.
3. `AppDataContext.jsx` und die Hooks in `src/hooks/` bleiben unverändert,
   da sie ausschliesslich gegen die Service-Funktionen programmieren.

An den entsprechenden Stellen im Code (v.a. in `src/services/`) weisen
Kommentare explizit auf diesen Übergang hin.

## Design-System

Farben, Typografie, Abstände und Radien sind zentral in
`src/styles/tokens.css` als CSS-Variablen definiert (Primärfarbe Teal/Petrol,
Akzentfarbe Mint/Grün, Anthrazit für Kontrastflächen). Wiederverwendbare
Komponenten-Styles (Chips, Status-Pills, Cards, Formulare, Modal) liegen in
`src/styles/components.css`.
