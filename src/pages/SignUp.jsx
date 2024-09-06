import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { db } from '../firebase.config'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const { name, email, password } = formData
  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Get authentication instance
      const auth = getAuth()

      // Create new user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      const user = userCredential.user

      // Update current profile with the one just created
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      // Remove password from user data before sending it to the firestore
      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timesamp = serverTimestamp()

      // Send it to firestore
      await setDoc(doc(db, 'users', user.uid), formDataCopy)

      navigate('/')
    } catch (e) {
      toast.error('Something went wrong with registration')
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type='text'
            placeholder='Name'
            id='name'
            value={name}
            className='nameInput'
            onChange={onChange}
          />
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            className='emailInput'
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Password'
              id='password'
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='Show Password'
              className='showPassword'
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Forgot Password?
          </Link>
          <div className='signUpBar'>
            <button className='signUpButton'>
              <p className='signUpText'>Sign Up</p>
              <ArrowRightIcon fill='#ffffff' width='30px' height='30px' />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to='/sign-in' className='registerLink'>
          Sign In Instead
        </Link>
      </div>
    </>
  )
}

export default SignUp
