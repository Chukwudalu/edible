import { SearchOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import slugify from 'react-slugify';
import useResizer from "../utility/customHooks/useResizer";
import SearchSuggestionsList from './SearchSuggestionsList';


function Search({searchClass, toggleSuggestionModal, searchSuggestionModalOpen}) {
    const [mobileWidthBreakPoint, screenWidth] = useResizer()
    const [searchText, setSearchText] = useState('')

    // useEffect(() => {
        
    // }, [])

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const searchString = slugify(searchText)
        navigate(`/s/${searchString}`)
        e.target.lastChild.value = ''
    }

    const handleSearchText = (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
        if(toggleSuggestionModal) toggleSuggestionModal()
        
    }

    return (
        <form className= {`search ${searchClass ? searchClass : ''}`}  onSubmit={handleSubmit}>
            <SearchOutlined className='search__icon MuiIcon-fontSizeLarge'/>
            <input type="text" className='search__bar' placeholder='Search for over 100,000 meals' onChange={handleSearchText} />
            { screenWidth >= 900 && searchText && searchSuggestionModalOpen && (<SearchSuggestionsList query={searchText} toggleSuggestionModal={toggleSuggestionModal}/>)}
        </form>
    )
}


export default Search