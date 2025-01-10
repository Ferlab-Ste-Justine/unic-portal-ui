const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  UNIC_WEB_APP: process.env.NEXT_PUBLIC_UNIC_WEB_APP || 'https://portal.qa.unic.ferlab.bio',
  UNIC_WEB_APP_COMMUNITY:
    process.env.NEXT_PUBLIC_UNIC_WEB_APP_COMMUNITY || 'https://portal.qa.unic.ferlab.bio/community',
  UNIC_WEB_SITE: process.env.NEXT_PUBLIC_UNIC_WEB_SITE || 'https://unic.ca',
  UNIC_DOCUMENTATION: process.env.NEXT_PUBLIC_UNIC_DOCUMENTATION || 'https://docs.unic.ca',
  UNIC_DICTIONARY: process.env.NEXT_PUBLIC_UNIC_DICTIONARY || 'https://dict.qa.juno.unic.ferlab.bio',
  UNIC_SUBMISSION_URL: process.env.NEXT_PUBLIC_UNIC_SUBMISSION_URL || 'https://submission.qa.juno.unic.ferlab.bio',

  SUPPORT_EMAIL: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'support-qa@unic.ca',
  EMAIL_USER: process.env.NEXT_PUBLIC_EMAIL_USER || 'no-reply@unic.ca',
  EMAIL_PASS: process.env.EMAIL_PASS || '',

  FERLOAD_GITHUB_URL:
    process.env.NEXT_PUBLIC_FERLOAD_GITHUB_URL || 'https://github.com/Ferlab-Ste-Justine/ferload-client-cli',
  DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN || '.qa.juno.unic.ferlab.bio',
  USERS_API_URL: process.env.NEXT_PUBLIC_USERS_API_URL || 'https://users.qa.juno.unic.ferlab.bio',
  CLINICAL_DATA_API_URL:
    process.env.NEXT_PUBLIC_CLINICAL_DATA_API_URL || 'https://clinical-data-api.qa.juno.unic.ferlab.bio',
  ADMIN_ADD_STUDY_ROLE_URL: `${process.env.NEXT_PUBLIC_CLINICAL_DATA_API_URL || 'https://clinical-data-api.qa.juno.unic.ferlab.bio'}/api/keycloak-admin/add-user-study-role`,
  // Keycloak
  KC_REALM: process.env.NEXT_PUBLIC_KC_REALM || 'UNIC',
  KC_AUTH_SERVER_URL: process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL || 'https://auth.qa.juno.unic.ferlab.bio',
  KC_CLIENT_ID: process.env.NEXT_PUBLIC_KC_CLIENT_ID || 'unic-client',
  KC_CLIENT_SECRET: process.env.NEXTAUTH_SECRET || '',
  KC_LOGOUT_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/logout`,
  KC_TOKEN_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/token`,
  KC_USERINFO_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/realms/${process.env.NEXT_PUBLIC_KC_REALM}/protocol/openid-connect/userinfo`,
  KC_GETUSER_URL: `${process.env.NEXT_PUBLIC_KC_AUTH_SERVER_URL}/admin/realms/${process.env.NEXT_PUBLIC_KC_REALM}/users`,
};

export default config;
