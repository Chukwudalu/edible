import burger_one from '../assets/burger_one.jpg'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { mealDetailUrl } from '../api';
import RiseLoader from "react-spinners/RiseLoader";


function Details() {
    const location = useLocation()
    const mealId = location.pathname.split('/')[2]

    const [ loading, setLoading ] = useState(true)
    const [meal, setMeal] = useState(null)
    const [mealFetchError, setMealFetchError] = useState('')

    const color = "#F27405";

    const getMealDetail = () => {
        axios.get(mealDetailUrl(mealId))
            .then((res) => {
                setMeal(res.data.meals[0])
                setLoading(false)
            })
            .catch(err => setMealFetchError(err.message))
    }

    useEffect(() => {
        getMealDetail(mealId)
    }, [])

    useEffect(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        })
    }, [])

    // split the meal tags into an array
    // Algorithm for the above
    // --- Define a function that takes a string of words
    // --- If the length of the string of words is greater than 1, split it into an array
    // --- return a HTML span tag that displays those words as tags

    const tagsRenderer = (tags) => {
        const tagsArray = tags.split(',')
        if(tagsArray.length > 1){
            return tagsArray.map((t, key) => <span className='tags tags--bottom' key={key}>{t}</span>)
        }
        return <span className='tags tags--bottom'>{tags}</span>
    }
    
    return (
        <>
        {
            loading ?  (
                <section className='loader'><RiseLoader color={color} loading={loading} size={25} /></section>
            ) : (
                <div className='details'>
                    <div className='details__mainContent'>
                        <div className='details__imgContainer'>
                            <img src={meal && meal.strMealThumb} alt="visual description of the food" className='details__img'/>
                        </div>
                        <div className='details__text'>
                            <h2>{meal && meal.strMeal}</h2>
                            <div className='details__category-area'>
                                
                                <span className='tags'>{meal && meal.strCategory}</span>
                                <span className='tags'>{meal && meal.strArea}</span>
                            </div>
                            <div className='details__ingredientsContainer'>
                                <h3>Ingredients</h3>
                                <ul className='details__ingredientsList'>
                                    { meal && meal.strIngredient1 && (<li>{meal.strIngredient1}</li>)}
                                    { meal && meal.strIngredient2 && (<li>{meal.strIngredient2}</li>)}
                                    { meal && meal.strIngredient3 && (<li>{meal.strIngredient3}</li>)}
                                    { meal && meal.strIngredient4 && (<li>{meal.strIngredient4}</li>)}
                                    { meal && meal.strIngredient5 && (<li>{meal.strIngredient5}</li>)}
                                    { meal && meal.strIngredient6 && (<li>{meal.strIngredient6}</li>)}
                                    { meal && meal.strIngredient7 && (<li>{meal.strIngredient7}</li>)}
                                </ul>
                            </div>
                            <div className='details__instructions'>
                                <h3>Instructions</h3>
                                <p className='details__instructions__text'>
                                    {meal && meal.strInstructions}
                                </p>
                            </div>
                            {
                                meal && !meal.strTags ? '' : 
                                (<div className='details__tagsContainer'>
                                    <h3>Tags</h3>
                                    {/* <span className='tags'>{meal && meal.strTags}</span> */}
                                    <div className='details__tags'>
                                        {meal && tagsRenderer(meal.strTags)}
                                    </div>
                                    
                                </div>)
                            }
                            
                        </div>
                    </div>
                    <div></div>
                </div>
            )
        }
        </>
    )
}

export default Details