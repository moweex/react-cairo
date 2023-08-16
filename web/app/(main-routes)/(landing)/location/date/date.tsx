'use client';

import { DateSkelton } from './skelton';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const DateComponent = ({
  date,
  format: formatting,
}: {
  date: string;
  format: string;
}) => {
  return <>{format(new Date(date), formatting)}</>;
};

export default dynamic(() => Promise.resolve(DateComponent), {
  ssr: false,
  // eslint-disable-next-line react/display-name
  loading: () => <DateSkelton />,
});
