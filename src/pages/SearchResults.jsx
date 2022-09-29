import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { searchedMealUrl } from './../api'
import MealCard from '../components/MealCard';

function SearchResults() {
    const location = useLocation()
    const searchQuery = location.pathname.split('/')[2].split('-').join(' ')

    const [meals, setMeals] = useState([])
    const [mealFetchError, setMealFetchError] = useState('')

    const [ favorites, setFavorites ] = useState([])
    const [ bookmarks, setBookmarks ] = useState([])
  
    const getFavoritesArrayFromLocalStorage = JSON.parse(localStorage.getItem("favorites") || "0")
    const getBookmarkArrayFromLocalStorage = JSON.parse(localStorage.getItem("bookmarks") || "0")
  
    useEffect(() => {
      if(getFavoritesArrayFromLocalStorage !== 0){
        setFavorites([...getFavoritesArrayFromLocalStorage])
      }
    }, [])
  
    useEffect(() => {
      if(getBookmarkArrayFromLocalStorage !== 0){
        setBookmarks([...getBookmarkArrayFromLocalStorage])
      }
    }, [])

    useEffect(() => {
        axios.get(searchedMealUrl(searchQuery))
            .then(res => setMeals(res.data.meals.slice(0, 16)))
            .catch(err => setMealFetchError(err.message))
    }, [searchQuery])

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [])
    
    return (
        <section className='searchPage'>
            <h2>Showing results for <span className='searchQuery'>{searchQuery.toUpperCase()}</span></h2>
            <section className='searchResults'>
                { meals && (meals.map(el => (<MealCard 
                    key={el.idMeal} 
                    mealId={el.idMeal} 
                    mealName={el.strMeal} 
                    mealArea={el.strArea} 
                    mealCategory={el.strCategory} 
                    mealImage={el.strMealThumb}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    bookmarks={bookmarks}
                    setBookmarks={setBookmarks}
                />)))}

            </section>

        </section>
    )
}

export default SearchResults