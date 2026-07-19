// Mock-Datenquelle "Bewerbungen". Verknüpft Kandidat:innen (candidateId)
// mit Stellen (jobId). Im echten Betrieb würde dies aus einer
// Datenbank/API kommen (siehe src/services/applicationsService.js).
export const APPLICATION_STATUS = {
  EINGEGANGEN: 'eingegangen',
  IN_PRUEFUNG: 'in_pruefung',
  ANGENOMMEN: 'angenommen',
  ABGELEHNT: 'abgelehnt',
}

export const APPLICATION_STATUS_LABELS = {
  [APPLICATION_STATUS.EINGEGANGEN]: 'Eingegangen',
  [APPLICATION_STATUS.IN_PRUEFUNG]: 'In Prüfung',
  [APPLICATION_STATUS.ANGENOMMEN]: 'Angenommen',
  [APPLICATION_STATUS.ABGELEHNT]: 'Abgelehnt',
}

export const mockApplications = [
  {
    id: 'a1',
    jobId: 'j1',
    candidateId: 'cand2',
    documents: [{ name: 'Lebenslauf_Jana_Brunner.pdf' }],
    status: APPLICATION_STATUS.IN_PRUEFUNG,
    appliedAt: '2026-06-20',
  },
  {
    id: 'a2',
    jobId: 'j2',
    candidateId: 'cand2',
    documents: [{ name: 'Bewerbung_Lagerleitung.pdf' }],
    status: APPLICATION_STATUS.EINGEGANGEN,
    appliedAt: '2026-06-25',
  },
  {
    id: 'a3',
    jobId: 'j5',
    candidateId: 'cand3',
    documents: [{ name: 'CV_Timo_Keller.pdf' }],
    status: APPLICATION_STATUS.ANGENOMMEN,
    appliedAt: '2026-06-19',
  },
]
