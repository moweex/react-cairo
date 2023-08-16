import screenshot from 'app/(main-routes)/api/users/[userId]/ticket-image/screenshot';
import { getUserById } from '@lib/db-api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  route: { params: { userId: string } },
) {
  const { userId } = route.params;
  if (!userId) {
    return new Response(`No user id provided`, { status: 400 });
  }

  const user = await getUserById(userId);
  if (!user) {
    return new Response(`User not found`, { status: 404 });
  }

  const url = `${request.nextUrl.origin}/api/users/${user.id}`;
  const file = await screenshot(url);

  const response = new NextResponse(file);
  response.headers.set('Content-Type', `image/png`);
  response.headers.set(
    'Cache-Control',
    `public, immutable, no-transform, s-maxage=31536000, max-age=31536000`,
  );
  return response;
}
