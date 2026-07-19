import { mockApplications } from '../data/mockApplications'
import { generateId, request } from './apiClient'

// In-Memory-"Datenbank" für den Prototyp. Ersetzt später echte API-Calls,
// z.B. GET /api/applications?candidateId=, POST /api/applications,
// PATCH /api/applications/:id.
let applications = [...mockApplications]

export function fetchApplications() {
  return request(() => [...applications])
}

export function fetchApplicationsByCandidate(candidateId) {
  return request(() => applications.filter((a) => a.candidateId === candidateId))
}

export function fetchApplicationsByJobIds(jobIds) {
  return request(() => applications.filter((a) => jobIds.includes(a.jobId)))
}

export function hasApplied(candidateId, jobId) {
  return request(() => applications.some((a) => a.candidateId === candidateId && a.jobId === jobId))
}

export function createApplication({ jobId, candidateId, documents, status }) {
  return request(() => {
    const newApplication = {
      id: generateId('a'),
      jobId,
      candidateId,
      documents,
      status,
      appliedAt: new Date().toISOString().slice(0, 10),
    }
    applications = [newApplication, ...applications]
    return newApplication
  })
}

export function updateApplicationStatus(id, status) {
  return request(() => {
    applications = applications.map((a) => (a.id === id ? { ...a, status } : a))
    return applications.find((a) => a.id === id)
  })
}
