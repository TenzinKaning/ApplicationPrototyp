import { useNavigate } from 'react-router-dom'
import { useRole } from '../../context/RoleContext'
import { ROLES } from '../../services/authService'

// Simuliert Registrierung/Login: ein Klick genügt, um zwischen den beiden
// Rollen der Plattform zu wechseln.
export function RoleSwitcher() {
  const { role, setRole } = useRole()
  const navigate = useNavigate()

  function switchTo(nextRole) {
    setRole(nextRole)
    navigate(nextRole === ROLES.EMPLOYEE ? '/arbeitnehmer/jobs' : '/arbeitgeber/inserate')
  }

  return (
    <div className="role-switcher" role="tablist" aria-label="Rolle wechseln">
      <button
        type="button"
        role="tab"
        aria-selected={role === ROLES.EMPLOYEE}
        className={`role-switcher__btn${role === ROLES.EMPLOYEE ? ' is-active' : ''}`}
        onClick={() => switchTo(ROLES.EMPLOYEE)}
      >
        Arbeitnehmer:in
      </button>
      <button
        type="button"
        role="tab"
        aria-selected={role === ROLES.EMPLOYER}
        className={`role-switcher__btn${role === ROLES.EMPLOYER ? ' is-active' : ''}`}
        onClick={() => switchTo(ROLES.EMPLOYER)}
      >
        Arbeitgeber:in
      </button>
    </div>
  )
}
