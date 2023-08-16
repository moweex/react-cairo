import { COOKIE, GITHUB_REGEX } from '@lib/constants';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import TicketVisual from '@components/ticket-visual';
import UnVerified from 'app/(main-routes)/(other)/ticket/[userId]/unverified';
import { getUser } from 'app/(main-routes)/(other)/ticket/[userId]/page';
import styles from '@components/ticket.module.css';
import styleUtils from '@components/utils.module.css';
import cn from 'classnames';
import { getSiteMode } from '@lib/cms-api';

type Props = {
  params: { userId: string };
};

const getUserNameFromGithub = (github: string) => {
  const githubRegex = new RegExp(GITHUB_REGEX);
  if (!githubRegex.test(github)) return undefined;

  const [username] = github.split('/').reverse();
  return username;
};

export default async function PreviewTicket({ params }: Props) {
  const { date } = await getSiteMode();

  const user = await getUser({
    ids: [params.userId, cookies().get(COOKIE)?.value ?? ''],
  });

  if (!user) {
    notFound();
  }

  if (!user.verified) {
    return <UnVerified />;
  }

  return (
    <div className={styles['ticket-visual-wrapper']}>
      <div
        className={cn(
          styles['ticket-visual'],
          styleUtils.appear,
          styleUtils['appear-fourth'],
        )}
      >
        <TicketVisual
          username={
            user.github ? getUserNameFromGithub(user.github) : undefined
          }
          name={user.name}
          date={new Date(date)}
          ticketNumber={user.ticketNumber}
          ticketGenerationState={'default'}
          isGuest={user.isGuest}
        />
      </div>
    </div>
  );
}
