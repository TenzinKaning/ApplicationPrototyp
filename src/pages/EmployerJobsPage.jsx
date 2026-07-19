import { Link } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'

export function EmployerJobsPage() {
  const { myJobs, applications, isLoading, removeJob } = useAppData()

  if (isLoading) return <p className="loading-state">Lade Inserate…</p>

  async function handleDelete(jobId, title) {
    if (window.confirm(`Inserat "${title}" wirklich löschen?`)) {
      await removeJob(jobId)
    }
  }

  return (
    <div>
      <div className="page-header">
        <h1>Meine Inserate</h1>
        <p>Verwalte eure offenen Stellen und sieh, wer sich beworben hat.</p>
      </div>

      {myJobs.length === 0 ? (
        <div className="empty-state">
          Noch keine Inserate. <Link to="/arbeitgeber/inserate/neu">Erstes Inserat erstellen</Link>
        </div>
      ) : (
        <div className="list-panel">
          {myJobs.map((job) => {
            const applicantCount = applications.filter((a) => a.jobId === job.id).length
            return (
              <div className="list-row" key={job.id}>
                <div className="list-row__main">
                  <div className="list-row__title">{job.title}</div>
                  <div className="list-row__sub">
                    {job.location}
                    {job.careerChangeFriendly && ' · Quereinsteiger:innen willkommen'}
                    {' · '}
                    {applicantCount} {applicantCount === 1 ? 'Bewerbung' : 'Bewerbungen'}
                  </div>
                </div>
                <div className="list-row__actions">
                  <Link to={`/arbeitgeber/inserate/${job.id}/bewerbende`} className="btn btn-secondary btn-sm">
                    Bewerbende ansehen
                  </Link>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(job.id, job.title)}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
