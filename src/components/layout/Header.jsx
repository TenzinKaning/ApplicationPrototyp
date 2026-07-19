import { NavLink } from 'react-router-dom'
import { RoleSwitcher } from './RoleSwitcher'
import { useRole } from '../../context/RoleContext'
import { ROLES } from '../../services/authService'

const employeeTabs = [
  { to: '/arbeitnehmer/jobs', label: 'Jobs finden' },
  { to: '/arbeitnehmer/bewerbungen', label: 'Meine Bewerbungen' },
  { to: '/arbeitnehmer/profil', label: 'Mein Profil' },
]

const employerTabs = [
  { to: '/arbeitgeber/inserate', label: 'Meine Inserate' },
  { to: '/arbeitgeber/inserate/neu', label: 'Neues Inserat' },
  { to: '/arbeitgeber/firmenprofil', label: 'Firmenprofil' },
]

export function Header() {
  const { role } = useRole()
  const tabs = role === ROLES.EMPLOYEE ? employeeTabs : employerTabs

  return (
    <header className="app-header">
      <div className="app-header__top">
        <div className="brand">
          <span className="brand__mark">JM</span>
          JobMatch
        </div>
        <RoleSwitcher />
      </div>
      <nav className="app-header__tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) => `tab-link${isActive ? ' is-active' : ''}`}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
