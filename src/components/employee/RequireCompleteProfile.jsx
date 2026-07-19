import { Navigate } from 'react-router-dom'
import { useAppData } from '../../context/AppDataContext'
import { isProfileComplete } from '../../utils/profile'

// Schützt die Job-Suche und "Meine Bewerbungen": erst nach vollständigem
// Profil (Name, Skills, Dossier) zugänglich. Leitet sonst zur Profilseite um.
export function RequireCompleteProfile({ children }) {
  const { candidate, isLoading } = useAppData()

  if (isLoading) return <p className="loading-state">Lade…</p>
  if (!isProfileComplete(candidate)) return <Navigate to="/arbeitnehmer/profil" replace />

  return children
}
