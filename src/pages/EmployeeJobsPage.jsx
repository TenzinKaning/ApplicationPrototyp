import { useMemo, useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import { JobFilters } from '../components/employee/JobFilters'
import { JobCard } from '../components/employee/JobCard'
import { sortJobsByMatch } from '../utils/matching'

const initialFilters = { skill: '', location: '', careerChangeOnly: false }

export function EmployeeJobsPage() {
  const { jobs, companies, candidate, isLoading } = useAppData()
  const [filters, setFilters] = useState(initialFilters)

  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs]
  )

  const filteredJobs = useMemo(() => {
    const skillQuery = filters.skill.trim().toLowerCase()
    const filtered = jobs.filter((job) => {
      const matchesSkill =
        !skillQuery || job.requiredSkills.some((s) => s.toLowerCase().includes(skillQuery))
      const matchesLocation = !filters.location || job.location === filters.location
      const matchesCareerChange = !filters.careerChangeOnly || job.careerChangeFriendly
      return matchesSkill && matchesLocation && matchesCareerChange
    })
    return sortJobsByMatch(filtered, candidate?.skills ?? [])
  }, [jobs, filters, candidate])

  if (isLoading) return <p className="loading-state">Lade Stellen…</p>

  return (
    <div>
      <div className="page-header">
        <h1>Offene Stellen</h1>
        <p>
          Sortiert nach Skill-Übereinstimmung mit deinem Profil. Passe die Filter an, um gezielt
          nach Standort, Skills oder Quereinsteiger-Jobs zu suchen.
        </p>
      </div>

      <JobFilters filters={filters} onChange={setFilters} locations={locations} />

      <div className="section-title-row">
        <h2 style={{ margin: 0 }}>{filteredJobs.length} Stellen gefunden</h2>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="empty-state">Keine Stellen passend zu deinen Filtern gefunden.</div>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              company={companies.find((c) => c.id === job.companyId)}
              candidateSkills={candidate?.skills ?? []}
            />
          ))}
        </div>
      )}
    </div>
  )
}
