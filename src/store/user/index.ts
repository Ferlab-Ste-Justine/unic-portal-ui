import { useSelector } from 'react-redux';

import { userSelector } from './selector';

export { default, userActions, UserState } from './slice';
export type { initialState as UserInitialState } from './types';
export const useUser = () => useSelector(userSelector);
