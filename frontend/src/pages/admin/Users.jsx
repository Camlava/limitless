import { Link, useSearchParams } from 'react-router-dom'
import { DataTable, PageHeader, Panel, Select } from '../../components/AdminUI.jsx'
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
          <Select
            wrapClassName="select--inline"
            className="toolbar__filter"
            aria-label="Filter by role"
            options={[{ value: '', label: 'Role' }, ...ROLES]}
            defaultValue=""
          />
          <Select
            wrapClassName="select--inline"
            className="toolbar__filter"
            aria-label="Filter by status"
            options={[{ value: '', label: 'Status' }, ...STATUSES]}
            defaultValue={searchParams.get('status') ?? ''}
          />
        </div>

        <DataTable columns={columns} rows={users} caption="Users" />
      </Panel>
    </>
  )
}
