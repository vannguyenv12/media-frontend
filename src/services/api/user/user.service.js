import axios from 'src/services/axios';

class UserService {
  async getUserSuggestions() {
    const response = await axios.get('/user/profile/user/suggestions');

    return response;
  }

  async logoutUser() {
    const response = await axios.get('/signout');

    return response;
  }

  async checkCurrentUser() {
    const response = await axios.get('/currentUser');

    return response;
  }
}

export const userService = new UserService();
