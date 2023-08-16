/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use server';
import { ServerError } from '@lib/errors';
import { AttendMeta, ConfUser, User } from '@lib/types';
import { createClient } from '@supabase/supabase-js';

const supabase =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_SECRET
    ? createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_SECRET,
      )
    : undefined;

export async function getUserById(id: string): Promise<ConfUser> {
  const { data, error } = await supabase!
    .from<ConfUser>('users')
    .select()
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);

  return data ?? {};
}

export async function createUser(user: Partial<User>): Promise<ConfUser> {
  const { data, error } = await supabase!
    .from<ConfUser>('users')
    .insert({
      email: user.email,
      company: user.company,
      name: user.name,
      experience: user.experience,
      title: user.title,
      github: user.github,
      event: user.event,
    })
    .single();

  if (error) throw new ServerError(error.message);

  return data ?? {};
}

export async function createGitHubUser(user: any): Promise<string> {
  const { data, error } = await supabase!
    .from('github_users')
    .insert({ userData: user })
    .single();
  if (error) throw new Error(error.message);

  return data.id;
}

export async function updateUserById(
  id: string,
  user: Partial<ConfUser>,
): Promise<ConfUser> {
  const { data, error } = await supabase!
    .from<ConfUser>('users')
    .update(user)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data ?? {};
}

export async function checkInUser({
  eventId,
  userId,
}: {
  userId: string;
  eventId: string;
}): Promise<{ success: boolean }> {
  const { data, error } = await supabase!
    .from<AttendMeta>('attendees')
    .insert({
      event: eventId,
      id: userId,
      attended: true,
    })
    .single();

  if (error) throw new Error(error.message);

  return { success: data.attended };
}

export async function findAttendee(id: string) {
  const { data, error } = await supabase!
    .from<{
      id: string;
      name: string;
    }>('attendees')
    .select(`id`)
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ?? undefined;
}
