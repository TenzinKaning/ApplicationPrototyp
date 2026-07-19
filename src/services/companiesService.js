import { mockCompanies } from '../data/mockCompanies'
import { request } from './apiClient'

// In-Memory-"Datenbank" für den Prototyp. Ersetzt später echte API-Calls,
// z.B. GET /api/companies, PUT /api/companies/:id.
let companies = [...mockCompanies]

export function fetchCompanies() {
  return request(() => [...companies])
}

export function fetchCompanyById(id) {
  return request(() => companies.find((c) => c.id === id) ?? null)
}

export function updateCompany(id, updates) {
  return request(() => {
    companies = companies.map((c) => (c.id === id ? { ...c, ...updates } : c))
    return companies.find((c) => c.id === id)
  })
}
