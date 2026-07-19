import { useState } from 'react'
import { Modal } from '../common/Modal'
import { useAppData } from '../../context/AppDataContext'

// Statt bei jeder Bewerbung erneut Dokumente hochzuladen, greift die
// Bewerbung auf das im Profil hinterlegte Bewerbungsdossier zurück.
// Bewerbende wählen aus, welche Dokumente sie für diese Stelle mitsenden.
export function ApplyModal({ job, onClose, onSubmit }) {
  const { candidate } = useAppData()
  const [selectedNames, setSelectedNames] = useState(() => candidate.dossier.map((d) => d.name))
  const [isSubmitting, setIsSubmitting] = useState(false)

  function toggleDocument(name) {
    setSelectedNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    const documents = candidate.dossier.filter((d) => selectedNames.includes(d.name))
    await onSubmit({ jobId: job.id, documents })
    setIsSubmitting(false)
  }

  return (
    <Modal title={`Bewerbung: ${job.title}`} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <p className="muted">
          Wähle aus, welche Dokumente aus deinem Bewerbungsdossier du mitsenden möchtest.
        </p>

        <div className="form-field">
          <label>Dokumente</label>
          <div className="list-panel">
            {candidate.dossier.map((doc) => (
              <label key={doc.name} className="checkbox-field list-row">
                <input
                  type="checkbox"
                  checked={selectedNames.includes(doc.name)}
                  onChange={() => toggleDocument(doc.name)}
                />
                {doc.name}
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gesendet…' : 'Bewerbung absenden'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
