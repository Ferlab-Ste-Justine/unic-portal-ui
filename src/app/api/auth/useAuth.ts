import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';
import intl from 'react-intl-universal';
import { useDispatch } from 'react-redux';

import { persistor } from '@/store';
import { fetchUser } from '@/store/user/thunks';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthenticated = status === 'authenticated';
  const sessionError = session?.error;
  const isLoading = status === 'loading';
  const isLogin = pathname === '/login';
  const currentPath = pathname === '/' ? '' : pathname;
  const redirectPath = searchParams.get('redirect') || '/';

  const handleLogin = async () => {
    const locale = intl.getInitOptions().currentLocale as string;
    await signIn('keycloak', { callbackUrl: redirectPath }, { ui_locales: locale });
  };

  const handleLogout = useCallback(async (callbackUrl = '/login') => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    // Purge persisted Redux state
    await persistor.purge();

    // Sign out from NextAuth
    await signOut({ callbackUrl, redirect: true }); // Redirect to homepage or desired URL
  }, []);

  /** redirect to login page with current path saved */
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isLogin) {
      router.push(currentPath ? `/login?redirect=${currentPath}` : '/login');
    }
  }, [isAuthenticated, isLoading, isLogin, currentPath, router]);

  /** logout if session error */
  useEffect(() => {
    if (sessionError && !isLoading) {
      console.debug('[useAuth] handleLogout session error', sessionError);
      handleLogout();
    }
  }, [handleLogout, isLoading, sessionError]);

  /** fetch user after authenticated */
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // @ts-expect-error - UnknownAction
      dispatch(fetchUser({ errCallback: handleLogout }));
    }
  }, [isAuthenticated, dispatch, handleLogout, isLoading]);

  const _user = {
    ...session?.user,
    isAdmin: session?.user?.roles?.includes('unic_administrator'),
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    session,
    status,
    user: _user,
    isAuthenticated,
    isLoading,
  };
};
