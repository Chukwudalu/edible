import Skeleton from "react-loading-skeleton"

function SkeletonCard({ cards }) {
  return (
    Array(cards).fill(0).map((_, i) => (
        <div className='skeleton-card' key={i}>
            <div className="skeleton-card__imageContainer">
                <Skeleton style={{height: 200}}/>
            </div>
            <div className="skeleton-card__content">
                <Skeleton/>
            </div>
        </div>
    ))
    
  )
}

export default SkeletonCard

    // <div className="mealCard" onClick={handleMealCardClickToDetail}>
    //   <div className="mealCard__imgContainer">
    //     <img src={mealImage} alt="" className="mealCard__img" />
    //   </div>
    //   <div className="mealCard__detail">
    //     <h4 className='mealCard__detail__mealName'>{mealName}</h4>
    //     <span className='bookmark__container' onClick={ handleBookmarkClick }>
    //       {
    //         !isBookmarked ? <BookmarkBorderOutlined className='mealCard__icons mealCard__icons--bookmark MuiSvgIcon-fontSizeMedium'/>
    //         : <Bookmark className='mealCard__icons mealCard__icons--bookmark MuiSvgIcon-fontSizeMedium'  style={{color: "black"}}/>
    //       }
    //     </span>
        
        
    //   </div>
    //   <span className='favorite__container' onClick={handleFavoriteClick}>
    //     { !isLiked ? <FavoriteBorderOutlined className={'mealCard__icons mealCard__icons--favorite MuiSvgIcon-fontSizeMedium'}/>:
    //       <Favorite className={'mealCard__icons mealCard__icons--favorite MuiSvgIcon-fontSizeMedium'} style={{color: pink[500]}}/>
    //     }
    //   </span>
    // </div>