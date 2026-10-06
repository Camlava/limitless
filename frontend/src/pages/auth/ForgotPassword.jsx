import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../api/client.js'
import Alert from '../../components/Alert.jsx'
import { AuthField, AuthHeader } from '../../components/AuthForm.jsx'
import { SECURITY_QUESTIONS, formValues, passwordProblems } from '../../constants.js'

// 06 Forgot Password — identify the account by email address and user ID.
export function IdentifyAccount() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const { email_address, username } = formValues(event.currentTarget)
    if (!email_address || !username) {
      setError('Please enter the email address and user ID on your account.')
      return
    }
    // Verified together with the security answers on the next step.
    navigate('/forgot-password/verify', { state: { email_address, username } })
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
        <Alert surface="dark">{error}</Alert>
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
  const { state } = useLocation()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!state?.username) return <Navigate to="/forgot-password" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const answers = formValues(event.currentTarget)
    if (Object.values(answers).some((answer) => !answer)) {
      setError('Please answer all of the security questions.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      const { reset_token } = await api.forgotPassword({ ...state, ...answers })
      navigate('/forgot-password/reset', { replace: true, state: { reset_token } })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <AuthHeader title="Verify Your Identity" subtitle="Answer your security questions to continue." />

      <div className="auth-form__fields">
        {SECURITY_QUESTIONS.map((question, index) => (
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
        <Alert surface="dark">{error}</Alert>
        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={submitting}>
          {submitting ? 'Verifying…' : 'Continue'}
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
  const { state } = useLocation()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!state?.reset_token) return <Navigate to="/forgot-password" replace />

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { new_password, confirm_password } = formValues(event.currentTarget)
    const password = new_password ?? ''
    const problems = passwordProblems(password)
    if (problems.length) {
      setError(`Password must ${problems.join(', ')}.`)
      return
    }
    if (password !== confirm_password) {
      setError('The passwords do not match.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await api.resetPassword({ reset_token: state.reset_token, new_password: password })
      navigate('/forgot-password/done', { replace: true })
    } catch (err) {
      setError(err.message)
      setSubmitting(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
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
        <Alert surface="dark">{error}</Alert>
        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={submitting}>
          {submitting ? 'Saving…' : 'Reset Password'}
        </button>
      </div>

      <div className="auth-form__assist auth-form__assist--end">
        <Link to="/forgot-password" className="text-link">
          Start Over
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
