import { useNavigate } from "react-router-dom";

function ProfileModal({toggleProfileModal, profileModalOpen}) {
  const navigate = useNavigate();

  const handleFavoritesClick = (e) => {
    e.preventDefault()
    // navigate('/favorites')
    window.location.assign('/favorites')
    toggleProfileModal()
  }

  const handleBookmarksClick = (e) => {
    e.preventDefault()
    // navigate('/bookmarks')
    window.location.assign('/bookmarks')
    toggleProfileModal()
  }

  // const handleSettingClick = () => {

  // }

  return (
    <ul className='profileModal'>
      <li onClick={handleFavoritesClick}>Your favorites</li>
      <li onClick={handleBookmarksClick}>Your bookmarks</li>
      <li>Account settings</li>
    </ul>
  )
}

export default ProfileModal