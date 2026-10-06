import { Link, useSearchParams } from 'react-router-dom'
import { DataTable, PageHeader, Panel } from '../../components/AdminUI.jsx'
import { ROLES, STATUSES, users } from '../../data/mockData.js'
import { userColumns } from './columns.jsx'

const columns = [
  ...userColumns,
  { key: 'action', header: 'ACTION', render: (user) => <Link to={`/admin/users/${user.id}`}>Edit →</Link> },
]

// 11 User Management
export default function Users() {
  const [searchParams] = useSearchParams()

  return (
    <>
      <PageHeader title="User Management" subtitle="Manage user accounts, roles, and access." />

      <Panel
        title="USERS"
        className="page-panel"
        action={
          <Link to="/admin/users/new" className="btn btn--primary btn--sm">
            Add User
          </Link>
        }
      >
        <div className="toolbar" role="search">
          <input className="toolbar__search" type="search" placeholder="Search users..." aria-label="Search users" />
          <select className="toolbar__filter field__control--select" aria-label="Filter by role" defaultValue="">
            <option value="">Role</option>
            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
          <select
            className="toolbar__filter field__control--select"
            aria-label="Filter by status"
            defaultValue={searchParams.get('status') ?? ''}
          >
            <option value="">Status</option>
            {STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <DataTable columns={columns} rows={users} caption="Users" />
      </Panel>
    </>
  )
}
