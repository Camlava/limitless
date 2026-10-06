import { Link } from 'react-router-dom'
import { ROLES, STATUSES, fullName, labelFor } from '../../data/mockData.js'

// Table column definitions shared across the admin screens.

export const requestColumns = [
  { key: 'name', header: 'NAME', width: '24%', render: fullName },
  { key: 'email_address', header: 'EMAIL', width: '33%' },
  { key: 'requested', header: 'REQUESTED', width: '25%' },
  {
    key: 'action',
    header: 'ACTION',
    render: (request) => <Link to={`/admin/access-requests/${request.id}`}>Review →</Link>,
  },
]

export const userColumns = [
  { key: 'name', header: 'NAME', width: '21%', render: fullName },
  { key: 'username', header: 'USERNAME', width: '23.5%' },
  { key: 'role', header: 'ROLE', width: '16%', render: (user) => labelFor(ROLES, user.role) },
  { key: 'status', header: 'STATUS', width: '20%', render: (user) => labelFor(STATUSES, user.status) },
]
