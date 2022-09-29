import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { categoryMealsUrl } from '../api';
import MealCard from '../components/MealCard'
import RiseLoader from "react-spinners/RiseLoader";

// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

function CategoryMeals() {
  const location = useLocation()
  const categoryName = location.pathname.split('/')[2]
  
  const [categoryList, setCategoryList] = useState(null)
  const [categoryListErrorMsg, setCategoryListErrorMsg] = useState('')

  const [ favorites, setFavorites ] = useState([])
  const [ bookmarks, setBookmarks ] = useState([])
  const [ loading, setLoading ] = useState(true)
  
  const getFavoritesArrayFromLocalStorage = JSON.parse(localStorage.getItem("favorites") || "0")
  const getBookmarkArrayFromLocalStorage = JSON.parse(localStorage.getItem("bookmarks") || "0")

  const color = "#F27405";

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

  const getCategoryMeals = () => {
    axios.get(categoryMealsUrl(categoryName))
      .then(res => {
        setCategoryList(res.data.meals.slice(0, 16));
        setLoading(false)
      })
      .catch(err => setCategoryListErrorMsg(err.message))
  }

  useEffect(() => {
    getCategoryMeals()
  }, [])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  return (
    <>
        {
            loading ?  (
              <section className='loader'><RiseLoader color={color} loading={loading} size={25} /></section>
            ) : 
            (
              <section className='categoryMeals'>
                <h1 className='categoryMeals__header'>{categoryName} Meals</h1>
                <section className='categoryMeals__meals'>
                  { categoryList && categoryList.map(c => <MealCard 
                  key={c.idMeal} 
                  mealId={c.idMeal} 
                  mealName={c.strMeal}
                  mealImage={c.strMealThumb}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  bookmarks={bookmarks}
                  setBookmarks={setBookmarks}
                  />)}
                </section>
              </section>  
            )
        }     
    </>
    
                                                        
  )
}

export default CategoryMeals