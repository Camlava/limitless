import { Link } from 'react-router-dom'
import { AuthHeader } from '../../components/AuthForm.jsx'

// 05 Access Request Submitted
export default function RequestSubmitted() {
  return (
    <>
      <p className="auth-check" aria-hidden="true">
        ✓
      </p>
      <div className="auth-form auth-confirm">
        <AuthHeader title="Request Submitted" subtitle="Your request has been sent for administrator review." />
        <p className="auth-confirm__note">
          If approved, you&apos;ll receive an email with a link to access your account.
        </p>
        <div className="auth-form__assist auth-form__assist--center">
          <Link to="/login" className="text-link">
            Back to Sign In
          </Link>
        </div>
      </div>
    </>
  )
}
