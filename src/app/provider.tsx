'use client';
import { ConfigProvider } from 'antd';
import enUSAntd from 'antd/lib/locale/en_US';
import frFRAntd from 'antd/lib/locale/fr_FR';
import { usePathname } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import React from 'react';
import intl from 'react-intl-universal';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { useAuth } from '@/app/api/auth/useAuth';
import Loading from '@/components/Loading';
import { ApolloWrapper } from '@/lib/graphql/ApolloWrapper';
import locales from '@/locales';
import { persistor, store } from '@/store';
import { useLang } from '@/store/global';
import { LANG } from '@/types/constants';

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const isLogin = pathname === '/login';

  if (isLoading) {
    return <Loading />;
  }

  if (isAuthenticated || isLogin) {
    return <>{children}</>;
  }

  return <Loading />;
};

const ANTDConfigProvider = ({ children }: React.PropsWithChildren) => {
  const lang = useLang();
  intl.init({
    currentLocale: lang,
    locales,
    warningHandler: (warn) => console.warn('[warningHandler]', warn),
  });

  return <ConfigProvider locale={lang === LANG.FR ? frFRAntd : enUSAntd}>{children}</ConfigProvider>;
};

const RootProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ANTDConfigProvider>
            <AuthProvider>
              <ApolloWrapper>{children}</ApolloWrapper>
            </AuthProvider>
          </ANTDConfigProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};

export default RootProvider;
