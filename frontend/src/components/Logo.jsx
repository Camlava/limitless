import emblem from '../assets/brand/emblem.png'
import wordmark from '../assets/brand/wordmark.png'
import './Logo.css'

export function Emblem({ className = '' }) {
  return <img src={emblem} alt="" className={`emblem ${className}`} />
}

// In the brand panel and sidebar the wordmark is nudged up/left inside a clipped box.
export function Wordmark({ className = '', cropped = false }) {
  return (
    <span className={`wordmark ${cropped ? 'wordmark--cropped' : ''} ${className}`}>
      <img src={wordmark} alt="Limitless — Financial Freedom. Limitless Future." />
    </span>
  )
}

export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <Emblem className="logo__emblem" />
      <Wordmark cropped className="logo__wordmark" />
    </span>
  )
}
