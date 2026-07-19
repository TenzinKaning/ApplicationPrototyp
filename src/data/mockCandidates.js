// Mock-Datenquelle "Kandidat:innen-Profile". Im Prototyp gibt es genau ein
// simuliertes eigenes Profil (id "me") plus ein paar weitere Profile, die
// als "andere Bewerbende" in der Arbeitgeber-Ansicht auftauchen.
//
// Das eigene Profil ("me") startet bewusst leer: Arbeitnehmende müssen es
// erst vervollständigen (Name, Skills, Bewerbungsdossier), bevor sie Stellen
// durchsuchen oder sich bewerben können (siehe utils/profile.js).
export const mockCandidates = [
  {
    id: 'me',
    name: '',
    skills: [],
    dossier: [],
  },
  {
    id: 'cand2',
    name: 'Jana Brunner',
    skills: ['Logistik', 'Organisation', 'MS Excel', 'Teamarbeit'],
    dossier: [{ name: 'Lebenslauf_Jana_Brunner.pdf' }],
  },
  {
    id: 'cand3',
    name: 'Timo Keller',
    skills: ['Verkauf', 'Kundenservice', 'Kommunikation'],
    dossier: [{ name: 'CV_Timo_Keller.pdf' }],
  },
]
