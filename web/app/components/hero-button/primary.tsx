import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import cn from 'classnames';
import { BECOME_SPONSOR, REGISTER } from '@lib/constants';

type HeaderButtonFunctions =
  | 'become_sponsor'
  | 'reserve_ticket'
  | 'become_speaker';
type HeaderButtonStyles = 'primary' | 'secondary';

export type HeaderButton = {
  title: string;
  funcType: HeaderButtonFunctions;
  variant: HeaderButtonStyles;
  disabled: boolean;
};

const getClassName = (
  variant: HeaderButtonStyles,
): { parent: string; child: string } => {
  switch (variant) {
    case 'primary': {
      return {
        parent:
          'flex h-12 md:h-11 rounded-2xl rounded-full bg-brand-400 md:opacity-80 px-6 md:active:opacity-100 md:hover:opacity-100',
        child: 'text-sm font-bold uppercase text-white m-auto',
      };
    }
    case 'secondary': {
      return {
        parent:
          'flex h-12 md:h-11 px-6 border-2 md:hover:bg-white rounded-full border-white border-solid border-2 md:opacity-80 md:hover:opacity-100 group',
        child:
          'text-sm font-bold uppercase text-white group-hover:text-brand-300 m-auto',
      };
    }
  }
};
const disabledTagClassName =
  'cursor-not-allowed sm:opacity-100 md:active:opacity-100 md:hover:bg-transparent md:hover:opacity-100 ';
export const HeroButton = (
  _props: HeaderButton & {
    speakerSignUpLink?: string;
    textClassName?: string;
  } & HTMLAttributes<HTMLAnchorElement>,
) => {
  const {
    funcType,
    title,
    variant,
    speakerSignUpLink,
    className,
    textClassName,
    ...props
  } = _props;
  const classNames = getClassName(variant);

  switch (funcType) {
    case 'become_sponsor':
      return (
        <Link
          href={props.disabled ? '' : BECOME_SPONSOR.route}
          className={cn(
            {
              [disabledTagClassName]: props.disabled,
            },
            classNames.parent,
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              { ['group-hover:text-white']: props.disabled },
              classNames.child,
              textClassName,
            )}
            style={{
              backgroundColor: props.disabled ? 'transparent' : undefined,
              opacity: props.disabled ? 0.7 : undefined,
            }}
          >
            {title}
          </span>
        </Link>
      );
    case 'become_speaker':
      return (
        <Link
          href={
            props.disabled || speakerSignUpLink === undefined
              ? ''
              : speakerSignUpLink
          }
          target="_blank"
          className={cn(
            {
              [disabledTagClassName]: props.disabled,
            },
            classNames.parent,
            className,
          )}
          {...props}
        >
          <span
            className={cn(
              { ['group-hover:text-white']: props.disabled },
              classNames.child,
              textClassName,
            )}
            style={{
              backgroundColor: props.disabled ? 'transparent' : undefined,
              opacity: props.disabled ? 0.7 : undefined,
            }}
          >
            {title}
          </span>
        </Link>
      );
    case 'reserve_ticket':
      return (
        <Link
          href={props.disabled ? '' : REGISTER.route}
          className={cn(
            {
              [disabledTagClassName]: props.disabled,
            },
            classNames.parent,
            className,
          )}
          style={{
            backgroundColor: props.disabled ? 'transparent' : undefined,
            opacity: props.disabled ? 0.7 : undefined,
          }}
          {...props}
        >
          <span
            className={cn(
              { ['group-hover:text-white']: props.disabled },
              classNames.child,
              textClassName,
            )}
          >
            {title}
          </span>
        </Link>
      );
  }
};

export const HeroHeader = (
  props: { buttons?: HeaderButton[] } & {
    speakerSignUpLink?: string;
  },
) => {
  const { speakerSignUpLink } = props;

  if (!props.buttons) return <></>;

  return (
    <div className="hidden md:flex space-x-2">
      {props.buttons.map(({ funcType, title, variant, disabled, ...props }) => (
        <HeroButton
          key={title}
          funcType={funcType}
          title={title}
          variant={variant}
          speakerSignUpLink={speakerSignUpLink}
          disabled={disabled}
          {...props}
        />
      ))}
    </div>
  );
};
