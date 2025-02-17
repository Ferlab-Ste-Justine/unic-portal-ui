import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUser, updateUser, updateUserConfig } from '@/store/user/thunks';
import { initialState } from '@/store/user/types';

export const UserState: initialState = {
  userInfo: null,
  isLoading: true,
  isUpdating: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: UserState,
  reducers: {
    clearUser: (state) => {
      state.userInfo = null;
    },
    setIsUserLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => ({
      ...state,
      userInfo: action.payload,
      isLoading: false,
    }));
    builder.addCase(fetchUser.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => ({
      ...state,
      userInfo: action.payload,
      isLoading: false,
    }));
    builder.addCase(updateUser.rejected, (state, action) => ({
      ...state,
      error: action.payload,
      isLoading: false,
    }));
    builder.addCase(updateUserConfig.fulfilled, (state, action) => ({
      ...state,
      userInfo: {
        ...state.userInfo!,
        config: action.payload,
      },
    }));
    builder.addCase(updateUserConfig.rejected, (state, action) => ({
      ...state,
      error: action.payload,
    }));
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
