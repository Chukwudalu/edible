import React from 'react'
import slugify from 'react-slugify';
import { useNavigate } from "react-router-dom";

function SearchSuggestion(prop) {

  const navigate = useNavigate()

  const handleSuggestionClick = () => {
    const slug = slugify(prop.name)
    // navigate(`/${slug}/${prop.id}`)
    window.location.assign(`/${slug}/${prop.id}`)
  }

  return (
    <div className='search-suggestion' onClick={handleSuggestionClick}>
        <div className='search-suggestion__imageContainer'>
            <img src={prop.image} alt="one of the search suggestion" className='search-suggestion__image'/>
        </div>
        <p className='search-suggestion__name'>{prop.name}</p>
    </div>
  )
}

export default SearchSuggestion