import { useEffect, useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { SkillEditor } from '../components/common/SkillEditor'

export function EmployerCompanyProfilePage() {
  const { myCompany, isLoading, updateCompany } = useAppData()
  const [form, setForm] = useState({ name: '', location: '', description: '' })
  const [savedHint, setSavedHint] = useState(false)

  useEffect(() => {
    if (myCompany) {
      setForm({
        name: myCompany.name,
        location: myCompany.location,
        description: myCompany.description,
      })
    }
  }, [myCompany])

  if (isLoading || !myCompany) return <p className="loading-state">Lade Firmenprofil…</p>

  async function handleSubmit(event) {
    event.preventDefault()
    await updateCompany(form)
    setSavedHint(true)
    setTimeout(() => setSavedHint(false), 2000)
  }

  async function handleAddCoreSkill(skill) {
    const alreadyHas = myCompany.coreSkills.some((s) => s.toLowerCase() === skill.toLowerCase())
    if (alreadyHas) return
    await updateCompany({ coreSkills: [...myCompany.coreSkills, skill] })
  }

  async function handleRemoveCoreSkill(skill) {
    await updateCompany({ coreSkills: myCompany.coreSkills.filter((s) => s !== skill) })
  }

  return (
    <div>
      <div className="page-header">
        <h1>Firmenprofil</h1>
        <p>Diese Angaben sehen Arbeitnehmende, wenn sie sich für eure Stellen interessieren.</p>
      </div>

      <div className="two-col">
        <div className="card card-pad">
          <h3>Firmendaten</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="company-name">Firmenname</label>
              <input
                id="company-name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="company-location">Standort</label>
              <input
                id="company-location"
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="company-description">Beschreibung</label>
              <textarea
                id="company-description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Speichern
            </button>
            {savedHint && <p className="muted" style={{ marginTop: 'var(--space-3)' }}>Gespeichert.</p>}
          </form>
        </div>

        <div className="card card-pad">
          <h3>Kern-Skills</h3>
          <p className="muted">
            Skills, für die eure Firma bekannt ist – unabhängig von einzelnen Inseraten.
          </p>
          <SkillEditor
            skills={myCompany.coreSkills}
            onAdd={handleAddCoreSkill}
            onRemove={handleRemoveCoreSkill}
          />
        </div>
      </div>
    </div>
  )
}
