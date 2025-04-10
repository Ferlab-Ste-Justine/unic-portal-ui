import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from 'antd';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import DeleteCard from './index';

jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));
jest.mock('@/store/user/thunks', () => ({
  deleteUser: jest.fn(() => ({ type: 'DELETE_USER' })),
}));
jest.mock('@/app/api/auth/useAuth', () => ({
  useAuth: () => ({ logout: jest.fn() }),
}));
jest.mock('antd', () => {
  const actualAntd = jest.requireActual('antd');
  return {
    ...actualAntd,
    Modal: {
      confirm: jest.fn(),
    },
  };
});

const mockStore = configureStore();
const store = mockStore({});

describe('DeleteCard Component', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <DeleteCard />
      </Provider>,
    );

    expect(screen.getByText('screen.profileSettings.cards.deleteAccount.title')).toBeInTheDocument();
    expect(screen.getByText('screen.profileSettings.cards.deleteAccount.notice')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'screen.profileSettings.cards.deleteAccount.button' }),
    ).toBeInTheDocument();
  });

  it('shows confirmation modal when delete button is clicked', () => {
    render(
      <Provider store={store}>
        <DeleteCard />
      </Provider>,
    );

    const deleteButton = screen.getByRole('button', { name: 'screen.profileSettings.cards.deleteAccount.button' });
    fireEvent.click(deleteButton);

    expect(Modal.confirm).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'screen.profileSettings.cards.deleteAccount.title',
        content: 'screen.profileSettings.cards.deleteAccount.confirm.content',
      }),
    );
  });
});
