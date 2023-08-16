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

import Link from 'next/link';
import Image from 'next/legacy/image';
import { Sponsor } from '@lib/types';
import cn from 'classnames';
import styles from './sponsors-grid.module.css';

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link
      role="button"
      tabIndex={0}
      href={sponsor.website}
      target="_blank"
      className={styles.card}
    >
      <div className={styles.imageWrapper}>
        <Image
          alt={sponsor.name}
          src={sponsor.logo.url}
          className={cn(styles.image, {
            [styles.silver]: sponsor.tier === 'silver',
          })}
          loading="lazy"
          title={sponsor.name}
          width={sponsor.logo.responsiveImage.width}
          height={sponsor.logo.responsiveImage.height}
        />
      </div>
    </Link>
  );
}

type Props = {
  sponsors: Sponsor[];
};

export default function SponsorsGrid({ sponsors }: Props) {
  return (
    <>
      <div
        className={cn(styles.grid, {
          [styles.full]: sponsors.length >= 3,
          [styles.mid]: sponsors.length === 2,
          [styles.least]: sponsors.length === 1,
        })}
      >
        {sponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </>
  );
}
