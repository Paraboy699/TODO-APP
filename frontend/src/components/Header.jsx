import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Handle user logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  // Navigate to register page
  const handleRegisterClick = () => {
    navigate('/register');
  };

  // Navigate to login page
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='logo'>
        <h2>GoalSetter</h2>
      </div>
      <ul>
        {user ? (
          // Show logout button if user is logged in
          <li>
            <button className='btn' onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          // Show login and register links if user is not logged in
          <>
            <li>
              <Link to='/login' onClick={handleLoginClick}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register' onClick={handleRegisterClick}>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
