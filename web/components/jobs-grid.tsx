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

import { Job } from '@lib/types';
import styles from './jobs-grid.module.css';

type Props = {
  jobs: Job[];
};

function CompanyJobs({ jobs }: Props) {
  return (
    <div className={styles.grid}>
      {jobs.map(job => (
        <a
          key={job.id}
          className={styles.card}
          href={job.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.cardBody}>
            <div>
              <h3 className={styles.title}>{job.title}</h3>
              <p className={styles.company}>{job.companyName}</p>
              <p className={styles.description}>{job.description}</p>
            </div>
            <p className={styles.link}>
              Learn More
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <path d="M15 3h6v6" />
                <path d="M10 14L21 3" />
              </svg>
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function JobsGrid({ jobs }: Props) {
  const companies = jobs.reduce((allCompanies: any, job) => {
    allCompanies[job.companyName] = [
      ...(allCompanies[job.companyName] || []),
      job,
    ];
    return allCompanies;
  }, {});

  return (
    <>
      {Object.keys(companies).map((companyName: string) => (
        <div key={companyName} className={styles.companyRow}>
          <div className={styles.rowHeader}>
            <h2 className={styles.companyName}>{companyName}</h2>
          </div>
          <CompanyJobs jobs={companies[companyName]} />
        </div>
      ))}
    </>
  );
}
