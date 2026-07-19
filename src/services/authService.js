// Simuliert Registrierung/Login/Rollenwechsel für den Prototyp.
// Später würde dies durch echte Authentifizierung (z.B. JWT-Session gegen
// POST /api/login) ersetzt. Die App bindet aber schon jetzt einen "eingeloggt
// als"-Nutzer pro Rolle an feste IDs, damit die Anbindung eines echten
// Auth-Systems keine Komponenten-Änderungen erfordert – nur diese Datei.

export const ROLES = {
  EMPLOYEE: 'employee',
  EMPLOYER: 'employer',
}

// Fest hinterlegte "eingeloggte" IDs für den Prototyp.
export const CURRENT_CANDIDATE_ID = 'me'
export const CURRENT_COMPANY_ID = 'c1'
