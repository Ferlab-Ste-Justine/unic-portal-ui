import { renderHook } from '@testing-library/react';
import { message as antMessage, notification as antNotification } from 'antd';
import { useDispatch } from 'react-redux';

import { globalActions, useGlobals } from '@/store/global';

import useNotification from './useNotification';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('antd', () => ({
  notification: {
    open: jest.fn(),
  },
  message: {
    open: jest.fn(),
    destroy: jest.fn(),
  },
}));

jest.mock('@/store/global', () => ({
  globalActions: {
    destroyNotification: jest.fn(),
    destroyMessages: jest.fn(),
  },
  useGlobals: jest.fn(),
}));

describe('useNotification', () => {
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open notification and dispatch destroyNotification', () => {
    (useGlobals as jest.Mock).mockReturnValue({
      notification: { message: 'Test Notification', onClose: jest.fn() },
      message: null,
      messagesToDestroy: null,
    });
    const mockOpen = jest.fn(({ onClose }) => {
      onClose(); // simulate the onClose callback being called
    });
    antNotification.open = mockOpen;

    renderHook(() => useNotification());

    expect(antNotification.open).toHaveBeenCalledWith(expect.objectContaining({ message: 'Test Notification' }));

    (antNotification.open as jest.Mock).mock.calls[0][0].onClose();

    expect(globalActions.destroyNotification).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith(globalActions.destroyNotification());
  });

  it('should open message and dispatch destroyMessages', () => {
    (useGlobals as jest.Mock).mockReturnValue({
      notification: null,
      message: { content: 'Test Message', type: 'success', onClose: jest.fn() },
      messagesToDestroy: null,
    });

    renderHook(() => useNotification());

    expect(antMessage.open).toHaveBeenCalledWith(expect.objectContaining({ content: 'Test Message' }));

    (antMessage.open as jest.Mock).mock.calls[0][0].onClose();

    expect(globalActions.destroyMessages).toHaveBeenCalledWith([]);
    expect(mockDispatch).toHaveBeenCalledWith(globalActions.destroyMessages([]));
  });

  it('should destroy messages when messagesToDestroy is provided', () => {
    (useGlobals as jest.Mock).mockReturnValue({
      notification: null,
      message: null,
      messagesToDestroy: ['msg1', 'msg2'],
    });

    renderHook(() => useNotification());

    expect(antMessage.destroy).toHaveBeenCalledWith('msg1');
    expect(antMessage.destroy).toHaveBeenCalledWith('msg2');
  });

  it('should do nothing if no notifications or messages', () => {
    (useGlobals as jest.Mock).mockReturnValue({
      notification: null,
      message: null,
      messagesToDestroy: null,
    });

    renderHook(() => useNotification());

    expect(antNotification.open).not.toHaveBeenCalled();
    expect(antMessage.open).not.toHaveBeenCalled();
    expect(antMessage.destroy).not.toHaveBeenCalled();
  });
});
