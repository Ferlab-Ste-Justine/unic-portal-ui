import { expect } from '@jest/globals';
import { act, renderHook } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';

import { useAuth } from '@/app/api/auth/useAuth';
import { persistor } from '@/store';
import { fetchUser } from '@/store/user/thunks';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));
jest.mock('react-intl-universal', () => ({
  getInitOptions: jest.fn(() => ({ currentLocale: 'en' })),
}));
jest.mock('@/store', () => ({
  persistor: { purge: jest.fn() },
}));
jest.mock('@/store/user/thunks', () => ({
  fetchUser: jest.fn(),
}));
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve({}) })) as jest.Mock;

describe('useAuth hook', () => {
  const mockDispatch = jest.fn();
  const mockPush = jest.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue('/');
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it('returns correct initial values', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'loading' });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(true);
    expect(result.current.session).toBeNull();
  });

  it('logs in and redirects to the correct path', async () => {
    const callbackUrl = '/dashboard';
    mockSearchParams.set('redirect', callbackUrl);

    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login();
    });

    expect(signIn).toHaveBeenCalledWith('keycloak', { callbackUrl }, { ui_locales: 'en' });
  });

  it('logs out and redirects to login', async () => {
    (useSession as jest.Mock).mockReturnValue({ data: { error: 'Session expired' }, status: 'authenticated' });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
    });

    expect(fetch).toHaveBeenCalledWith('/api/auth/logout', expect.any(Object));
    expect(persistor.purge).toHaveBeenCalled();
    expect(signOut).toHaveBeenCalledWith({ callbackUrl: '/login' });
  });

  it('dispatches fetchUser when authenticated', () => {
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: 'John Doe' } },
      status: 'authenticated',
    });

    renderHook(() => useAuth());

    expect(mockDispatch).toHaveBeenCalledWith(fetchUser({}));
  });

  it('redirects to login if not authenticated and not on login page', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    (usePathname as jest.Mock).mockReturnValue('/dashboard');

    renderHook(() => useAuth());

    expect(mockPush).toHaveBeenCalledWith('/login?redirect=/dashboard');
  });

  it('does not redirect if already on login page', () => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
    (usePathname as jest.Mock).mockReturnValue('/login');

    renderHook(() => useAuth());

    expect(mockPush).not.toHaveBeenCalled();
  });
});
