import '@styles/global.css';
import '@styles/nprogress.css';
import '@styles/chrome-bug.css';

import { PropsWithChildren } from 'react';

import { Metadata } from 'next';
import Footer from '@components/footer';
import Analytics from 'app/components/analytics';
import { HOUR } from '@lib/constants';
import { getMetaContent } from '@lib/cms-providers/dato';
import { Roboto } from 'next/font/google';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMetaContent({ revalidate: HOUR });

  return {
    title: content.title,
    applicationName: content.title,
    authors: [{ name: 'Moweex', url: 'https://moweex.com' }],
    generator: 'Vercel - virtual-event-starter-kit',
    description: content.description,
    keywords: content.keywords,
    creator: 'Moweex',
    publisher: 'Moweex',
    robots: 'index,follow',
    openGraph: {
      type: 'website',
      url: 'https://www.react-cairo.com/',
      title: content.title,
      description: content.description,
      siteName: content.title,
      locale: 'en',
    },
    twitter: {
      title: content.title,
      description: content.description,
      card: 'summary_large_image',
      site: '@reactcairo',
      creator: '@moweex',
      images: [
        {
          url: 'https://moweex.react-cairo.com/hero-img.jpeg',
        },
      ],
    },
  };
}

const roboto = Roboto({
  weight: ['400', '900'],
  subsets: ['latin'],
});

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <Analytics />
      <body className={roboto.className}>
        <div className="min-h-screen flex flex-col justify-between">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
