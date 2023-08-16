import { redirect } from 'next/navigation';
import { HOUR, TAGS } from '@lib/constants';
import { getSiteMode } from '@lib/cms-api';
import RegisterForm from './form';
import { isRegistrationAllowed } from '@lib/cms-providers/dato';

export default async function Register() {
  const { siteMode } = await getSiteMode({ revalidate: HOUR });
  const openRegistration = await isRegistrationAllowed({
    tags: [TAGS.MAX_ATTENDEES, TAGS.USERS_CHANGED],
  });

  if (!openRegistration || siteMode !== 'event_live') {
    redirect('/register/closed');
  }

  return <RegisterForm />;
}
