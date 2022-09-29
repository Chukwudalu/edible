import heroImg from '../assets/heroImg.svg'
import { useEffect, useState } from 'react'

function Hero() {
    
    const mobileWidthBreakPoint = 900
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const handleSearchPlacementBasedOnScreenWidth = () => {
        // using a resize event listener, for every screen resize, check if it's greater, less or equal to the screen width
        // set the mobileSearch state based on resize
        window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth)       
        })
    }
    
    useEffect(() => {
        handleSearchPlacementBasedOnScreenWidth()
    }, [screenWidth])

    return (
        <div className='hero'>
            <div className='hero__info'>
                <p className='hero__touch-line'>Cooking made easy</p>
                <p className='hero__catch-line'>Learn how to make any meal. 
                Anywhere, Anytime.</p>
                <button className='button button--hero' onClick={() => { window.location.assign('/signup')}}>Get started</button>
            </div>
            <div className={`hero__imgContainer ${screenWidth <= mobileWidthBreakPoint ? 'hideHeroImg' : ''}`} >
                <img src={heroImg} alt="Representation of an svg pot of food, describing the purpose of the app" className='hero__imgContainer__Image'/>
            </div>
        </div>
    )
}

export default Hero