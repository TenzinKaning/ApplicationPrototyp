import { createContext, useContext, useMemo, useState } from 'react'
import { ROLES } from '../services/authService'

const RoleContext = createContext(null)

// Simuliert den "eingeloggten" Zustand: welche Rolle ist gerade aktiv.
// Ein echtes Login/Auth-System würde hier den Nutzer inkl. Rolle aus einer
// Session/einem Token laden statt aus lokalem State.
export function RoleProvider({ children }) {
  const [role, setRole] = useState(ROLES.EMPLOYEE)

  const value = useMemo(() => ({ role, setRole }), [role])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole muss innerhalb von <RoleProvider> verwendet werden')
  return ctx
}
