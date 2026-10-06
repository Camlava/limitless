import { Link, useNavigate } from 'react-router-dom'
import { AuthField, AuthHeader } from '../../components/AuthForm.jsx'

// 04 Request Access — first-time users ask the administrator for an account.
export default function RequestAccess() {
  const navigate = useNavigate()

  // TODO: POST /api/auth/access-requests
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/request-access/submitted')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthHeader title="Request Access" subtitle="Create your Limitless Account Request." />

      <div className="auth-form__fields">
        <div className="auth-form__row">
          <AuthField label="First name" name="first_name" placeholder="Enter your first name." autoComplete="given-name" />
          <AuthField label="Last name" name="last_name" placeholder="Enter your last name." autoComplete="family-name" />
        </div>
        <AuthField
          label="Email address"
          name="email_address"
          type="email"
          placeholder="Enter your email address."
          autoComplete="email"
        />
        <AuthField label="Address" name="home_address" placeholder="Enter your address." autoComplete="street-address" />
        <AuthField label="Date of birth" name="birth_date" type="date" placeholder="MM/DD/YYYY" autoComplete="bday" />
      </div>

      <div className="auth-form__actions">
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          Submit Request
        </button>
      </div>

      <div className="auth-form__assist">
        <span className="auth-form__muted">Already have an account?</span>
        <Link to="/login" className="text-link">
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}
