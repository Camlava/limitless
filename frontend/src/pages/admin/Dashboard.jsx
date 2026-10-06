import { DataTable, PageHeader, Panel, StatCard } from '../../components/AdminUI.jsx'
import { accessRequests, users } from '../../data/mockData.js'
import { requestColumns } from './columns.jsx'

// 10 Administrator Dashboard
export default function Dashboard() {
  const suspended = users.filter((user) => user.status === 'SUSPENDED').length

  return (
    <>
      <PageHeader
        eyebrow="ADMINISTRATION"
        title="Administrator Dashboard"
        subtitle="Manage users, access requirements, and account activity."
      />

      <div className="stat-cards">
        <StatCard label="TOTAL USERS" value={users.length} linkTo="/admin/users" linkLabel="View Users" />
        <StatCard
          label="PENDING REQUESTS"
          value={accessRequests.length}
          linkTo="/admin/access-requests"
          linkLabel="Review Requests"
        />
        <StatCard
          label="SUSPENDED USERS"
          value={suspended}
          linkTo="/admin/users?status=SUSPENDED"
          linkLabel="View Users"
        />
      </div>

      <Panel title="PENDING ACCESS REQUESTS" className="dashboard-requests">
        <DataTable columns={requestColumns} rows={accessRequests} caption="Pending access requests" />
      </Panel>
    </>
  )
}
