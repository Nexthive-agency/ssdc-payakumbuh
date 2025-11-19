<script setup>
import { ref, onMounted } from 'vue';

import bridgeSebelum from '~/assets/beforAfterImage/bridge_gigi_depan_befor.jpeg';
import bridgeSetelah from '~/assets/beforAfterImage/bridge_gigi_depanAfter.jpeg';
import crownSebelum from '~/assets/beforAfterImage/Crown_gigi_belakang_sebelum.jpeg';
import crownSetelah from '~/assets/beforAfterImage/Crown_gigi_belakang_sesudah.jpeg';
import skelingSebelum from '~/assets/beforAfterImage/skeling_gigi_sebelum.jpeg';
import skelingSesudah from '~/assets/beforAfterImage/skeling_gigi_sesudah.jpeg';
import tambalResinSebelum from '~/assets/beforAfterImage/tambal_serin_komposit_sebelum.jpeg';
import tambalResinSesudah from '~/assets/beforAfterImage/tambal_resin_komposit_sesudah.jpeg';
const beforeAfterCases = [
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

// Track the currently displayed image
const showAfter = ref(false);

// Change the image every 3 seconds
onMounted(() => {
    setInterval(() => {
        showAfter.value = !showAfter.value;
    }, 3000); // Change every 3 seconds
});
</script>
<template>
  <section id="testimoni" class="py-20 px-6 bg-gray-100 overflow-hidden">
    <div class="mx-auto max-w-7xl">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] mb-2">
          Lihat Perubahannya <span class="text-[#6E1A7E]">(Before & After)</span>
        </h2>
        <p class="text-xl text-[#6E1A7E]">
          Kami menciptakan senyum terbaik untuk setiap pasien.
        </p>
      </div>

      <!-- Satu slide per layar -->
      <div class="carousel w-full">
        <div
          v-for="(item, index) in beforeAfterCases"
          :key="index"
          class="carousel-item relative w-full"
          :id="`slide-${index + 1}`"
        >
          <div class="flex justify-center p-4 w-full">
            <div
              class="bg-white rounded-2xl shadow-xl overflow-hidden transition duration-300 border border-[#6E1A7E]/20 w-full max-w-xl"
            >
              <div class="relative w-full h-64 md:h-80 overflow-hidden">
                <img
                  :src="item.beforeImage"
                  :alt="`Sebelum: ${item.title}`"
                  class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
                  :class="{ 'opacity-0': showAfter, 'opacity-100': !showAfter }"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center text-white bg-black/40 transition-opacity duration-500"
                  :class="{ 'opacity-0': showAfter, 'opacity-100': !showAfter }"
                >
                  <span class="text-2xl font-bold">SEBELUM</span>
                </div>

                <img
                  :src="item.afterImage"
                  :alt="`Sesudah: ${item.title}`"
                  class="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
                  :class="{ 'opacity-100': showAfter, 'opacity-0': !showAfter }"
                />
                <div
                  class="absolute inset-0 flex items-center justify-center text-white bg-[#6E1A7E]/60 transition-opacity duration-500"
                  :class="{ 'opacity-100': showAfter, 'opacity-0': !showAfter }"
                >
                  <span class="text-2xl font-bold">SESUDAH</span>
                </div>
              </div>

              <div class="p-5 text-center">
                <h3 class="text-xl font-bold text-[#6E1A7E] mb-2">
                  {{ item.title }}
                </h3>
                <p class="text-gray-600 text-sm">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>

          <!-- Panah dinamis -->
          <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
            <a
              class="btn btn-circle"
              :href="`#slide-${((index - 1 + beforeAfterCases.length) % beforeAfterCases.length) + 1}`"
              aria-label="Sebelumnya"
            >❮</a>
            <a
              class="btn btn-circle"
              :href="`#slide-${((index + 1) % beforeAfterCases.length) + 1}`"
              aria-label="Berikutnya"
            >❯</a>
          </div>
        </div>
      </div>

      <!-- Opsi: indikator titik (opsional) -->
      <div class="flex justify-center gap-2 mt-6">
        <a
          v-for="(item, index) in beforeAfterCases"
          :key="'dot-' + index"
          class="btn btn-xs"
          :href="`#slide-${index + 1}`"
        >
          {{ index + 1 }}
        </a>
      </div>
    </div>
  </section>
</template>
