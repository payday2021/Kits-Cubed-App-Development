import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from './features/auth/authSlice';
import kitsReducer from './features/kits/kitsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    kits: kitsReducer
  },
  preloadedState: {}
});

export const useAppDispatch = () => useDispatch;

export default store;
