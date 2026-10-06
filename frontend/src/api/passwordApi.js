export async function requestPasswordReset({
  username,
  email_address,
  security_answer1,
  security_answer2,
  security_answer3,
}) {
  const response = await fetch('/api/auth/forgot-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email_address,
      security_answer1,
      security_answer2,
      security_answer3,
    }),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data.message || 'Unable to process password reset request.'
    )
  }

  return data
}