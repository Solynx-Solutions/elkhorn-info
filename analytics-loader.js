(function () {
  'use strict';

  var gtm = document.querySelector('meta[name="solynx-gtm-id"]');
  var pixel = document.querySelector('meta[name="solynx-meta-pixel-id"]');
  var gtmId = gtm ? gtm.content.trim() : '';
  var pixelId = pixel ? pixel.content.trim() : '';

  if (/^GTM-[A-Z0-9]+$/.test(gtmId)) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    var gtmScript = document.createElement('script');
    gtmScript.async = true;
    gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtmId);
    document.head.appendChild(gtmScript);
  }

  if (/^[0-9]{6,24}$/.test(pixelId)) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
}());
