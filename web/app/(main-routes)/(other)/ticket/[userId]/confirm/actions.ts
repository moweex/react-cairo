'use server';

import md5 from 'md5';
import { getUserById, updateUserById } from '@lib/db-api';
import { ValidationError } from '@lib/errors';
import { sendEmail } from '@lib/utils/send-email';

export const resendEmail = async ({ userId }: { userId: string }) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ValidationError('User not found');
  }

  if (user.verified) {
    return { message: 'This user is already verified' };
  }

  const hash = user.verified
    ? user.hash
    : md5(user.email + Math.random() * 1000000);
  const url = `https://www.react-cairo.com/ticket/${user.id}?token=${hash}`;

  await updateUserById(user.id, { ...user, hash });
  await sendEmail({ user, url });

  return { message: 'Email sent' };
};
