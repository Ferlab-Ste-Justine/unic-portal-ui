import { useSelector } from 'react-redux';

import { LANG } from '@/types/constants';

import { globalSelector } from './selector';

export { default, globalActions, GlobalState } from './slice';
export type { initialState as GlobalInitialState } from './types';
export const useGlobals = () => useSelector(globalSelector);
export const useLang = () => useSelector(globalSelector, (left, right) => left.lang === right.lang).lang as LANG;
