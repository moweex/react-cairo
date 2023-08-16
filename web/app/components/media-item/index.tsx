import Link from 'next/link';
import Image from 'next/image';
import { URL_KEYS } from '@lib/constants';
import { GalleryImage, GalleryItem, GalleryVideo } from '@lib/types';

type Props = {
  galleryItem: GalleryItem;
};

const GalleryImage = ({ galleryItem }: { galleryItem: GalleryImage }) => {
  const isClickable =
    Object.keys(galleryItem.customData ?? {}).filter(key =>
      URL_KEYS.includes(key),
    ).length > 0;
  const keyToAccess = Object.keys(galleryItem.customData ?? {})[0];
  const href =
    isClickable && galleryItem.customData
      ? galleryItem.customData[keyToAccess]
      : undefined;
  return (
    <div
      className={`relative transition-all group grid ${
        isClickable ? 'md:hover:scale-105' : ''
      }`}
      style={{
        gridRowEnd: galleryItem.customData?.rows
          ? `span ${galleryItem.customData.rows}`
          : undefined,
        gridColumnEnd: galleryItem.customData?.cols
          ? `span ${galleryItem.customData.cols}`
          : undefined,
      }}
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

const GalleryVideo = ({ galleryItem }: { galleryItem: GalleryVideo }) => {
  const videoId = galleryItem.url.split('v=')[1];
  return (
    <div className={`relative transition-all group grid`}>
      <iframe
        src={'https://www.youtube.com/embed/' + videoId}
        title={galleryItem.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full h-full sm:min-h-[22rem] object-cover object-center"
      />
    </div>
  );
};

export const MediaItem = ({ galleryItem }: Props) => {
  switch (galleryItem.type) {
    case 'image':
      return <GalleryImage galleryItem={galleryItem} />;
    case 'video':
      return <GalleryVideo galleryItem={galleryItem} />;
  }
};
