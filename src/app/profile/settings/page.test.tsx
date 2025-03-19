import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';

import { useAuth } from '@/app/api/auth/useAuth';
import LoginPage from '@/app/login/page';
import { globalActions } from '@/store/global';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/app/api/auth/useAuth');
jest.mock('@/store/global', () => ({
  globalActions: {
    changeLang: jest.fn(),
  },
  useLang: jest.fn(() => 'EN'),
  useGlobals: () => ({
    stats: {},
  }),
  fetchStats: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  get: jest.fn((key) => key),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('LoginPage Component', () => {
  const initialState = {
    global: {
      lang: 'EN',
    },
  };

  const mockStore = configureStore();
  const store = mockStore(initialState);
  const mockPush = jest.fn();
  const mockLogin = jest.fn();
  const mockDispatch = jest.fn();

  (useAuth as jest.Mock).mockReturnValue({
    isAuthenticated: false,
    login: mockLogin,
  });
  (useRouter as jest.Mock).mockReturnValue({
    push: mockPush,
  });
  (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login page correctly', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByAltText('login-img')).toBeInTheDocument();
    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText('screen.loginPage.title')).toBeInTheDocument();
    expect(screen.getByText('screen.loginPage.subTitle')).toBeInTheDocument();
    expect(screen.getByText('components.dataRelease.title')).toBeInTheDocument();
    expect(screen.getByText('global.participants')).toBeInTheDocument();
    expect(screen.getByText('entities.project.Projects')).toBeInTheDocument();
    expect(screen.getByText('entities.source_system.Source_systems')).toBeInTheDocument();
    expect(screen.getByText('entities.variable.Variables')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'screen.loginPage.login' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'screen.loginPage.signup' })).toBeInTheDocument();
  });

  it('calls login function when login button is clicked', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const loginButton = screen.getByRole('button', { name: 'screen.loginPage.login' });
    fireEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('calls login function when signup button is clicked', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const signupButton = screen.getByRole('button', { name: 'screen.loginPage.signup' });
    fireEvent.click(signupButton);
    expect(mockLogin).toHaveBeenCalledTimes(1);
  });

  it('switches language when language button is clicked', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    const languageButton = screen.getByRole('button', { name: 'FR' });
    fireEvent.click(languageButton);
    expect(globalActions.changeLang).toHaveBeenCalledTimes(1);
  });

  it('redirects to home when user is authenticated', () => {
    (useAuth as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: mockLogin,
    });

    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>,
    );

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
