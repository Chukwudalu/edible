import CategoryMenuItem from "./CategoryMenuItem";
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import {useSelector} from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import settings from "../utility/carouselSettings";


const CategoryMenu = () => {
  const categories = useSelector((state) => state.AllMeals.value.mealCategories.categories);

  

  return (
    <section className="categoryMenu">
      <h2 className="categoryMenu__heading">Categories</h2>
        {
          categories && (
            <Slider {...settings}>
              {
                // Array.apply(null, {length: 5}).map(e => <p>hello</p>)
                categories && categories.map(c => <CategoryMenuItem key={c.idCategory} catName={c.strCategory} catImage={c.strCategoryThumb}/>)
              }
            </Slider>
          )
        }
    </section>
  )
}

export default CategoryMenu

{/*  <div className="categoryMenu__Container">*/}