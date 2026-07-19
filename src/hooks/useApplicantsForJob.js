import { useEffect, useMemo, useState } from 'react'
import { useAppData } from '../context/AppDataContext'
import * as candidatesService from '../services/candidatesService'
import { computeMatch } from '../utils/matching'

// Kapselt das Zusammenführen von Bewerbungen mit den Kandidat:innen-Profilen
// für eine bestimmte Stelle. Bewerbende Kandidat:innen (ausser dem eigenen
// Profil) werden im Prototyp nicht global geladen, sondern erst hier bei
// Bedarf nachgeladen – so, wie es später auch bei einer echten API sinnvoll
// wäre (nicht alle Profile auf Vorrat laden).
export function useApplicantsForJob(job) {
  const { applications, changeApplicationStatus } = useAppData()
  const [candidatesById, setCandidatesById] = useState({})

  const jobApplications = useMemo(
    () => (job ? applications.filter((a) => a.jobId === job.id) : []),
    [applications, job]
  )

  useEffect(() => {
    if (jobApplications.length === 0) return
    const candidateIds = jobApplications.map((a) => a.candidateId)
    candidatesService.fetchCandidatesByIds(candidateIds).then((candidates) => {
      setCandidatesById(Object.fromEntries(candidates.map((c) => [c.id, c])))
    })
  }, [jobApplications])

  const applicants = useMemo(
    () =>
      jobApplications.map((application) => {
        const candidateProfile = candidatesById[application.candidateId]
        const match = candidateProfile
          ? computeMatch(candidateProfile.skills, job?.requiredSkills ?? [])
          : null
        return { application, candidateProfile, match }
      }),
    [jobApplications, candidatesById, job]
  )

  return { applicants, changeApplicationStatus }
}
