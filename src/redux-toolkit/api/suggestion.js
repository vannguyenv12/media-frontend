import { createAsyncThunk } from '@reduxjs/toolkit';
import { userService } from 'src/services/api/user/user.service';

const getUserSuggestions = createAsyncThunk(
  'user/getUserSuggestions',
  async (name, { dispatch }) => {
    try {
      const response = await userService.getUserSuggestions();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export { getUserSuggestions };
