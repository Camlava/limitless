import { useCallback, useEffect, useState } from 'react'

// Runs `load` on mount and whenever `deps` change. Returns { data, error, loading, reload }.
// While reloading, the previous data stays available so forms don't flash empty.
export default function useApi(load, deps = []) {
  const [version, setVersion] = useState(0)
  const key = JSON.stringify([...deps, version])
  const [result, setResult] = useState({ key: null, data: null, error: null })

  useEffect(() => {
    let cancelled = false
    load()
      .then((data) => !cancelled && setResult({ key, data, error: null }))
      .catch((error) => !cancelled && setResult({ key, data: null, error }))
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const reload = useCallback(() => setVersion((value) => value + 1), [])
  const loading = result.key !== key
  return { data: result.data, error: loading ? null : result.error, loading, reload }
}
