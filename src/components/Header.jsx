import { AccountCircleOutlined } from '@mui/icons-material'
import { LargerScreenSearchRenderer } from '../utility/searchRenderer'
import {useNavigate, useLocation} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { EncryptStorage } from 'encrypt-storage';

import ProfileModal from './ModalUtils/ProfileModal'

const createEncyptStorage = () => {
    const encryptStorage = new EncryptStorage(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_SECRET_KEY, {
      prefix: '@base'
    }); 
  
    return encryptStorage
}

const decryptFromLocalStorage = () => {
    const accessGrant = createEncyptStorage().getItem('grant')
    const username = createEncyptStorage().getItem('username')

    return [accessGrant, username]
}


function Header({toggleProfileModal, profileModalOpen, logOutUser, toggleSuggestionModal, searchSuggestionModalOpen}) {
    // const location = useLocation();
    // const navigate = useNavigate();


    // console.log(headerRef.current.style.position)

    const checkScroll  = () => {
        if(document.documentElement.scrollTop > 10){
            if(document.querySelector('.header')){
                document.querySelector('.header').style.position = 'sticky'
                document.querySelector('.header').boxShadow = 'rgba(149, 157, 165, 0.2) 0px 8px 24px;'
            }
        }
    }

    const [ showSearch, setShowSearch ] = useState(false);

    useEffect(() => { 
        if(window.location.pathname === '/') setShowSearch(true)
        else setShowSearch(false)
    }, [showSearch])

    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         checkScroll()
    //     })
    //     return window.removeEventListener('scroll', checkScroll)
    // }, [])

    const handleLogoClick = () => {
        // navigate('/')
        window.location.assign('/')
    }

    const handleLogInClick = () => {
        // navigate('/login');
        window.location.assign('/login')
        if(profileModalOpen) toggleProfileModal()
    }

    const handleLogOutClick = () => {
        logOutUser()
        // navigate('/login');
        window.location.assign('/')
    }

    const handleProfileIconClick = () => {
        toggleProfileModal()
    }

    // let pathName; 
    // useEffect(() => {
    //     pathName = location.pathname.split('/').pop()
    // }, [pathName])
    
    return (
        <header className='header' >
            <h1 className='header__logo' onClick={handleLogoClick}>Edibble</h1>

            { 
                // LargerScreenSearchRenderer(toggleSuggestionModal, searchSuggestionModalOpen)
                showSearch && (<LargerScreenSearchRenderer 
                    toggleSuggestionModal={toggleSuggestionModal}
                    searchSuggestionModalOpen={searchSuggestionModalOpen}
                />)
            }

            <nav className='header__navigation'>
                <ul className='header__navigation__list'>
                    {
                        decryptFromLocalStorage()[0] === 'success' ? (
                            <li className='header__navigation__list__login' onClick={handleLogOutClick}>Log Out</li>
                        ) : <li className='header__navigation__list__login' onClick={handleLogInClick}>Log In</li>
                    }
                    
                    {
                        decryptFromLocalStorage()[0] && (
                            <li className='header__navigation__list__accountIconContainer'>
                                <AccountCircleOutlined className='header__navigation__list__accountIcon MuiIcon-fontSizeLarge' onClick={handleProfileIconClick}/>
                                {
                                    profileModalOpen && (<ProfileModal toggleProfileModal={toggleProfileModal} profileModalOpen={profileModalOpen}/>)
                                }
                        
                            </li>
                        )
                    }
                    
                </ul>
            </nav>
             
        </header> 
    ) 
}

export default Header