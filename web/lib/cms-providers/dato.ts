/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {
  Job,
  Sponsor,
  Stage,
  Speaker,
  SiteMode,
  MainPageContent,
  AgendaItem,
  GalleryItem,
  SponsorTier,
  BenefitsSection,
  GalleryImage,
  CommunityPartner,
} from '@lib/types';
import { fetchAllUsers } from 'app/(main-routes)/webhooks/cleanup-users/route';
import { HeaderButton } from 'app/components/hero-button/primary';
export type DefaultProps = RequestInit['next'];

const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN =
  process.env.DATOCMS_READ_ONLY_API_TOKEN ||
  process.env.NEXT_PUBLIC_DATOCMS_READ_ONLY_API_TOKEN;

async function fetchCmsAPI(
  query: string,
  {
    variables,
    next,
  }: { variables?: Record<string, any>; next?: DefaultProps } = {},
) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
      'X-Environment':
        process.env.DATOCMS_ENVIRONMENT ||
        process.env.NEXT_PUBLIC_DATOCMS_ENVIRONMENT ||
        '',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next,
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllSpeakers(
  extraParams?: DefaultProps,
): Promise<Speaker[]> {
  const data = await fetchCmsAPI(
    `
     {
       allSpeakers(first: 100) {
         name
         bio
         title
         slug
         twitter
         linkedin
         company
         talk {
           title
           description
         }
         image {
           url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
           blurDataURL: blurUpThumb
           responsiveImage {
            height
            width
          }
         }
         imageUrl
         imageSquare: image {
           url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
           blurDataURL: blurUpThumb
         }
       }
     }
   `,
    { next: extraParams },
  );

  return data.allSpeakers;
}

/**
 * @deprecated don't use this plz
 */
export async function getAllStages(
  extraParams?: DefaultProps,
): Promise<Stage[]> {
  const data = await fetchCmsAPI(
    `
     {
       allStages(first: 100, orderBy: order_ASC) {
         name
         slug
         stream
         discord
         isLive
         roomId
         schedule {
           title
           start
           end
           speaker {
             name
             slug
             image {
               url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
               blurDataURL: blurUpThumb
             }
           }
         }
       }
     }
   `,
    { next: extraParams },
  );

  return data.allStages;
}

export async function getAllSponsors(
  extraParams?: DefaultProps,
): Promise<Sponsor[]> {
  const data = await fetchCmsAPI(
    `
    {
      allCompanies(first: 100, orderBy: tierRank_ASC) {
        name
        description
        website
        callToAction
        callToActionLink
        tier
        links {
          url
          text
        }
        logo {
          url
          responsiveImage {
            height
            width
            alt
          }
        }
      }
    }
   `,
    { next: extraParams },
  );

  return data.allCompanies.map(
    (sponsor: any): Sponsor => ({
      name: sponsor.name,
      description: sponsor.description,
      website: sponsor.website,
      callToAction: sponsor.callToAction,
      callToActionLink: sponsor.callToActionLink,
      tier: sponsor.tier,
      links: sponsor.links,
      logo: {
        url: sponsor.logo.url,
        blurDataURL: sponsor.logo.blurUpThumb,
        responsiveImage: {
          height: sponsor.logo.responsiveImage.height,
          width: sponsor.logo.responsiveImage.width,
        },
      },
    }),
  );
}

export async function getAllCommunityPartners(
  extraParams?: DefaultProps,
): Promise<CommunityPartner[]> {
  const data: {
    partnerSection: {
      communityPartners: Array<{
        id: string;
        name: string;
        url: string;
        logo: {
          url: string;
        };
      }>;
    };
  } = await fetchCmsAPI(
    `
    {
      partnerSection {
        communityPartners {
          id
          name
          url
          logo {
            url
          }
        }
      }
    }
   `,
    { next: extraParams },
  );

  return data.partnerSection.communityPartners.map(partner => ({
    id: partner.id,
    name: partner.name,
    url: partner.url,
    logo: partner.logo.url,
  }));
}

export async function getAllJobs(extraParams?: DefaultProps): Promise<Job[]> {
  const data = await fetchCmsAPI(
    `
     {
       allJobs(first: 100, orderBy: rank_ASC) {
         id
         companyName
         title
         description
         discord
         link
         rank
       }
     }
   `,
    { next: extraParams },
  );

  return data.allJobs;
}

export async function isRegistrationAllowed(
  extraParams?: DefaultProps,
): Promise<boolean> {
  const data = await fetchCmsAPI(
    `
     {
      siteMode {
        maxAttendee
      }
     }
   `,
    { next: extraParams },
  );

  const maxAttendee = data.siteMode.maxAttendee;
  const users = await fetchAllUsers();

  if (!users) return false;

  return users.length < maxAttendee;
}

