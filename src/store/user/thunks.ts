import { createAsyncThunk } from '@reduxjs/toolkit';
import intl from 'react-intl-universal';

import { handleThunkApiReponse } from '@/lib/axios';
import { UserApi } from '@/services/users-api';
import { globalActions } from '@/store/global';
import { RootState } from '@/store/types';
import { userActions } from '@/store/user';
import { TUser, TUserConfig, TUserUpdate } from '@/store/user/types';
import mergeDeep from '@/utils/mergeDeep';

const fetchUser = createAsyncThunk<
  TUser,
  {
    errCallback?: () => void;
  },
  { rejectValue: string; state: RootState }
>(
  'user/fetch',
  async ({ errCallback }, thunkAPI) => {
    const { data, error } = await UserApi.fetch();

    if (!error) {
      return data!;
    }

    errCallback?.();
    return thunkAPI.rejectWithValue('User not found');
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (user.userInfo) {
        return false;
      }
    },
  },
);

const updateUser = createAsyncThunk<
  TUser,
  {
    data: TUserUpdate;
    callback?: () => void;
    displayNotification?: boolean;
  },
  { rejectValue: string }
>(
  'user/update',
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.update(args.data);
    if (data && args.displayNotification) {
      thunkAPI.dispatch(
        globalActions.displayNotification({
          type: 'success',
          message: intl.get('global.report.onSuccess.title'),
          description: intl.get('global.report.onSuccess.fetchReport'),
        }),
      );
    }
    return handleThunkApiReponse({
      error,
      data: data!,
      reject: thunkAPI.rejectWithValue,
      onSuccess: args.callback,
    });
  },
  {
    condition: (args) => {
      if (Object.keys(args.data).length < 1) {
        return false;
      }
    },
  },
);

const updateUserConfig = createAsyncThunk<TUserConfig, TUserConfig, { rejectValue: string; state: RootState }>(
  'user/update/config',
  async (config, thunkAPI) => {
    const { user } = thunkAPI.getState();

    const deepCopyUserConfig = JSON.parse(JSON.stringify(user.userInfo?.config));
    const deepCopyNewConfig = JSON.parse(JSON.stringify(config));
    const mergedConfig = mergeDeep<TUserConfig>(deepCopyUserConfig, deepCopyNewConfig);

    const { error } = await UserApi.update({
      config: mergedConfig,
    });

    return handleThunkApiReponse({
      error: error,
      data: mergedConfig,
      reject: thunkAPI.rejectWithValue,
    });
  },
  {
    condition: (config) => {
      if (Object.keys(config).length < 1) {
        return false;
      }
    },
  },
);

const deleteUser = createAsyncThunk<void, void, { rejectValue: string; state: RootState }>(
  'user/delete/user',
  async (_, thunkAPI) => {
    const { error } = await UserApi.deleteUser();

    return handleThunkApiReponse({
      error: error,
      data: undefined,
      reject: thunkAPI.rejectWithValue,
      onSuccess: () => thunkAPI.dispatch(userActions.cleanLogout()),
      onError: () =>
        thunkAPI.dispatch(
          globalActions.displayNotification({
            type: 'error',
            message: 'Error',
            description: 'Unable to delete your account at the moment',
          }),
        ),
    });
  },
);

export { deleteUser, fetchUser, updateUser, updateUserConfig };
