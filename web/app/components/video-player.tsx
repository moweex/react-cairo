'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
function canPlayVideo() {
  if (!navigator) return false;

  return !Boolean(
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform) ||
      // iPad on iOS 13 detection
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document),
  );
}

export default function VideoPlayer({
  children,
  content,
}: PropsWithChildren<{
  content: { videoURL: string };
}>) {
  const [playVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    setCanPlayVideo(canPlayVideo());
  }, []);

  return (
    <section className="flex flex-col md:flex-row w-full relative min-h-screen bg-opacity-30 bg-black z-10 justify-stretch">
      {playVideo ? (
        <video
          className="w-full h-full block absolute top-0 left-0 object-cover z-0 opacity-70"
          preload="auto"
          muted
          autoPlay
          loop
          playsInline
          src={content.videoURL}
        />
      ) : (
        <div
          className="w-full h-full block absolute top-0 left-0 object-cover z-0 opacity-70"
          style={{
            backgroundImage: `${playVideo ? '' : `url(/hero-img.jpeg)`}`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom',
            backgroundColor: 'white',
            filter: 'blur(4px)',
          }}
        />
      )}
      {children}
    </section>
  );
}
