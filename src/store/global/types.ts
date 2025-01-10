import { ArgsProps as MessageArgsProps, NoticeType } from 'antd/lib/message';
import { ArgsProps as NotificationArgsProps } from 'antd/lib/notification';

export type MessageArgsPropsCustom = MessageArgsProps & { type: NoticeType };

export type initialState = {
  lang: string;
  notification: NotificationArgsProps | undefined;
  message: MessageArgsPropsCustom | undefined;
  messagesToDestroy: string[];
};
