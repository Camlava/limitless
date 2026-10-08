
import { useState } from 'react'
import ForgotPassword from './ForgotPassword.jsx'

function App() {
  const [showAdminRecovery, setShowAdminRecovery] = useState(false)

  if (showAdminRecovery) {
    return <ForgotPassword />
  }

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-card">
        <h1>Account Recovery</h1>

        <p className="forgot-password-description">
          Select the recovery option that applies to your account.
        </p>

        <button
          type="button"
          onClick={() =>
            alert('Regular user password recovery will be connected separately.')
          }
        >
          Forgot Password?
        </button>

        <button
          type="button"
          onClick={() => setShowAdminRecovery(true)}
        >
          Admin Password Recovery
        </button>
      </div>
    </div>
  )
}

export default App


