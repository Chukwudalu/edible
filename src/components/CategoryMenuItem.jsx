import React from 'react'
import { useNavigate } from 'react-router-dom'

function CategoryMenuItem({catName, catImage}) {
  const navigate = useNavigate()
  const handleCategoryClick = () => {
    // navigate(`/c/${catName}`)
    window.location.assign(`/c/${catName}`)
  }

  return (
    <div className='categoryMenuItem' onClick={handleCategoryClick}>
        <div className='categoryMenuItem__imgContainer'>
            <img src={catImage} alt="representation of burger meal" className='categoryMenuItem__img'/>
        </div>
        <p className='categoryMenuItem__text'>{catName}</p>
    </div>
  )
}

export default CategoryMenuItem 