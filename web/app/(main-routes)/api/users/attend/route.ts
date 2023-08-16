import { checkInUser, findAttendee, getUserById } from '@lib/db-api';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const { userId } = await request.json();

  if (!userId) {
    return new Response('Missing user id', { status: 400 });
  }

  const user = await getUserById(userId);

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const { name } = user;

  const attendee = await findAttendee(userId);

  if (attendee) {
    return new Response('User already checked in', { status: 409 });
  }

  const { success } = await checkInUser({
    userId,
    eventId: process.env.SUPABASE_EVENT_ID!,
  });

  if (!success) {
    return new Response('Error checking in user', { status: 500 });
  }

  return new Response(`Successfully checked in ${name}`, { status: 200 });
}
