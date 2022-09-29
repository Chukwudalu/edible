import {FavoriteBorder, BookmarkBorderOutlined } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";
import slugify from 'react-slugify';

function CategoryListMealCard({ mealId, mealName, mealImage}) {
  const navigate = useNavigate()

  const handleMealCardClickToDetail = () => {
    const slug = slugify(mealName)
    navigate(`/${slug}/${mealId}`)
  }
  return (
    <div className='clMealCard'>
      <div className='clMealCard__imgContainer' onClick={handleMealCardClickToDetail}>
        <img src={mealImage} alt="" className='clMealCard__img'/>
      </div>
      <div className='clMealCard__infoContainer'>
        <div className='clMealCard__mealNameContainer'>
          <p className='clMealCard__mealName'>{mealName}</p>
        </div>

        <div className='clMealCard__iconsContainer'>
          <FavoriteBorder className='clMealCard__icons favourite-icon'/>
          <BookmarkBorderOutlined className='clMealCard__icons bookmark-icon'/>
        </div>
      </div>
      

    </div>
  )
}

export default CategoryListMealCard