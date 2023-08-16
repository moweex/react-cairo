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

import cn from 'classnames';
import styleUtils from './utils.module.css';
import styles from './contact.module.css';

export default function LearnMore() {
  return (
    <div className={styles.wrapper}>
      <h2 className={cn(styleUtils.appear, styleUtils['appear-sixth'])}>
        Join us now in the second edition of React Cairo Conference{' '}
        <a
          href="https://www.google.com/maps/place/Pyramisa+Suites+Hotel+Cairo/@30.0385726,31.216526,18.76z/data=!4m18!1m9!3m8!1s0x1458472ab330e9a9:0xbcd55bd48ddc3809!2sPyramisa+Suites+Hotel+Cairo!5m2!4m1!1i2!8m2!3d30.0379002!4d31.2181052!3m7!1s0x1458472ab330e9a9:0xbcd55bd48ddc3809!5m2!4m1!1i2!8m2!3d30.0379002!4d31.2181052?hl=en-EG"
          target="_blank"
        >
          at Pyramisa Hotel, Lotus hall
        </a>
      </h2>
      <p
        className={cn(
          styleUtils.appear,
          styleUtils['appear-sixth'],
          styles.hero,
        )}
      >
        We are living in a world of constant innovation and creativity of
        technology. Where technology nowadays meets humanity. In this world we
        need skills, knowledge and ability to respond accurately to changes
        around us.
      </p>
      <p
        className={cn(
          styleUtils.appear,
          styleUtils['appear-sixth'],
          styles.hero,
        )}
      >
        React Cairo is a tech event that focuses specifically on React. A
        marvelous community for developers to connect, and share experiences and
        knowledge from the core contributors and software leaders.
      </p>
      <p
        className={cn(
          styleUtils.appear,
          styleUtils['appear-sixth'],
          styles.hero,
        )}
      >
        We are delighted to invite all the software developers to a fantastic
        evening of learning and networking. The event starts at 6:00 PM
      </p>
      <p
        className={cn(
          styleUtils.appear,
          styleUtils['appear-sixth'],
          styles.hero,
        )}
      >
        Be ready to network and share knowledge in a remarkable atmosphere that
        reconciles the
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        software engineer's mindset and keeps up with the digital era! Bring
        your positive vibes and come join us for an evening of learning and fun.
      </p>
      <br />
      <h2
        className={cn(
          styleUtils.appear,
          styleUtils['appear-seventh'],
          styles.condition,
        )}
      >
        Terms and Conditions
      </h2>
      <ul
        className={cn(
          styleUtils.appear,
          styleUtils['appear-seventh'],
          styles.hero,
        )}
      >
        <li>It is forbidden to attend without registration</li>
        <li>Registration from the website only</li>
        <li>The slots is limited so registration is of priority</li>
        <li>Commitment to the start time of the event</li>
        <li>
          If there are available slots, the queue will be allowed to attend{' '}
        </li>
      </ul>
    </div>
  );
}
