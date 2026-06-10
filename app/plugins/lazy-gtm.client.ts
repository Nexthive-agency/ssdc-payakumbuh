/**
 * lazy-gtm.client.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Lazy-inject script Google Tag Manager (gtag/js) setelah user berinteraksi.
 * Ini menghilangkan script berat GTM dari critical path render → TBT turun.
 *
 * ARSITEKTUR (2 lapis):
 * 1. nuxt.config.ts  → inline script ringan di <head>: inisiasi dataLayer + gtag()
 *    Tujuan: agar Google Ads verification crawler bisa mendeteksi tag dari HTML statis.
 * 2. Plugin ini       → lazy-inject <script src="gtag/js"> setelah interaksi user
 *    Tujuan: agar script berat tidak blokir LCP/TBT di mobile.
 *
 * Strategi:
 * 1. Tidak load gtag/js saat halaman pertama kali dibuka (tidak blokir LCP/TBT)
 * 2. Load saat user pertama kali: scroll, click, keydown, atau touchstart
 * 3. Fallback: load setelah 4 detik meski tidak ada interaksi
 *
 * Trade-off yang diterima:
 * - Conversion tracking mungkin miss untuk user yang menutup tab < 4 detik tanpa interaksi
 *   (di real-world ini sangat jarang karena pageview saja butuh beberapa detik untuk dibaca)
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default defineNuxtPlugin(() => {
  const GTM_ID = 'AW-16520213356';
  let isLoaded = false;

  const loadGTM = () => {
    if (isLoaded) return;
    isLoaded = true;

    // Hapus event listener agar tidak trigger ulang
    const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'];
    events.forEach(e => window.removeEventListener(e, loadGTM));

    // dataLayer & gtag sudah diinisiasi dari inline script di <head> (nuxt.config.ts).
    // Plugin ini hanya bertugas lazy-inject script GTM yang berat agar tidak
    // blokir LCP/TBT. Tidak perlu reinisiasi dataLayer/gtag di sini.
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
