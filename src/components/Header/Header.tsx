import { Link, useNavigate, useLocation } from 'react-router-dom'

import authenticationService from 'services/authenticationService'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const currentUser = localStorage.getItem('currentUser')

  const logout = () => {
    // Clear locale storage and redirect to home page.
    authenticationService.logout()
    navigate('/')
  }

  return (
    <nav className='navbar navbar-dark bg-dark sticky-top'>
      <Link style={{ textDecoration: 'none' }} to='/'>
        <h1 className='text-light'>Blog app</h1>
      </Link>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end'>
        {!currentUser && location.pathname !== '/login' &&
          <button className='btn btn-outline-success me-2' onClick={()=> navigate('/login')}>Log in </button>
        }
        {currentUser &&
          <div>
            <span className='text-light font-weight-bold mr-3'>
              {`Hello ${JSON.parse(currentUser).firstName}!`}
            </span>
            <button className='btn btn-outline-danger me-2' onClick={logout}>Log out</button>
          </div>
        }
        </div>
    </nav>
  )
}

export default Header
