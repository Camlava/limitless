import { useNavigate, useParams } from 'react-router-dom'
import { BackLink, DataTable, Field, FormActions, FormSection, PageHeader, Panel } from '../../components/AdminUI.jsx'
import { accessRequests } from '../../data/mockData.js'
import { requestColumns } from './columns.jsx'

// 13 Pending Access Requests
export function PendingRequests() {
  return (
    <>
      <PageHeader title="Pending Access Requests" subtitle="Review and manage new user access requests." />

      <Panel title="PENDING ACCESS REQUESTS" className="page-panel">
        <DataTable columns={requestColumns} rows={accessRequests} caption="Pending access requests" />
      </Panel>
    </>
  )
}

// 14 Review Access Request — approve or reject.
export function ReviewRequest() {
  const { id } = useParams()
  const navigate = useNavigate()
  const request = accessRequests.find((candidate) => String(candidate.id) === id) ?? accessRequests[0]

  // TODO: PUT /api/auth/access-requests/{id}/approve | /reject
  const handleDecision = (event) => {
    event.preventDefault()
    navigate('/admin/access-requests')
  }

  return (
    <>
      <PageHeader title="Review Access Request" subtitle="Review applicant information and approve or reject access." />

      <Panel
        as="form"
        title="REQUEST DETAILS"
        className="page-panel panel--form"
        onSubmit={handleDecision}
        action={<BackLink to="/admin/access-requests">Back to Requests</BackLink>}
      >
        <div className="form-body">
          <FormSection title="APPLICANT INFORMATION">
            <Field label="FIRST NAME" value={request.first_name} readOnly />
            <Field label="LAST NAME" value={request.last_name} readOnly />
            <Field label="EMAIL ADDRESS" value={request.email_address} readOnly />
            <Field label="DATE OF BIRTH" value={request.birth_date} readOnly />
            <Field label="ADDRESS" value={request.home_address} readOnly title={request.home_address} />
            <Field label="DATE REQUESTED" value={request.requested} readOnly />
          </FormSection>
        </div>

        <FormActions>
          <button type="submit" className="btn btn--primary btn--sm">
            Approve
          </button>
          <button type="button" className="btn btn--secondary btn--sm" onClick={handleDecision}>
            Reject
          </button>
        </FormActions>
      </Panel>
    </>
  )
}
