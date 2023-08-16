import Link from 'next/link';
import Layout from '@components/layout';
import {
  getAllSponsors,
  getHeaderContent,
  getMainPageContent,
} from '@lib/cms-api';
import { HOUR } from '@lib/constants';
import { PropsWithChildren } from 'react';
import { HeroButton } from '../../components/hero-button/primary';
import { GalleryItem } from '../../components/gallery-item';
import VideoPlayer from '../../components/video-player';
import { Agenda } from './agenda';
import SpeakerSection from './speakers';
import { Location } from './location/location';
import BenefitsSection from './benefits';
import SponsorsGrid from './sponsor-grid/sponsors-grid';
import CommunityPartnersSection from './community-partners';

function LandingHeader({
  children,
  ...props
}: PropsWithChildren<Parameters<typeof Layout>[0]>) {
  return <Layout {...props}>{children}</Layout>;
}

async function LandingContent() {
  const content = await getMainPageContent({ revalidate: HOUR });
  const sponsors = await getAllSponsors({ revalidate: HOUR });
  const { buttons: headerButtons, speakerSignUp } = await getHeaderContent({
    revalidate: HOUR,
  });

  return (
    <main className="flex flex-col items-center">
      <div
        className="w-[100vw] h-[100vh] fixed top-0 left-0 right-0 bottom-0 -z-10 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1523215713844-973398580b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      />
      <VideoPlayer content={content}>
        <div className="w-screen bg-black/[.6] h-[52px] sm:h-[68px] fixed top-0 z-20"></div>
        <LandingHeader
          speakerSignUpLink={speakerSignUp}
          headerButtons={headerButtons.sort((a, b) =>
            b.variant.localeCompare(a.variant),
          )}
          className="max-w-screen-2xl bg-transparent left-1/2 -translate-x-1/2 z-20"
          noHeader
        >
          <div className="w-full pt-[4.5rem] z-10 md:flex-row max-w-screen-xl sm:m-auto sm:min-h-[50rem]">
            <div className="flex-col self-start w-full space-y-2 justify-center">
              <div className="w-full pb-6">
                <img
                  className="w-[180px] sm:w-[200px] mx-auto object-contain"
                  src={'/reactcairopoweredbymoweex1linwwhite.png'}
                  alt="logo"
                />
              </div>
              <div className="w-fit mx-auto px-2">
                <Location location={content.location} />
              </div>
              <div className="max-w-screen-md mx-auto">
                <h1 className="text-2xl lg:text-5xl text-center font-extrabold tracking-widest sm:tracking-normal px-4">
                  {content.mainTitle}
                </h1>
                <h2 className="text-base sm:text-base lg:text-lg tracking-wide font-normal text-center  mb-6 md:mb-0 leading-6 md:leading-8 sm:pt-6 px-4">
                  {content.description}
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row-reverse w-full space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse items-center justify-center pt-2 pb-4 sm:pb-0">
                {content.buttons
                  .sort((a, b) => a.variant.localeCompare(b.variant))
                  .map(({ funcType, title, variant, disabled, ...props }) => (
                    <HeroButton
                      key={title}
                      funcType={funcType}
                      title={title}
                      variant={variant}
                      speakerSignUpLink={content.speakerSignUp}
                      className={`w-[280px] md:h-14`}
                      textClassName="md:text-lg md:font-extrabold"
                      disabled={disabled}
                      {...props}
                    />
                  ))}
              </div>
            </div>
          </div>
        </LandingHeader>
      </VideoPlayer>
      <BenefitsSection />
      <SpeakerSection speakerSignUp={speakerSignUp} />
      <div className="max-w-[1980px] relative mx-auto px-2 md:px-8">
        <section className="flex flex-col sm:flex-row sm:flex-wrap bg-opacity-30 bg-black items-start justify-center content-start">
          {content.gallery.map(galleryItem => (
            <GalleryItem key={galleryItem.id} galleryItem={galleryItem} />
          ))}
        </section>
      </div>
      <Agenda />
      {sponsors.length > 0 && (
        <section className="flex flex-col items-center w-full bg-opacity-30 bg-black pt-10 pb-10">
          <h3 className="text-2xl md:text-4xl uppercase font-extrabold tracking-[0.2em]">
            sponsored by
          </h3>
          <SponsorsGrid sponsors={sponsors} />
          <Link
            href="/become-sponsor"
            className="transition-all flex h-14 md:h-16 px-6 md:px-12 cursor-pointer -mt-4 md:mt-0 border-2 rounded-full md:opacity-80 md:hover:opacity-100 md:hover:scale-105"
          >
            <span className="text-lg md:text-4xl tracking-wide font-medium uppercase text-brand-200 m-auto">
              become a sponsor
            </span>
          </Link>
        </section>
      )}
      <CommunityPartnersSection />
    </main>
  );
}

export default async function Landing() {
  return <LandingContent />;
}
