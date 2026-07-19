import { mockCandidates } from '../data/mockCandidates'
import { request } from './apiClient'

// In-Memory-"Datenbank" für den Prototyp. Ersetzt später echte API-Calls,
// z.B. GET /api/candidates/:id, PUT /api/candidates/:id.
let candidates = [...mockCandidates]

export function fetchCandidateById(id) {
  return request(() => candidates.find((c) => c.id === id) ?? null)
}

export function fetchCandidatesByIds(ids) {
  return request(() => candidates.filter((c) => ids.includes(c.id)))
}

export function updateCandidate(id, updates) {
  return request(() => {
    candidates = candidates.map((c) => (c.id === id ? { ...c, ...updates } : c))
    return candidates.find((c) => c.id === id)
  })
}