export async function getSiteMode(
  extraParams?: DefaultProps,
): Promise<{ siteMode: SiteMode; eventName: string; date: string }> {
  const data = await fetchCmsAPI(
    `
     {
      siteMode {
        siteMode
        eventName
      }
      mainPageContent {
        eventDate
      }
     }
   `,
    { next: extraParams },
  );

  return {
    siteMode: data.siteMode.siteMode,
    eventName: data.siteMode.eventName,
    date: data.mainPageContent.eventDate,
  };
}

type SocialLink = {
  href: string;
  type: 'twitter' | 'linkedin' | 'youtube' | 'facebook' | 'meetup';
};
export async function getSocialLinks(
  extraParams?: DefaultProps,
): Promise<SocialLink[]> {
  const data = await fetchCmsAPI(
    `
     {
      social {
        linkedin
        twitter
        youtube
        facebook
        meetup
      }
     }
   `,
    { next: extraParams },
  );

  const socialLinks: SocialLink[] = [];

  if (data.social.linkedin.length > 0) {
    socialLinks.push({ href: data.social.linkedin, type: 'linkedin' });
  }

  if (data.social.twitter.length > 0) {
    socialLinks.push({ href: data.social.twitter, type: 'twitter' });
  }

  if (data.social.youtube.length > 0) {
    socialLinks.push({ href: data.social.youtube, type: 'youtube' });
  }

  if (data.social.facebook.length > 0) {
    socialLinks.push({ href: data.social.facebook, type: 'facebook' });
  }

  if (data.social.meetup.length > 0) {
    socialLinks.push({ href: data.social.meetup, type: 'meetup' });
  }

  return socialLinks;
}

export async function getMainPageContent(
  extraParams?: DefaultProps,
): Promise<MainPageContent> {
  const data = await fetchCmsAPI(
    `
     {
      header {
        speakerSignup
      }
      mainPageContent {
        mainTitle
        location {
          latitude
          longitude
        }
        locationDisplayName
        eventDate
        buttons {
          funcType
          id
          style
          title
          disabled
        }
        description
        gallery {
          id
          url
          title
          alt
          responsiveImage {
            height
            width
            alt
          }
          customData
        }
        videoUrl
        seoKeywords
      }
     }
   `,
    { next: extraParams },
  );

  const location = data.mainPageContent.locationDisplayName
    ? {
        lat: data.mainPageContent.location?.latitude,
        lng: data.mainPageContent.location?.longitude,
        name: data.mainPageContent.locationDisplayName,
        url:
          data.mainPageContent.location?.longitude &&
          data.mainPageContent.location?.latitude
            ? `https://www.google.com/maps/place/${data.mainPageContent.location.latitude},${data.mainPageContent.location.longitude}`
            : undefined,
        date: data.mainPageContent.eventDate,
      }
    : undefined;

  const buttons: HeaderButton[] = data.mainPageContent.buttons.map(
    (button: {
      id: string;
      style: HeaderButton['variant'];
      title: string;
      funcType: HeaderButton['funcType'];
      disabled: boolean;
    }): HeaderButton => ({
      variant: button.style,
      title: button.title,
      funcType: button.funcType,
      disabled: button.disabled,
    }),
  );

  return {
    mainTitle: data.mainPageContent.mainTitle,
    location,
    buttons,
    speakerSignUp: data.header.speakerSignup,
    description: data.mainPageContent.description,
    gallery: data.mainPageContent.gallery.map(
      (image: {
        url: string;
        id: string;
        responsiveImage: { height: number; width: number; alt: string };
        customData?: { [key: string]: string };
      }): GalleryImage => ({
        id: image.id,
        url: image.url,
        alt: image.responsiveImage.alt,
        customData: image.customData,
        height: image.responsiveImage.height,
        width: image.responsiveImage.width,
        type: 'image',
      }),
    ),
    videoURL: data.mainPageContent.videoUrl,
    keywords: data.mainPageContent.seoKeywords,
  };
}

export async function getSponsorshipPlans(
  extraParams?: DefaultProps,
): Promise<SponsorTier[]> {
  const data = await fetchCmsAPI(
    `
      {
        allSponsorships {
          url
          price
          name
          id
          currencySymbol
          color {
            hex
          }
          benefits {
            id
            desc
          }
        }
      }
    `,
    { next: extraParams },
  );

  return data.allSponsorships.map(
    (item: {
      id: string;
      name: string;
      price: number;
      currencySymbol: string;
      color: {
        hex: string;
      };
      benefits: {
        id: string;
        desc: string;
      }[];
      url: string;
    }): SponsorTier => ({
      id: item.id,
      name: item.name,
      price: item.price,
      currency: item.currencySymbol,
      color: item.color.hex,
      perks: item.benefits.map(benefit => ({
        id: benefit.id,
        value: benefit.desc,
      })),
      url: item.url,
    }),
  );
}

