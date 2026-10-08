import { useState } from 'react'
import './ForgotPassword.css'
import { requestPasswordReset } from './api/passwordApi'

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const [verificationResult, setVerificationResult] = useState(null)

  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [securityAnswer1, setSecurityAnswer1] = useState('')
  const [securityAnswer2, setSecurityAnswer2] = useState('')
  const [securityAnswer3, setSecurityAnswer3] = useState('')

  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }

    setStep(2)
  }

  const handleVerificationSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (
      !username.trim() ||
      !email.trim() ||
      !securityAnswer1.trim() ||
      !securityAnswer2.trim() ||
      !securityAnswer3.trim()
    ) {
      setError('Please complete all fields.')
      return
    }

    setLoading(true)

    try {
      const data = await requestPasswordReset({
        username,
        email_address: email,
        security_answer1: securityAnswer1,
        security_answer2: securityAnswer2,
        security_answer3: securityAnswer3,
      })

      if (!data.reset_token) {
        throw new Error('Verification did not return a reset token.')
      }

      setResetToken(data.reset_token)
      setVerificationResult('success')
    } catch (err) {
      setVerificationResult('failed')
    } finally {
      setLoading(false)
    }
  }

  const handleTryAgain = () => {
    setError('')
    setVerificationResult(null)
  }

  const handleContinue = () => {
    setError('')
    setNewPassword('')
    setConfirmPassword('')
    setShowPassword(false)
    setVerificationResult('reset')
  }

  const handlePasswordSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!newPassword || !confirmPassword) {
      setError('Please complete both password fields.')
      return
    }

    if (newPassword.length < 8) {
      setError('Your password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('The passwords do not match. Please try again.')
      return
    }

    // Frontend demonstration only.
    // Connect the reset token and new password to the backend later.
    if (!resetToken) {
      setError('Your verification session has expired. Please verify again.')
      setVerificationResult(null)
      setStep(2)
      return
    }

    setVerificationResult('changed')
  }

  const handleBack = () => {
    setError('')
    setVerificationResult(null)
    setStep(1)
  }

  const handleReturnToLogin = () => {
    setStep(1)
    setVerificationResult(null)
    setResetToken('')
    setEmail('')
    setUsername('')
    setSecurityAnswer1('')
    setSecurityAnswer2('')
    setSecurityAnswer3('')
    setNewPassword('')
    setConfirmPassword('')
    setError('')
  }

  // Screen 1: Enter email.
  if (step === 1) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <h1>Admin Password Recovery</h1>

          <p className="forgot-password-description">
            Enter the email address associated with your admin account
            to begin recovering your password.
          </p>

          <form onSubmit={handleEmailSubmit}>
            <label htmlFor="forgot-password-email">
              Email Address
            </label>

            <input
              id="forgot-password-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            {error && (
              <p className="forgot-password-error">{error}</p>
            )}

            <button type="submit">Continue</button>
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

  // Screen 2: Verify admin information.
  if (step === 2 && !verificationResult) {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <h1>Verify Admin Information</h1>

          <p className="forgot-password-description">
            Enter your account information and answer all three security
            questions to continue.
          </p>

          <form onSubmit={handleVerificationSubmit}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={loading}
              required
            />

            <label htmlFor="verification-email">Email Address</label>
            <input
              id="verification-email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={loading}
              required
            />

            <label htmlFor="security-answer1">Security Answer 1</label>
            <input
              id="security-answer1"
              type="text"
              placeholder="Enter your answer"
              value={securityAnswer1}
              onChange={(event) => setSecurityAnswer1(event.target.value)}
              disabled={loading}
              required
            />

            <label htmlFor="security-answer2">Security Answer 2</label>
            <input
              id="security-answer2"
              type="text"
              placeholder="Enter your answer"
              value={securityAnswer2}
              onChange={(event) => setSecurityAnswer2(event.target.value)}
              disabled={loading}
              required
            />

            <label htmlFor="security-answer3">Security Answer 3</label>
            <input
              id="security-answer3"
              type="text"
              placeholder="Enter your answer"
              value={securityAnswer3}
              onChange={(event) => setSecurityAnswer3(event.target.value)}
              disabled={loading}
              required
            />

            {error && (
              <p className="forgot-password-error">{error}</p>
            )}

            <button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify Information'}
            </button>
          </form>

          <button
            type="button"
            className="forgot-password-back"
            onClick={handleBack}
            disabled={loading}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  // Screen 3: Verification failed.
  if (verificationResult === 'failed') {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <h1>Account Not Verified</h1>

          <p className="forgot-password-description">
            We couldn't verify your admin account information.
          </p>

          <p className="forgot-password-error">
            The information provided does not match our records.
            Please check your information and try again.
          </p>

          <button type="button" onClick={handleTryAgain}>
            Try Again
          </button>

          <button
            type="button"
            className="forgot-password-back"
            onClick={handleBack}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  // Screen 4: Verification succeeded.
  if (verificationResult === 'success') {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <h1>Account Verified</h1>

          <p className="forgot-password-description">
            Your admin account information has been verified successfully.
          </p>

          <p className="forgot-password-success">
            You can now create a new password.
          </p>

          <button type="button" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    )
  }

  // Screen 5: Set a new password.
  if (verificationResult === 'reset') {
    return (
      <div className="forgot-password-page">
        <div className="forgot-password-card">
          <h1>Set New Password</h1>

          <p className="forgot-password-description">
            Create a new password for your admin account.
            Your password must be at least 8 characters long.
          </p>

          <form onSubmit={handlePasswordSubmit}>
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              required
            />

            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />

            <label className="password-visibility">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(event) => setShowPassword(event.target.checked)}
              />
              Show passwords
            </label>

            {error && (
              <p className="forgot-password-error">{error}</p>
            )}

            <button type="submit">Reset Password</button>
          </form>

          <button
            type="button"
            className="forgot-password-back"
            onClick={() => {
              setError('')
              setVerificationResult('success')
            }}
          >
            Back
          </button>
        </div>
      </div>
    )
  }

  // Screen 6: Password reset success (demo only).
  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1>Password Successfully Changed</h1>

        <p className="forgot-password-success">
          Your new password passed the form checks.
        </p>

        <p className="forgot-password-description">
          This is a frontend demonstration. Your password has not been
          saved to the backend yet.
        </p>

        <button type="button" onClick={handleReturnToLogin}>
          Return to Login
        </button>
      </div>
    </div>
  )
}

export default ForgotPassword

