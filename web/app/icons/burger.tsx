import cn from 'classnames';

import styles from './burger.module.css';

export const BurgerIcon = (
  props: React.HTMLAttributes<HTMLDivElement> & { open?: boolean },
) => (
  <div
    {...props}
    className={cn(
      styles.container,
      { [styles.open]: props.open },
      props.className,
    )}
  >
    <span></span>
    <span></span>
    <span></span>
  </div>
);
