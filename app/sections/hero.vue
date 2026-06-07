<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import bgHero from "~/assets/img/webp/bg-hero.webp";
import bgHeroMobile from "~/assets/img/webp/bg-hero-mobile.webp";
import overlay from "~/assets/img/webp/overlay.webp";
import keluarga from "~/assets/img/webp/keluarga.webp";
import logo from "~/assets/img/webp/logo.webp";
import bgButton1 from "~/assets/img/webp/bg-button1.webp";
import instagram from "~/assets/img/webp/instagram.webp";
import facebook from "~/assets/img/webp/facebook.webp";
import tiktok from "~/assets/img/webp/tiktok.webp";

const instagramUrl = 'https://www.instagram.com/doktergigi.payakumbuh/'
const facebookUrl = 'https://www.facebook.com/drgmunadiyah/?locale=id_ID'
const tiktokUrl = 'https://www.tiktok.com/@doktergigi.payakumbuh'

// --- Scroll Indicator ---
const scrollToNextSection = () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
};

const showScrollIndicator = ref(true);

const handleScroll = () => {
    if (window.scrollY > 50) {
        showScrollIndicator.value = false;
    } else {
        showScrollIndicator.value = true;
    }
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        <!-- Background utama — LCP element, fetchpriority=high agar browser load duluan -->
        <!-- picture: mobile (<768px) serve 8KB hero, desktop serve 28KB hero -->
        <picture>
            <source media="(max-width: 767px)" :srcset="bgHeroMobile" type="image/webp">
            <img :src="bgHero" width="1920" height="1080"
                alt="Suasana Klinik Gigi SSDC Senyum Sehat Dental Care Payakumbuh"
                fetchpriority="high"
                class="absolute inset-0 w-full h-full object-cover object-center -z-30" />
        </picture>

        <!-- Overlay dekorasi — aria-hidden karena murni visual, tidak ada informasi konten -->
        <!-- loading=lazy: overlay tidak boleh jadi LCP element, biarkan browser skip ini -->
        <img :src="overlay" width="1920" height="1080" alt="" aria-hidden="true"
            loading="lazy"
            class="absolute inset-0 w-full h-full object-cover object-center opacity-10 pointer-events-none select-none -z-20" />

        <!-- Ilustrasi keluarga / maskot (desktop only) -->
        <div class="absolute bottom-0 left-0 z-20 hidden lg:block lg:w-[50%] xl:w-[50%]">
            <img :src="keluarga" width="700" height="900" alt="Maskot SSDC Senyum Sehat Dental Care Payakumbuh"
                loading="eager" class="object-contain w-full h-auto select-none pointer-events-none" />
        </div>

        <!-- Gradient gelap di kanan biar teks kebaca (desktop) -->
        <div class="absolute bottom-0 right-0 w-full h-full gradient-right -z-10 hidden md:block" />

        <!-- Dark overlay khusus mobile untuk kontras teks (keluarga.png tidak tampil di mobile) -->
        <div class="absolute inset-0 -z-10 bg-black/25 md:hidden" aria-hidden="true" />

        <!-- Konten hero -->
        <div class="relative z-10 w-full">
            <div
                class="mx-auto max-w-7xl px-6 md:pr-16 pb-24 text-white flex flex-col items-center md:items-end text-center md:text-right space-y-2">
                <!-- Logo klinik -->
                <img :src="logo" width="300" height="80" alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
                    loading="eager" class="w-[300px] h-auto object-contain" />

                <!-- Judul brand (dengan bg custom image) -->
                <div class="relative max-w-md w-full flex justify-center md:justify-end">
                    <div class="relative">
                        <img :src="bgButton1" width="450" height="80" alt="Text Background" loading="eager"
                            class="w-[450px] h-auto object-contain" />
                        <h1
                            class="absolute inset-0 flex items-center justify-center text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold text-center opacity-95 drop-shadow-lg">
                            Senyum Sehat Dental Care
                        </h1>
                    </div>
                </div>

                <!-- Dokter -->
                <div class="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg">
                    Drg. Munadiyah &amp; Partner
                </div>

                <!-- CTA button → menuju halaman /daftar -->
                <NuxtLink
                    to="/daftar"
                    id="btn-cta-daftar-hero"
                    class="bg-white w-fit h-fit text-[#6E1A7E] px-10 py-2 rounded-full drop-shadow-lg font-bold transition-transform duration-200 hover:scale-105 hover:shadow-xl"
                >
                    Daftar Sekarang
                </NuxtLink>

                <div class="flex items-center justify-center gap-4 mt-4" role="list" aria-label="Media sosial SSDC">
                    <!-- Instagram -->
                    <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" aria-label="Ikuti SSDC di Instagram"
                        role="listitem"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="instagram" width="45" height="45" alt="" aria-hidden="true" loading="lazy"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>

                    <!-- Facebook -->
                    <a :href="facebookUrl" target="_blank" rel="noopener noreferrer" aria-label="Ikuti SSDC di Facebook"
                        role="listitem"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="facebook" width="45" height="45" alt="" aria-hidden="true" loading="lazy"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>

                    <!-- TikTok -->
                    <a :href="tiktokUrl" target="_blank" rel="noopener noreferrer" aria-label="Tonton SSDC di TikTok"
                        role="listitem"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="tiktok" width="45" height="45" alt="" aria-hidden="true" loading="lazy"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>
                </div>
            </div>
        </div>

        <!-- Scroll Down Indicator -->
        <div v-if="showScrollIndicator"
            role="button"
            tabindex="0"
            aria-label="Gulir ke bawah untuk melihat konten selanjutnya"
            class="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-bounce cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-300"
            @click="scrollToNextSection"
            @keydown.enter.space.prevent="scrollToNextSection">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 w-10 h-10 text-white drop-shadow-md"
                aria-hidden="true">
                <title>Gulir ke bawah</title>
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>
        </div>
    </section>
</template>

<style scoped>
.gradient-right {
    background: linear-gradient(to left, rgba(204, 0, 255, 0.8), rgba(255, 0, 255, 0) 70%);
}
</style>
