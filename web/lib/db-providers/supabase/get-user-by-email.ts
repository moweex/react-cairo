import { ConfUser } from '@lib/types';
export default async function fetchUserByEmail({
  email,
}: {
  email: string;
}): Promise<ConfUser | null> {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/users?email=eq.${email}`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_SECRET!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_SECRET}`,
      },
      next: {
        revalidate: 0,
      },
    },
  );

  const user = await res.json();

  return user[0] ?? null;
}
