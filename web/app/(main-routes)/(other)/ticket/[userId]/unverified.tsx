'use client';

import { useTransition } from 'react';
import { useRetry } from 'app/hooks/useResendEmail';
import { resendEmail } from './confirm/actions';
import { useParams } from 'next/navigation';

export default function UnVerified() {
  const { userId } = useParams();
  const { disabled, timer, retry } = useRetry();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="h-screen center z-10">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-4xl font-bold text-center">
          Unverified Registration
        </h1>
        <p className="text-xl text-center">
          Please verify your Email registration first
        </p>
        <button
          className={
            disabled
              ? 'h-14 px-8 rounded-full bg-gray-400 md:opacity-100'
              : 'h-14 px-8 md:px-12 rounded-full md:opacity-80 bg-brand-300 md:hover:opacity-100 md:hover:scale-105'
          }
          onClick={() => {
            retry();
            startTransition(() => {
              resendEmail({
                userId: Array.isArray(userId) ? userId[0] : userId,
              });
            });
          }}
          disabled={disabled}
        >
          <span className="text-lg font-extrabold sm:font-medium uppercase text-white m-auto">
            {disabled ? `Try again in ${timer} seconds` : 'Resend Email'}
          </span>
        </button>
      </div>
    </div>
  );
}
