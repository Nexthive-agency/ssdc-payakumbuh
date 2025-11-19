<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
// Sembunyikan anchor jika di halaman products
const hideAnchors = computed(() => route.path.startsWith('/products'))
</script>

<template>

  <div class="navbar bg-base-100 shadow-sm sticky top-0 z-50 ">
    <div class="container mx-auto flex">
      <div class="flex-1">
        <NuxtLink to="/" class="flex items-center">
          <img class="h-11 rounded-full mx-4" src="~/assets/img/ssdc_logo.jpg" alt="ini logo">
        </NuxtLink>
      </div>

      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>

          <!-- Tersembunyi saat di /products -->
          <li v-if="!hideAnchors">
            <a href="#testimoni">Testimoni</a>
          </li>
          <li v-if="!hideAnchors">
            <a href="#maps">Maps</a>
          </li>

          <li>
            <NuxtLink to="/products">Products</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
