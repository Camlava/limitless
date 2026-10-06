// Placeholder data so the layouts render. Replace with API calls (see API_CONTRACT.md).

export const currentUser = {
  id: 1,
  username: 'kwatkins1024',
  picture: null,
  role: 'ADMINISTRATOR',
}

export const ROLES = [
  { value: 'ADMINISTRATOR', label: 'Administrator' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
]

export const STATUSES = [
  { value: 'ACTIVATED', label: 'Active' },
  { value: 'DEACTIVATED', label: 'Deactivated' },
  { value: 'SUSPENDED', label: 'Suspended' },
]

export const users = [
  {
    id: 3,
    first_name: 'Jordan',
    last_name: 'Lee',
    username: 'jlee1026',
    email_address: 'jlee@email.com',
    home_address: '123 Example Street, Atlanta, GA 30033',
    role: 'ACCOUNTANT',
    status: 'ACTIVATED',
    password_status: 'Valid',
    password_expires: 'Oct. 28, 2026',
  },
  {
    id: 4,
    first_name: 'Morgan',
    last_name: 'Smith',
    username: 'msmith1026',
    email_address: 'msmith@email.com',
    home_address: '456 Example Avenue, Atlanta, GA 30033',
    role: 'MANAGER',
    status: 'ACTIVATED',
    password_status: 'Expired',
    password_expires: 'Oct. 2, 2026',
  },
  {
    id: 5,
    first_name: 'Taylor',
    last_name: 'Brown',
    username: 'tbrown1026',
    email_address: 'tbrown@email.com',
    home_address: '789 Example Road, Atlanta, GA 30033',
    role: 'ACCOUNTANT',
    status: 'SUSPENDED',
    password_status: 'Valid',
    password_expires: 'Dec. 1, 2026',
  },
]

export const accessRequests = [
  {
    id: 12,
    first_name: 'Jordan',
    last_name: 'Lee',
    email_address: 'jlee@email.com',
    home_address: '123 Example Street, Atlanta, GA 30033',
    birth_date: 'MM/DD/YYYY',
    requested: 'Oct. 3, 2026',
  },
  {
    id: 13,
    first_name: 'Morgan',
    last_name: 'Smith',
    email_address: 'msmith@email.com',
    home_address: '456 Example Avenue, Atlanta, GA 30033',
    birth_date: 'MM/DD/YYYY',
    requested: 'Oct. 2, 2026',
  },
  {
    id: 14,
    first_name: 'Taylor',
    last_name: 'Brown',
    email_address: 'tbrown@email.com',
    home_address: '789 Example Road, Atlanta, GA 30033',
    birth_date: 'MM/DD/YYYY',
    requested: 'Oct. 1, 2026',
  },
]

export const securityQuestions = [
  'What was the name of your first school?',
  'What city were you born in?',
  'What was the make of your first car?',
]

export const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value

export const fullName = (person) => `${person.first_name} ${person.last_name}`
