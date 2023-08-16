'use client';

import Ticket from '@components/ticket';
import { GITHUB_REGEX } from '@lib/constants';
import { ConfDataContext, UserData } from '@lib/hooks/use-conf-data';
import { ConfUser, SiteMode } from '@lib/types';
import { useState } from 'react';

type Props = {
  user: ConfUser;
  eventName: string;
  siteMode: SiteMode;
  date: string;
};

export const getUserNameFromGithub = (github: string) => {
  const githubRegex = new RegExp(GITHUB_REGEX);
  if (!githubRegex.test(github)) return undefined;

  const [username] = github.split('/').reverse();
  return username;
};

export default function TicketShare({
  user,
  eventName,
  siteMode,
  date,
}: Props) {
  const [userData, setUserData] = useState<UserData & { isGuest?: boolean }>({
    id: user.id,
    github: user.github,
    username: user.github ? getUserNameFromGithub(user.github) : undefined,
    name: user.name,
    ticketNumber: user.ticketNumber,
    isGuest: user.isGuest,
  });

  return (
    <ConfDataContext.Provider
      value={{
        userData,
        setUserData,
      }}
    >
      <Ticket
        username={userData.username}
        name={userData.name}
        ticketNumber={userData.ticketNumber}
        eventName={eventName}
        date={new Date(date)}
        sharePage={siteMode !== 'event_live'}
        isGuest={userData.isGuest}
      />
    </ConfDataContext.Provider>
  );
}
