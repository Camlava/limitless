import { useNavigate } from 'react-router-dom'
import { BackLink, Field, FormActions, FormSection, PageHeader, Panel } from '../../components/AdminUI.jsx'
import { ROLES } from '../../data/mockData.js'

const roleOptions = [{ value: '', label: 'Select Role' }, ...ROLES]

// 19 Create User — administrator creates an account and assigns a role.
export default function CreateUser() {
  const navigate = useNavigate()

  // TODO: POST /api/users
  const handleSubmit = (event) => {
    event.preventDefault()
    navigate('/admin/users')
  }

  return (
    <>
      <PageHeader title="Create User" subtitle="Create a new user account and assign a role." />

      <Panel
        as="form"
        title="CREATE USER"
        className="page-panel panel--form"
        onSubmit={handleSubmit}
        action={<BackLink to="/admin/users">Back to Users</BackLink>}
      >
        <div className="form-body">
          <FormSection title="ACCOUNT INFORMATION">
            <Field label="FIRST NAME" name="first_name" placeholder="Enter first name..." />
            <Field label="LAST NAME" name="last_name" placeholder="Enter last name..." />
            <Field label="EMAIL ADDRESS" name="email_address" type="email" placeholder="Enter email..." />
            <Field label="DATE OF BIRTH" name="birth_date" type="date" />
            <Field label="ADDRESS" name="home_address" placeholder="Enter address..." />
            <Field label="ROLE" name="role" options={roleOptions} defaultValue="" />
            <Field
              label="USERNAME"
              value="Generated automatically"
              readOnly
              className="field--wide"
              hint="First initial → last name → account creation month/year"
            />
          </FormSection>
        </div>

        <FormActions>
          <button type="submit" className="btn btn--primary btn--sm">
            Create User
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={() => navigate('/admin/users')}>
            Cancel
          </button>
        </FormActions>
      </Panel>
    </>
  )
}
