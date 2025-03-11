import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useAuth } from '@/app/api/auth/useAuth';
import Header from '@/components/Header';

jest.mock('@/lib/hooks/useNotification');
jest.mock('@/app/api/auth/useAuth');
jest.mock('@/store/global', () => ({
  globalActions: {
    changeLang: jest.fn(),
  },
  useLang: jest.fn(() => 'EN'),
}));
jest.mock('@/store/user', () => ({
  useUser: () => ({
    userInfo: { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
  }),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));

describe('Header Component', () => {
  const initialState = {
    user: {
      userInfo: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      },
    },
    global: {
      lang: 'EN', // Add necessary initial state for global
    },
  };
  const mockStore = configureStore();
  const store = mockStore(initialState);

  const logout = jest.fn();
  // @ts-expect-error mockReturnValue
  useAuth.mockReturnValue({ logout });

  it('renders header and user information correctly', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    expect(screen.getByAltText('UNIC Logo')).toBeInTheDocument();
  });

  it('opens and interacts with user menu, calls logout on click', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const userMenuTrigger = screen.getByText('John');
    fireEvent.click(userMenuTrigger);

    const logoutOption = screen.getByText('layout.user.menu.logout');
    fireEvent.click(logoutOption);

    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('switch language and renders text correctly', async () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>,
    );

    const languageFrButton = screen.getByRole('button', { name: 'FR' });
    expect(languageFrButton).toBeInTheDocument();

    // fireEvent.click(languageFrButton);
    // await waitFor(() => {
    //   const languageEnButton = screen.getByRole('button', { name: 'EN' });
    //   expect(languageEnButton).toBeInTheDocument();
    // });
  });
});
