import { notification as antNotification } from 'antd';
import { message as antMessage } from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { globalActions, useGlobals } from '@/store/global';

import styles from './useNotification.module.css';

const useNotification = () => {
  const dispatch = useDispatch();
  const { notification, message, messagesToDestroy } = useGlobals();

  useEffect(() => {
    if (notification) {
      antNotification.open({
        ...notification,
        style: undefined,
        onClose: () => {
          if (notification.onClose) {
            notification.onClose();
          }
          dispatch(globalActions.destroyNotification());
        },
      });
    }
  }, [dispatch, notification]);

  useEffect(() => {
    if (message) {
      antMessage.open({
        ...message,
        style: undefined,
        className: `${styles.antMessage} ${styles[message.type]}`,
        onClose: () => {
          if (message.onClose) {
            message.onClose();
          }
          dispatch(globalActions.destroyMessages([]));
        },
      });
    }
  }, [dispatch, message]);

  useEffect(() => {
    if (messagesToDestroy) {
      messagesToDestroy.forEach((messageId) => {
        antMessage.destroy(messageId);
      });
    }
  }, [messagesToDestroy]);

  return null;
};

export default useNotification;
