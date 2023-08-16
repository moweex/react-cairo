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

import { useLayoutEffect, useState } from 'react';
import cn from 'classnames';
import CheckIcon from '@components/icons/icon-check';
import { TicketGenerationState } from '@lib/constants';
import useConfData from '@lib/hooks/use-conf-data';
import LoadingDots from './loading-dots';
import formStyles from './form.module.css';
import ticketFormStyles from './ticket-form.module.css';
import { GitHubOAuthData } from '@lib/types';
import InputField from 'app/(main-routes)/(other)/register/input';
import { getUserNameFromGithub } from 'app/(main-routes)/(other)/ticket/[userId]/preview';
import { useSearchParams, useRouter } from 'next/navigation';

type FormState = 'default' | 'loading' | 'error';

type Props = {
  setTicketGenerationState: React.Dispatch<
    React.SetStateAction<TicketGenerationState>
  >;
};

export default function Form({ setTicketGenerationState }: Props) {
  const [formState, setFormState] = useState<FormState>('default');
  const { userData, setUserData } = useConfData();
  const params = useSearchParams();
  const router = useRouter();

  const usernameFromParams = params?.get('githubUser');
  const username = userData.username;

  useLayoutEffect(() => {
    if (!usernameFromParams) return;
    setUserData(prev => ({
      ...prev,
      github: `https://github.com/${usernameFromParams}`,
      username: usernameFromParams,
    }));
  }, [usernameFromParams]);

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        const githubURL = e.currentTarget.github.value;

        setFormState('loading');
        setTicketGenerationState('loading');

        new Promise<GitHubOAuthData | undefined>(resolve => {
          const interval = setInterval(() => {
            clearInterval(interval);
            resolve(undefined);
          }, 500);
        }).then(() => {
          const username = getUserNameFromGithub(githubURL);

          setUserData(prev => ({
            ...prev,
            github: githubURL,
            username: username,
          }));

          router.push(`/ticket/${userData.id}?githubUser=${username}`);

          setFormState('default');
          setTicketGenerationState('default');
        });
      }}
    >
      <div className={cn(formStyles['form-row'], ticketFormStyles['form-row'])}>
        <div className="relative">
          <InputField
            label="Github"
            labelProps={{ htmlFor: 'github-helper' }}
            inputProps={{
              id: 'github',
              name: 'github',
              type: 'url',
              value: username,
              disabled: !!username || formState === 'loading',
              placeholder: 'https://github.com/username',
              'aria-describedby': 'attendee github profile',
            }}
          />
          <div
            className={`absolute top-1/2 right-4 ${
              username ? 'visible' : 'hidden'
            }`}
          >
            <CheckIcon color="#fff" size={24} />
          </div>
        </div>
        {!username && (
          <button
            type="submit"
            className="transition-all mt-4 self-end text-lg uppercase float-right pr-4 hover:scale-105 hover:font-bold hover:underline"
          >
            {formState === 'loading' ? <LoadingDots size={4} /> : 'Update'}
          </button>
        )}
      </div>
    </form>
  );
}
