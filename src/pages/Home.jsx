import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// Component Imports
import CategoryMenu from "../components/CategoryMenu"
import Hero from "../components/Hero"
import MealSection from "../components/MealSection"
import Article from "../components/Articles"
// import RiseLoader from "react-spinners/RiseLoader";
// Utility Imports
import { MobileSearchRenderer } from '../utility/searchRenderer'

function Home() {
  const latestMeals = useSelector(state => state.AllMeals.value.latestMeals.meals)
  const randomMeals = useSelector(state => state.AllMeals.value.randomMeals.meals)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }, [])

  
  
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [])


  return (
    <section className="home">
        <Hero/>
        { MobileSearchRenderer() }
        <CategoryMenu/>
        <MealSection mealSectionTitle={'Latest Meals'} data={latestMeals && latestMeals}/>
        <div className="articlesContainer">
          <h2>Health Tips</h2>
          <div className="articlesContainer__div">
            <Article text='The way of healthy living' destination={'https://www.anxietycanada.com/articles/healthy-living/'}/>
            <Article text="Diabetes and it's dangers" destination={'https://www.healthline.com/health/diabetes/effects-on-body'}/>
          </div>
        </div>
        <MealSection mealSectionTitle={'Random Meals'} data={randomMeals && randomMeals}/>
    </section>
  )
}

export default Home