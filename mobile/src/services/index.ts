import { API_URL } from '../constants';

export const checkUserIn = async (
  id: string,
): Promise<'attended' | 'success' | 'fail'> => {
  try {
    const response = await fetch(`${API_URL}/api/users/attend`, {
      method: 'POST',
      body: JSON.stringify({
        userId: id,
      }),
    });
    switch (response.status) {
      case 200:
        return 'success';
      case 409:
        return 'attended';
      default:
        return 'fail';
    }
  } catch (error) {
    return 'fail';
  }
};

const formatFilters = (filters: { [key: string]: string }) => {
  const formattedFilters = Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (value) {
        return `${acc}&${key}=${value}`;
      }
      return acc;
    },
    '',
  );
  return `${formattedFilters ? '?' : ''}${formattedFilters}`;
};

type ReturnData = {
  attendants: Array<{
    id: string;
    verified: boolean;
    name: string;
    company: string;
    title: string;
    attended: boolean;
  }>;
  count: number;
  total: number;
};

export const getAttendees = async ({
  attendOnly,
  email,
}: {
  attendOnly?: boolean;
  email?: string;
}) => {
  try {
    const response = await fetch(
      `${API_URL}/api/attendants${formatFilters({
        attended: attendOnly ? 'true' : '',
        email: email ? email : '',
      })}`,
    );
    const data: ReturnData = await response.json();
    return data;
  } catch (error) {
    return undefined;
  }
};
