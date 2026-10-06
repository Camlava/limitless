import './Alert.css'

// Inline status message. `tone`: error | success | info. `surface`: dark (auth screens) | light (cream panels).
export default function Alert({ tone = 'error', surface = 'light', children }) {
  if (!children) return null
  return (
    <div className={`alert alert--${tone} alert--${surface}`} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  )
}
