import { useState } from 'react'
import { SkillChip } from './SkillChip'

// Wiederverwendbare Skill-Verwaltung: Chips anzeigen, entfernen, neue
// hinzufügen. Wird sowohl im Arbeitnehmer:innen- als auch im
// Firmenprofil verwendet.
export function SkillEditor({ skills, onAdd, onRemove, placeholder = 'Skill hinzufügen…' }) {
  const [draft, setDraft] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!draft.trim()) return
    onAdd(draft.trim())
    setDraft('')
  }

  return (
    <div>
      <div className="skill-filter-chips">
        {skills.length === 0 && <span className="muted">Noch keine Skills hinzugefügt.</span>}
        {skills.map((skill) => (
          <SkillChip key={skill} skill={skill} onRemove={onRemove} />
        ))}
      </div>
      <form className="skill-chip-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder}
        />
        <button type="submit" className="btn btn-secondary btn-sm">
          Hinzufügen
        </button>
      </form>
    </div>
  )
}
