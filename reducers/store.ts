// import { configureStore } from "@reduxjs/toolkit";
// import walletReducer from "./walletSlice";

// export default configureStore({
//   reducer: {
//     wallet: walletReducer,
//   },
// });

// // Infer the `RootState` and `AppDispatch` types from the store
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import rootReducer from './rootReducer';

const loggerMiddleware = createLogger();

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;