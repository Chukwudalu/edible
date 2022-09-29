import {useState, useEffect} from 'react'

function handleResizeEvent(setScreenWidth){
    // event handler for setting the new screen width when the screen is being resized
    window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth)
    })
}

// useResizer is created to update the screenWidth whenever the screen is resized for responsive development
export default function useResizer(){
    const mobileWidthBreakPoint = 900
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        return handleResizeEvent(setScreenWidth)
    }, [screenWidth])

    return [mobileWidthBreakPoint, screenWidth]
}