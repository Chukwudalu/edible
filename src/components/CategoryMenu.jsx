import CategoryMenuItem from "./CategoryMenuItem";
import {useSelector} from 'react-redux';
import { useEffect, useRef, memo } from "react";
import { ChevronLeft, ChevronRight }from '@mui/icons-material';




const CategoryMenu = () => {
  const categories = useSelector((state) => state.AllMeals.value.mealCategories.categories);

  // Handling category menu slider on non mobile screens for better user experience
  // const categoryMenu = useRef(null);
  // const categoryMenuNavigation = useRef(null);
  // const categoryMenuItem = document.querySelectorAll('.categoryMenuItem')

  // const leftBtnEl = useRef(null);
  // const rightBtnEl = document.querySelector('.categoryMenu__navigation__btn--right')
  
  // let currentCard = 0;

  // rightBtnEl && rightBtnEl.addEventListener('click', function(){
  //   currentCard ++
  //   categoryMenuItem.forEach((s, i) => {
  //     console.log(s.style.transform)
  //     // s.style.transform = `translateX(${100 * (i - currentCard)}%)`;
  //     // s.style.transform = `translateX(${-100 * i}%)`;
  //   });
  // })
  
  return (
    <section className="categoryMenu">
      <h2 className="categoryMenu__heading">Categories</h2>
      {/* <div className="categoryMenu__headingAndSlider" >
        
        <div className="categoryMenu__navigation">
          <span className="categoryMenu__navigation__btn categoryMenu__navigation__btn--left">
            <ChevronLeft/>
          </span>
          <span className="categoryMenu__navigation__btn categoryMenu__navigation__btn--right" >
            <ChevronRight/>
          </span>
        </div>
      </div> */}
      <div className="categoryMenu__Container">
        {
          // Array.apply(null, {length: 5}).map(e => <CategoryMenuItem />)
          categories && categories.map(c => <CategoryMenuItem key={c.idCategory} catName={c.strCategory} catImage={c.strCategoryThumb}/>)
        }
      </div>
    </section>
  )
}

export default CategoryMenu