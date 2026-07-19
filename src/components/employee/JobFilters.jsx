export function JobFilters({ filters, onChange, locations }) {
  function update(field, value) {
    onChange({ ...filters, [field]: value })
  }

  return (
    <div className="filter-box">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="filter-skill">Skill</label>
          <input
            id="filter-skill"
            type="text"
            placeholder="z.B. React, Verkauf, SQL…"
            value={filters.skill}
            onChange={(e) => update('skill', e.target.value)}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="filter-location">Standort</label>
          <select
            id="filter-location"
            value={filters.location}
            onChange={(e) => update('location', e.target.value)}
          >
            <option value="">Alle Standorte</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-field">
          <label className="checkbox-field" htmlFor="filter-career-change">
            <input
              id="filter-career-change"
              type="checkbox"
              checked={filters.careerChangeOnly}
              onChange={(e) => update('careerChangeOnly', e.target.checked)}
            />
            Nur Quereinsteiger-Jobs
          </label>
        </div>
      </div>
    </div>
  )
}
