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
'use client';
import { PropsWithChildren, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import cn from 'classnames';
import { NAVIGATION } from '@lib/constants';
import { useOverlayTriggerState } from '@react-stately/overlays';
import {
  useOverlay,
  usePreventScroll,
  useModal,
  OverlayContainer,
} from '@react-aria/overlays';
import { useDialog } from '@react-aria/dialog';
import { FocusScope } from '@react-aria/focus';
import { useButton } from '@react-aria/button';
import styles from './mobile-menu.module.css';

export function ModalDialog(
  props: PropsWithChildren<
    Parameters<typeof useOverlay>[0] & Parameters<typeof useDialog>[0]
  > & {
    renderHero?: () => JSX.Element;
  },
) {
  const activeRoute = usePathname();

  const ref = useRef<HTMLElement | null>(null);
  const { modalProps } = useModal();
  const { overlayProps } = useOverlay(props, ref);
  const { dialogProps } = useDialog(props, ref);

  if (activeRoute === null) return null;

  return (
    <div className={cn(styles['nav-overlay'], 'flex md:hidden')}>
      <FocusScope contain restoreFocus autoFocus>
        <div className="flex flex-col space-y-8">
          <nav
            className={cn(styles.nav, 'space-y-6')}
            {...overlayProps}
            {...dialogProps}
            {...modalProps}
            ref={ref}
          >
            {props.renderHero?.()}
            {NAVIGATION.map(({ name, route }) => (
              <Link
                key={route}
                href={route}
                className={`text-white text-2xl font-bold tracking-[0.12em] ${
                  activeRoute.startsWith(route)
                    ? 'underline underline-offset-4 decoration-brand-300'
                    : ''
                }}`}
                style={{
                  textDecorationColor: 'var(--brand)',
                }}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div>{props.children}</div>
        </div>
      </FocusScope>
    </div>
  );
}

export default function Overlay() {
  const state = useOverlayTriggerState({});
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(
    {
      onPress: () => (state.isOpen ? state.close() : state.open()),
    },
    ref,
  );

  return (
    <>
      <button
        aria-label="Mobile Menu"
        type="button"
        className={styles.button}
        {...buttonProps}
        ref={ref}
      >
        {state.isOpen ? (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            className={styles.icon}
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            className={styles.icon}
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        )}
      </button>
      {state.isOpen && (
        <OverlayContainer>
          <ModalDialog isOpen onClose={(...props) => state.close(...props)} />
        </OverlayContainer>
      )}
    </>
  );
}
