

function Backdrop({toggleProfileModal}) {
    const handleModalClick = () => {
        toggleProfileModal()
    }

    return (
        <div className="backdrop" onClick={handleModalClick}></div>
    )
}

export default Backdrop