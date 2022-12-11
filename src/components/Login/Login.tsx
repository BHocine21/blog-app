import React, { useState } from 'react'
import { useNavigate, Navigate } from "react-router-dom";


import authenticationService from 'services/authenticationService'

const Login = () => {
  const currentUser = localStorage.getItem('currentUser')

  if(currentUser) {
    return <Navigate to="/" />
  }
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })
  const [isSubmitting, setSubmitting] =useState(false)
  const [genericError, setGenericError] =useState({
    status: false,
    text: '',
  })

  const handleChange = (event: any) => {
    setUser(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  const validateEmail = () => {
    if (user.email.length === 0) {
      return ({
        isValid: false,
        reason: 'Email is required'
      })
    }
    else if (!user.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      return ({
        isValid: false,
        reason: 'Email is invalid'
      })
    }
    else {
      return ({
        isValid: true,
        reason: ''
      })
    }
  }

  const validatePassword = () => {
    if (user.password.length === 0) {
      return ({
        isValid: false,
        reason: 'Password is required'
      })
    }
    else if (user.password.length < 7) {
      return ({
        isValid: false,
        reason: 'Password too short'
      })
    }
    else {
      return ({
        isValid: true,
        reason: ''
      })
    }
  }

  const handleSubmit = () => {
    setGenericError({
      status: false,
      text: '',
    });
    const emailValidation = validateEmail()
    const passwordValidation = validatePassword()
    if (!emailValidation.isValid || !passwordValidation.isValid) {
      setErrors({
        email: emailValidation.reason,
        password: passwordValidation.reason,
      })
    } else {
      console.log(user.email + '  ' + user.password)
      setErrors({
        email: '',
        password: '',
      })
      setSubmitting(true);
      authenticationService.login(user)
      .then(
          user => {
            setSubmitting(false);
            navigate('/');
          },
          error => {
            setSubmitting(false);
            setGenericError({
              status: true,
              text: error,
            });
          }
      );
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center h-100'>
      <form className='col-6 mt-5'>
        <h1 className='text-center'>Log in</h1>
        {genericError.status && <label className="form-label text-danger">{genericError.text} </label>}
        <div className="form-outline mb-4">
          <label className="form-label">Email address</label>
          <input type="email" value={user.email} name= 'email' className="form-control" onChange={handleChange}/>
          {errors.email.length > 0 && <label className="form-label text-danger">{errors.email}</label> }
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input type="password" value={user.password} name = 'password' className="form-control" onChange={handleChange}/>
          {errors.password.length > 0 && <label className="form-label text-danger">{errors.password}</label>}
        </div>

        <div className="form-group">
          <button className="btn btn-success btn-block mb-4" type="button" disabled={isSubmitting} onClick={handleSubmit}>
            {isSubmitting &&
              <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            }
          Sign in
          </button>
        </div>
      </form>
    </div>

  )
}

export default Login
