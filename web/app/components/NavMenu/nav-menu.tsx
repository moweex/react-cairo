'use client';

import { useEffect, useRef, useState } from 'react';
import { BurgerIcon } from 'app/icons/burger';
import { NAVIGATION } from '@lib/constants';
import NavItem from '@components/nav-item';
import { useClickAway } from 'app/hooks';

import IconTwitter from 'app/icons/icon-twitter';
import IconLinkedin from 'app/icons/icon-linkedin';
import IconYoutube from 'app/icons/icon-youtube';
import IconFacebook from 'app/icons/icon-facebook';
import IconMeetup from 'app/icons/icon-meetup';
import useAsync from 'app/hooks/useAsync';
import { getSocialLinks, getHeaderContent } from '@lib/cms-providers/dato';
import { OverlayContainer } from '@react-aria/overlays';
import { ModalDialog } from '@components/mobile-menu';
import { HeroButton } from '../hero-button/primary';
import Link from 'next/link';

type Social = 'twitter' | 'linkedin' | 'youtube' | 'facebook' | 'meetup';

export const SocialIcon = ({ type }: { type: Social }): JSX.Element => {
  switch (type) {
    case 'twitter':
      return <IconTwitter aria-label={type} />;
    case 'linkedin':
      return <IconLinkedin aria-label={type} />;
    case 'facebook':
      return <IconFacebook aria-label={type} />;
    case 'youtube':
      return <IconYoutube aria-label={type} />;
    case 'meetup':
      return <IconMeetup aria-label={type} />;
  }
};

type Props = {
  href: string;
  type: Social;
  className?: string;
};

export const SocialMediaLink = ({
  href,
  type,
  className = 'w-12 h-12 md:w-8 md:h-8 text-black',
}: Props) => {
  return (
    <li className={className}>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-300"
      >
        <SocialIcon type={type} />
      </Link>
    </li>
  );
};

export default function NavMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const mainDiv = useRef<HTMLDivElement>(null);
  const isOverlayActive = mainDiv.current?.offsetParent === null;

  // disable click away if overlay is active
  useClickAway(ref, () => setOpen(false), isOverlayActive);

  const { data: socials, runAsync: runGetSocials } = useAsync<
    Awaited<ReturnType<typeof getSocialLinks>>
  >({
    keepPreviousDataOnLoad: true,
  });

  const { data: headerContent, runAsync: runGetHeader } = useAsync<
    Awaited<ReturnType<typeof getHeaderContent>>
  >({
    keepPreviousDataOnLoad: true,
  });

  useEffect(() => {
    runGetSocials(getSocialLinks());
    runGetHeader(getHeaderContent());
  }, [runGetSocials, runGetHeader]);

  return (
    <div ref={ref} className="relative">
      <BurgerIcon open={open} onClick={() => setOpen(p => !p)} />
      <div
        aria-label="dropdown menu"
        ref={mainDiv}
        className={`hidden md:block transition-opacity duration-300 ${
          open ? 'translate-y-0 opacity-100' : '-translate-y-[750px] opacity-0'
        } absolute top-11 -right-[1px] w-[220px]`}
      >
        <div
          onClickCapture={() => setOpen(false)}
          aria-label="dropdown container"
          className="p-4 rounded-md bg-black/[.7] transition-all opacity-100 duration-300"
        >
          <nav>
            <div
              aria-label="website navigation links"
              className="flex flex-col py-2 text-white space-y-8"
            >
              {NAVIGATION.map(({ name, route }) => (
                <NavItem key={name} name={name} route={route} />
              ))}
            </div>
            <ul
              aria-label="social media list"
              className="flex space-x-2 w-full mt-8"
            >
              {socials?.map(({ type, href }) => (
                <SocialMediaLink key={type} type={type} href={href} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
      {open && (
        <OverlayContainer onClick={() => setOpen(false)}>
          <ModalDialog
            isOpen={open}
            onClose={() => setOpen(false)}
            renderHero={() => {
              return (
                <div className="-mt-12 mb-8 w-64 flex flex-col space-y-4">
                  {headerContent?.buttons.map(props => (
                    <HeroButton
                      key={props.title}
                      className="focus:outline-none"
                      {...props}
                      speakerSignUpLink={headerContent?.speakerSignUp}
                    />
                  ))}
                </div>
              );
            }}
          >
            <ul
              aria-label="social media list"
              className="flex justify-evenly w-full px-2 space-x-4 mt-4"
            >
              {socials?.map(({ type, href }) => (
                <SocialMediaLink key={type} type={type} href={href} />
              ))}
            </ul>
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
}
