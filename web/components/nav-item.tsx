'use client';

import cn from 'classnames';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

type Props = {
  name: string;
  route: string;
  className?: string;
};

export default function NavItem({ name, route, ...props }: Props) {
  const activeRoute = usePathname();

  // ! FIXME: should be loading maybe?
  if (activeRoute === null) return null;

  return (
    <a
      key={name}
      href={route}
      className="uppercase text-sm font-bold text-white hover:text-yellow-300"
      {...props}
    >
      {name}
    </a>
  );
}
