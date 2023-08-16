import Link from 'next/link';
import { URL_KEYS } from '@lib/constants';
import { GalleryImage } from '@lib/types';
import Image from 'next/image';
import classes from './styles.module.css';

type Props = {
  galleryItem: GalleryImage;
};

export const GalleryItem = ({ galleryItem }: Props) => {
  const linkKeys = Object.keys(galleryItem.customData ?? {}).filter(key =>
    URL_KEYS.includes(key),
  );
  const isClickable = linkKeys.length > 0;
  const keyToAccess = linkKeys[0];

  const href =
    isClickable && galleryItem.customData
      ? galleryItem.customData[keyToAccess]
      : undefined;

  const className = (() => {
    if (!galleryItem.customData?.cols) return classes.quarter;
    switch (Number(galleryItem.customData.cols)) {
      case 1:
      case 4:
        return classes.full;
      case 2:
        return classes.half;
      case 3:
      default:
        return classes.quarter;
    }
  })();

  return (
    <div
      className={`relative transition-all group ${
        isClickable ? 'md:hover:scale-105 md:hover:z-20' : ''
      } ${className}`}
      style={{ height: 'calc((100vh / 2.8) - 10px)', minHeight: '200px' }}
    >
      <Image
        className="h-full w-full object-cover object-center"
        src={galleryItem.url}
        alt={galleryItem.alt}
        width={galleryItem.width}
        height={galleryItem.height}
        loading="lazy"
      />
      {href && (
        <Link
          href={href}
          className="md:hidden group-hover:block absolute w-full h-full cursor-pointer top-0 bg-black bg-opacity-25"
        >
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white uppercase text-2xl font-extrabold">
            {keyToAccess}
          </p>
        </Link>
      )}
    </div>
  );
};
