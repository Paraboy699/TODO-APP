// Header.jsx

import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice'; // Import Redux actions

function Header() {
  // Hooks for navigation and Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select relevant state from Redux store
  const { user } = useSelector((state) => state.auth);

  // Handle user logout
  const onLogout = () => {
    dispatch(logout()); // Dispatch logout action
    dispatch(reset()); // Reset Redux state
    navigate('/register'); // Redirect to login page
  };

  // Handle register link click
  const handleRegisterClick = () => {
    navigate('/register'); // Redirect to registration page
  };

  // Handle login link click
  const handleLoginClick = () => {
    navigate('/login'); // Redirect to login page
  };

  // Render the header
  return (
    <header className='header'>
      <div className='logo'>
        <h3>GoalSetter</h3>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
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
