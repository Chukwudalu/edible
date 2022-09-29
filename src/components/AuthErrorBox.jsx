function AuthErrorBox({errorMsg}) {
    return (
      <div className='authErrorBox'>
          <p className='authErrorMsg'>{errorMsg}</p>
      </div>
    )
}
  
export default AuthErrorBox