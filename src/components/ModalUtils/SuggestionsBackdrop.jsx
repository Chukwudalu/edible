import { useEffect } from 'react'

function SuggestionsBackdrop({ toggleSuggestionModal }) {
    const handleModalClick = () => {
        toggleSuggestionModal()
    }

    return (
        <div className="backdrop" onClick={handleModalClick}></div>
    )
}

export default SuggestionsBackdrop