import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './AuthContext.jsx'
import { homePathFor } from '../constants.js'

// Guards a group of routes. With `role`, users without that role are sent to their own home page.
export default function RequireAuth({ role }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  if (role && user.role !== role) return <Navigate to={homePathFor(user)} replace />
  return <Outlet />
}
