// Dashboard.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice'; // Import Redux actions

function Dashboard() {
  // Hooks for navigation and Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select relevant state from Redux store
  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  // Effect to handle success, error, and reset actions
  useEffect(() => {
    if (isError) {
      // Display an error message to the user
      console.error('Error fetching goals:', message);
    }

    if (!user) {
      navigate('/login'); // Redirect to login page if user is not authenticated
    }

    dispatch(getGoals()); // Fetch user's goals

    return () => {
      dispatch(reset()); // Reset Redux state when component unmounts
    };
  }, [user, navigate, isError, message, dispatch]);

  // Render loading spinner if data is still loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dashboard'>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm /> {/* Render the goal input form */}

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {/* Map through user's goals and render each goal item */}
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3> 
        )}
      </section>
    </div>
  );
}

export default Dashboard;
