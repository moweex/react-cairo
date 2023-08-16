import { listUsers } from '@lib/db-providers/supabase/get-users';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filterAttended = searchParams.get('attended');
  const email = searchParams.get('email');
  try {
    const {
      data: attendants,
      count,
      total,
    } = await listUsers({
      eventId: process.env.SUPABASE_EVENT_ID!,
      attendedOnly: filterAttended === 'true',
      email: email || undefined,
    });
    return NextResponse.json({ attendants, count, total }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 },
    );
  }
}
