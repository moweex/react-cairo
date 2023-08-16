import SponsorsGrid from '@components/sponsors-grid';
import { getAllCommunityPartners } from '@lib/cms-providers/dato';
import { HOUR } from '@lib/constants';
import Image from 'next/image';

export default async function CommunityPartnersSection() {
  const partners = await getAllCommunityPartners({ revalidate: HOUR });

  if (partners.length === 0) return null;

  return (
    <section className="flex flex-col items-center w-full bg-opacity-30 bg-black pt-10 pb-10">
      <h3 className="text-2xl md:text-4xl uppercase font-extrabold tracking-[0.2em]">
        Community Partners
      </h3>
      <div className="mt-10 flex flex-col sm:flex-row sm:space-x-24 space-y-8 sm:space-y-0 items-center">
        {partners.map(partner => (
          <a key={partner.id} href={partner.url} target="_blank">
            <Image
              alt={partner.name}
              src={partner.logo}
              className="w-[180px] sm:w-[240px]"
              loading="lazy"
              title={partner.name}
              width={900}
              height={500}
            />
          </a>
        ))}
      </div>
    </section>
  );
}
