import config from '@/config';
import apiInstance, { sendRequest } from '@/lib/axios';
import { TUser, TUserUpdate } from '@/store/user/types';

export const USERS_API_URL_USER = `${config.USERS_API_URL}/user`;

const fetch = () =>
  sendRequest<TUser>({
    method: 'GET',
    url: USERS_API_URL_USER,
  });

const update = (body: TUserUpdate) =>
  sendRequest<TUser>({
    method: 'PUT',
    url: USERS_API_URL_USER,
    data: body,
  });

const deleteUser = () =>
  sendRequest<void>({
    method: 'DELETE',
    url: USERS_API_URL_USER,
  });

const deleteUserDirectly = () =>
  apiInstance<void>({
    method: 'DELETE',
    url: USERS_API_URL_USER,
  });

export const UserApi = {
  fetch,
  update,
  deleteUser,
  deleteUserDirectly,
};
