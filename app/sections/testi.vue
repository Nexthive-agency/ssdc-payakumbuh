<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';

import bridgeSebelum from '~/assets/beforAfterImage/bridge_gigi_depan_befor.jpeg';
import bridgeSetelah from '~/assets/beforAfterImage/bridge_gigi_depanAfter.jpeg';
import crownSebelum from '~/assets/beforAfterImage/Crown_gigi_belakang_sebelum.jpeg';
import crownSetelah from '~/assets/beforAfterImage/Crown_gigi_belakang_sesudah.jpeg';
import skelingSebelum from '~/assets/beforAfterImage/skeling_gigi_sebelum.jpeg';
import skelingSesudah from '~/assets/beforAfterImage/skeling_gigi_sesudah.jpeg';
import tambalResinSebelum from '~/assets/beforAfterImage/tambal_serin_komposit_sebelum.jpeg';
import tambalResinSesudah from '~/assets/beforAfterImage/tambal_resin_komposit_sesudah.jpeg';

import TestimoniCard from '~/components/TestimoniCard.vue';

const originalCases = [
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

// Duplicate cases 3 times for infinite scroll loop [Set A, Set B, Set C]
const displayCases = computed(() => [...originalCases, ...originalCases, ...originalCases]);

// Track the currently displayed image
const showAfter = ref(false);
const carouselContainer = ref(null);

// Change the image every 3 seconds
onMounted(async () => {
    setInterval(() => {
        showAfter.value = !showAfter.value;
    }, 3000); // Change every 3 seconds

    // Initialize scroll position to the Start of Middle Set (Set B)
    await nextTick();
    if (carouselContainer.value) {
        // Calculate scroll width of one set
        const oneSetWidth = carouselContainer.value.scrollWidth / 3;
        carouselContainer.value.scrollLeft = oneSetWidth;
    }
});

const handleScroll = () => {
    if (!carouselContainer.value) return;

    const container = carouselContainer.value;
    const totalWidth = container.scrollWidth;
    const oneSetWidth = totalWidth / 3;
    const scrollLeft = container.scrollLeft;

    // Check bounds (Aggressive reset to keep in Set B)
    // Set B range: [oneSetWidth, 2*oneSetWidth]
    
    // If we are too far left (entering Set A) -> Jump forward to Set B relative position
    if (scrollLeft < 50) { // Near absolute start (Set A start)
         container.style.scrollBehavior = 'auto'; // Instant jump
         container.scrollLeft += oneSetWidth;
         container.style.scrollBehavior = ''; 
    } 
    // If we are too far right (entering Set C end) -> Jump back to Set B relative position
    else if (scrollLeft > oneSetWidth * 2 + oneSetWidth / 2) { // Deep into Set C
         container.style.scrollBehavior = 'auto'; // Instant jump
         container.scrollLeft -= oneSetWidth;
         container.style.scrollBehavior = '';
    }
    // Note: Intermediate checks can be added, but pre-jump in button is smoother
};

const scroll = (direction) => {
  if (carouselContainer.value) {
    const container = carouselContainer.value;
    const scrollAmount = container.clientWidth / (window.innerWidth >= 1024 ? 3 : 1);
    const oneSetWidth = container.scrollWidth / 3;
    
    // PRE-JUMP LOGIC: Ensure we are in a safe scrolling zone (Set B) BEFORE animating
    container.style.scrollBehavior = 'auto';
    
    if (direction === 'left') {
        // If we in Set A (Left of Set B), jump forward to Set B
        if (container.scrollLeft < oneSetWidth) {
             container.scrollLeft += oneSetWidth;
        }
    } else { // Right
        // If we are in Set C (Right of Set B), jump backward to Set B
        if (container.scrollLeft >= 2 * oneSetWidth) {
             container.scrollLeft -= oneSetWidth;
        }
    }
    
    // Force layout update to ensure browser registers the jump
    // (void container.offsetWidth) is a trick, but requestAnimationFrame or just proceeding works in most modern browsers
    
    container.style.scrollBehavior = ''; // Restore smooth

    // Now Scroll
    // Use requestAnimationFrame to let the "auto" jump resolve first if needed
    requestAnimationFrame(() => {
        container.scrollTo({
        left: container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
        });
    });
  }
};
</script>
<template>
  <section id="testimoni" class="py-20 px-6 bg-gray-100 overflow-hidden relative group">
    <div class="mx-auto max-w-7xl relative">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] mb-2">
          Lihat Perubahannya <span class="text-[#6E1A7E]">(Before & After)</span>
        </h2>
        <p class="text-xl text-[#6E1A7E]">
          Kami menciptakan senyum terbaik untuk setiap pasien.
        </p>
      </div>

      <!-- Carousel Container -->
      <div class="relative w-full"> 
         <div 
            ref="carouselContainer" 
            @scroll="handleScroll"
            class="carousel carousel-center w-full p-4 space-x-4 rounded-box overflow-x-auto scroll-smooth no-scrollbar"
         >
            <div
            v-for="(item, index) in displayCases"
            :key="index"
            class="carousel-item w-full md:w-1/2 lg:w-1/3 transition-transform duration-300"
            >
              <TestimoniCard :item="item" :showAfter="showAfter" />
            </div>
        </div>

        <!-- Global Navigation Buttons -->
        <button 
            @click="scroll('left')" 
            class="absolute left-0 top-1/2 -translate-y-1/2 btn btn-circle btn-primary bg-[#6E1A7E] border-none text-white shadow-lg opacity-70 hover:opacity-100 z-10 -ml-2 md:-ml-5 hidden md:flex"
            aria-label="Previous Slide">
            ❮
        </button>
        <button 
            @click="scroll('right')" 
            class="absolute right-0 top-1/2 -translate-y-1/2 btn btn-circle btn-primary bg-[#6E1A7E] border-none text-white shadow-lg opacity-70 hover:opacity-100 z-10 -mr-2 md:-mr-5 hidden md:flex"
            aria-label="Next Slide">
            ❯
        </button>
      </div>
      
      <!-- Mobile Only Indicator/Swipe Hint (Optional) -->
      <div class="flex justify-center gap-2 mt-4 md:hidden">
         <span class="text-sm text-gray-400 italic">Geser untuk melihat lainnya</span>
      </div>

    </div>
  </section>
</template>

