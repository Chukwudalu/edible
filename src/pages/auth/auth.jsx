import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {loginUrl, signupUrl} from '../../api'
import { EncryptStorage } from 'encrypt-storage';
import AuthErrorBox from '../../components/AuthErrorBox';


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

function Auth() {
    const location = useLocation()
    const navigate = useNavigate()
    

    const [authTypeError, setAuthTypeError] = useState(false)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [authError, setAuthError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('');

    let authType = location.pathname.split('/')[1]

    useEffect(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    }, [])

    // TODO
    // Write a function that returns jsx for handling wrong url location for authentication
    const authTypeErrorMessage = () => {
      return (
        <section>
          <p>Whoops, this page you are looking for was not found</p>
        </section>
      )
    }

    // Clear the form fields after submitting form
    const clearFields = () => {
      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }

    // handle login/signup form submission
    const handleFormSubmit = (e) => {
      e.preventDefault()
      if(authType === 'signup') signupUser()
      else if(authType === 'login') loginUser()
      // clearFields()
    }

    // function to encrypt and save data to localStorage
    const encryptAndSaveToLocalStorage = (entryStatus, username) => {
      // const encryptStorage = new EncryptStorage(process.env.REACT_APP_LOCALSTORAGE_ENCRYPTION_SECRET_KEY, {
      //   prefix: '@base'
      // });
      createEncyptStorage().setItem('grant', entryStatus)
      createEncyptStorage().setItem('username', username)
    }

    // if signup successful, call the encryption/save data function and send the user to the home page
    const signupUser = () => {
      axios.post(signupUrl, {username, email, password, confirmPassword})
        .then((res) => {
          encryptAndSaveToLocalStorage(res.data.status, res.data.data.username);
          window.location.assign('/');
        })
        .catch(err => {
          setAuthError(true)
          setErrorMsg(err.response.data.message)
        })
    }

    const loginUser = () => {
      console.log(authType)
      axios.post(loginUrl, {email, password})
        .then((res) => {
          encryptAndSaveToLocalStorage(res.data.status, res.data.data.username);
          window.location.assign('/');
        })
        .catch(err => {
          setAuthError(true)
          setErrorMsg(err.response.data.message)
         
        })
    }



    return (
      <section className='auth'>
          {
            authTypeError ? authTypeErrorMessage() : (
              <div className='auth__container'>
                <h2>
                  { authType === 'signup' ? 'Sign Up' : 'Log In'}
                </h2>
                {
                  authError && <AuthErrorBox errorMsg={errorMsg}/>
                }
                <form action="" className='auth__form'>
                    
                    {
                      authType === 'signup' && (
                      <div className='inputContainer'>
                        <label htmlFor="username" className='inputLabel'>username</label>
                        <input type="text" className='input input--username' id='username' value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                      </div>)
                    }
                    <div className='inputContainer'>
                      <label htmlFor="email" className='inputLabel'>Email</label>
                      <input type="email" className='input input--email' id='email' value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                    </div> 
                    <div className='inputContainer'>
                      <label htmlFor="password" className='inputLabel'>Password</label>
                      <input type="password" className='input input--password' id='password' minLength={8} value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    {
                      authType === 'signup' && (
                      <div className='inputContainer'>
                        <label htmlFor="password" className='inputLabel'>Confirm Password</label>
                        <input type="password" className='input input--password' id='confirmPassword' minLength={8} value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                      </div>)
                    }         
                    <button type="submit" className='auth__submit' onClick={handleFormSubmit}>
                      { authType === 'signup'?'Sign Up': 'Log In'}
                    </button>

                    {
                      authType === 'login' && (
                        <div className='auth__accountaccess'>
                          <p onClick={() => window.location.assign('/signup')} className='auth__accountaccess__signup'>Sign up</p>
                        </div>
                      )
                    }
      
                    {
                      authType === 'signup' && (
                        <div className='auth__accountaccess'>
                          <p onClick={() => window.location.assign('/login')} className='auth__accountaccess__login'>Log In</p>
                        </div>
                      )
                    } 
                </form>
              </div>
            )
          }
          
          
      </section>
    )
}

export default Auth