import { getMainPageContent } from '@lib/cms-api';
import { HOUR } from '@lib/constants';
import NavMenu from 'app/components/NavMenu/nav-menu';
import { HeroHeader } from 'app/components/hero-button/primary';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

export default async function SubLayout({ children }: PropsWithChildren) {
  const content = await getMainPageContent({ revalidate: HOUR });

  return (
    <>
      <header
        aria-label="site header"
        className="w-screen h-[68px] fixed top-0 z-20 transition-all duration-300 bg-black/[.6] sm:pr-6"
      >
        <div className="flex justify-center">
          <div className="flex w-full md:max-w-container justify-between items-center text-white p-3 2xl:px-4">
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
            <div className="flex flex-col md:flex-row items-center space-x-4">
              <HeroHeader speakerSignUpLink={content.speakerSignUp} />
              <NavMenu />
            </div>
          </div>
        </div>
      </header>
      <div
        className="w-[100vw] h-[100vh] fixed top-0 left-0 right-0 bottom-0 z-0 bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1523215713844-973398580b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        }}
      />
      {children}
    </>
  );
}
