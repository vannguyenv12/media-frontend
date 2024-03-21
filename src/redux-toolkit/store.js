import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/redux-toolkit/reducer/user/user.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
