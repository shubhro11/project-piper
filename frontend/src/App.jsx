import React, { useEffect } from 'react'
import AppRoutes from "./routes/AppRoutes";
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from './store/thunks/user.thunk';
import { fetchAllTracks } from './store/thunks/track.thunk';

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchAllTracks());
    }
  }, [user, dispatch]);

  return (
    <div className='min-h-screen bg-slate-950'>
      <AppRoutes />
    </div>
  )
}

export default App