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

import styles from './ticket-info.module.css';
import styleUtils from './utils.module.css';
import Logo from './logo';
import { SITE_URL } from '@lib/constants';
import { format } from 'date-fns';

const siteUrl = new URL(SITE_URL);
const siteUrlForTicket = `${siteUrl.host}${siteUrl.pathname}`.replace(
  /\/$/,
  '',
);

type Props = {
  logoTextSecondaryColor?: string;
  date: Date;
};

export default function TicketInfo({
  logoTextSecondaryColor = 'var(--accents-5)',
  date,
}: Props) {
  const createdBy = (
    <div className={styles['created-by']}>
      <div className={styles['created-by-text']}>Created by </div>
      <div className={styles['created-by-logo']}>{'moweex'}</div>
    </div>
  );
  return (
    <div className={styles.info}>
      <div className={styles.logo}>
        <Logo textSecondaryColor={logoTextSecondaryColor} />
      </div>
      <div className={styles.date}>
        <div>{format(date, 'do MMMM yyyy')}</div>
      </div>
      <div className={styleUtils['hide-on-mobile']}>{createdBy}</div>
      <div className={styles.url}>{siteUrlForTicket}</div>
      <div className={styleUtils['show-on-mobile']}>{createdBy}</div>
    </div>
  );
}
