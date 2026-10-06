import { useNavigate, useParams } from 'react-router-dom'
import { BackLink, Field, FormActions, FormSection, PageHeader, Panel } from '../../components/AdminUI.jsx'
import { ROLES, STATUSES, users } from '../../data/mockData.js'

// 12 User Details / Edit User — update info, role, activate/deactivate, schedule a suspension.
export default function EditUser() {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = users.find((candidate) => String(candidate.id) === id) ?? users[0]

  // TODO: PUT /api/users/{id}, /activate, /deactivate, /suspend
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/admin/users')
  }

  return (
    <>
      <PageHeader title="Edit User" subtitle="Update account information, role, and access." />

      <Panel
        as="form"
        title="USER DETAILS"
        className="page-panel panel--form"
        onSubmit={handleSubmit}
        action={<BackLink to="/admin/users">Back to Users</BackLink>}
      >
        <div className="form-body">
          <FormSection title="ACCOUNT INFORMATION">
            <Field label="FIRST NAME" name="first_name" defaultValue={user.first_name} />
            <Field label="LAST NAME" name="last_name" defaultValue={user.last_name} />
            <Field label="EMAIL ADDRESS" name="email_address" type="email" defaultValue={user.email_address} />
            <Field label="USERNAME" name="username" defaultValue={user.username} readOnly />
            <Field label="ADDRESS" name="home_address" defaultValue={user.home_address} className="field--wide" />
            <Field label="ROLE" name="role" options={ROLES} defaultValue={user.role} />
            <Field label="ACCOUNT STATUS" name="status" options={STATUSES} defaultValue={user.status} />
          </FormSection>

          <FormSection title="ACCOUNT ACCESS">
            <Field label="PASSWORD STATUS" defaultValue={user.password_status} readOnly className="field--stack" />
            <Field
              label="PASSWORD EXPIRATION"
              defaultValue={`Expires ${user.password_expires}`}
              readOnly
              className="field--stack"
            />
          </FormSection>

          <FormSection title="SCHEDULED SUSPENSION">
            <Field label="START DATE" name="suspension_start" type="date" />
            <Field label="EXPIRY DATE" name="suspension_end" type="date" />
          </FormSection>
        </div>

        <FormActions>
          <button type="submit" className="btn btn--primary btn--sm">
            Save Changes
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => navigate('/admin/users')}>
            Cancel
          </button>
        </FormActions>
      </Panel>
    </>
  )
}
