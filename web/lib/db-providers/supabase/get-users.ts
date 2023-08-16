type RawData = {
  id: string;
  email: string;
  verified: boolean;
  name: string;
  company: string;
  title: string;
  experience: number;
  isGuest: boolean;
  attendees: Array<{
    id: string;
    attended: boolean;
    event: string;
  }>;
};

type ReturnData = {
  id: string;
  verified: boolean;
  name: string;
  company: string;
  title: string;
  attended: boolean;
  isGuest: boolean;
};

const getPublicData = (user: ReturnData): ReturnData => ({
  id: user.id,
  verified: user.verified,
  name: user.name,
  company: user.company,
  title: user.title,
  attended: user.attended,
  isGuest: user.isGuest,
});

function isUserCheckedIn(eventId: string, user: RawData) {
  return (
    user.attendees.find(attendee => attendee.event === eventId)?.attended ??
    false
  );
}
export async function listUsers({
  eventId,
  attendedOnly,
  email,
}: {
  eventId: string;
  attendedOnly?: boolean;
  email?: string;
}) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/users?select=*,attendees(id, attended, event)`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_SECRET!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_SECRET}`,
      },
      next: {
        revalidate: 0,
      },
    },
  );

  const data: RawData[] = await res.json();

  const mappedData = data.map(
    (user): ReturnData & { email: string; experience: number } => ({
      id: user.id,
      email: user.email,
      verified: user.verified,
      name: user.name,
      company: user.company,
      title: user.title,
      experience: user.experience,
      attended: isUserCheckedIn(eventId, user),
      isGuest: user.isGuest,
    }),
  );

  const attendedOnlyData = mappedData.filter(user => user.attended);

  if (email) {
    const _email = email.toLowerCase();
    const emailFilteredData = (
      attendedOnly ? attendedOnlyData : mappedData
    ).filter(user => user.email.toLowerCase().includes(_email));
    return {
      data: emailFilteredData.map(getPublicData),
      count: emailFilteredData.length,
      total: data.length,
    };
  }

  if (attendedOnly) {
    return {
      data: attendedOnlyData.map(getPublicData),
      count: attendedOnlyData.length,
      total: data.length,
    };
  }

  return {
    data: mappedData.map(getPublicData),
    count: mappedData.length,
    total: data.length,
  };
}
