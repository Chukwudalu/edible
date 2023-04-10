import MealCard from './MealCard'
import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SkeletonCard from './SkeletonCard'

function MealSection({mealSectionTitle, data}) {

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

  return (
    <section className='mealSection'>
      <h2>{mealSectionTitle || (<Skeleton />)}</h2>
      <div className='mealSection__container'>
        {
          data && data.map(m => <MealCard 
            key={m.idMeal}
            mealId={m.idMeal}
            mealName={m.strMeal}
            mealArea={m.strArea}
            mealCategory={m.strCategory}
            mealImage={m.strMealThumb}
            favorites={favorites}
            setFavorites={setFavorites}
            bookmarks={ bookmarks }
            setBookmarks={setBookmarks}
         />) || (<SkeletonCard cards={10}/>)
        }
      </div> 
    </section>
  )
}

export default MealSection