import { Navigate, Route, Routes } from 'react-router-dom'
import { RoleProvider } from './context/RoleContext'
import { AppDataProvider } from './context/AppDataContext'
import { Header } from './components/layout/Header'
import { EmployeeJobsPage } from './pages/EmployeeJobsPage'
import { EmployeeJobDetailPage } from './pages/EmployeeJobDetailPage'
import { EmployeeApplicationsPage } from './pages/EmployeeApplicationsPage'
import { EmployeeProfilePage } from './pages/EmployeeProfilePage'
import { RequireCompleteProfile } from './components/employee/RequireCompleteProfile'
import { EmployerCompanyProfilePage } from './pages/EmployerCompanyProfilePage'
import { EmployerNewJobPage } from './pages/EmployerNewJobPage'
import { EmployerJobsPage } from './pages/EmployerJobsPage'
import { EmployerApplicantsPage } from './pages/EmployerApplicantsPage'

export default function App() {
  return (
    <RoleProvider>
      <AppDataProvider>
        <div className="app-shell">
          <Header />
          <main className="app-main">
            <Routes>
              <Route path="/" element={<Navigate to="/arbeitnehmer/jobs" replace />} />

              <Route
                path="/arbeitnehmer/jobs"
                element={
                  <RequireCompleteProfile>
                    <EmployeeJobsPage />
                  </RequireCompleteProfile>
                }
              />
              <Route
                path="/arbeitnehmer/jobs/:jobId"
                element={
                  <RequireCompleteProfile>
                    <EmployeeJobDetailPage />
                  </RequireCompleteProfile>
                }
              />
              <Route
                path="/arbeitnehmer/bewerbungen"
                element={
                  <RequireCompleteProfile>
                    <EmployeeApplicationsPage />
                  </RequireCompleteProfile>
                }
              />
              <Route path="/arbeitnehmer/profil" element={<EmployeeProfilePage />} />

              <Route path="/arbeitgeber/inserate" element={<EmployerJobsPage />} />
              <Route path="/arbeitgeber/inserate/neu" element={<EmployerNewJobPage />} />
              <Route path="/arbeitgeber/inserate/:jobId/bewerbende" element={<EmployerApplicantsPage />} />
              <Route path="/arbeitgeber/firmenprofil" element={<EmployerCompanyProfilePage />} />

              <Route path="*" element={<Navigate to="/arbeitnehmer/jobs" replace />} />
            </Routes>
          </main>
        </div>
      </AppDataProvider>
    </RoleProvider>
  )
}
