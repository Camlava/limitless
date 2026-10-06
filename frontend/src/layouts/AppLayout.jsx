import { Link, Outlet, useLocation } from 'react-router-dom'
import Logo from '../components/Logo.jsx'
import UserMenu from '../components/UserMenu.jsx'
import { currentUser } from '../data/mockData.js'
import './AppLayout.css'

// `match` lists the path prefixes that highlight each item (access requests live under Dashboard).
const NAV_ITEMS = [
  { label: 'Dashboard', to: '/admin', match: ['/admin/access-requests'], exact: '/admin' },
  { label: 'Users', to: '/admin/users', match: ['/admin/users'] },
  { label: 'Reports', to: '/admin/reports', match: ['/admin/reports'] },
  { label: 'Email', to: '/admin/email', match: ['/admin/email'] },
]

function isActive(item, pathname) {
  const path = pathname.replace(/\/$/, '')
  return path === item.exact || item.match.some((prefix) => path.startsWith(prefix))
}

// Screens 10–19: sidebar navigation, signed-in user in the top right corner.
export default function AppLayout() {
  const { pathname } = useLocation()

  return (
    <div className="app">
      <aside className="app__sidebar">
        <Link to="/admin" className="app__logo" aria-label="Limitless home">
          <Logo />
        </Link>
        <nav className="app__nav" aria-label="Main">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item, pathname)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`app__nav-link ${active ? 'app__nav-link--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>
      <div className="app__main">
        <UserMenu user={currentUser} />
        <Outlet />
      </div>
    </div>
  )
}
