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
import styles from './hero.module.css';
import { BRAND_NAME, DATE } from '@lib/constants';

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <h2 className={cn(styleUtils.appear, styles.description)}>
        <a href="https://moweex.com/" target="_blank">
          <img src="/moweex.png" alt="" />
        </a>
        <br />
        <span>PRESENTS</span>
      </h2>
      <h1
        className={cn(
          styleUtils.appear,
          styleUtils['appear-third'],
          styles.hero,
        )}
      >
        {BRAND_NAME}
        <br />
        conference
      </h1>
      <div
        className={cn(
          styleUtils.appear,
          styleUtils['appear-fourth'],
          styles.info,
        )}
      >
        <span>{DATE}</span>
        <span>{' | '}</span>
        <a
          href="https://www.google.com/maps/place/Pyramisa+Suites+Hotel+Cairo/@30.0385726,31.216526,18.76z/data=!4m18!1m9!3m8!1s0x1458472ab330e9a9:0xbcd55bd48ddc3809!2sPyramisa+Suites+Hotel+Cairo!5m2!4m1!1i2!8m2!3d30.0379002!4d31.2181052!3m7!1s0x1458472ab330e9a9:0xbcd55bd48ddc3809!5m2!4m1!1i2!8m2!3d30.0379002!4d31.2181052?hl=en-EG"
          target="_blank"
        >
          <img
            src="/icons/map.svg"
            alt="Pyramisa Hotel"
            title="Pyramisa Hotel"
          />
          Pyramisa Hotel
          {/* <img src="/icons/map.svg" alt="" width={30} /> */}
        </a>
      </div>
    </div>
  );
}
