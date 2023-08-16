import Link from 'next/link';
import { getAllSpeakers } from '@lib/cms-api';
import { HOUR } from '@lib/constants';
import Image from 'next/image';
import { SocialMediaLink } from 'app/components/NavMenu';

type Props = {
  speakerSignUp?: string;
};

export default async function SpeakerSection({ speakerSignUp }: Props) {
  const speakers = await getAllSpeakers({ revalidate: HOUR });

  if (speakers.length === 0) {
    return null;
  }

  return (
    <section
      id="speakers"
      className="flex flex-col items-center w-full bg-black bg-opacity-30 z-0 pt-10 pb-10"
    >
      <h3 className="text-2xl md:text-4xl text-center uppercase font-extrabold tracking-[0.2em]">
        meet our speakers
      </h3>
      <div className="w-full pt-10 pb-10 grid grid-flow-dense grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-4 px-8">
        {speakers.map(speaker => {
          const src = speaker.image?.url ?? speaker.imageUrl;
          if (!src) return null;

          return (
            <div
              key={speaker.id}
              className="rounded-2xl bg-black flex flex-col overflow-hidden relative group"
            >
              <div className="absolute bottom-0 bg-black/70 right-0 left-0">
                <h4 className="text-2xl text-center text-white font-extrabold tracking-wider">
                  {speaker.name}
                </h4>
                <p className="text-lg text-center text-white">
                  {speaker.title}{' '}
                  {speaker.company && (
                    <>
                      @
                      <span className="text-brand-200 font-bold">
                        {speaker.company}
                      </span>
                    </>
                  )}
                </p>
              </div>
              <ul className="transition-all right-2 sm:-right-20 absolute top-0 sm:group-hover:right-2 bottom-0 flex flex-col space-y-6 justify-center">
                {speaker.twitter && (
                  <SocialMediaLink
                    key={`${speaker.id}-twitter`}
                    type="twitter"
                    href={speaker.twitter}
                    className="w-14 h-14 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-black rounded-2xl"
                  />
                )}
                {speaker.linkedin && (
                  <SocialMediaLink
                    key={`${speaker.id}-linkedin`}
                    type="linkedin"
                    href={speaker.linkedin}
                    className="w-14 h-14 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-black rounded-2xl"
                  />
                )}
              </ul>
              <Image
                alt={speaker.name}
                src={src}
                className="rounded-2xl w-full h-full object-cover"
                loading="lazy"
                title={speaker.name}
                placeholder={speaker.image?.blurDataURL ? 'blur' : 'empty'}
                blurDataURL={speaker.image?.blurDataURL}
                width={speaker.image?.responsiveImage.width ?? 1024}
                height={speaker.image?.responsiveImage.height ?? 1006}
              />
            </div>
          );
        })}
      </div>
      {speakerSignUp && (
        <Link
          href={speakerSignUp}
          className="transition-all flex h-14 md:h-16 px-6 md:px-12 cursor-pointer -mt-4 md:mt-0 border-2 rounded-full md:opacity-80 md:hover:opacity-100 md:hover:scale-105"
        >
          <span className="text-lg md:text-4xl tracking-wide font-medium uppercase text-brand-200 m-auto">
            join our speakers
          </span>
        </Link>
      )}
    </section>
  );
}
