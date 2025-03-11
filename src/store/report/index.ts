import { useSelector } from 'react-redux';

import { reportSelector } from './selector';

export { default, ReportState } from './slice';
export type { initialState as ReportInitialState } from './types';
export const useReport = () => useSelector(reportSelector);
