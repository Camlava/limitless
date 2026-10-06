import { Link, useNavigate } from 'react-router-dom'
import { AuthField, AuthHeader } from '../../components/AuthForm.jsx'
import { securityQuestions } from '../../data/mockData.js'

// 06 Forgot Password — identify the account by email address and user ID.
export function IdentifyAccount() {
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/forgot-password/verify')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthHeader title="Forgot Password?" subtitle="Let’s get you back into your account." />

      <div className="auth-form__fields">
        <AuthField
          label="Email address"
          name="email_address"
          type="email"
          placeholder="Enter your email address."
          autoComplete="email"
        />
        <AuthField label="User ID" name="username" placeholder="Enter your user ID." autoComplete="username" />
      </div>

      <div className="auth-form__actions">
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          Continue
        </button>
      </div>

      <div className="auth-form__assist auth-form__assist--end">
        <Link to="/login" className="text-link">
          Back to Sign In
        </Link>
      </div>
    </form>
  )
}

// 07 Forgot Password — security questions.
export function SecurityQuestions() {
  const navigate = useNavigate()

  // TODO: POST /api/auth/forgot-password (username, email, answers) → reset_token
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/forgot-password/reset')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthHeader title="Verify Your Identity" subtitle="Answer your security questions to continue." />

      <div className="auth-form__fields">
        {securityQuestions.map((question, index) => (
          <AuthField
            key={question}
            label={`Security question ${index + 1}`}
            prompt={question}
            name={`security_answer${index + 1}`}
            placeholder="Enter your answer..."
            autoComplete="off"
          />
        ))}
      </div>

      <div className="auth-form__actions">
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          Continue
        </button>
      </div>

      <div className="auth-form__assist auth-form__assist--end">
        <Link to="/forgot-password" className="text-link">
          Back
        </Link>
      </div>
    </form>
  )
}

// 08 Forgot Password — choose a new password.
export function ResetPassword() {
  const navigate = useNavigate()

  // TODO: POST /api/auth/reset-password
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/forgot-password/done')
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <AuthHeader title="Create New Password" subtitle="Choose a secure password for your account." />

      <div className="auth-form__fields">
        <AuthField
          label="New password"
          name="new_password"
          type="password"
          placeholder="Enter your new password."
          autoComplete="new-password"
        />
        <AuthField
          label="Confirm password"
          name="confirm_password"
          type="password"
          placeholder="Re-enter your new password."
          autoComplete="new-password"
        />
      </div>

      <div className="auth-requirements">
        <p className="auth-field__label">Password requirements</p>
        <p className="auth-requirements__text">
          8+ characters • Starts with a letter • Includes number • Includes special character • Not a previous
          password
        </p>
      </div>

      <div className="auth-form__actions">
        <button type="submit" className="btn btn--primary btn--lg btn--block">
          Reset Password
        </button>
      </div>

      <div className="auth-form__assist auth-form__assist--end">
        <Link to="/forgot-password/verify" className="text-link">
          Back
        </Link>
      </div>
    </form>
  )
}

// 09 Password Updated
export function PasswordUpdated() {
  return (
    <>
      <p className="auth-check" aria-hidden="true">
        ✓
      </p>
      <div className="auth-form auth-confirm auth-updated">
        <AuthHeader title="Password Updated" subtitle="Your password has been successfully reset." />
        <Link to="/login" className="btn btn--primary btn--lg btn--block">
          Sign In
        </Link>
      </div>
    </>
  )
}