export async function getHeaderContent(
  extraParams?: DefaultProps,
): Promise<{ buttons: HeaderButton[]; speakerSignUp?: string }> {
  const data = await fetchCmsAPI(
    `
     {
      header {
        headerButtons {
          style
          title
          funcType
        }
        speakerSignup
      }
     }
   `,
    { next: extraParams },
  );

  const buttons: HeaderButton[] = data.header.headerButtons.map(
    (button: {
      id: string;
      style: HeaderButton['variant'];
      title: string;
      funcType: HeaderButton['funcType'];
      disabled: boolean;
    }): HeaderButton => ({
      variant: button.style,
      title: button.title,
      funcType: button.funcType,
      disabled: button.disabled,
    }),
  );

  return { buttons, speakerSignUp: data.header.speakerSignup };
}

export async function getAgenda(
  extraParams?: DefaultProps,
): Promise<AgendaItem[]> {
  const data = await fetchCmsAPI(
    `
     {
      allTalks {
        title
        start
        end
        id
        speaker {
          name
          slug
          title
          id
          image {
            url
            blurUpThumb
            responsiveImage {
              height
              width
            }
          }
        }
      }
     }
   `,
    { next: extraParams },
  );

  const agenda: AgendaItem[] = data.allTalks.map(
    (item: any): AgendaItem => ({
      id: item.id,
      title: item.title,
      start: item.start,
      end: item.end,
      speakers: item.speaker.map(
        (speaker: any): AgendaItem['speakers'][number] => ({
          id: speaker.id,
          name: speaker.name,
          slug: speaker.slug,
          title: speaker.title,
          image: {
            url: speaker.image?.url,
            blurDataURL: speaker.image?.blurUpThumb,
            responsiveImage: {
              height: speaker.image?.responsiveImage.height,
              width: speaker.image?.responsiveImage.width,
            },
          },
        }),
      ),
    }),
  );

  return agenda.sort((a, b) =>
    new Date(a.start) > new Date(b.start) ? 1 : -1,
  );
}

export async function getMedia(extraParams?: DefaultProps): Promise<
  Array<{
    title: string;
    id: string;
    description?: string;
    content: GalleryItem[];
  }>
> {
  const data = await fetchCmsAPI(
    `
     {
      allGalleries {
        id
        title
        description
        content {
          image {
            url
            id
            responsiveImage {
              width
              height
              alt
            }
          }
          video {
            url
            width
            title
            height
            thumbnailUrl
            provider
          }
        }
      }
     }
   `,
    { next: extraParams },
  );

  return data.allGalleries.map(
    (gallery: {
      id: string;
      title: string;
      description: string;
      content: {
        image?: {
          url: string;
          id: string;
          responsiveImage: { height: number; width: number; alt: string };
        };
        video?: {
          url: string;
          width: number;
          title: string;
          height: number;
          thumbnailUrl: string;
          provider: string;
        };
      }[];
    }): {
      title: string;
      id: string;
      description?: string;
      content: GalleryItem[];
    } => ({
      id: gallery.id,
      title: gallery.title,
      description: gallery.description,
      content: gallery.content.map((image): GalleryItem => {
        if (image.image) {
          return {
            id: image.image.id,
            url: image.image.url,
            alt: image.image.responsiveImage.alt,
            height: image.image.responsiveImage.height,
            width: image.image.responsiveImage.width,
            type: 'image',
          };
        }
        return {
          url: image.video!.url,
          thumbnailUrl: image.video!.thumbnailUrl,
          title: image.video!.title,
          height: image.video!.height,
          width: image.video!.width,
          type: 'video',
        };
      }),
    }),
  );
}

export async function getMetaContent(
  extraParams?: DefaultProps,
): Promise<{ title: string; keywords?: string; description: string }> {
  const data = await fetchCmsAPI(
    `
     {
      mainPageContent {
        seoTitle
        seoKeywords
        seoDescription
      }
     }
   `,
    { next: extraParams },
  );

  return {
    title: data.mainPageContent.seoTitle,
    keywords: data.mainPageContent.seoKeywords,
    description: data.mainPageContent.seoDescription,
  };
}

export async function getBenefitsSection(
  extraParams?: DefaultProps,
): Promise<BenefitsSection> {
  const data = await fetchCmsAPI(
    `
     {
      benefitsSection {
        header
        secondaryHeader
        benefits {
          id
          title
          description
          iconName
        }
      }
     }
   `,
    { next: extraParams },
  );

  return {
    header: data.benefitsSection.header,
    secondaryHeader: data.benefitsSection.secondaryHeader,
    benefits: data.benefitsSection.benefits.map(
      (benefit: {
        id: string;
        title: string;
        description: string;
        iconName: BenefitsSection['benefits'][number]['icon'];
      }): BenefitsSection['benefits'][number] => ({
        id: benefit.id,
        title: benefit.title,
        description: benefit.description,
        icon: benefit.iconName,
      }),
    ),
  };
}
