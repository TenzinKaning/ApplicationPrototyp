// Ein Profil gilt als vollständig, sobald Name, mindestens ein Skill und
// mindestens ein Dokument im Bewerbungsdossier vorhanden sind. Erst dann
// dürfen Arbeitnehmende Stellen durchsuchen und sich bewerben.
export function isProfileComplete(candidate) {
  if (!candidate) return false
  return (
    candidate.name.trim().length > 0 &&
    candidate.skills.length > 0 &&
    candidate.dossier.length > 0
  )
}
