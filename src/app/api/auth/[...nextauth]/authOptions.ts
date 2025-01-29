import { AuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';

import config from '@/config';

const { KC_AUTH_SERVER_URL, KC_CLIENT_ID, KC_REALM } = config;
const COOKIES_LIFE_TIME = 24 * 60 * 60;
const COOKIE_PREFIX = process.env.NODE_ENV === 'production' ? '__Secure-' : '';

const keycloakConfig = {
  clientId: KC_CLIENT_ID,
  clientSecret: '',
  issuer: `${KC_AUTH_SERVER_URL}/realms/${KC_REALM}`,
};

export const authOptions: AuthOptions = {
  providers: [KeycloakProvider(keycloakConfig)],
  callbacks: {
    async session({ session, token }) {
      // console.debug('[session] token', token);
      session.user.id = token.id || token.sub;
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.roles = token.roles || [];
      session.error = token.error;
      if (session.error) {
        console.debug('[session] session error', session.error);
      }
      return session;
    },
    async jwt({ token, account }) {
      // console.debug('[jwt] token', token);

      // Initial sign in
      if (account?.access_token) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        // Use expires_at in seconds, convert to milliseconds
        token.accessTokenExpires = account.expires_at * 1000;
      }

      if (token?.accessToken) {
        const jwtPayload = JSON.parse(Buffer.from(token.accessToken.split('.')[1], 'base64').toString());
        token.roles = jwtPayload.realm_access?.roles || [];
      }

      let _token = token;

      // Return token if the access token has not expired yet
      if (Date.now() > token.accessTokenExpires) {
        // Access token has expired, try to update it
        _token = await refreshAccessToken(token);
      }

      try {
        await checkAuthentication(_token);
      } catch {
        // Set an error to force logout
        _token.error = 'UserNotAuthenticated';
        console.debug('[jwt] checkAuthentication catch token.error', _token.error);
      }

      return _token;
    },
  },
  // events: {
  //   async signOut({ token }) {
  //     const logOutUrl = new URL(
  //       `${process.env.KEYCLOACK_ISSUER}/protocol/openid-connect/logout`,
  //     );
  //     logOutUrl.searchParams.set('id_token_hint', token.id_token!);
  //
  //     await fetch(logOutUrl);
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  pages: {
    // signIn: '/',
  },
  cookies: {
    sessionToken: {
      name: `${COOKIE_PREFIX}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `${COOKIE_PREFIX}next-auth.callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `${COOKIE_PREFIX}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    pkceCodeVerifier: {
      name: `${COOKIE_PREFIX}next-auth.pkce.code_verifier`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    state: {
      name: `${COOKIE_PREFIX}next-auth.state`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
        maxAge: COOKIES_LIFE_TIME,
      },
    },
    nonce: {
      name: `${COOKIE_PREFIX}next-auth.nonce`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
};

const checkAuthentication = async (token: JWT) => {
  console.debug('[checkAuthentication] time', new Date().toString());
  // Call Keycloak's userinfo endpoint to check if the user is still authenticated
  const userinfoResponse = await fetch(config.KC_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  // If the response is not ok, it means the token may be invalid
  if (!userinfoResponse.ok) {
    console.debug('[checkAuthentication] throw');
    throw new Error('User no longer authenticated');
  }
  return true;
};

/**
 * Refreshes the access token by using the refresh token
 * @param token - The current JWT token
 * @returns The updated JWT token
 */
const refreshAccessToken = async (token: JWT) => {
  try {
    console.debug('[refreshedTokens] time', new Date().toString());
    const response = await fetch(config.KC_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: config.KC_CLIENT_ID,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }),
    });
    if (!response.ok) {
      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
    }
    const refreshedTokens = await response.json();
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.error('[refreshedTokens] Error refreshing access token:', error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};
