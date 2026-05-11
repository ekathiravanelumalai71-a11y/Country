import React from 'react'
import { Link } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

function CountryCard({ country }) {
  const { name, flags, population, region, capital, cca3 } = country
  const { favourites, dispatch } = useFavourites()
  const isSaved = favourites.some((savedCountry) => savedCountry.cca3 === cca3)

  function handleFavouriteClick(event) {
    event.preventDefault()
    event.stopPropagation()

    if (isSaved) {
      dispatch({ type: 'REMOVE_FAVOURITE', payload: cca3 })
      return
    }

    dispatch({ type: 'ADD_FAVOURITE', payload: country })
  }

  return (
    <Link to={`/country/${cca3}`} className="card">
      <img className="card__flag" src={flags?.svg} alt={`Flag of ${name?.common ?? 'country'}`} />
      <div className="card__body">
        <h3 className="card__name">{name?.common ?? 'Unknown Country'}</h3>
        <p>
          <span>Population:</span> {population?.toLocaleString()}
        </p>
        <p>
          <span>Region:</span> {region ?? 'N/A'}
        </p>
        <p>
          <span>Capital:</span> {capital?.[0] ?? 'N/A'}
        </p>
        <button
          type="button"
          className={`fav-btn ${isSaved ? 'fav-btn--saved' : ''}`}
          onClick={handleFavouriteClick}
        >
          {isSaved ? '♥ Saved' : '♡ Save'}
        </button>
      </div>
    </Link>
  )
}

export default CountryCard