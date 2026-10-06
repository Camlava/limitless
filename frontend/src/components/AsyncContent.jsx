import Alert from './Alert.jsx'

// Shows a loading line or the request's error; renders children once data is ready.
export default function AsyncContent({ loading, error, children }) {
  if (loading) return <p className="async-status">Loading…</p>
  if (error) return <Alert>{error.message}</Alert>
  return children
}
