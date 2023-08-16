'use client';

import dynamic from 'next/dynamic';
import Script from 'next/script';

const Analytics = () => {
  const fbTrackingId = process.env.NEXT_PUBLIC_FB_TRACKING_ID;
  const googleTrackingId = process.env.NEXT_PUBLIC_GOOGLE_TRACKING_ID;
  return (
    <>
      <Script id="analytics">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${fbTrackingId}');
fbq('track', 'PageView');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleTrackingId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', "${googleTrackingId}");
        `}
      </Script>
      <Script id="linkedin-analytics" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "5776641";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script id="linkedin-analytics-2" strategy="afterInteractive">
        {`
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);})(window.lintrk);
        `}
      </Script>
    </>
  );
};

export default dynamic(() => Promise.resolve(Analytics), {
  ssr: false,
});
