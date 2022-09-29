import { useEffect, useState } from "react"
import MealCard from "../components/MealCard"

function Favorites() {

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
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [])

    
    return (
        <section className="favorites">
            <h2>{favorites.length > 0 ? 'Your Favorite Meals' : 'You have no favorite meals'}</h2>
            <div className="favoriteMealsContainer">
                {
                    getFavoritesArrayFromLocalStorage?.length > 0 ? getFavoritesArrayFromLocalStorage.map((meal) => (<MealCard 
                        key={meal.mealId} 
                        mealId={meal.mealId}
                        mealName={meal.mealName}
                        mealArea={meal.mealArea}
                        mealCategory={meal.mealCategory}
                        mealImage={meal.mealImage}
                        favorites = {favorites}
                        setFavorites = {setFavorites}
                        bookmarks = {bookmarks}
                        setBookmarks = {setBookmarks}
                    />)): ''
                }
            </div>
        </section>
    )
}

export default Favorites