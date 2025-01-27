const config = {
  NODE_ENV: process.env.NODE_ENV || '',
  UNIC_WEB_SITE: process.env.NEXT_PUBLIC_UNIC_WEB_SITE || '',
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '',
  DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN || '',
  USERS_API_URL: process.env.NEXT_PUBLIC_USERS_API_URL || '',
  PORTAL_API_URL: process.env.NEXT_PUBLIC_PORTAL_API_URL || '',
  // Keycloak
  KC_REALM: process.env.NEXT_PUBLIC_KC_REALM || '',
  KC_AUTH_SERVER_URL: process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL || '',
  KC_CLIENT_ID: process.env.NEXT_PUBLIC_KC_CLIENT_ID || '',
  KC_CLIENT_SECRET: process.env.NEXTAUTH_SECRET || '',
  KC_LOGOUT_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/logout`,
  KC_TOKEN_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/token`,
  KC_USERINFO_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/userinfo`,
};

export default config;
