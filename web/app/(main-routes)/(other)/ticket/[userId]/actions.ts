import { getUserById, updateUserById } from '@lib/db-api';
import { ConfUser } from '@lib/types';

export async function verifyUser({
  user: { id },
  token,
}: {
  user: ConfUser;
  token: string;
}) {
  const user = await getUserById(id);
  if (token === user.hash) {
    await updateUserById(user.id, { verified: true });
  }
}
