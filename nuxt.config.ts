import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },

  /**
   * Security Headers via routeRules.
   *
   * Catatan CSP:
   * - 'unsafe-inline' di script-src WAJIB karena Google Ads/Analytics
   *   menggunakan inline script. Tanpa ini, gtag tidak akan berfungsi.
   * - 'unsafe-inline' di style-src diperlukan untuk TailwindCSS v4 + DaisyUI
   *   yang men-generate style secara inline saat runtime.
   * - frame-src google.com diizinkan khusus untuk Google Maps embed.
   * - HSTS aktif dengan max-age 1 tahun.
   *   Pastikan HTTPS sudah stabil sebelum deploy ke production.
   */
  routeRules: {
    "/**": {
      headers: {
        // ─── Content Security Policy ──────────────────────────────────────────
        "Content-Security-Policy": [
          // Default: hanya izinkan resource dari domain sendiri
          "default-src 'self'",
          // Script: 'unsafe-inline' WAJIB untuk Nuxt hydration (window.__NUXT__)
          // dan GTM inline initialization. JANGAN tambah 'strict-dynamic' karena
          // akan override 'unsafe-inline' dan mematikan Vue hydration sepenuhnya.
          "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
          // Style: inline diizinkan (TailwindCSS v4 / DaisyUI runtime)
          "style-src 'self' 'unsafe-inline'",
          // Gambar: domain sendiri, data URI, blob, tracking pixel Google, dan loccal Google Maps tiles
          "img-src 'self' data: blob: https://ssdc.my.id https://www.google-analytics.com https://www.googletagmanager.com https://ssl.gstatic.com https://images.unsplash.com https://maps.googleapis.com https://maps.gstatic.com https://lh3.googleusercontent.com",
          // Font: hanya domain sendiri dan data URI
          "font-src 'self' data:",
          // Koneksi jaringan: Google Analytics, Ads, Maps tracking
          "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://region1.google-analytics.com https://maps.googleapis.com",
          // iframe: Google Maps embed
          "frame-src https://www.google.com https://www.googletagmanager.com",
          // Worker: domain sendiri dan blob untuk Vite HMR di dev
          "worker-src 'self' blob:",
          // Blokir plugin lama (Flash, Silverlight, dll)
          "object-src 'none'",
          // Batasi <base> tag ke domain sendiri
          "base-uri 'self'",
          // Batasi action form
          "form-action 'self'",
          // Paksa semua resource pakai HTTPS
          "upgrade-insecure-requests",
        ].join("; "),

        // ─── Anti-Clickjacking ────────────────────────────────────────────────
        "X-Frame-Options": "SAMEORIGIN",

        // ─── Anti-MIME Sniffing ───────────────────────────────────────────────
        "X-Content-Type-Options": "nosniff",

        // ─── Referrer Policy ──────────────────────────────────────────────────
        "Referrer-Policy": "strict-origin-when-cross-origin",

        // ─── Permissions Policy ───────────────────────────────────────────────
        "Permissions-Policy": [
          "camera=()",
          "microphone=()",
          "payment=()",
          "usb=()",
          "geolocation=(self)",
          "fullscreen=(self)",
        ].join(", "),

        // ─── HSTS ─────────────────────────────────────────────────────────────
        // Paksa browser pakai HTTPS selama 1 tahun.
        // ⚠ JANGAN aktifkan jika HTTPS belum stabil – bisa kunci domain!
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    },
  },

  app: {
    htmlAttrs: { lang: "id" },
    head: {
      title: "SSDC Senyum Sehat Dental Care Payakumbuh",
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        {
          name: "description",
          content:
            "SSDC Senyum Sehat Dental Care Payakumbuh melayani kebutuhan dokter gigi profesional di Payakumbuh dan Lima Puluh Kota sejak 2016. Perawatan lengkap: scaling, behel, bleaching, veneer, pencabutan, hingga perawatan anak.",
        },
        { name: "geo.region", content: "ID-SB" },
        { name: "geo.placename", content: "Payakumbuh, Sumatera Barat" },
        { name: "geo.position", content: "-0.2289;100.6326" },
        { name: "ICBM", content: "-0.2289, 100.6326" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://ssdc.my.id/" },
        {
          property: "og:title",
          content: "SSDC Senyum Sehat Dental Care Payakumbuh",
        },
        {
          property: "og:description",
          content:
            "Layanan dokter gigi terpercaya di Payakumbuh & Lima Puluh Kota. Perawatan gigi lengkap untuk senyum sehat dan percaya diri.",
        },
        { property: "og:image", content: "https://ssdc.my.id/og-image.jpg" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "SSDC Senyum Sehat Dental Care Payakumbuh – Klinik Gigi Terpercaya" },
        {
          property: "og:see_also",
          content: "https://www.tiktok.com/@doktergigi.payakumbuh",
        },
        {
          property: "og:see_also",
          content: "https://www.instagram.com/doktergigi.payakumbuh/",
        },
        { property: "og:see_also", content: "https://wa.me/6285121009692" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        // Preload hero image — LCP element, browser fetch lebih awal sebelum render
        // Catatan: path ini adalah hash yang di-generate Vite, gunakan preconnect sebagai alternatif
        // yang lebih aman saat file sudah di-bundle dengan hash name
        { rel: "preconnect", href: "https://www.googletagmanager.com" },
        { rel: "preconnect", href: "https://www.google-analytics.com" },
        // dns-prefetch sebagai fallback browser lama
        { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
        { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
        { rel: "canonical", href: "https://ssdc.my.id/" },
      ],
      script: [
        // ─── Google tag: Inline init ─────────────────────────────────────────
        // WAJIB ada di <head> HTML agar Google Ads verification crawler bisa
        // mendeteksi tag dari source HTML statis (crawler tidak trigger interaksi).
        // Script berat (gtag/js) tetap lazy-load via lazy-gtm.client.ts plugin.
        {
          innerHTML: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16520213356');`,
          type: 'text/javascript',
          tagPosition: 'head',
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "SSDC Senyum Sehat Dental Care Payakumbuh",
            image: "https://ssdc.my.id/ssdc_logo.jpg",
            url: "https://ssdc.my.id/",
            telephone: "+62-851-2100-9692",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Jl. Pahlawan No. 86A, Payakumbuh",
              addressLocality: "Payakumbuh",
              addressRegion: "Sumatera Barat",
              postalCode: "26222",
              addressCountry: "ID",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: -0.2458476,
              longitude: 100.6307807,
            },
            openingHours: [
              "Mo 10:00-20:00",
              "Tu 10:00-20:00",
              "We 10:00-20:00",
              "Th 10:00-20:00",
              "Fr 10:00-20:00",
              "Sa 10:00-20:00",
              "Su 10:00-17:00",
            ],
            sameAs: [
              "https://www.tiktok.com/@doktergigi.payakumbuh",
              "https://www.instagram.com/doktergigi.payakumbuh/",
              "https://www.facebook.com/drgmunadiyah/",
              "https://www.google.com/maps/place/SSDC+Senyum+Sehat+Dental+Care+Payakumbuh/@-0.2458378,100.6287674,17.29z/data=!4m14!1m7!3m6!1s0x2e2ab4cf792d0f9b:0x5b7b3167853c3c32!2sSSDC+Senyum+Sehat+Dental+Care+Payakumbuh!8m2!3d-0.2458476!4d100.6307807!16s%2Fg%2F11c2lct3fq!3m5!1s0x2e2ab4cf792d0f9b:0x5b7b3167853c3c32!8m2!3d-0.2458476!4d100.6307807!16s%2Fg%2F11c2lct3fq?hl=id&authuser=1&entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
            ],
          }),
        },
      ],
    },
  },
});
