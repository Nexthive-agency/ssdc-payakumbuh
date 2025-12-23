import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
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
        { property: "og:image", content: "https://ssdc.my.id/ssdc_logo.jpg" },
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
      link: [{ rel: "icon", type: "image/png", href: "ssdc_logo.jpg" }],
      script: [
        {
          async: true,
          src: "https://www.googletagmanager.com/gtag/js?id=AW-16520213356",
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16520213356');
            gtag('event', 'ads_conversion_Formulir_1', {});
          `,
        },
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Dentist",
            name: "SSDC Senyum Sehat Dental Care Payakumbuh",
            image: "https://ssdc.my.id/image/logo.png",
            url: "https://ssdc.my.id/",
            telephone: "085121009692",
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
              "https://wa.me/6285121009692",
              "https://www.google.com/maps/place/SSDC+Senyum+Sehat+Dental+Care+Payakumbuh/@-0.2458378,100.6287674,17.29z/data=!4m14!1m7!3m6!1s0x2e2ab4cf792d0f9b:0x5b7b3167853c3c32!2sSSDC+Senyum+Sehat+Dental+Care+Payakumbuh!8m2!3d-0.2458476!4d100.6307807!16s%2Fg%2F11c2lct3fq!3m5!1s0x2e2ab4cf792d0f9b:0x5b7b3167853c3c32!8m2!3d-0.2458476!4d100.6307807!16s%2Fg%2F11c2lct3fq?hl=id&authuser=1&entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D",
            ],
          }),
        },
      ],
    },
  },
});


