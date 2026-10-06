import { useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { Field, FormActions, PageHeader, Panel } from '../../components/AdminUI.jsx'
import { fullName, users } from '../../data/mockData.js'

const recipientOptions = [
  { value: '', label: 'Select User...' },
  ...users.map((user) => ({ value: String(user.id), label: `${fullName(user)} (${user.username})` })),
]

// 18 Admin Email — send an email to any user from inside the system.
export default function Email() {
  const navigate = useNavigate()
  const messageId = useId()

  // TODO: send email endpoint (not yet in API_CONTRACT.md)
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/admin')
  }

  return (
    <>
      <PageHeader title="Email Users" subtitle="Send messages to registered Limitless users." />

      <Panel as="form" title="SEND EMAIL" className="page-panel" onSubmit={handleSubmit}>
        <div className="form-body email-form">
          <Field label="RECIPIENT" name="recipient_id" options={recipientOptions} defaultValue="" />
          <Field label="SUBJECT" name="subject" placeholder="Enter Subject..." />
          <div className="field">
            <label className="field__label" htmlFor={messageId}>
              MESSAGE
            </label>
            <textarea id={messageId} name="message" className="field__textarea" placeholder="Type your message..." />
          </div>
        </div>

        <FormActions>
          <button type="submit" className="btn btn--primary btn--sm">
            Send Email
          </button>
        </FormActions>
      </Panel>
    </>
  )
}
