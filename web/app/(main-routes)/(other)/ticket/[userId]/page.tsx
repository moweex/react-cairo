import { COOKIE } from '@lib/constants';
import { getUserById } from '@lib/db-api';
import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import TicketShare from './preview';
import { ConfUser } from '@lib/types';
import { getSiteMode } from '@lib/cms-api';
import UnVerified from './unverified';
import { verifyUser } from './actions';
import { LogicError } from '@lib/errors';
import { getMetaContent } from '@lib/cms-providers/dato';
import { Metadata } from 'next';

type Props = {
  params: { userId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function getUser({
  ids,
}: {
  ids: string[];
}): Promise<ConfUser | undefined> {
  // get current user from db using either param or cookie
  const [userId, userIdFromCookies] = ids;
  try {
    const user = await getUserById(userId);
    return user;
  } catch (error) {
    try {
      const user = await getUserById(userIdFromCookies);
      return user;
    } catch (error) {
      return undefined;
    }
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = await getMetaContent();
  const user = await getUser({
    ids: [params.userId, cookies().get(COOKIE)?.value ?? ''],
  });

  if (!user) {
    return {};
  }

  return {
    title: `${user.name}'s Ticket`,
    openGraph: {
      title: `${user.name}'s Ticket`,
      description: `Join ${user.name} at ${content.title}.`,
      siteName: content.title,
      locale: 'en',
      images: [
        {
          url: `/api/users/${user.id}/ticket-image`,
        },
      ],
    },
    twitter: {
      title: `${user.name}'s Ticket`,
      description: content.description,
      card: 'summary_large_image',
      images: [
        {
          url: `/api/users/${user.id}/ticket-image`,
        },
      ],
    },
  };
}

export default async function PreviewTicket({ params, searchParams }: Props) {
  const { eventName, siteMode, date } = await getSiteMode();
  const token = searchParams?.token;

  if (siteMode !== 'event_live') {
    redirect('/register/closed');
  }

  const user = await getUser({
    ids: [params.userId, cookies().get(COOKIE)?.value ?? ''],
  });

  if (!user) {
    notFound();
  }

  if (!user.verified) {
    if (token === undefined || token !== user.hash) {
      return <UnVerified />;
    }

    try {
      await verifyUser({ user, token });
      const verifiedUser = await getUser({
        ids: [params.userId, cookies().get(COOKIE)?.value ?? ''],
      });
      if (!verifiedUser?.verified) {
        throw new Error('User not verified');
      }
    } catch (error) {
      throw new LogicError('User not verified');
    }
  }

  if (token !== undefined && user.verified) {
    redirect(`/ticket/${user.id}`);
  }

  return (
    <TicketShare
      user={user}
      eventName={eventName}
      siteMode={siteMode}
      date={date}
    />
  );
}
