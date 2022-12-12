import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import authenticationService from 'services/authenticationService'
import { validateEmail, validatePassword } from 'utils/validators'

const Login = () => {
  const currentUser = localStorage.getItem('currentUser')
  const navigate = useNavigate()

  // Do not give access to authenticated user, redirect it to home instead.
  if(currentUser) {
    return <Navigate to='/' />
  }

  // User credentials.
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  })

  // Fields errors values.
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  // Used to disable submit button.
  const [isSubmitting, setSubmitting] =useState(false)

  // Used to display generic error message (if credentials are not valid).
  const [genericError, setGenericError] =useState({
    status: false,
    text: '',
  })

  const handleChange = (event: any) => {
    setUserCredentials(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const handleSubmit = () => {
    // Clear generic error.
    setGenericError({
      status: false,
      text: '',
    })
    // Check if email and password are valid.
    const emailValidation = validateEmail(userCredentials.email)
    const passwordValidation = validatePassword(userCredentials.password)

    // Display specific error when one of fields is not valid.
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      setErrors({
        email: emailValidation.reason,
        password: passwordValidation.reason,
      })
    } else {
      // Clear fields errors if exists.
      setErrors({
        email: '',
        password: '',
      })
      // Disable login button.
      setSubmitting(true)
      // Compute authentication process.
      authenticationService.login(userCredentials)
      .then(
          () => {
            setSubmitting(false)
            navigate('/')
          },
          error => {
            // Display generic error if credentials doesn't match any account.
            setSubmitting(false)
            setGenericError({
              status: true,
              text: error,
            })
          }
      )
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <form className='col-6 mt-5'>
        <h1 className='text-center'>Log in</h1>
        {genericError.status && <label className='form-label text-danger'>{genericError.text} </label>}
        <div className='form-outline mb-4'>
          <label className='form-label'>Email address</label>
          <input type='email' value={userCredentials.email} name= 'email' className='form-control' onChange={handleChange}/>
          {errors.email.length > 0 && <label className='form-label text-danger'>{errors.email}</label> }
        </div>
        <div className='form-outline mb-4'>
          <label className='form-label'>Password</label>
          <input type='password' value={userCredentials.password} name = 'password' className='form-control' onChange={handleChange}/>
          {errors.password.length > 0 && <label className='form-label text-danger'>{errors.password}</label>}
        </div>
        <div className='form-group'>
          <button className='btn btn-success btn-block mb-4' type='button' disabled={isSubmitting} onClick={handleSubmit}>
            Sign in
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
