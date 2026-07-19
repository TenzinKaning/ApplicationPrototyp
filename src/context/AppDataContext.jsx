import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import * as companiesService from '../services/companiesService'
import * as jobsService from '../services/jobsService'
import * as candidatesService from '../services/candidatesService'
import * as applicationsService from '../services/applicationsService'
import { APPLICATION_STATUS } from '../data/mockApplications'
import { CURRENT_CANDIDATE_ID, CURRENT_COMPANY_ID } from '../services/authService'

// Zentraler App-State. Lädt beim Start alle Daten über die Service-Schicht
// (aktuell Mock-Daten im Speicher, später echte API-Calls) und stellt
// Aktionen bereit, die UI-Komponenten aufrufen können, ohne selbst etwas
// über die Datenquelle zu wissen. So bleibt eine spätere Backend-Anbindung
// auf die Dateien in src/services/ beschränkt.

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const [applications, setApplications] = useState([])
  const [candidate, setCandidate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadInitialData() {
      const [companiesData, jobsData, applicationsData, candidateData] = await Promise.all([
        companiesService.fetchCompanies(),
        jobsService.fetchJobs(),
        applicationsService.fetchApplications(),
        candidatesService.fetchCandidateById(CURRENT_CANDIDATE_ID),
      ])
      if (cancelled) return
      setCompanies(companiesData)
      setJobs(jobsData)
      setApplications(applicationsData)
      setCandidate(candidateData)
      setIsLoading(false)
    }

    loadInitialData()
    return () => {
      cancelled = true
    }
  }, [])

  const addSkill = useCallback(
    async (skill) => {
      if (!candidate || !skill.trim()) return
      const alreadyHasSkill = candidate.skills.some(
        (s) => s.toLowerCase() === skill.trim().toLowerCase()
      )
      if (alreadyHasSkill) return
      const updated = await candidatesService.updateCandidate(candidate.id, {
        skills: [...candidate.skills, skill.trim()],
      })
      setCandidate(updated)
    },
    [candidate]
  )

  const removeSkill = useCallback(
    async (skill) => {
      if (!candidate) return
      const updated = await candidatesService.updateCandidate(candidate.id, {
        skills: candidate.skills.filter((s) => s !== skill),
      })
      setCandidate(updated)
    },
    [candidate]
  )

  const updateCandidateName = useCallback(
    async (name) => {
      if (!candidate) return
      const updated = await candidatesService.updateCandidate(candidate.id, { name })
      setCandidate(updated)
    },
    [candidate]
  )

  const addDossierDocument = useCallback(
    async (fileName) => {
      if (!candidate || !fileName.trim()) return
      const alreadyHasDocument = candidate.dossier.some((d) => d.name === fileName)
      if (alreadyHasDocument) return
      const updated = await candidatesService.updateCandidate(candidate.id, {
        dossier: [...candidate.dossier, { name: fileName }],
      })
      setCandidate(updated)
    },
    [candidate]
  )

  const removeDossierDocument = useCallback(
    async (fileName) => {
      if (!candidate) return
      const updated = await candidatesService.updateCandidate(candidate.id, {
        dossier: candidate.dossier.filter((d) => d.name !== fileName),
      })
      setCandidate(updated)
    },
    [candidate]
  )

  const updateCompany = useCallback(async (updates) => {
    const updated = await companiesService.updateCompany(CURRENT_COMPANY_ID, updates)
    setCompanies((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
  }, [])

  const addJob = useCallback(async (jobData) => {
    const newJob = await jobsService.createJob({ ...jobData, companyId: CURRENT_COMPANY_ID })
    setJobs((prev) => [newJob, ...prev])
    return newJob
  }, [])

  const removeJob = useCallback(async (jobId) => {
    await jobsService.deleteJob(jobId)
    setJobs((prev) => prev.filter((j) => j.id !== jobId))
  }, [])

  const applyToJob = useCallback(
    async ({ jobId, documents }) => {
      const newApplication = await applicationsService.createApplication({
        jobId,
        candidateId: CURRENT_CANDIDATE_ID,
        documents,
        status: APPLICATION_STATUS.EINGEGANGEN,
      })
      setApplications((prev) => [newApplication, ...prev])
      return newApplication
    },
    []
  )

  const changeApplicationStatus = useCallback(async (applicationId, status) => {
    const updated = await applicationsService.updateApplicationStatus(applicationId, status)
    setApplications((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
  }, [])

  const myCompany = useMemo(
    () => companies.find((c) => c.id === CURRENT_COMPANY_ID) ?? null,
    [companies]
  )

  const myApplications = useMemo(
    () => applications.filter((a) => a.candidateId === CURRENT_CANDIDATE_ID),
    [applications]
  )

  const myJobs = useMemo(
    () => jobs.filter((j) => j.companyId === CURRENT_COMPANY_ID),
    [jobs]
  )

  const value = {
    isLoading,
    companies,
    jobs,
    applications,
    candidate,
    myCompany,
    myApplications,
    myJobs,
    addSkill,
    removeSkill,
    updateCandidateName,
    addDossierDocument,
    removeDossierDocument,
    updateCompany,
    addJob,
    removeJob,
    applyToJob,
    changeApplicationStatus,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData muss innerhalb von <AppDataProvider> verwendet werden')
  return ctx
}
