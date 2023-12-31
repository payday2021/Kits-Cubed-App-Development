import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import authReducer from './features/auth/authSlice';
import kitsReducer from './features/kits/kitsSlice';
import cartReducer from './features/cart/cartSlice';
import ordersReducer from './features/orders/ordersSlice';
import eventsReducer from './features/events/eventsSlice';

import { loadState, saveState } from '../localStorage';

const rootReducer = combineReducers({
  auth: authReducer,
  kits: kitsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  events: eventsReducer
})

// const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: persistedState,
});

// store.subscribe(() => {
//   saveState({
//     auth: store.getState().auth,
//     cart: store.getState().cart,
//     orders: store.getState().orders
//   });
//   // console.log("state has changed")
// })

export const useAppDispatch = () => useDispatch;

export default store;
