import { mockJobs } from '../data/mockJobs'
import { generateId, request } from './apiClient'

// In-Memory-"Datenbank" für den Prototyp. Ersetzt später echte API-Calls,
// z.B. GET /api/jobs, POST /api/jobs, DELETE /api/jobs/:id.
let jobs = [...mockJobs]

export function fetchJobs() {
  return request(() => [...jobs])
}

export function fetchJobById(id) {
  return request(() => jobs.find((j) => j.id === id) ?? null)
}

export function fetchJobsByCompany(companyId) {
  return request(() => jobs.filter((j) => j.companyId === companyId))
}

export function createJob(jobData) {
  return request(() => {
    const newJob = {
      id: generateId('j'),
      createdAt: new Date().toISOString().slice(0, 10),
      ...jobData,
    }
    jobs = [newJob, ...jobs]
    return newJob
  })
}

export function deleteJob(id) {
  return request(() => {
    jobs = jobs.filter((j) => j.id !== id)
    return id
  })
}
