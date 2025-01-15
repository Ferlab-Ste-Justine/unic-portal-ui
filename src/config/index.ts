const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  UNIC_WEB_APP_COMMUNITY:
    process.env.NEXT_PUBLIC_UNIC_WEB_APP_COMMUNITY || 'https://portal.qa.unic.ferlab.bio/community',
  UNIC_WEB_SITE: process.env.NEXT_PUBLIC_UNIC_WEB_SITE || 'https://unic.ca',
  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support@unic.ca',
  DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN || '.qa.unic.ferlab.bio',
  USERS_API_URL: process.env.NEXT_PUBLIC_USERS_API_URL || 'https://users.qa.unic.ferlab.bio',
  // Keycloak
  KC_REALM: process.env.NEXT_PUBLIC_KC_REALM || 'UNIC',
  KC_AUTH_SERVER_URL: process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL || 'https://auth.qa.unic.ferlab.bio',
  KC_CLIENT_ID: process.env.NEXT_PUBLIC_KC_CLIENT_ID || 'unic-client',
  KC_CLIENT_SECRET: process.env.NEXTAUTH_SECRET || '',
  KC_LOGOUT_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/logout`,
  KC_TOKEN_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/token`,
  KC_USERINFO_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/userinfo`,
  KC_GETUSER_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/admin/realms/${process.env.NEXT_PUBLIC_KC_REALM}/users`,
};

export default config;
