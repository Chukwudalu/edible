import './sass/main.scss'
import { useEffect, useState, Fragment  } from 'react';
import { useDispatch } from 'react-redux';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details'
import SearchResults from './pages/SearchResults';
import Footer from './components/Footer';

// import categoryMeals from './pages/CategoryMeals';

import axios from 'axios';

import { latestMealsUrl, randomMealsUrl, mealCategoryUrl } from './api'
import { getLatestMeal, getRandomMeal, getMealCategories } from './features/meal'
import CategoryMeals from './pages/CategoryMeals';
import Auth from './pages/auth/auth';
import Favorites from './pages/Favorites';
import Bookmarks from './pages/Bookmarks';
import Backdrop from './components/ModalUtils/Backdrop';
import SuggestionsBackdrop from './components/ModalUtils/SuggestionsBackdrop';

import { EncryptStorage } from 'encrypt-storage';
import ScrollButton from './components/ScrollButton';
import { SkeletonTheme } from "react-loading-skeleton"




const createEncyptStorage = () => {
  const encryptStorage = new EncryptStorage(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_SECRET_KEY, {
    prefix: '@base'
  }); 

  return encryptStorage
}




function App() {
  // Latest meal error state
  const [latestMealFetchErrorMsg, setLatestMealFetchErrorMsg] = useState('')
  // Random meal error state
  const [randomMealFetchErrorMsg, setRandomMealFetchErrorMsg] = useState('')
  // Categories error state
  const [categoryFetchErrorMsg, setcategoryFetchErrorMsg] = useState('')
  // state for toggling opening and closing profile modal
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [searchSuggestionModalOpen, setSearchSuggestionModalOpen] = useState(false)
  // const [ loading, setLoading ] = useState(true)

  const dispatch = useDispatch()
  
  const toggleProfileModal = () => {
    setProfileModalOpen(prev => !prev)
  }

  const toggleSuggestionModal = () => {
    setSearchSuggestionModalOpen(prev => !prev)
  }

  // let header = document.getElementsByClassName('header')

  useEffect(() => {
    if(profileModalOpen){
      document.body.style.overflow = 'hidden'
      // find out why below doesnt work
      // header.style.position = 'relative'
    }else{
      document.body.style.overflow = 'scroll'
    }
  }, [profileModalOpen])
  

  // Function for fetching data from theMealDb API
  const getMeals = (mealUrl, setMealFetchErrorMsg, action) => {
    axios.get(mealUrl)
      .then((res) => {
        dispatch(action(res.data))
        
      })
      .catch(err => setMealFetchErrorMsg(err.message))
  }

  // Fetch data once the component loads
  useEffect(() => { 
    getMeals(latestMealsUrl, setLatestMealFetchErrorMsg, getLatestMeal)
    getMeals(randomMealsUrl, setRandomMealFetchErrorMsg, getRandomMeal)
    getMeals(mealCategoryUrl, setcategoryFetchErrorMsg, getMealCategories)
    
  }, [])

  const removeAccessFromLocalStorage = () => {
    createEncyptStorage().removeItem('grant')
    createEncyptStorage().removeItem('username')
  }

  // let scrollTopButton = document.querySelector('.scroll-to-top')

  // const scrollFunction = () => {
  //   // console.log(scrollRef.current.style.display)
  //   if(!scrollRef.current) return

  //   if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
  //     scrollRef.current.style.display = 'block'
  //   }else{
  //     scrollRef.current.style.display = 'none'
  //   }
  // }

  return (

    <Fragment>
      <SkeletonTheme baseColor="#b5b5b5" highlightColor="#525252">
        <BrowserRouter>
          <Header toggleProfileModal={toggleProfileModal} profileModalOpen={profileModalOpen} logOutUser={removeAccessFromLocalStorage} 
          toggleSuggestionModal={toggleSuggestionModal} searchSuggestionModalOpen={searchSuggestionModalOpen}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/:slug/:id' element={<Details/>}/>
            <Route path='/c/:category' element={<CategoryMeals/>}/>
            <Route path='/s/:searchQuery' element={<SearchResults/>}/>
            <Route path='/:authType' element={<Auth/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/bookmarks' element={<Bookmarks/>}/>
          </Routes>
          {
            (profileModalOpen) && (<Backdrop 
                toggleProfileModal={toggleProfileModal} 
              />)
          }
          {/* Make this relative to the content body , excluding the header */}
          {
            searchSuggestionModalOpen && (< SuggestionsBackdrop
              toggleSuggestionModal={toggleSuggestionModal}
            />)
          }

          <ScrollButton/>

           
          <Footer/>
        </BrowserRouter>
      </SkeletonTheme>
     
    </Fragment>
  );
}

export default App;
