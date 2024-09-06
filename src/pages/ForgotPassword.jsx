import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      // Get authorisation instance
      const auth = getAuth()

      // Send email for reset
      await sendPasswordResetEmail(auth, email)
      toast.success('Email was sent!')
    } catch (e) {
      toast.error('Could not send reset email')
    }
  }
  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
            className='emailInput'
          />
          <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>

          <div className='signInBar'>
            <button className='signInButton' style={{ width: '13rem' }}>
              <p className='signInText'>Send Reset Link</p>
              <ArrowRightIcon fill='#ffffff' width='30px' height='30px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
