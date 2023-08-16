'use client';
import cn from 'classnames';
import { SITE_URL, TWEET_TEXT } from '@lib/constants';
import IconTwitter from './icons/icon-twitter';
import IconLinkedin from './icons/icon-linkedin';
import styleUtils from './utils.module.css';
import styles from './ticket-actions.module.css';

type Props = {
  username: string;
};

export default function TicketActions({ username }: Props) {
  const permalink = encodeURIComponent(`${window.location.href}`);
  const text = encodeURIComponent(TWEET_TEXT);
  const tweetUrl = `https://twitter.com/intent/tweet?url=${permalink}&text=${text}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${permalink}`;

  return (
    <>
      <a
        className={cn(
          styles.button,
          styleUtils.appear,
          styles.first,
          'icon-button',
        )}
        href={tweetUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconTwitter width={24} /> Tweet it!
      </a>
      <a
        className={cn(
          styles.button,
          styleUtils.appear,
          styles.second,
          'icon-button',
          // LinkedIn Share widget doesn’t work on mobile
          styles['linkedin-button'],
        )}
        href={linkedInUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconLinkedin width={20} /> Share on LinkedIn
      </a>
    </>
  );
}
