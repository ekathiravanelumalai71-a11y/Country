import { createContext, useContext, useEffect, useReducer } from 'react'

function favouritesReducer(state, action) {
  switch (action.type) {
    case 'ADD_FAVOURITE': {
      const country = action.payload

      if (state.some((savedCountry) => savedCountry.cca3 === country.cca3)) {
        return state
      }

      return [...state, country]
    }
    case 'REMOVE_FAVOURITE':
      return state.filter((country) => country.cca3 !== action.payload)
    default:
      return state
  }
}

const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    () => JSON.parse(localStorage.getItem('favourites') || '[]')
  )

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  return <FavouritesContext.Provider value={{ favourites, dispatch }}>{children}</FavouritesContext.Provider>
}

export function useFavourites() {
  const context = useContext(FavouritesContext)

  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider')
  }

  return context
}

export default FavouritesContext