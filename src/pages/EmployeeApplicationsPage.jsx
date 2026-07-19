import { Link } from 'react-router-dom'
import { useAppData } from '../context/AppDataContext'
import { StatusPill } from '../components/common/StatusPill'

export function EmployeeApplicationsPage() {
  const { myApplications, jobs, companies, isLoading } = useAppData()

  if (isLoading) return <p className="loading-state">Lade Bewerbungen…</p>

  const sorted = [...myApplications].sort((a, b) => (a.appliedAt < b.appliedAt ? 1 : -1))

  return (
    <div>
      <div className="page-header">
        <h1>Meine Bewerbungen</h1>
        <p>Behalte den Überblick über den Status all deiner Bewerbungen.</p>
      </div>

      {sorted.length === 0 ? (
        <div className="empty-state">
          Du hast dich noch nicht beworben. <Link to="/arbeitnehmer/jobs">Jetzt Stellen durchsuchen</Link>
        </div>
      ) : (
        <div className="list-panel">
          {sorted.map((application) => {
            const job = jobs.find((j) => j.id === application.jobId)
            const company = companies.find((c) => c.id === job?.companyId)
            return (
              <div className="list-row" key={application.id}>
                <div className="list-row__main">
                  <div className="list-row__title">
                    {job ? (
                      <Link to={`/arbeitnehmer/jobs/${job.id}`}>{job.title}</Link>
                    ) : (
                      'Stelle nicht mehr verfügbar'
                    )}
                  </div>
                  <div className="list-row__sub">
                    {company?.name} · Beworben am {application.appliedAt}
                    {application.documents.length > 0 && (
                      <> · {application.documents.map((d) => d.name).join(', ')}</>
                    )}
                  </div>
                </div>
                <div className="list-row__actions">
                  <StatusPill status={application.status} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
