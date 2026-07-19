import { Link } from 'react-router-dom'
import { SkillChip } from '../common/SkillChip'
import { MatchBadge } from '../common/MatchBadge'
import { computeMatch } from '../../utils/matching'

export function JobCard({ job, company, candidateSkills }) {
  const match = computeMatch(candidateSkills, job.requiredSkills)

  return (
    <Link to={`/arbeitnehmer/jobs/${job.id}`} className="job-card">
      <div className="job-card__top">
        <div>
          <div className="job-card__company">{company?.name ?? 'Unbekannte Firma'}</div>
          <h3 className="job-card__title">{job.title}</h3>
        </div>
        <MatchBadge matchCount={match.matchCount} totalRequired={match.totalRequired} ratio={match.ratio} />
      </div>

      <div className="job-card__meta">
        <span className="meta-pill">{job.location}</span>
        {job.careerChangeFriendly && (
          <span className="meta-pill is-career-change">Quereinsteiger:innen willkommen</span>
        )}
      </div>

      <div className="job-card__skills">
        {job.requiredSkills.map((skill) => (
          <SkillChip key={skill} skill={skill} matched={match.matchedSkills.includes(skill)} />
        ))}
      </div>
    </Link>
  )
}
