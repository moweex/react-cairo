import Link from 'next/link';
import { GoogleLocation } from '@lib/types';
import { HTMLAttributes } from 'react';
import DateComponent from './date/date';

export const Location = (
  props: { location?: GoogleLocation } & HTMLAttributes<
    HTMLAnchorElement | HTMLDivElement
  >,
) => {
  const { location, ...rest } = props;

  const isLocation = location?.url !== undefined;
  const commonClassName = 'flex w-full';

  if (!location) return null;

  if (isLocation) {
    return (
      <Link
        href={location.url ?? ''}
        target="_blank"
        className={`${commonClassName}`}
        {...rest}
      >
        <div className="flex flex-col mx-auto group">
          <span className="text-xl md:text-2xl font-semibold text-center text-white uppercase underline sm:no-underline	 md:group-hover:underline">
            {location.name}
          </span>
          <p
            className="text-lg text-white flex uppercase justify-center h-12"
            {...rest}
          >
            <DateComponent
              date={location.date}
              format="do MMMM yyyy @h:mm aa"
            />
          </p>
        </div>
      </Link>
    );
  }

  return (
    <h4 className={`${commonClassName}`} {...rest}>
      <div className="flex flex-col mx-auto group">
        <span className="text-xl md:text-2xl font-semibold text-center text-white uppercase underline sm:no-underline	 md:group-hover:underline">
          {location.name}
        </span>
        <p
          className="text-lg text-white flex uppercase justify-center h-12"
          {...rest}
        >
          <DateComponent date={location.date} format="do MMMM yyyy @h:mm aa" />
        </p>
      </div>
    </h4>
  );
};
