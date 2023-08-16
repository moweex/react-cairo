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

import { HeaderButton } from 'app/components/hero-button/primary';

export type Image = {
  url: string;
  blurDataURL?: string;
};

export type Speaker = {
  id: string;
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  linkedin: string;
  company?: string;
  talk: Talk;
  image?: Image & { responsiveImage: { width: number; height: number } };
  imageUrl?: string;
  imageSquare: Image;
};

export type Stage = {
  name: string;
  slug: string;
  stream: string;
  discord: string;
  schedule: Talk[];
  isLive: boolean;
  roomId: string;
  stagePeers: string[];
  backstagePeers: string[];
};

export type Talk = {
  title: string;
  description: string;
  start: string;
  end: string;
  speaker: Speaker[];
};

export type Link = {
  url: string;
};

export type Sponsor = {
  name: string;
  description: string;
  website: string;
  callToAction: string;
  callToActionLink: string;
  links: SponsorLink[];
  tier: string;
  logo: Image & { responsiveImage: { width: number; height: number } };
};

export type CommunityPartner = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

export type SponsorLink = {
  text: string;
  url: string;
};

export type Job = {
  id: string;
  companyName: string;
  title: string;
  description: string;
  discord: string;
  link: string;
  rank: number;
};

export type ConfUser = User & {
  ticketNumber: number;
  createdAt: number;
  id: string;
  verified: boolean;
  hash?: string;
};

export type AttendMeta = {
  id: string;
  event: string;
  attended: boolean;
};

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
      name: string;
      login: string;
    };

export type SiteMode = 'seeking_speakers' | 'event_live';
export type GoogleLocation = {
  name: string;
  lat?: number;
  lng?: number;
  url?: string;
  date: string;
};

export type GalleryImage = {
  id: string;
  url: string;
  title?: string;
  alt: string;
  width: number;
  height: number;
  customData?: { [key: string]: string };
  type: 'image';
};

export type GalleryVideo = {
  url: string;
  width: number;
  height: number;
  title: string;
  thumbnailUrl: string;
  type: 'video';
};
export type GalleryItem = GalleryImage | GalleryVideo;

export type MainPageContent = {
  mainTitle: string;
  location?: GoogleLocation;
  buttons: HeaderButton[];
  speakerSignUp: string;
  description: string;
  gallery: GalleryImage[];
  videoURL: string;
  keywords: string;
};

export type User = {
  email: string;
  name: string;
  company: string;
  title: string;
  experience: number;
  github?: string;
  event: string;
  isGuest: boolean;
};

export type AgendaItem = {
  id: string;
  title: string;
  start: string;
  end: string;
  speakers: Pick<
    Speaker,
    'name' | 'slug' | 'name' | 'title' | 'image' | 'id'
  >[];
};

export type SponsorTier = {
  id: string;
  name: string;
  perks: { value: string; id: string }[];
  price: number;
  currency: string;
  url: string;
  color: string;
};

export type BenefitsSection = {
  header: string;
  secondaryHeader: string;
  benefits: Array<{
    id: string;
    title: string;
    description: string;
    icon: 'learning' | 'networking' | 'practices' | 'exposure';
  }>;
};
