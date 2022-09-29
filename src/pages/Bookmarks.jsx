import { useEffect, useState } from "react"
import MealCard from "../components/MealCard"


function Bookmarks() {
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
        <section className="bookmarks">
            <h2>{bookmarks.length? 'Your Bookmarked Meals' : 'You have no bookmarked meals'}</h2>
            <div className="bookmarkedMealsContainer">
                {
                    getBookmarkArrayFromLocalStorage.length > 0 ? getBookmarkArrayFromLocalStorage.map((meal) => (<MealCard 
                        key={meal.mealId} 
                        mealId={meal.mealId}
                        mealName={meal.mealName}
                        mealArea={meal.mealArea}
                        mealCategory={meal.mealCategory}
                        mealImage={meal.mealImage}
                        bookmarks = {bookmarks}
                        favorites={favorites}
                        setBookmarks = {setBookmarks}
                        setFavorites={setFavorites}
                    />)): ''
                }
            </div>
        </section>
    )
}

export default Bookmarks