import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchSuggestion from './SearchSuggestion'

function SearchSuggestionsList({ query }) {
    const [ results, setResults ] = useState([]);

    useEffect(() => {
        getResults()
        
    }, [query])


    const getResults = async () => {
        if(!query) return 
        const res = await axios.get(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_APIKEY }/search.php?s=${query}`);
        if(!res.data.meals) return 
        
        setResults(res.data.meals.splice(0, 10))
    }

    return (
        
        <section className='search-suggestions-list'>
            {
                results?.map( ({idMeal, strMeal, strMealThumb}) => <SearchSuggestion
                    key={idMeal}
                    id={idMeal}
                    name={strMeal}
                    image={strMealThumb}
                />)
            }
        </section>
    )
}

export default SearchSuggestionsList