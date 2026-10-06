export const ROLES = [
  { value: 'ADMINISTRATOR', label: 'Administrator' },
  { value: 'MANAGER', label: 'Manager' },
  { value: 'ACCOUNTANT', label: 'Accountant' },
]

export const STATUSES = [
  { value: 'ACTIVATED', label: 'Active' },
  { value: 'DEACTIVATED', label: 'Deactivated' },
  { value: 'SUSPENDED', label: 'Suspended' },
  { value: 'PENDING', label: 'Pending' },
]

// Users answer these when requesting access; forgot-password asks them back.
export const SECURITY_QUESTIONS = [
  'What was the name of your first school?',
  'What city were you born in?',
  'What was the make of your first car?',
]

export const homePathFor = (user) => (user?.role === 'ADMINISTRATOR' ? '/admin' : '/home')

export const labelFor = (options, value) =>
  options.find((option) => option.value === value)?.label ?? value ?? '—'

export const fullName = (person) => [person.first_name, person.last_name].filter(Boolean).join(' ')

// Approved accounts have a username; pending or rejected requests do not.
export const isSystemUser = (user) => Boolean(user.username)

const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']

// "2026-10-03" → "Oct. 3, 2026" (parsed as a calendar date, so no timezone shift)
export function formatDate(isoDate) {
  if (!isoDate) return '—'
  const [year, month, day] = isoDate.split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

export function todayIso() {
  const now = new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

export const isPasswordExpired = (user) => Boolean(user.password_expiry) && user.password_expiry < todayIso()

export const passwordStatus = (user) => {
  if (!user.password_expiry) return '—'
  return isPasswordExpired(user) ? 'Expired' : 'Valid'
}

// Sprint 1 rules: 8+ characters, starts with a letter, includes a letter, a number and a special character.
export function passwordProblems(password) {
  const problems = []
  if (password.length < 8) problems.push('be at least 8 characters')
  if (!/^[A-Za-z]/.test(password)) problems.push('start with a letter')
  if (!/\d/.test(password)) problems.push('include a number')
  if (!/[^A-Za-z0-9]/.test(password)) problems.push('include a special character')
  return problems
}

// FormData → plain object, trimming text and turning empty strings into null.
export function formValues(form) {
  return Object.fromEntries(
    [...new FormData(form).entries()].map(([key, value]) => {
      const text = typeof value === 'string' ? value.trim() : value
      return [key, text === '' ? null : text]
    }),
  )
}
