<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import bgHero from "~/assets/img/bg-hero.jpg";
import overlay from "~/assets/img/overlay.png";
import keluarga from "~/assets/img/keluarga.png";
import logo from "~/assets/img/logo.png";
import bgButton1 from "~/assets/img/bg-button1.png";
import instagram from "~/assets/img/instagram.png";
import facebook from "~/assets/img/facebook.png";
import tiktok from "~/assets/img/tiktok.png";

const whatsappUrl =
    'https://wa.me/6285121009692?text=Halo%20SSDC%2C%20saya%20ingin%20mendaftar%20untuk%20konsultasi%2Fperawatan%20gigi.%0AMohon%20informasinya%20mengenai%20jadwal%20dan%20prosedur%20pendaftaran.%0ATerima%20kasih.'

const instagramUrl = 'https://www.instagram.com/doktergigi.payakumbuh/'
const facebookUrl = 'https://www.facebook.com/drgmunadiyah/?locale=id_ID'
const tiktokUrl = 'https://www.tiktok.com/@doktergigi.payakumbuh'

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
        <!-- Background utama -->
        <img :src="bgHero" width="1920" height="1080" alt="Background Klinik Gigi SSDC Payakumbuh"
            class="absolute inset-0 w-full h-full object-cover object-center -z-30" />

        <!-- Overlay dekorasi -->
        <img :src="overlay" width="1920" height="1080" alt="Overlay"
            class="absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none select-none opacity-10" />

        <!-- Ilustrasi keluarga / maskot (desktop only) -->
        <div class="absolute bottom-0 left-0 z-20 hidden lg:block lg:w-[50%] xl:w-[50%]">
            <img :src="keluarga" width="700" height="900" alt="Maskot SSDC Senyum Sehat Dental Care Payakumbuh"
                loading="eager" class="object-contain w-full h-auto select-none pointer-events-none" />
        </div>

        <!-- Gradient gelap di kanan biar teks kebaca -->
        <div class="absolute bottom-0 right-0 w-full h-full gradient-right -z-10 hidden md:block" />


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

                <!-- Tombol daftar WhatsApp -->
                <div class="bg-white w-fit h-fit text-[#6E1A7E] px-10 py-2 rounded-full drop-shadow-lg">
                    <a :href="whatsappUrl" target="_blank" rel="noopener noreferrer">
                        <p class="font-bold">Daftar Sekarang</p>
                    </a>
                </div>

                <!-- Sosmed -->
                <div class="flex items-center justify-center gap-4 mt-4">
                    <!-- Instagram -->
                    <a :href="instagramUrl" target="_blank" rel="noopener noreferrer" aria-label="Instagram SSDC"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="instagram" width="45" height="45" alt="Logo Instagram resmi SSDC" loading="eager"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>

                    <!-- Facebook -->
                    <a :href="facebookUrl" target="_blank" rel="noopener noreferrer" aria-label="Facebook SSDC"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="facebook" width="45" height="45" alt="Logo Facebook resmi SSDC" loading="eager"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>

                    <!-- TikTok -->
                    <a :href="tiktokUrl" target="_blank" rel="noopener noreferrer" aria-label="TikTok SSDC"
                        class="transition-transform duration-200 hover:scale-110">
                        <img :src="tiktok" width="45" height="45" alt="Logo TikTok resmi SSDC" loading="eager"
                            class="w-[45px] h-[45px] object-contain" />
                    </a>
                </div>
            </div>
        </div>
        <!-- Scroll Down Indicator -->
        <div v-if="showScrollIndicator"
            class="absolute mb-15 bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center animate-bounce cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-300"
            @click="scrollToNextSection">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6 w-10 h-10 text-white drop-shadow-md">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
            </svg>

        </div>
    </section>
</template>
<style scoped>
/* Global styles or inside scoped styles */
.gradient-right {
    background: linear-gradient(to left, rgba(204, 0, 255, 0.8), rgba(255, 0, 255, 0) 70%);
}
</style>
