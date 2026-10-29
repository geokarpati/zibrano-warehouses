/* ===== НАЛАШТУВАННЯ РЕКЛАМИ: вставте ID, порожнє значення = вимкнено ===== */
window.ZB = {
  GA4: 'G-R69DVC9LL5', // G-XXXXXXXXXX  (Google Analytics 4)
  ADS: 'AW-18542395330',          // AW-XXXXXXXXX  (Google Ads)
  ADS_LEAD: 'WlJICNDn76wdEML_2YlF',     // мітка конверсії «Заявка», напр. AbC-dEfGhIj
  ADS_CALL: 'LuRVCNPn76wdEML_2YlF',     // мітка конверсії «Клік по телефону/месенджеру»
  META: ''          // ID пікселя Meta, напр. 123456789012345
};
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }
(function(c){
  // аналітику вмикаємо лише на бойовому домені: без localhost, превʼю і ботів-сканерів без JS
  if (!/(^|\.)zibrano\.info$/.test(location.hostname) || navigator.webdriver) { c.GA4 = c.ADS = c.META = ''; }
  var add = function(src){ var s = document.createElement('script'); s.async = true; s.src = src; document.head.appendChild(s); };
  if (c.GA4 || c.ADS) { add('https://www.googletagmanager.com/gtag/js?id=' + (c.GA4 || c.ADS)); gtag('js', new Date()); if (c.GA4) gtag('config', c.GA4); if (c.ADS) gtag('config', c.ADS); }
  if (c.META) { !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js'); fbq('init', c.META); fbq('track', 'PageView'); }
  // зберігаємо UTM/gclid першого візиту на 30 днів, щоб заявка мала джерело навіть після переходів
  try { var p = new URLSearchParams(location.search), keep = {}; ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(function(k){ if (p.get(k)) keep[k] = p.get(k); });
    if (Object.keys(keep).length) localStorage.setItem('zb_src', JSON.stringify({t: Date.now(), v: keep})); } catch(e) {}
})(window.ZB);
/* події: zbEvent('lead'|'contact'|'calc', {...}) */
function zbEvent(kind, params){
  var c = window.ZB; params = params || {};
  dataLayer.push(Object.assign({event: 'zb_' + kind}, params));
  if (kind === 'lead') { if (c.GA4) gtag('event', 'generate_lead', params); if (c.ADS && c.ADS_LEAD) gtag('event', 'conversion', {send_to: c.ADS + '/' + c.ADS_LEAD}); if (window.fbq) fbq('track', 'Lead'); }
  if (kind === 'contact') { if (c.GA4) gtag('event', 'contact', params); if (c.ADS && c.ADS_CALL) gtag('event', 'conversion', {send_to: c.ADS + '/' + c.ADS_CALL}); if (window.fbq) fbq('track', 'Contact'); }
  if (kind === 'calc') { if (c.GA4) gtag('event', 'calc_to_lead', params); if (window.fbq) fbq('track', 'ViewContent'); }
}
