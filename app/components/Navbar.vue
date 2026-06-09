<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideAnchors = computed(() => route.path.startsWith('/products') || route.path.startsWith('/daftar'))

// Mobile menu state
const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }
</script>

<template>
  <!-- Navbar utama -->
  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50">
    <div class="container mx-auto flex items-center">

      <!-- Logo -->
      <div class="flex-1">
        <NuxtLink to="/" class="flex items-center" @click="closeMenu">
          <img class="h-11 rounded-full mx-4" src="~/assets/img/ssdc_logo.webp"
            alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh" width="44" height="44">
        </NuxtLink>
      </div>

      <!-- Desktop Menu (md ke atas) -->
      <div class="hidden md:flex flex-none">
        <ul class="menu menu-horizontal px-1">
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li v-if="!hideAnchors"><a href="#testimoni">Testimoni</a></li>
          <li v-if="!hideAnchors"><a href="#maps">Maps</a></li>
          <li><NuxtLink to="/products">Layanan</NuxtLink></li>
        </ul>
      </div>

      <!-- Hamburger Button (mobile only, md:hidden) -->
      <button
        id="navbar-hamburger"
        class="md:hidden btn btn-ghost btn-square mr-2"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        aria-label="Buka menu navigasi"
        @click.stop="toggleMenu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
          viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path v-if="!menuOpen" stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>

  <!--
    Teleport ke body — dropdown dan backdrop di-render LANGSUNG di <body>,
    bukan di dalam navbar. Ini bypass semua overflow/z-index constraint navbar.
    position: fixed + top-[64px] = tepat di bawah navbar (h-16 = 64px).
  -->
  <Teleport to="body">
    <!-- Backdrop (klik untuk tutup menu) -->
    <Transition name="fade">
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-[48] bg-black/20 md:hidden"
        style="top: 64px"
        aria-hidden="true"
        @click="closeMenu"
      />
    </Transition>

    <!-- Mobile Menu Dropdown -->
    <Transition name="slide-down">
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="fixed left-0 right-0 z-[49] bg-base-100 border-t border-base-200 shadow-xl md:hidden"
        style="top: 64px"
      >
        <ul class="menu menu-vertical p-3 gap-1">
          <li>
            <NuxtLink to="/" class="text-base font-medium py-3" @click="closeMenu">
              🏠 Home
            </NuxtLink>
          </li>
          <li v-if="!hideAnchors">
            <a href="#testimoni" class="text-base font-medium py-3" @click="closeMenu">
              ⭐ Testimoni
            </a>
          </li>
          <li v-if="!hideAnchors">
            <a href="#maps" class="text-base font-medium py-3" @click="closeMenu">
              📍 Maps
            </a>
          </li>
          <li>
            <NuxtLink to="/products" class="text-base font-medium py-3" @click="closeMenu">
              🦷 Layanan
            </NuxtLink>
          </li>
          <li class="mt-2 pb-2">
            <NuxtLink
              to="/daftar"
              class="btn bg-[#6E1A7E] text-white border-none hover:bg-[#52135f] w-full justify-center"
              @click="closeMenu"
            >
              Daftar Sekarang
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Slide down untuk mobile menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: opacity 0.2s ease, transform 0.22s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Fade untuk backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
