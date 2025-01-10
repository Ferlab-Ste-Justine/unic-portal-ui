import config from '@/config';
import { sendRequest } from '@/lib/axios';
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

export const UserApi = {
  fetch,
  update,
};
