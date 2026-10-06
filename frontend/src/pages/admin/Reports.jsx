import { api } from '../../api/client.js'
import AsyncContent from '../../components/AsyncContent.jsx'
import { BackLink, DataTable, PageHeader, Panel, ReportCard } from '../../components/AdminUI.jsx'
import { STATUSES, formatDate, isSystemUser, labelFor } from '../../constants.js'
import useApi from '../../hooks/useApi.js'
import { passwordStatusColumn, userColumns } from './columns.jsx'

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

// 16 All Users Report
export function AllUsersReport() {
  const { data, error, loading } = useApi(api.allUsersReport)

  return (
    <>
      <PageHeader title="All Users Report" subtitle="View registered users and account information." />

      <Panel
        title="All Users Report"
        className="page-panel"
        action={<BackLink to="/admin/reports">Back to Reports</BackLink>}
      >
        <AsyncContent loading={loading} error={error}>
          <DataTable
            columns={[...userColumns, passwordStatusColumn]}
            rows={(data ?? []).filter(isSystemUser)}
            caption="All users"
            empty="No users yet."
          />
        </AsyncContent>
      </Panel>
    </>
  )
}

const expiredColumns = [
  ...userColumns.slice(0, 3),
  { key: 'password_expiry', header: 'PASSWORD EXPIRED', width: '20%', render: (user) => formatDate(user.password_expiry) },
  { key: 'status', header: 'ACCOUNT STATUS', render: (user) => labelFor(STATUSES, user.status) },
]

// 17 Expired Passwords Report
export function ExpiredPasswordsReport() {
  const { data, error, loading } = useApi(api.expiredPasswordsReport)

  return (
    <>
      <PageHeader title="Expired Passwords Report" subtitle="View users with expired passwords requiring attention." />

      <Panel
        title="Expired Passwords Report"
        className="page-panel"
        action={<BackLink to="/admin/reports">Back to Reports</BackLink>}
      >
        <AsyncContent loading={loading} error={error}>
          <DataTable
            columns={expiredColumns}
            rows={data ?? []}
            caption="Users with expired passwords"
            empty="No expired passwords."
          />
        </AsyncContent>
      </Panel>
    </>
  )
}
