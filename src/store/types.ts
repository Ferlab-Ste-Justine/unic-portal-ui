import { GlobalInitialState } from '@/store/global';
import { ReportInitialState } from '@/store/report';
import { UserInitialState } from '@/store/user';

export type RootState = {
  global: GlobalInitialState;
  user: UserInitialState;
  report: ReportInitialState;
};
