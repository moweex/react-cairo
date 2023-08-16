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

import { TicketGenerationState } from '@lib/constants';
import TicketColoredMobile from './ticket-colored-mobile';
import TicketColored from './ticket-colored';
import styles from './ticket-visual.module.css';
import TicketProfile from './ticket-profile';
import TicketNumber from './ticket-number';
import TicketMono from './ticket-mono';
import TicketInfo from './ticket-info';
import TicketMonoMobile from './ticket-mono-mobile';

type Props = {
  size?: number;
  name: string;
  date: Date;
  ticketNumber?: number;
  username?: string;
  ticketGenerationState?: TicketGenerationState;
  isGuest?: boolean;
};

export default function TicketVisual({
  size = 1,
  name,
  username,
  ticketNumber,
  date,
  ticketGenerationState = 'default',
  isGuest,
}: Props) {
  return (
    <div className={styles.visual} style={{ ['--size' as string]: size }}>
      {isGuest && (
        <div
          style={{
            position: 'absolute',
            inset: '0 auto auto 0',
            background: '#C89B3C',
            transformOrigin: '100% 0',
            transform: 'translate(-29.3%) rotate(-45deg)',
            boxShadow: '0 0 0 999px #C89B3C',
            clipPath: 'inset(0 -100%)',
          }}
        >
          <p className="font-semibold text-base">MOWEEX Guest</p>
        </div>
      )}
      <div className={styles['horizontal-ticket']}>
        <TicketColored />
      </div>
      <div className={styles['vertical-ticket']}>
        <TicketColoredMobile />
      </div>
      <div className={styles.profile}>
        <TicketProfile
          name={name}
          username={username}
          size={size}
          ticketGenerationState={ticketGenerationState}
        />
      </div>
      <div className={styles.info}>
        <TicketInfo
          logoTextSecondaryColor={ticketNumber ? 'var(--brand)' : undefined}
          date={date}
        />
      </div>
      {ticketNumber && (
        <div className={styles['ticket-number-wrapper']}>
          <div className={styles['ticket-number']}>
            <TicketNumber number={ticketNumber} />
          </div>
        </div>
      )}
    </div>
  );
}
