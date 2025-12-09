<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  showAfter: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex flex-col h-full w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-[#6E1A7E]/20 select-none cursor-pointer">
    <!-- Image Before/After -->
    <div class="relative w-full h-64 overflow-hidden shrink-0 pointer-events-none">
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

    <!-- Text Content -->
    <div class="p-5 text-center flex-grow flex flex-col justify-between">
      <div>
        <h3 class="text-xl font-bold text-[#6E1A7E] mb-2 line-clamp-2 min-h-[3.5rem]">
          {{ item.title }}
        </h3>
        <p class="text-gray-600 text-sm line-clamp-4">
          {{ item.description }}
        </p>
      </div>
    </div>
  </div>
</template>
