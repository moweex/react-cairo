import { getBenefitsSection } from '@lib/cms-providers/dato';
import { HOUR } from '@lib/constants';
import { BenefitsSection } from '@lib/types';
import { IconProps } from 'app/icons/common';
import { ExposureIcon } from 'app/icons/exposure';
import { LearningIcon } from 'app/icons/learning';
import { NetworkingIcon } from 'app/icons/networking';
import { PracticesIcon } from 'app/icons/practices';

const Icon = ({
  icon,
  ...props
}: { icon: BenefitsSection['benefits'][number]['icon'] } & IconProps) => {
  switch (icon) {
    case 'learning':
      return <LearningIcon {...props} />;
    case 'exposure':
      return <ExposureIcon {...props} />;
    case 'practices':
      return <PracticesIcon {...props} />;
    case 'networking':
      return <NetworkingIcon {...props} />;
  }
};

export default async function BenefitsSection() {
  const content = await getBenefitsSection({ revalidate: 24 * HOUR });
  return (
    <section className="flex flex-col items-center w-full bg-black bg-opacity-30 z-0 py-16 px-4 space-y-4 sm:space-y-2">
      <h2 className="text-3xl sm:text-4xl text-center uppercase text-brand-300 font-extrabold tracking-wider">
        {content.header}
      </h2>
      <h6 className="text-base sm:text-2xl text-white text-center font-light tracking-tight">
        {content.secondaryHeader}
      </h6>
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-center space-y-14 sm:space-y-0 sm:space-x-8 sm:items-stretch px-8 sm:px-0 sm:pt-8">
        {content.benefits.map(({ title, id, description, icon }) => (
          <div
            key={id}
            className="flex flex-col items-center justify-center sm:justify-around w-full h-72 sm:w-72 sm:h-96"
          >
            <Icon icon={icon} className="text-brand-300 w-44 h-44" />
            <h3 className="text-2xl sm:text-3xl text-center font-extrabold tracking-widest -mt-2 mb-2">
              {title}
            </h3>
            <p className="text-lg sm:text-base text-brand-300 lg:text-lg text-center font-normal tracking-wide">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
