import { createAsyncThunk } from '@reduxjs/toolkit';

import { handleThunkApiReponse } from '@/lib/axios';
import { UserApi } from '@/services/users-api';
import { RootState } from '@/store/types';
import { TUser, TUserConfig, TUserUpdate } from '@/store/user/types';
import mergeDeep from '@/utils/mergeDeep';

const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string; state: RootState }>(
  'user/fetch',
  async (_, thunkAPI) => {
    const { data, error } = await UserApi.fetch();

    if (!error) {
      return data!;
    }

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
  },
  { rejectValue: string }
>(
  'user/update',
  async (args, thunkAPI) => {
    const { data, error } = await UserApi.update(args.data);

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

export { fetchUser, updateUser, updateUserConfig };
