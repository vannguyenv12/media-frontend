import { floor, random } from 'lodash';
import {
  addUser,
  clearUser,
} from 'src/redux-toolkit/reducer/user/user.reducer';
import { avatarColors } from 'src/services/utils/static.data';

export class Utils {
  static avatarColor() {
    return avatarColors[floor(random(0.9) * avatarColors.length)];
  }

  static generateAvatar(text, backgroundColor, foregroundColor = 'white') {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 200;
    canvas.height = 200;

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Text
    context.font = 'normal 80px sans-serif';
    context.fillStyle = foregroundColor;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL('image/png');
  }

  static dispatchUser(result, pageReload, dispatch, setUser) {
    pageReload(true);
    dispatch(addUser({ token: result.data.token, profile: result.data.user }));

    setUser(result.data.user);
  }

  static clearStore({
    dispatch,
    deleteStorageUsername,
    deleteSessionPageReload,
    setLoggedIn,
  }) {
    dispatch(clearUser());

    deleteStorageUsername();
    deleteSessionPageReload();

    setLoggedIn(false);
  }

  static appEnvironment() {
    const env = import.meta.env.VITE_APP_ENVIRONMENT;

    if (env === 'development') {
      return 'DEV';
    } else if (env === 'staging') {
      return 'STG';
    }
  }

  static mapSettingsDropdownItems(setSettings) {
    const items = [];
    const item = {
      topText: 'My Profile',
      subText: 'View personal profile',
    };

    items.push(item);
    setSettings(items);
    return items;
  }
}
