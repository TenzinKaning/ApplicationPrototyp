import { useMemo } from 'react'
import { useAppData } from '../context/AppDataContext'

// Kapselt das Zusammenführen von Stelle + zugehöriger Firma für die
// Detailansicht. Komponenten müssen dadurch nicht selbst wissen, wie Jobs
// und Firmen miteinander verknüpft sind.
export function useJobDetails(jobId) {
  const { jobs, companies, isLoading } = useAppData()

  const job = useMemo(() => jobs.find((j) => j.id === jobId) ?? null, [jobs, jobId])
  const company = useMemo(
    () => (job ? companies.find((c) => c.id === job.companyId) ?? null : null),
    [companies, job]
  )

  return { job, company, isLoading }
}
