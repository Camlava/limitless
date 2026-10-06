import { PageHeader, Panel } from '../components/AdminUI.jsx'
import { useAuth } from '../auth/AuthContext.jsx'
import { ROLES, labelFor } from '../constants.js'

// Landing page for managers and accountants. Their Sprint 2+ tools will live here.
export default function Home() {
  const { user } = useAuth()

  return (
    <>
      <PageHeader
        eyebrow={labelFor(ROLES, user.role).toUpperCase()}
        title={`Welcome, ${user.username}`}
        subtitle="Your financial workspace."
      />
      <Panel title="GETTING STARTED" className="page-panel">
        <p className="home-note">
          You are signed in as a {labelFor(ROLES, user.role).toLowerCase()}. Accounting features will appear here as
          they are released. Contact your administrator if you need your role or account details changed.
        </p>
      </Panel>
    </>
  )
}
