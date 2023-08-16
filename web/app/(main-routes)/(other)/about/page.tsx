import Link from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

const Section = ({
  title,
  children,
}: PropsWithChildren<{ title: string | ReactNode }>) => (
  <section className="px-12 flex flex-col space-y-4">
    <h5 className="text-2xl text-left sm:text-4xl text-brand-300">{title}</h5>
    <div className="text-sm sm:text-lg text-justify tracking-tighter sm:tracking-normal">
      {children}
    </div>
  </section>
);

const CONTENT = [
  {
    title: 'About the Event',
    content:
      'React Cairo event is the biggest React event in Egypt. where cutting-edge techniques, industry insights, and networking opportunities converge. This is our third edition and we dream to grow with an immersive experience packed with expert-led talks, and exhilarating discussions to ignite your creativity, expand your knowledge, and forge invaluable connections with fellow React enthusiasts. This event is a 100% face-to-face event and the talks will be published on our YouTube channel and website.',
  },
  {
    title: (() => (
      <>
        The Organizer{': '}
        <a
          href="https://moweex.com/"
          className="text-2xl text-left sm:text-4xl text-brand-300 font-semibold hover:text-white"
        >
          MOWEEX
        </a>
      </>
    ))(),
    content: (() => (
      <>
        the powerhouse driving React Cairo, is a beacon of quality and
        innovation in the React development realm. Our pervasive influence spans
        across the DACH and MENA regions, where our passion for novel solutions
        fuels our commitment to delivering unmatched value to our clients. Our
        essence goes beyond developing. We orchestrate diverse events throughout
        the year, providing a dynamic hub for React enthusiasts to collaborate,
        learn, and create. These gatherings fuel a vibrant community, embodying
        our steadfast belief in the transformative power of shared knowledge and
        unity. We are more than an organization; we are a movement that
        champions the free exchange of ideas and ceaseless learning in the world
        of React. Join us in this journey as we explore the profound depths of
        the React universe at React Cairo!
      </>
    ))(),
  },
  {
    title: 'Our Vision and What We Want to Achieve?',
    content: `React Cairo envisions a thriving and dynamic community of React developers in Egypt and beyond. Our vision is to inspire, educate, and empower individuals by providing a platform where they can learn, connect, and excel in React development. Through our event, we strive to foster a collaborative environment where knowledge is shared, best practices are embraced, and innovation is celebrated. Our goal is to ignite a passion for React, fueling the growth of talented developers, and driving the advancement of technology in the region. Together, let's shape the future of React and build a vibrant ecosystem that propels Egypt to the forefront of the global React community.`,
  },
  {
    title: 'How Do We Do it?',
    content: `React Cairo achieves its vision through curated content, community engagement, industry collaboration, networking opportunities, practical learning, diversity, and sponsor partnerships. During the event, professionals will lead four talks, covering the latest tools, React ecosystem, and the language's current status. Join us to learn, connect, and stay at the forefront of React development.`,
  },
  {
    title: 'What is Our Target?',
    content: `React Cairo aims to target a diverse audience of React developers, professionals, enthusiasts, and students. The event is designed to cater to individuals at various stages of their React journey, including beginners seeking foundational knowledge, intermediate developers looking to enhance their skills, and advanced practitioners interested in staying updated with the latest trends and techniques. React Cairo welcomes attendees from Egypt and beyond, fostering a global community of React enthusiasts who are passionate about learning, networking, and advancing their careers in React development.`,
  },
];

export default async function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full bg-opacity-50 bg-black mt-[82px] z-10 pb-10 px-2">
      <div className="flex flex-col space-y-4">
        {CONTENT.map(({ title, content }, idx) => (
          <Section key={idx} title={title}>
            {content}
          </Section>
        ))}
      </div>
    </div>
  );
}
