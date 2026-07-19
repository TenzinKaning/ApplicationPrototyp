import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { useJobDetails } from '../hooks/useJobDetails'
import { SkillChip } from '../components/common/SkillChip'
import { MatchBadge } from '../components/common/MatchBadge'
import { ApplyModal } from '../components/employee/ApplyModal'
import { computeMatch } from '../utils/matching'

export function EmployeeJobDetailPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const { job, company, isLoading } = useJobDetails(jobId)
  const { candidate, myApplications, applyToJob } = useAppData()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const existingApplication = useMemo(
    () => myApplications.find((a) => a.jobId === jobId),
    [myApplications, jobId]
  )

  const match = useMemo(
    () => computeMatch(candidate?.skills ?? [], job?.requiredSkills ?? []),
    [candidate, job]
  )

  if (isLoading) return <p className="loading-state">Lade Stelle…</p>
  if (!job) {
    return (
      <div className="empty-state">
        Diese Stelle wurde nicht gefunden. <Link to="/arbeitnehmer/jobs">Zurück zur Job-Liste</Link>
      </div>
    )
  }

  async function handleApplySubmit({ jobId: id, documents }) {
    await applyToJob({ jobId: id, documents })
    setIsModalOpen(false)
    navigate('/arbeitnehmer/bewerbungen')
  }

  return (
    <div>
      <Link to="/arbeitnehmer/jobs" className="back-link">
        ← Zurück zur Job-Liste
      </Link>

      <div className="detail-header">
        <div className="detail-header__info">
          <div className="job-card__company">{company?.name}</div>
          <h1>{job.title}</h1>
          <div className="job-card__meta">
            <span className="meta-pill">{job.location}</span>
            {job.careerChangeFriendly && (
              <span className="meta-pill is-career-change">Quereinsteiger:innen willkommen</span>
            )}
          </div>
        </div>
        <MatchBadge matchCount={match.matchCount} totalRequired={match.totalRequired} ratio={match.ratio} />
      </div>

      <div className="two-col">
        <div>
          <div className="detail-section">
            <h3>Beschreibung</h3>
            <p>{job.description}</p>
          </div>
          <div className="detail-section">
            <h3>Benötigte Skills</h3>
            <div className="skill-filter-chips">
              {job.requiredSkills.map((skill) => (
                <SkillChip key={skill} skill={skill} matched={match.matchedSkills.includes(skill)} />
              ))}
            </div>
          </div>
          {company && (
            <div className="detail-section">
              <h3>Über {company.name}</h3>
              <p>{company.description}</p>
            </div>
          )}
        </div>

        <div className="card card-pad">
          {existingApplication ? (
            <>
              <h4>Du hast dich bereits beworben</h4>
              <p className="muted">
                Bewirbungsdatum: {existingApplication.appliedAt}
              </p>
              <Link to="/arbeitnehmer/bewerbungen" className="btn btn-secondary btn-block">
                Status ansehen
              </Link>
            </>
          ) : (
            <>
              <h4>Jetzt bewerben</h4>
              <p className="muted">
                Ein Klick genügt – lade optional deine Unterlagen hoch.
              </p>
              <button type="button" className="btn btn-primary btn-block" onClick={() => setIsModalOpen(true)}>
                Mit einem Klick bewerben
              </button>
            </>
          )}
        </div>
      </div>

      {isModalOpen && (
        <ApplyModal job={job} onClose={() => setIsModalOpen(false)} onSubmit={handleApplySubmit} />
      )}
    </div>
  )
}
