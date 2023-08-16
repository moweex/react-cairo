'use server';

import { createUser } from '@lib/db-api';
import { ConflictingError } from '@lib/errors';
import { ConfUser, User } from '@lib/types';
import validator from 'validator';
import { GITHUB_REGEX, TAGS } from '@lib/constants';
import fetchUserByEmail from '@lib/db-providers/supabase/get-user-by-email';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requestVerification } from '@lib/utils/request-verification';

const validate = (user: Partial<User>) => {
  const errors: { [k: string]: string } = {};

  if (!user.email) errors.email = 'Email is required';
  if (!validator.isEmail(user.email!)) errors.email = 'Invalid email';
  if (!user.company) errors.company = 'Company is required';
  if (!user.name) errors.name = 'Name is required';
  if (!user.experience) errors.experience = 'Experience is required';
  if (isNaN(Number(user.experience))) errors.experience = 'Invalid experience';
  if (!user.title) errors.title = 'Title is required';
  if (user.github) {
    // regex to match github URL
    const githubRegex = new RegExp(GITHUB_REGEX);
    if (!githubRegex.test(user.github)) errors.github = 'Invalid GitHub URL';
  }

  return errors;
};

export async function submitUser(data: FormData): Promise<
  | {
      errors: { [k: string]: string };
      message?: string;
      type: 'ValidationError' | 'ConflictingError' | 'ServerError';
    }
  | ConfUser
> {
  const formData: Partial<User> = {
    email:
      typeof data.get('email') === 'string'
        ? (data.get('email') as string)
        : undefined,
    name:
      typeof data.get('name') === 'string'
        ? (data.get('name') as string)
        : undefined,
    company:
      typeof data.get('company') === 'string'
        ? (data.get('company') as string)
        : undefined,
    title:
      typeof data.get('title') === 'string'
        ? (data.get('title') as string)
        : undefined,
    experience: !isNaN(Number(data.get('experience')))
      ? Number(data.get('experience'))
      : undefined,
    github:
      typeof data.get('github') === 'string'
        ? (data.get('github') as string)
        : undefined,
    event: process.env.SUPABASE_EVENT_ID,
  };
  const errors = validate(formData);

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      message: 'Invalid user data',
      type: 'ValidationError',
    };
  }

  try {
    const existingUser = await fetchUserByEmail({ email: formData.email! });
    if (existingUser !== null)
      throw new ConflictingError(`User already exists`);
  } catch (err) {
    if (err instanceof ConflictingError) {
      return {
        errors: {},
        type: 'ConflictingError',
        message: 'User already exists',
      };
    }

    return {
      errors: {},
      type: 'ServerError',
      message: 'Error checking validity, please try again later',
    };
  }

  try {
    const user = await createUser(formData);
    revalidateTag(TAGS.USERS_CHANGED);
    revalidatePath(`/register`);
    try {
      await requestVerification(user.email, user);
    } catch (err) {}

    return user;
  } catch (err) {
    return {
      errors: {},
      type: 'ServerError',
      message: 'Error creating user, please try again later',
    };
  }
}
