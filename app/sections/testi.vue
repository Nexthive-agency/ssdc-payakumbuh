<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import EmblaCarousel from 'embla-carousel';

import bridgeSebelum from '~/assets/beforAfterImage/bridge_gigi_depan_befor.webp';
import bridgeSetelah from '~/assets/beforAfterImage/bridge_gigi_depanAfter.webp';
import crownSebelum from '~/assets/beforAfterImage/Crown_gigi_belakang_sebelum.webp';
import crownSetelah from '~/assets/beforAfterImage/Crown_gigi_belakang_sesudah.webp';
import skelingSebelum from '~/assets/beforAfterImage/skeling_gigi_sebelum.webp';
import skelingSesudah from '~/assets/beforAfterImage/skeling_gigi_sesudah.webp';
import tambalResinSebelum from '~/assets/beforAfterImage/tambal_serin_komposit_sebelum.webp';
import tambalResinSesudah from '~/assets/beforAfterImage/tambal_resin_komposit_sesudah.webp';

import TestimoniCard from '~/components/TestimoniCard.vue';

const cases = [
    {
        title: "Pemasangan Bridge Gigi Depan Permanen Payakumbuh",
        beforeImage: bridgeSebelum,
        afterImage: bridgeSetelah,
        description:
            "Ganti gigi depan yang hilang dengan Bridge gigi permanen. Solusi cepat dan estetik untuk mengembalikan fungsi bicara dan kepercayaan diri Anda. Bridge akan menyatu sempurna dengan gigi alami Anda. Dapatkan Bridge gigi berkualitas tinggi di Payakumbuh.",
    },
    {
        title: "Pemasangan Crown / Jaket Gigi (Pelindung) Gigi Belakang",
        beforeImage: crownSebelum,
        afterImage: crownSetelah,
        description:
            "Crown gigi berfungsi melindungi gigi yang rusak parah (setelah PSA atau tambalan besar) dari patah. Crown berkualitas di SSDC mengembalikan kekuatan, bentuk, dan fungsi gigitan. Konsultasikan jenis material Crown yang tepat untuk Anda.",
    },
    {
        title: "Scaling Gigi & Pembersihan Karang Gigi Profesional di Payakumbuh",
        beforeImage: skelingSebelum,
        afterImage: skelingSesudah,
        description:
            "Bersihkan karang gigi, plak, dan noda membandel yang menyebabkan bau mulut dan radang gusi. Scaling teratur menjaga kesehatan mulut dan mencegah penyakit gusi. Rasakan sensasi gigi bersih optimal hanya di SSDC.",
    },
    {
        title: "Tambal Gigi Resin Komposit Tahan Lama untuk Gigi Belakang",
        beforeImage: tambalResinSebelum,
        afterImage: tambalResinSesudah,
        description:
            "Mengembalikan bentuk dan fungsi gigitan pada gigi geraham yang berlubang. Kami menggunakan resin komposit kualitas premium yang kuat dan tahan lama, cocok untuk menahan tekanan saat mengunyah. Dapatkan penanganan cepat dan nyaman.",
    },
];

// ─── Before/After toggle ────────────────────────────────────────────
const showAfter = ref(false);
/** @type {ReturnType<typeof setInterval> | null} */
let intervalId = null;

// ─── Embla refs ──────────────────────────────────────────────────────
const emblaViewport = ref(null);
/** @type {import('embla-carousel').EmblaCarouselType | null} */
let embla = null;

// ─── Slide count & active index ─────────────────────────────────────
const selectedIndex = ref(0);
const slideCount = computed(() => cases.length);

// ─── Dot-indicator update ────────────────────────────────────────────
const onSelect = () => {
    if (!embla) return;
    // Embla loop mode wraps around; selectedScrollSnap() always returns
    // the real index (0 – slideCount-1) regardless of loop clones.
    selectedIndex.value = embla.selectedScrollSnap();
};

// ─── Lifecycle ───────────────────────────────────────────────────────
onMounted(() => {
    // Before/after image toggle every 3 s
    intervalId = setInterval(() => {
        showAfter.value = !showAfter.value;
    }, 3000);

    if (!emblaViewport.value) return;

    embla = EmblaCarousel(emblaViewport.value, {
        loop: true,           // Embla handles infinite loop natively — no manual cloning needed
        align: 'start',
        slidesToScroll: 1,
        dragFree: false,      // Snap after every drag (prevents mid-card stops)
        containScroll: false, // Required for loop to work correctly
    });

    embla.on('select', onSelect);
    onSelect(); // Set initial state
});

onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
    }
    embla?.destroy();
    embla = null;
});

// ─── Button navigation ───────────────────────────────────────────────
const scrollPrev = () => embla?.scrollPrev();
const scrollNext = () => embla?.scrollNext();
const scrollTo  = (i) => embla?.scrollTo(i);
</script>

<template>
  <section id="testimoni" class="py-20 px-6 bg-gray-100 overflow-hidden relative">
    <div class="mx-auto max-w-7xl">

      <!-- Heading -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] mb-2">
          Lihat Perubahannya <span class="text-[#6E1A7E]">(Before &amp; After)</span>
        </h2>
        <p class="text-xl text-[#6E1A7E]">
          Kami menciptakan senyum terbaik untuk setiap pasien.
        </p>
      </div>

      <!-- Embla Carousel -->
      <div class="relative w-full">

        <!--
          Trick standard Embla untuk outer spacing:
          -mx-2 di viewport memperlebar area clip ke luar,
          px-2 per slide menghasilkan gap simetris di semua sisi.
          Hasilnya: 8px di kiri card pertama, 16px antar card, 8px di kanan card terakhir.
        -->
        <div ref="emblaViewport" class="overflow-hidden -mx-2">
          <div class="flex">
            <div
              v-for="(item, index) in cases"
              :key="index"
              class="flex-none w-full md:w-1/2 lg:w-1/3 px-2"
            >
              <TestimoniCard :item="item" :showAfter="showAfter" />
            </div>
          </div>
        </div>

        <!-- Tombol navigasi — hanya tampil di md ke atas -->
        <button
          @click="scrollPrev"
          class="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 btn btn-circle btn-primary bg-[#6E1A7E] border-none text-white shadow-lg opacity-70 hover:opacity-100 z-10 -ml-5"
          aria-label="Slide Sebelumnya"
        >❮</button>
        <button
          @click="scrollNext"
          class="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 btn btn-circle btn-primary bg-[#6E1A7E] border-none text-white shadow-lg opacity-70 hover:opacity-100 z-10 -mr-5"
          aria-label="Slide Berikutnya"
        >❯</button>
      </div>

      <!-- Dot indicator + swipe hint (mobile) -->
      <div class="flex flex-col items-center gap-2 mt-4">
        <div class="flex gap-2">
          <button
            v-for="(_, i) in slideCount"
            :key="i"
            @click="scrollTo(i)"
            class="w-2.5 h-2.5 rounded-full transition-all duration-300"
            :class="selectedIndex === i ? 'bg-[#6E1A7E] scale-125' : 'bg-[#6E1A7E]/30'"
            :aria-label="`Ke slide ${i + 1}`"
          />
        </div>
        <p class="md:hidden text-xs text-[#6E1A7E]/60 select-none" aria-hidden="true">
          ← Geser untuk melihat lebih →
        </p>
      </div>

    </div>
  </section>
</template>
