import { Link, useParams } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { useApplicantsForJob } from '../hooks/useApplicantsForJob'
import { StatusPill } from '../components/common/StatusPill'
import { SkillChip } from '../components/common/SkillChip'
import { APPLICATION_STATUS, APPLICATION_STATUS_LABELS } from '../data/mockApplications'

export function EmployerApplicantsPage() {
  const { jobId } = useParams()
  const { myJobs, isLoading } = useAppData()
  const job = myJobs.find((j) => j.id === jobId)
  const { applicants, changeApplicationStatus } = useApplicantsForJob(job)

  if (isLoading) return <p className="loading-state">Lade Bewerbende…</p>

  if (!job) {
    return (
      <div className="empty-state">
        Inserat nicht gefunden. <Link to="/arbeitgeber/inserate">Zurück zu meinen Inseraten</Link>
      </div>
    )
  }

  return (
    <div>
      <Link to="/arbeitgeber/inserate" className="back-link">
        ← Zurück zu meinen Inseraten
      </Link>

      <div className="page-header">
        <h1>Bewerbende für „{job.title}“</h1>
        <p>{job.location} · {applicants.length} {applicants.length === 1 ? 'Bewerbung' : 'Bewerbungen'}</p>
      </div>

      {applicants.length === 0 ? (
        <div className="empty-state">Noch keine Bewerbungen für dieses Inserat.</div>
      ) : (
        <div className="list-panel">
          {applicants.map(({ application, candidateProfile, match }) => (
            <div className="list-row" key={application.id}>
              <div className="list-row__main">
                <div className="list-row__title">{candidateProfile?.name ?? 'Lädt…'}</div>
                <div className="list-row__sub">
                  Beworben am {application.appliedAt}
                  {application.documents.length > 0 &&
                    ` · ${application.documents.map((d) => d.name).join(', ')}`}
                  {match && ` · ${match.matchCount}/${match.totalRequired} Skills passend`}
                </div>
                {candidateProfile && (
                  <div className="skill-filter-chips" style={{ marginTop: 'var(--space-2)' }}>
                    {candidateProfile.skills.map((skill) => (
                      <SkillChip
                        key={skill}
                        skill={skill}
                        matched={match?.matchedSkills.includes(skill)}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="list-row__actions">
                <StatusPill status={application.status} />
                <select
                  className="status-select"
                  value={application.status}
                  onChange={(e) => changeApplicationStatus(application.id, e.target.value)}
                  aria-label={`Status für ${candidateProfile?.name ?? 'Bewerbung'} ändern`}
                >
                  {Object.values(APPLICATION_STATUS).map((status) => (
                    <option key={status} value={status}>
                      {APPLICATION_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
