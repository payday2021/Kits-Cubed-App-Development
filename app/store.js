import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './features/auth/authSlice';
import kitsReducer from './features/kits/kitsSlice';
import cartReducer from './features/cart/cartSlice';
import ordersReducer from './features/orders/ordersSlice';

import { loadState, saveState } from '../localStorage';

const rootReducer = combineReducers({
  auth: authReducer,
  kits: kitsReducer,
  cart: cartReducer,
  orders: ordersReducer,
})

const persistedState = loadState();




const store = configureStore({
  reducer: rootReducer,

    // auth: authReducer,
    // kits: kitsReducer,
    // cart: cartReducer
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    cart: store.getState().cart,
    orders: store.getState().orders
  });
  console.log("state has changed")
})

export const useAppDispatch = () => useDispatch;

export default store;
