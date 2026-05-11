import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!query.trim()) {
      setCountries([])
      setError(null)
      setLoading(false)
      return undefined
    }

    setCountries([])
    setError(null)
    setLoading(false)

    const timer = setTimeout(() => {
      const fetchCountries = async () => {
        setLoading(true)

        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(query.trim())}`)

          if (!response.ok) {
            throw new Error('No countries found.')
          }

          const data = await response.json()
          setCountries(data)
          setError(null)
        } catch (fetchError) {
          setCountries([])
          setError(fetchError instanceof Error ? fetchError.message : 'No countries found.')
        } finally {
          setLoading(false)
        }
      }

      fetchCountries()
    }, 400)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={setQuery} />

      {loading ? (
        <p className="home__status">Loading...</p>
      ) : error ? (
        <p className="home__status home__status--error">{error}</p>
      ) : countries.length > 0 ? (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : query.trim() ? null : (
        <p className="home__placeholder">Start searching to explore countries.</p>
      )}
    </div>
  )
}

export default Home
