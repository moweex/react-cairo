import { HOUR, TAGS } from '@lib/constants';
import { ConfUser } from '@lib/types';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function fetchAllUsers(): Promise<ConfUser[] | null> {
  const res = await fetch(`${process.env.SUPABASE_URL}/rest/v1/users`, {
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_SECRET!,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_SECRET}`,
    },
    next: {
      tags: [TAGS.MAX_ATTENDEES, TAGS.USERS_CHANGED],
    },
  });

  const users = await res.json();

  return users ?? null;
}

async function bulkDeleteUsers(
  users: Pick<ConfUser, 'id'>[],
): Promise<{ count: number }> {
  await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/users?id=in.(%22${users
      .map(u => u.id)
      .join('%22,%22')}%22)`,
    {
      method: 'DELETE',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_SECRET!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_SECRET}`,
      },
      next: {
        revalidate: 0,
      },
    },
  );

  return { count: users.length };
}

export async function POST() {
  try {
    const users = await fetchAllUsers();
    if (users === null) {
      return NextResponse.json({ error: 'No users deleted' }, { status: 200 });
    }
    const toClean = users
      .filter(user => {
        const elapsed =
          (Date.now() - new Date(user.createdAt).getTime()) / 1000;
        return elapsed >= 12 * HOUR && user.verified === false;
      })
      .map(user => ({ id: user.id }));
    try {
      const { count } = await bulkDeleteUsers(toClean);
      revalidateTag(TAGS.USERS_CHANGED);
      revalidatePath(`/register`);
      return NextResponse.json(
        { message: `Successfully cleaned up ${count} users` },
        { status: 200 },
      );
    } catch (err) {
      return NextResponse.json(
        { error: 'Error deleting users' },
        { status: 500 },
      );
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Error fetching users' },
      { status: 500 },
    );
  }
}
