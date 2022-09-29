import { useState, useEffect} from 'react'
import { FavoriteBorderOutlined, Favorite, BookmarkBorderOutlined, Bookmark } from '@mui/icons-material'
import { pink } from '@mui/material/colors';
import slugify from 'react-slugify';
import { EncryptStorage } from 'encrypt-storage';


const encryptStorage = new EncryptStorage(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_SECRET_KEY, {
  prefix: '@base'
});

const MealCard = ({mealId, mealName, mealArea, mealCategory, mealImage, favorites, setFavorites, bookmarks, setBookmarks}) => {
  const value = encryptStorage.getItem('grant'); 
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(value === 'success' ? true : false)

  // Set isLiked to true when the component loads fn the item is liked by the user
  useEffect(() => {
    const index = favorites?.findIndex((meal, i) => meal.mealId === mealId)
    if(index !== -1) setIsLiked(true)
  })

  // Set isBookmarked to true when the component loads if the item is bookmarked by the user
  useEffect(() => {
    const index = bookmarks?.findIndex((meal, i) => meal.mealId === mealId)
    if(index !== -1) setIsBookmarked(true)
  })

  // Funtion for navigating to the detail page
  const handleMealCardClickToDetail = () => {
    const slug = slugify(mealName)
    // navigate(`/${slug}/${mealId}`)
    window.location.assign(`/${slug}/${mealId}`)
  }

  // Function for liking / unliking a gig
  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if(!isLoggedIn) return window.location.assign('/login')

    const favoriteMealObj = {
      mealId, mealName, mealArea, mealCategory, mealImage
    }

    let array = favorites;
    let addArray = true;

    // If the meal object is already in the array, remove it from the array
    array?.map((item, key) => {
      if(item.mealId === favoriteMealObj.mealId){
        
        array.splice(key, 1)
        addArray = false
        setIsLiked(false)
      }
    })

    if(addArray){
      array?.push(favoriteMealObj)
      setIsLiked(true)
    }

    setFavorites([...array])
    
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }


  // Function for bookmarking a gig
  const handleBookmarkClick = (e) => {
    
    e.stopPropagation()

    if(!isLoggedIn) return window.location.assign('/login')

    const bookmarkedMealObj = {
      mealId, mealName, mealArea, mealCategory, mealImage
    }

    let bookmarkedArray = bookmarks;
    let addBookmarks = true;

    bookmarkedArray.map((meal, key) => {
      if(meal.mealId === bookmarkedMealObj.mealId){
        
        bookmarkedArray?.splice(key, 1)
        addBookmarks = false
        setIsBookmarked(false)
      }
    })

    if(addBookmarks){
      bookmarkedArray?.push(bookmarkedMealObj)
      setIsBookmarked(true)
    }

    setBookmarks([...bookmarkedArray])

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }
  
  
  return (
    <div className="mealCard" onClick={handleMealCardClickToDetail}>
      <div className="mealCard__imgContainer">
        <img src={mealImage} alt="" className="mealCard__img" />
      </div>
      <div className="mealCard__detail">
        <h4 className='mealCard__detail__mealName'>{mealName}</h4>
        <span className='bookmark__container' onClick={ handleBookmarkClick }>
          {
            !isBookmarked ? <BookmarkBorderOutlined className='mealCard__icons mealCard__icons--bookmark MuiSvgIcon-fontSizeMedium'/>
            : <Bookmark className='mealCard__icons mealCard__icons--bookmark MuiSvgIcon-fontSizeMedium'  style={{color: "black"}}/>
          }
        </span>
        
        
      </div>
      <span className='favorite__container' onClick={handleFavoriteClick}>
        { !isLiked ? <FavoriteBorderOutlined className={'mealCard__icons mealCard__icons--favorite MuiSvgIcon-fontSizeMedium'}/>:
          <Favorite className={'mealCard__icons mealCard__icons--favorite MuiSvgIcon-fontSizeMedium'} style={{color: pink[500]}}/>
        }
      </span>
    </div>
  )
}


export default MealCard