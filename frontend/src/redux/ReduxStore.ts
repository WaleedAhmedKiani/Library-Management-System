import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import modelReducer from './slices/ModelSlice';
import bookReducer from './slices/BookSlice';
import loanReducer from './slices/BookLoanSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
    books: bookReducer,
    loan: loanReducer
  }
});


//  Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
