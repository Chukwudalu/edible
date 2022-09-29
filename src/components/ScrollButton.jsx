import { useState, useEffect } from 'react';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

function ScrollButton() {

    const [ visible, setVisible ] = useState();

    useEffect(() => {
        window.addEventListener('scroll', () => {
            toggleVisible()
        })
    }, [])

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        
        if(scrolled > 300) setVisible(true);
        else if(scrolled <= 300) setVisible(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <span className='scroll-to-top' onClick={scrollToTop} style={{ display: visible ? 'flex' : 'none'}}>
            <KeyboardDoubleArrowUpIcon className='scroll-to-top__icon MuiIcon-fontSizeLarge'/>
        </span>
    )
}

export default ScrollButton