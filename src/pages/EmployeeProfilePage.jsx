import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { SkillEditor } from '../components/common/SkillEditor'
import { DossierUploader } from '../components/employee/DossierUploader'
import { isProfileComplete } from '../utils/profile'

export function EmployeeProfilePage() {
  const {
    candidate,
    isLoading,
    addSkill,
    removeSkill,
    updateCandidateName,
    addDossierDocument,
    removeDossierDocument,
  } = useAppData()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [savedHint, setSavedHint] = useState(false)

  useEffect(() => {
    if (candidate) setName(candidate.name)
  }, [candidate])

  if (isLoading || !candidate) return <p className="loading-state">Lade Profil…</p>

  const profileComplete = isProfileComplete(candidate)

  async function handleNameSubmit(event) {
    event.preventDefault()
    await updateCandidateName(name.trim())
    setSavedHint(true)
    setTimeout(() => setSavedHint(false), 2000)
  }

  return (
    <div>
      <div className="page-header">
        <h1>{profileComplete ? 'Mein Profil' : 'Profil erstellen'}</h1>
        <p>
          {profileComplete
            ? 'Dein Profil wird verwendet, um passende Stellen zu finden und die Skill-Übereinstimmung zu berechnen.'
            : 'Bevor du Stellen durchsuchen und dich bewerben kannst, lege dein Profil an: Name, mindestens ein Skill und dein Bewerbungsdossier.'}
        </p>
      </div>

      {!profileComplete && (
        <div className="banner-note">
          Dein Profil ist noch nicht vollständig. Ergänze Name, mindestens einen Skill und
          mindestens ein Dokument im Dossier, um freigeschaltet zu werden.
        </div>
      )}

      <div className="two-col">
        <div>
          <div className="card card-pad" style={{ marginBottom: 'var(--space-5)' }}>
            <h3>Persönliche Angaben</h3>
            <form onSubmit={handleNameSubmit}>
              <div className="form-field">
                <label htmlFor="candidate-name">Name</label>
                <input
                  id="candidate-name"
                  type="text"
                  placeholder="Vor- und Nachname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Speichern
              </button>
              {savedHint && <p className="muted" style={{ marginTop: 'var(--space-3)' }}>Gespeichert.</p>}
            </form>
          </div>

          <div className="card card-pad">
            <h3>Skills</h3>
            <p className="muted">Füge Skills hinzu, die zu deiner Erfahrung passen.</p>
            <SkillEditor skills={candidate.skills} onAdd={addSkill} onRemove={removeSkill} />
          </div>
        </div>

        <div className="card card-pad">
          <h3>Bewerbungsdossier</h3>
          <p className="muted">
            Lade hier deine Bewerbungsunterlagen hoch (z.B. Lebenslauf, Motivationsschreiben,
            Zeugnisse). Sie werden automatisch für deine Bewerbungen vorgeschlagen.
          </p>
          <DossierUploader
            documents={candidate.dossier}
            onAdd={addDossierDocument}
            onRemove={removeDossierDocument}
          />
        </div>
      </div>

      {profileComplete && (
        <div className="form-actions">
          <button type="button" className="btn btn-accent" onClick={() => navigate('/arbeitnehmer/jobs')}>
            Zu den Stellen
          </button>
        </div>
      )}
    </div>
  )
}
