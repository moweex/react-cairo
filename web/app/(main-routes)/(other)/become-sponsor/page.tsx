import Link from 'next/link';
import { getSponsorshipPlans } from '@lib/cms-providers/dato';
import { HOUR } from '@lib/constants';

type Props = {};
export default async function BecomeSponsor({}: Props) {
  const tiers = await getSponsorshipPlans({ revalidate: HOUR });
  return (
    <div className="flex flex-col items-center w-full bg-transparent pt-[82px] z-10 pb-10 my-auto">
      <h3 className="text-2xl md:text-4xl uppercase font-extrabold text-center tracking-[0.2em]">
        become a sponsor
      </h3>
      <section className="flex flex-col-reverse lg:flex-row space-y-4 space-y-reverse lg:space-y-0 space-x-0 lg:space-x-6 mt-12 px-4">
        {tiers
          .sort((a, b) => a.price - b.price)
          .map(tier => (
            <div
              key={tier.id}
              className="text-center justify-items-center bg-opacity-20 border-2 border-white rounded-xl flex flex-col justify-between py-4 max-w-[22rem] sm:min-w-[20rem] min-h-[30rem]"
              style={{
                borderColor: tier.color,
                backgroundColor: tier.color + '1A',
              }}
            >
              <h2
                className="text-3xl uppercase font-bold tracking-widest"
                style={{
                  color: tier.color,
                }}
              >
                {tier.name}
              </h2>
              <ul className="my-12 px-8 flex flex-col text-left flex-1 space-y-2">
                {tier.perks.map(perk => (
                  <li key={perk.id} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>{perk.value}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col space-y-2">
                <span
                  className="text-lg font-extrabold"
                  style={{
                    color: tier.color,
                  }}
                >{`${tier.price} ${tier.currency}`}</span>
                <Link
                  href={tier.url}
                  target="_blank"
                  className="flex h-12 px-6 w-fit bg-brand-300 border-none md:bg-transparent md:hover:bg-brand-300 rounded-md border-slate-500 self-center md:border-solid border-[1px] md:opacity-80 md:hover:opacity-100 group"
                >
                  <span className="text-sm font-bold uppercase text-white m-auto">
                    Become a Sponsor
                  </span>
                </Link>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
}
