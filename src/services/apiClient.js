// Zentrale Stelle für die spätere Backend-Anbindung.
//
// Aktuell simuliert `request()` einen Netzwerk-Roundtrip (kleine Verzögerung)
// gegen die In-Memory-Mock-Daten. Sobald ein echtes Backend existiert, muss
// NUR diese Datei angepasst werden: `request()` durch echte `fetch()`-Aufrufe
// gegen `BASE_URL` ersetzen. Alle Services (jobsService, applicationsService,
// ...) und Hooks bleiben unverändert, da sie ausschliesslich gegen die
// service-Funktionen programmieren, nicht gegen diese Implementierung.

export const BASE_URL = '/api' // später z.B. import.meta.env.VITE_API_URL

const SIMULATED_LATENCY_MS = 150

export function request(resultFactory) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(resultFactory()), SIMULATED_LATENCY_MS)
  })
}

export function generateId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`
}
