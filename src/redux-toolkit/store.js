import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/redux-toolkit/reducer/user/user.reducer';
import suggestionReducer from './reducer/suggestions/suggestion.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionReducer,
  },
});
