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

import {
  ABOUT,
  BECOME_SPONSOR,
  COPYRIGHT_HOLDER,
  HOUR,
  MEDIA,
  PRIVACY_POLICY,
  SITE_NAME,
  TERMS_AND_CONDITIONS,
} from '@lib/constants';
import { SocialMediaLink } from 'app/components/NavMenu';
import { getSocialLinks } from '@lib/cms-providers/dato';
import NavItem from './nav-item';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer() {
  const socials = await getSocialLinks({ revalidate: HOUR });
  const FOOTER_NAVIGATION = [PRIVACY_POLICY, TERMS_AND_CONDITIONS];
  return (
    <footer className="px-4 md:px-8 z-10 pb-2">
      <div className="flex flex-col md:flex-row justify-between">
        <ul className="flex flex-col text-sm space-y-2 self-center pb-4 md:pb-0">
          {FOOTER_NAVIGATION.map(({ name, route }) => (
            <NavItem
              key={route}
              name={name}
              route={route}
              className="text-base text-white hover:text-brand-300 text-center md:text-left"
            />
          ))}
        </ul>
        <div className="lg:flex lg:items-end md:order-2 self-center pb-2 md:pb-0">
          <ul
            aria-label="social media list"
            className="flex flex-row space-x-4"
          >
            {socials?.map(({ type, href }) => (
              <SocialMediaLink
                key={type}
                type={type}
                href={href}
                className="w-8 h-8 lg:w-10 lg:h-10 text-black"
              />
            ))}
          </ul>
        </div>
        <div className="flex flex-col text-center md:order-1 pb-2 md:pb-0">
          <Link
            href="https://moweex.com/"
            target="_blank"
            className="flex justify-center"
          >
            <div className="flex items-center justify-center">
              <div className="text-white text-sm">Powered by</div>
              <Image
                src="/moweex.png"
                alt="Moweex Logo"
                width={100}
                height={100}
                className="w-44 lg:w-60"
              />
            </div>
          </Link>
          <span className="text-center text-xs pr-4">
            Copyright © {`${new Date().getFullYear()} `}{' '}
            {COPYRIGHT_HOLDER || `${SITE_NAME}.`} All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
