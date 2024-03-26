import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'src/redux-toolkit/reducer/user/user.reducer';
import suggestionReducer from 'src/redux-toolkit/reducer/suggestions/suggestion.reducer';
import notificationsReducer from 'src/redux-toolkit/reducer/notifications/notifications.reducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionReducer,
    notifications: notificationsReducer,
  },
});
