import { ALL_NAVIGATION } from '@lib/constants';

export default async function sitemap() {
  const URL = process.env.NEXT_PUBLIC_SITE_ORIGIN || 'https://react-cairo.com';

  const pages = ALL_NAVIGATION.map(page => {
    return {
      url: `${URL}${page.route}`,
      lastModified: new Date().toISOString(),
    };
  });

  return pages;
}
