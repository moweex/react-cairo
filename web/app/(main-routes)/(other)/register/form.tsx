'use client';
import { useState, useTransition } from 'react';
import { submitUser } from './actions';
import { User } from '@lib/types';
import { ConflictingError, ServerError, ValidationError } from '@lib/errors';
import InputField from './input';
import { useRouter } from 'next/navigation';
const defaultErrors = {
  name: undefined,
  email: undefined,
  company: undefined,
  experience: undefined,
  github: undefined,
  title: undefined,
  general: undefined,
};

const isError = (
  res: Awaited<ReturnType<typeof submitUser>>,
): res is {
  errors: { [k: string]: string };
  message?: string | undefined;
  type: 'ValidationError' | 'ConflictingError' | 'ServerError';
} => {
  if (res.hasOwnProperty('message')) {
    return true;
  }
  return false;
};

export default function RegisterForm() {
  const router = useRouter();
  const [errors, setErrors] =
    useState<
      Record<
        keyof Omit<User, 'event' | 'isGuest'> | 'general',
        string | undefined
      >
    >(defaultErrors);
  const [isPending, startTransition] = useTransition();
  return (
    <form
      className="pt-[68px] z-10 pb-2 md:pb-6"
      onSubmit={e => {
        e.preventDefault();
        startTransition(async () => {
          const formData = new FormData(e.target as HTMLFormElement);
          let newErrors: Record<
            keyof Omit<User, 'event' | 'isGuest'> | 'general',
            string | undefined
          > = {
            ...defaultErrors,
          };
          try {
            const user = await submitUser(formData);
            if (isError(user)) {
              switch (user.type) {
                case 'ValidationError':
                  throw new ValidationError(
                    user.message ?? 'Validation Error',
                    user.errors,
                  );
                case 'ConflictingError':
                  throw new ConflictingError(
                    user.message ?? 'Conflicting Error',
                  );
                case 'ServerError':
                  throw new ServerError(user.message ?? 'Server Error');
              }
            }
            router.push(`/ticket/${user.id}/confirm`);
          } catch (e) {
            if (e instanceof ValidationError) {
              console.log('e.errors', e.errors);
              newErrors = { ...e.errors } as Record<
                keyof User | 'general',
                string | undefined
              >;
            } else if (e instanceof ConflictingError) {
              newErrors.general = e.message;
            } else {
              newErrors.general =
                'An unknown error occurred. Please try again.';
            }
            setErrors(newErrors);
          }
        });
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="min-w-[360px] sm:min-w-[500px] w-5/12 rounded-3xl flex flex-col mt-4 p-4 bg-black bg-opacity-30 z-20">
          <div className="flex flex-col items-center mx-auto mb-4 space-y-2">
            <div className="w-full pb-6">
              <img
                className="w-[180px] sm:w-[180px] mx-auto object-contain"
                src={'/reactcairopoweredbymoweex1linwwhite.png'}
                alt="logo"
              />
            </div>
          </div>
          <div className="w-3/4 max-w-96 self-center flex flex-col space-y-2 md:space-y-4">
            <InputField
              label="Email"
              labelProps={{ htmlFor: 'email-helper' }}
              inputProps={{
                id: 'email',
                name: 'email',
                placeholder: 'name@gmail.com',
                required: true,
                'aria-describedby': 'attendee email',
              }}
              error={errors.email}
            />

            <InputField
              label="Name"
              labelProps={{ htmlFor: 'name-helper' }}
              inputProps={{
                id: 'name',
                name: 'name',
                placeholder: 'John Doe',
                required: true,
                'aria-describedby': 'attendee name',
              }}
              error={errors.name}
            />

            <InputField
              label="Company"
              labelProps={{ htmlFor: 'company-helper' }}
              inputProps={{
                id: 'company',
                name: 'company',
                placeholder: 'Current company name',
                required: true,
                'aria-describedby': 'employer company',
              }}
              error={errors.company}
            />

            <InputField
              label="Job title"
              labelProps={{ htmlFor: 'title-helper' }}
              inputProps={{
                id: 'title',
                name: 'title',
                placeholder: 'Software Engineer 2',
                required: true,
                'aria-describedby': 'attendee job title',
              }}
              error={errors.title}
            />

            <InputField
              label="Years of experience"
              labelProps={{ htmlFor: 'experience-helper' }}
              inputProps={{
                id: 'experience',
                name: 'experience',
                type: 'number',
                placeholder: '2',
                required: true,
                'aria-describedby': 'attendee experience in years',
              }}
              error={errors.experience}
            />

            <InputField
              label="Github"
              labelProps={{ htmlFor: 'github-helper' }}
              inputProps={{
                id: 'github',
                name: 'github',
                type: 'url',
                placeholder: 'https://github.com/username',
                'aria-describedby': 'attendee github profile',
              }}
              error={errors.github}
            />
            {errors.general ? (
              <span className="text-red-500 text-center text-base italic">
                {errors.general}
              </span>
            ) : null}

            <button
              className="transition-all h-14 px-8 md:px-12 rounded-full md:opacity-80 md:hover:opacity-100 md:hover:scale-105"
              type="submit"
              style={{
                backgroundColor: 'var(--brand)',
              }}
              disabled={isPending}
            >
              <span className="text-lg md:text-3xl tracking-wide font-extrabold sm:font-medium uppercase text-white m-auto">
                {`${isPending ? 'Submitting...' : 'Register'}`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
