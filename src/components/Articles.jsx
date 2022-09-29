import React from 'react'

function Articles({text, destination}) {
  
  const navigateTo = () => {
    window.open(destination)
  }
  return (
    <div className='articles' onClick={navigateTo}>
        <p>{text}</p>
    </div>
  )
}

export default Articles