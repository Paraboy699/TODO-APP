import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // Function to handle logout
  const onLogout = () => {
    dispatch(logout()) // Dispatch logout action
    dispatch(reset()) // Dispatch reset action
    navigate('/') // Redirect to the home page
  }

  return (
    <header className='header'>
      <div className="logo">
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            {/* Logout Button */}
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            {/* Login Link */}
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            {/* Register Link */}
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header
