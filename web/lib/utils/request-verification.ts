import { updateUserById } from '@lib/db-api';
import { ConfUser } from '@lib/types';
import { sendEmail } from '@lib/utils/send-email';
import md5 from 'md5';

export const requestVerification = async (email: string, user: ConfUser) => {
  const hash = md5(email + Math.random() * 1000000);
  const url = `https://www.react-cairo.com/ticket/${user.id}?token=${hash}`;

  await updateUserById(user.id, { ...user, hash });
  await sendEmail({ user, url });
};
