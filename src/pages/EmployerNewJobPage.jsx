import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { SkillEditor } from '../components/common/SkillEditor'

const initialForm = {
  title: '',
  description: '',
  location: '',
  careerChangeFriendly: false,
}

export function EmployerNewJobPage() {
  const { addJob } = useAppData()
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [requiredSkills, setRequiredSkills] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  function addSkill(skill) {
    if (requiredSkills.some((s) => s.toLowerCase() === skill.toLowerCase())) return
    setRequiredSkills([...requiredSkills, skill])
  }

  function removeSkill(skill) {
    setRequiredSkills(requiredSkills.filter((s) => s !== skill))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    const newJob = await addJob({ ...form, requiredSkills })
    setIsSubmitting(false)
    navigate(`/arbeitgeber/inserate/${newJob.id}/bewerbende`)
  }

  const canSubmit = form.title.trim() && form.location.trim() && requiredSkills.length > 0

  return (
    <div>
      <div className="page-header">
        <h1>Neues Inserat erstellen</h1>
        <p>Beschreibe die offene Stelle möglichst konkret, um passende Bewerbende zu finden.</p>
      </div>

      <form className="card card-pad" onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
        <div className="form-field">
          <label htmlFor="job-title">Stellentitel</label>
          <input
            id="job-title"
            type="text"
            placeholder="z.B. Frontend-Entwickler:in"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="form-field">
          <label htmlFor="job-description">Beschreibung</label>
          <textarea
            id="job-description"
            placeholder="Aufgaben, Anforderungen, was die Stelle attraktiv macht…"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="job-location">Standort</label>
            <input
              id="job-location"
              type="text"
              placeholder="z.B. Zürich"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>
          <div className="form-field">
            <label>&nbsp;</label>
            <label className="checkbox-field" htmlFor="job-career-change">
              <input
                id="job-career-change"
                type="checkbox"
                checked={form.careerChangeFriendly}
                onChange={(e) => setForm({ ...form, careerChangeFriendly: e.target.checked })}
              />
              Auch für Quereinsteiger:innen offen
            </label>
          </div>
        </div>

        <div className="form-field">
          <label>Benötigte Skills</label>
          <SkillEditor skills={requiredSkills} onAdd={addSkill} onRemove={removeSkill} />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={!canSubmit || isSubmitting}>
            {isSubmitting ? 'Wird veröffentlicht…' : 'Inserat veröffentlichen'}
          </button>
        </div>
      </form>
    </div>
  )
}
