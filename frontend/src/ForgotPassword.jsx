import { useState } from 'react'
import './ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setMessage('')
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setLoading(true)

    // TODO: Connect this to the backend API
    // once the forgot-password endpoint is available.

    setTimeout(() => {
      setLoading(false)
      setMessage(
        'If an account exists with this email, a password reset link has been sent.'
      )
    }, 1000)
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1>Forgot Password?</h1>

        <p className="forgot-password-description">
          Enter the email address associated with your account and we'll
          send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="forgot-password-email">
            Email Address
          </label>

          <input
            id="forgot-password-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={loading}
          />

          {error && (
            <p className="forgot-password-error">
              {error}
            </p>
          )}

          {message && (
            <p className="forgot-password-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <button
          type="button"
          className="forgot-password-back"
          onClick={() => alert('Login page will be connected later.')}
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword