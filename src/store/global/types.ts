import { ArgsProps as MessageArgsProps, NoticeType } from 'antd/lib/message';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';

export type MessageArgsPropsCustom = MessageArgsProps & { type: NoticeType };

export interface IStatistics {
  projects_count: number;
  source_system_count: number;
  variables_count: number;
}

export interface IFilter {
  key: string;
  values: string[];
  tabKey: string;
}

export type initialState = {
  lang: string;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsPropsCustom | undefined;
  messagesToDestroy: string[];
  stats?: IStatistics;
  isFetchingStats: boolean;
  filters: IFilter[];
};
