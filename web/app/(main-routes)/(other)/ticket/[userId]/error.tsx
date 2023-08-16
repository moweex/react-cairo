'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="h-screen center z-10">
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h1 className="text-4xl font-bold text-center">Oops!</h1>
        <p className="text-xl text-center">
          We could not verify your registration in the meantime
        </p>
        <p className="text-xl text-center">Please try again later</p>

        <button
          className="transition-all h-14 px-8 md:px-12 rounded-full md:opacity-80 md:hover:opacity-100 md:hover:scale-105"
          onClick={reset}
          style={{
            backgroundColor: 'var(--brand)',
          }}
        >
          <span className="text-lg font-extrabold sm:font-medium uppercase text-white m-auto">
            Try again
          </span>
        </button>
      </div>
    </div>
  );
}
