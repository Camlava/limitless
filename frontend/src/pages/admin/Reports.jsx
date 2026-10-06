import { BackLink, DataTable, PageHeader, Panel, ReportCard } from '../../components/AdminUI.jsx'
import { STATUSES, labelFor, users } from '../../data/mockData.js'
import { userColumns } from './columns.jsx'

// 15 Admin Reports
export function ReportsHome() {
  return (
    <>
      <PageHeader title="Admin Reports" subtitle="View user account and password status reports." />

      <Panel title="REPORTS" className="page-panel">
        <div className="report-cards">
          <ReportCard
            label="ALL USERS"
            description="View all registered users and account information."
            linkTo="/admin/reports/users"
          />
          <ReportCard
            label="EXPIRED PASSWORDS"
            description="View users with expired passwords requiring attention."
            linkTo="/admin/reports/expired-passwords"
          />
        </div>
      </Panel>
    </>
  )
}

const allUsersColumns = [...userColumns, { key: 'password_status', header: 'PASSWORD STATUS' }]

// 16 All Users Report
export function AllUsersReport() {
  return (
    <>
      <PageHeader title="All Users Report" subtitle="View registered users and account information." />

      <Panel
        title="All Users Report"
        className="page-panel"
        action={<BackLink to="/admin/reports">Back to Reports</BackLink>}
      >
        <DataTable columns={allUsersColumns} rows={users} caption="All users" />
      </Panel>
    </>
  )
}

const expiredColumns = [
  ...userColumns.slice(0, 3),
  { key: 'password_expires', header: 'PASSWORD EXPIRED', width: '20%' },
  { key: 'status', header: 'ACCOUNT STATUS', render: (user) => labelFor(STATUSES, user.status) },
]

// 17 Expired Passwords Report
export function ExpiredPasswordsReport() {
  const expired = users.filter((user) => user.password_status === 'Expired')

  return (
    <>
      <PageHeader title="Expired Passwords Report" subtitle="View users with expired passwords requiring attention." />

      <Panel
        title="Expired Passwords Report"
        className="page-panel"
        action={<BackLink to="/admin/reports">Back to Reports</BackLink>}
      >
        <DataTable columns={expiredColumns} rows={expired} caption="Users with expired passwords" />
      </Panel>
    </>
  )
}
