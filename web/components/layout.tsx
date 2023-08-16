import { PropsWithChildren } from 'react';
import Link from 'next/link';
import cn from 'classnames';
import NavMenu from 'app/components/NavMenu/nav-menu';
import { HeaderButton, HeroHeader } from 'app/components/hero-button/primary';

type Props = {
  headerButtons: HeaderButton[];
  speakerSignUpLink?: string;
  className?: string;
  noHeader?: boolean;
};

const Header = ({
  children,
  className,
  noHeader,
}: PropsWithChildren<Pick<Props, 'className' | 'noHeader'>>) => {
  return (
    <header
      aria-label="site header"
      className={cn(
        'w-screen h-[68px] fixed top-0 transition-all duration-300 bg-black/[.6] sm:pr-6 z-0',
        className,
      )}
    >
      <div className="flex justify-center">
        <div className="flex w-full md:max-w-container justify-between items-center text-white p-3 2xl:px-4">
          {noHeader ? (
            <div />
          ) : (
            <Link href="/" className="flex items-end gap-2">
              <img
                className="w-[65px] object-contain"
                src={'/logo-white.png'}
                alt="logo"
              />
              <div>
                <p className="m-0 font-bold text-white leading-3 text-sm">
                  React Cairo
                </p>
                <span className="text-white leading-0 text-xs">
                  Powered by moweex
                </span>
              </div>
            </Link>
          )}
          <div className="flex flex-col md:flex-row items-center space-x-4 self-end">
            {children}
            <NavMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default function Layout({
  children,
  headerButtons,
  speakerSignUpLink,
  className,
  noHeader,
}: PropsWithChildren<Props>) {
  return (
    <>
      <Header className={className} noHeader={noHeader}>
        <HeroHeader
          buttons={headerButtons ?? []}
          speakerSignUpLink={speakerSignUpLink}
        />
      </Header>
      {children}
    </>
  );
}
