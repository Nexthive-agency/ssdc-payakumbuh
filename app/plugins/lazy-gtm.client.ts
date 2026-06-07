/**
 * lazy-gtm.client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Load Google Tag Manager SETELAH user pertama kali berinteraksi dengan halaman.
 * Ini menghilangkan GTM dari critical path render → TBT turun drastis di mobile.
 *
 * Strategi:
 * 1. Tidak load GTM saat halaman pertama kali dibuka (tidak blokir LCP/TBT)
 * 2. Load GTM saat user pertama kali: scroll, click, keydown, atau touchstart
 * 3. Fallback: load setelah 4 detik meski tidak ada interaksi (pastikan tracking tetap jalan)
 *
 * Trade-off yang diterima:
 * - Conversion tracking mungkin miss untuk user yang menutup tab < 4 detik tanpa interaksi
 *   (di real-world ini sangat jarang karena pageview saja butuh beberapa detik untuk dibaca)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default defineNuxtPlugin(() => {
  // Pastikan hanya jalan di client-side
  if (import.meta.server) return;

  const GTM_ID = 'AW-16520213356';
  let isLoaded = false;

  const loadGTM = () => {
    if (isLoaded) return;
    isLoaded = true;

    // Hapus event listener agar tidak trigger ulang
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(e => window.removeEventListener(e, loadGTM));

    // Inisiasi dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', GTM_ID, { send_page_view: true });

    // Inject script GTM ke <head>
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`;
    document.head.appendChild(script);
  };

  // Load saat pertama kali interaksi user
  const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
  events.forEach(e => window.addEventListener(e, loadGTM, {
    passive: true,
    once: true,
  }));

  // Fallback: load setelah 4 detik tanpa interaksi
  setTimeout(loadGTM, 4000);
});
