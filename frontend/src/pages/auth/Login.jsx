import { Link, useNavigate } from 'react-router-dom'
import { AuthField, AuthHeader } from '../../components/AuthForm.jsx'

// 03 Login
export default function Login() {
  const navigate = useNavigate()

  // TODO: POST /api/auth/login, then route by role.
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/admin')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthHeader title="Welcome to Limitless" subtitle="Sign in to access your financial workspace." />

      <div className="auth-form__fields">
        <AuthField label="Username" name="username" placeholder="Enter your username." autoComplete="username" />
        <AuthField
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••••••"
          autoComplete="current-password"
          labelAction={
            <Link to="/forgot-password" className="text-link text-link--muted">
              Forgot Password?
            </Link>
          }
        />
      </div>

      <div className="auth-form__actions">
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          Sign In
        </button>
        <Link to="/request-access" className="btn btn--secondary btn--lg btn--block">
          Request Access / Create Account
        </Link>
      </div>

      <div className="auth-form__assist">
        <span className="auth-form__muted">Need assistance?</span>
        <a href="mailto:support@limitless.example" className="text-link">
          Contact Support
        </a>
      </div>
    </form>
  )
}
