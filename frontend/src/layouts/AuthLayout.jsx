import { Outlet } from 'react-router-dom'
import { Emblem, Wordmark } from '../components/Logo.jsx'
import './AuthLayout.css'

// Screens 03–09: brand panel on the left, form panel on the right.
export default function AuthLayout() {
  return (
    <div className="auth">
      <aside className="auth__brand">
        <div className="auth__emblem-container">
          <Emblem className="auth__emblem" />
          <Wordmark cropped className="auth__wordmark" />
          <div className="auth__brand-spacer" />
        </div>
      </aside>
      <main className="auth__panel">
        <Outlet />
      </main>
    </div>
  )
}
