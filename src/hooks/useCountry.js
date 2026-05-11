import { useEffect, useState } from 'react'

function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) {
      setCountry(null)
      setLoading(false)
      setError('Country code is missing.')
      return undefined
    }

    setLoading(true)
    setError(null)

    const fetchCountry = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}`)

        if (!response.ok) {
          throw new Error('Country not found.')
        }

        const data = await response.json()
        setCountry(data[0] ?? null)
      } catch (fetchError) {
        setCountry(null)
        setError(fetchError instanceof Error ? fetchError.message : 'Country not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()

    return undefined
  }, [code])

  return { country, loading, error }
}

export default useCountry