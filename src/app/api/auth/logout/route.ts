import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import config from '@/config';

export async function POST() {
  const session = await getServerSession(authOptions);
  const refreshToken = session?.user.refreshToken || '';

  const logoutParams = new URLSearchParams({
    client_id: config.KC_CLIENT_ID,
    refresh_token: refreshToken, // Include the refresh token to invalidate the Keycloak session
  });

  try {
    const response = await fetch(config.KC_LOGOUT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: logoutParams.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to log out from Keycloak');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging out from Keycloak:', error);
    return NextResponse.json({ success: false, error: JSON.stringify(error) });
  }
}
