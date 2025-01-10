'use client';
import '@/styles/globals.css';
import '@/styles/theme/dist/main.css';
import '@/styles/theme/dist/colors.css';

import { usePathname } from 'next/navigation';
import React from 'react';

import RootProvider from '@/app/provider';
import Header from '@/components/Header';

const RootLayout = ({ children }: React.PropsWithChildren) => {
  const pathname = usePathname();
  // Only show header on pages other than login
  const showHeader = pathname !== '/login';

  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/ferlab.png' sizes='any' />
      </head>
      <body>
        <RootProvider>
          {showHeader && (
            <header>
              <Header />
            </header>
          )}
          <main>{children}</main>
          {/*<footer>Footer</footer>*/}
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
