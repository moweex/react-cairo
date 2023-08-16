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

export const SITE_URL = 'https://react-cairo.com';
export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN || new URL(SITE_URL).origin;
export const TWITTER_USER_NAME = 'moweexagency';
export const BRAND_NAME = 'React Cairo';
export const SITE_NAME_MULTILINE = ['React', 'Cairo'];
export const SITE_NAME = 'React Cairo';
export const META_DESCRIPTION =
  'Register now! for React Cairo conference that focuses only on building a community for React and networking';
export const SITE_DESCRIPTION =
  'Register now! for React Cairo conference that focuses only on building a community for React and networking';
export const DATE = '21 December 2022';
export const SHORT_DATE = 'Dec 21 - 6:00Pm PST';
export const FULL_DATE = 'Dec 21st 6am Pacific Time (GMT-7)';
export const TWEET_TEXT =
  'I just got my ticket to React Cairo! Want to join me?';
export const COOKIE = 'user-id';
export const GITHUB_REGEX = `^(
  (https:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$)
  |(github\.com\/[a-zA-Z0-9_-]+\/?$)`;

// Remove process.env.NEXT_PUBLIC_... below and replace them with
// strings containing your own privacy policy URL and copyright holder name
export const LEGAL_URL = process.env.NEXT_PUBLIC_PRIVACY_POLICY_URL;
export const COPYRIGHT_HOLDER = process.env.NEXT_PUBLIC_COPYRIGHT_HOLDER;

export const CODE_OF_CONDUCT =
  'https://www.notion.so/vercel/Code-of-Conduct-Example-7ddd8d0e9c354bb597a0faed87310a78';
export const REPO = 'https://github.com/vercel/virtual-event-starter-kit';
export const SAMPLE_TICKET_NUMBER = 1234;

export const REGISTER = {
  name: 'Get your ticket',
  route: '/register',
};

export const BECOME_SPONSOR = {
  name: 'Become a Sponsor',
  route: '/become-sponsor',
};

export const MEDIA = {
  name: 'Media',
  route: '/media',
};

export const ABOUT = {
  name: 'About',
  route: '/about',
};

export const PRIVACY_POLICY = {
  name: 'Privacy Policy',
  route: '/privacy-policy',
};

export const TERMS_AND_CONDITIONS = {
  name: 'Terms and Conditions',
  route: '/terms-and-conditions',
};

export const SPEAKERS = {
  name: 'Speakers',
  route: '/#speakers',
};

export const AGENDA = {
  name: 'Agenda',
  route: '/#agenda',
};

export const NAVIGATION = [ABOUT, MEDIA, SPEAKERS, AGENDA, BECOME_SPONSOR];
export const ALL_NAVIGATION = [
  { name: 'main', route: '' },
  REGISTER,
  PRIVACY_POLICY,
  TERMS_AND_CONDITIONS,
  ...NAVIGATION,
];

export const URL_KEYS = [
  'twitter',
  'linkedin',
  'youtube',
  'facebook',
  'meetup',
  'media',
  'community',
];

export type TicketGenerationState = 'default' | 'loading';

export const MINUTE = 60;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export const TAGS = {
  USERS_CHANGED: 'users-changed',
  MAX_ATTENDEES: 'max-attendees',
};
