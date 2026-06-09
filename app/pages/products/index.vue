<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'

import { useProducts, type Product } from '~/composables/useProducts'

const { products, rupiah, rupiahRange } = useProducts()

// Router state
const router = useRouter()
const route = useRoute()

// Query-bound filter states
const categories = [
  'All',
  'pembersihan',
  'tambal-gigi',
  'saluran-akar',
  'pencabutan',
  'estetika',
  'pemutihan',
  'ortodonti',
  'mahkota',
  'rontgen',
] as const

/** Label kategori dalam Bahasa Indonesia untuk ditampilkan di tombol filter */
const categoryLabels: Record<string, string> = {
  'All':          'Semua',
  'pembersihan':  'Scaling',
  'tambal-gigi':  'Tambal Gigi',
  'saluran-akar': 'Saluran Akar',
  'pencabutan':   'Pencabutan',
  'estetika':     'Estetika',
  'pemutihan':    'Bleaching',
  'ortodonti':    'Ortodonti',
  'mahkota':      'Crown & Gigi Palsu',
  'rontgen':      'Rontgen',
}
const q = ref<string>((route.query.q as string) || '')
const category = ref<string>((route.query.cat as string) || 'All')
const sortBy = ref<string>((route.query.sort as string) || 'popular')
const minPrice = ref<number>(Number(route.query.min ?? 0))
const maxPrice = ref<number>(Number(route.query.max ?? 20000000))
const page = ref<number>(Number(route.query.page ?? 1))
const pageSize = ref<number>(12)

// SEO — title menyertakan nama klinik + lokasi untuk local search intent
useHead({
  title: 'Layanan Perawatan Gigi Lengkap \u2013 SSDC Senyum Sehat Dental Care Payakumbuh',
  meta: [
    {
      name: 'description',
      content: 'Temukan layanan perawatan gigi lengkap di SSDC Payakumbuh: scaling, behel, bleaching, veneer, crown, tambal gigi, dan perawatan anak. Konsultasi gratis via WhatsApp.',
    },
    {
      name: 'keywords',
      content: 'dokter gigi Payakumbuh, scaling gigi Payakumbuh, behel gigi Payakumbuh, bleaching gigi, veneer gigi, cabut gigi, perawatan saluran akar, klinik gigi Lima Puluh Kota',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://ssdc.my.id/products' },
    { property: 'og:title', content: 'Layanan Perawatan Gigi \u2013 SSDC Senyum Sehat Dental Care Payakumbuh' },
    {
      property: 'og:description',
      content: 'Layanan dokter gigi lengkap di Payakumbuh: scaling, behel, bleaching, veneer, crown, tambal gigi, dan lebih banyak lagi. Daftar konsultasi gratis sekarang!',
    },
    { property: 'og:image', content: 'https://ssdc.my.id/og-image.jpg' },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Layanan Perawatan Gigi SSDC Payakumbuh' },
  ],
  link: [
    { rel: 'canonical', href: 'https://ssdc.my.id/products' },
  ],
})

function syncQuery () {
  router.replace({
    query: {
      q: q.value || undefined,
      cat: category.value !== 'All' ? category.value : undefined,
      sort: sortBy.value !== 'popular' ? sortBy.value : undefined,
      min: minPrice.value || undefined,
      max: maxPrice.value !== 20000000 ? maxPrice.value : undefined,
      page: page.value !== 1 ? page.value : undefined
    }
  })
}

// Debounced search & filter application for smoother UX
let debounceId: ReturnType<typeof setTimeout> | null = null
function applyFiltersDebounced() {
  if (debounceId) clearTimeout(debounceId)
  debounceId = setTimeout(() => {
    page.value = 1
    syncQuery()
  }, 320)
}

function applyFiltersImmediate() {
  page.value = 1
  syncQuery()
}

// Keep local state in sync if user edits URL
watch(() => route.query, (qRoute) => {
  q.value = (qRoute.q as string) || ''
  category.value = (qRoute.cat as string) || 'All'
  sortBy.value = (qRoute.sort as string) || 'popular'
  minPrice.value = Number(qRoute.min ?? 0)
  maxPrice.value = Number(qRoute.max ?? 20000000)
  page.value = Number(qRoute.page ?? 1)
})

// Derived collections
const filtered = computed(() => {
  const ql = q.value.trim().toLowerCase()
  return products.value.filter(p => {
    const matchCat = category.value === 'All' || p.category === category.value
    const matchQ = !ql || p.name.toLowerCase().includes(ql) || p.tags?.some(t => t.toLowerCase().includes(ql))
    const matchPrice = p.price >= minPrice.value && p.price <= maxPrice.value
    return matchCat && matchQ && matchPrice
  })
})

const sorted = computed(() => {
  const arr = [...filtered.value]
  switch (sortBy.value) {
    case 'price_asc':  arr.sort((a,b)=>a.price-b.price); break
    case 'price_desc': arr.sort((a,b)=>b.price-a.price); break
    default:           arr.sort((a,b)=>Number(b.isBest)-Number(a.isBest)) // popular
  }
  return arr
})

const totalPages = computed(() => Math.max(1, Math.ceil(sorted.value.length / pageSize.value)))
const paginated = computed(() => {
  const start = (page.value - 1) * pageSize.value
  return sorted.value.slice(start, start + pageSize.value)
})

function goPage(p: number) {
  page.value = Math.min(Math.max(1, p), totalPages.value)
  syncQuery()
  // Scroll ke atas setelah ganti halaman agar user mulai dari product pertama
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Optional: focus search on mount for desktop
const searchEl = ref<HTMLInputElement | null>(null)
onMounted(() => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    searchEl.value?.focus()
  }
})

onUnmounted(() => {
  // Cleanup debounce timer agar tidak fire setelah komponen di-destroy
  if (debounceId) clearTimeout(debounceId)
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10">
    <!-- Title & breadcrumb -->
    <div class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h1 class="text-2xl md:text-3xl font-extrabold tracking-tight">Daftar Produk Perawatan Gigi</h1>
        <p class="text-sm opacity-70">Temukan layanan perawatan gigi terbaik, dari pemutihan hingga pembersihan karang gigi, untuk senyuman yang lebih sehat!</p>
      </div>
      <nav class="text-sm breadcrumbs hidden md:block" aria-label="Breadcrumb">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li aria-current="page">Produk Perawatan Gigi</li>
        </ul>
      </nav>
    </div>

    <!-- Sticky Toolbar -->
    <div class="mt-6 md:sticky md:top-14 md:z-10 bg-base-100/80 backdrop-blur supports-[backdrop-filter]:bg-base-100/60 rounded-xl border border-base-300 p-3 md:p-4">

      <!-- Baris 1: Search + Sort + Filter Harga -->
      <div class="grid gap-2 items-center grid-cols-1 sm:grid-cols-[1fr_auto]">
        <!-- Search -->
        <label class="input input-bordered flex items-center gap-2 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 opacity-60 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z"/></svg>
          <input ref="searchEl" v-model="q" @input="applyFiltersDebounced" @keyup.enter="applyFiltersImmediate"
            type="text" class="grow min-w-0" placeholder="Cari layanan..." aria-label="Cari produk" />
        </label>

        <!-- Sort + Filter Harga -->
        <div class="flex gap-2 items-center">
          <select v-model="sortBy" class="select select-bordered select-sm" @change="applyFiltersImmediate" aria-label="Urutkan produk">
            <option value="popular">Terpopuler</option>
            <option value="price_asc">Murah dulu</option>
            <option value="price_desc">Mahal dulu</option>
          </select>

          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-outline btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/></svg>
              Harga
            </div>
            <div tabindex="0" class="dropdown-content z-[200] mt-2 card card-compact bg-base-100 w-72 p-4 shadow-lg border border-base-300">
              <div class="grid grid-cols-2 gap-3">
                <label class="form-control">
                  <div class="label"><span class="label-text">Min (Rp)</span></div>
                  <input v-model.number="minPrice" type="number" class="input input-bordered input-sm w-full" min="0" step="50000" placeholder="0" />
                </label>
                <label class="form-control">
                  <div class="label"><span class="label-text">Max (Rp)</span></div>
                  <input v-model.number="maxPrice" type="number" class="input input-bordered input-sm w-full" min="0" step="50000" placeholder="20000000" />
                </label>
              </div>
              <div class="mt-2 text-xs opacity-60 truncate">
                {{ rupiah(minPrice) }} – {{ rupiah(maxPrice) }}
              </div>
              <div class="mt-2 flex justify-end">
                <button class="btn btn-primary btn-sm" @click="applyFiltersImmediate">Terapkan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Baris 2: Kategori horizontal scroll -->
      <div class="mt-2 relative">
        <!-- Fade indicator kanan supaya user tahu ada scroll -->
        <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-base-100/90 to-transparent pointer-events-none z-10 rounded-r-lg" aria-hidden="true"></div>
        <div class="overflow-x-auto no-scrollbar pb-1">
          <div class="flex gap-1.5 w-max">
            <button v-for="c in categories" :key="c" type="button"
              class="btn btn-xs rounded-full whitespace-nowrap"
              :class="category === c ? 'btn-primary bg-[#6E1A7E] border-none text-white' : 'btn-ghost border border-base-300'"
              @click="category = c; applyFiltersImmediate()">{{ categoryLabels[c] ?? c }}</button>
          </div>
        </div>
      </div>

      <!-- Active filter chips -->
      <div class="mt-2 flex flex-wrap gap-2 text-xs">
        <span v-if="q" class="badge badge-ghost gap-1">Kata kunci: <span class="font-medium">"{{ q }}"</span>
          <button class="btn btn-ghost btn-xs" @click="q=''; applyFiltersImmediate()" aria-label="Hapus kata kunci">✕</button>
        </span>
        <span v-if="category!=='All'" class="badge badge-ghost gap-1">Kategori: <span class="font-medium">{{ category }}</span>
          <button class="btn btn-ghost btn-xs" @click="category='All'; applyFiltersImmediate()" aria-label="Hapus kategori">✕</button>
        </span>
        <span v-if="minPrice>0 || maxPrice<20000000" class="badge badge-ghost gap-1">Harga: <span class="font-medium">{{ rupiah(minPrice) }}–{{ rupiah(maxPrice) }}</span>
          <button class="btn btn-ghost btn-xs" @click="minPrice=0; maxPrice=20000000; applyFiltersImmediate()" aria-label="Reset harga">✕</button>
        </span>
        <button v-if="q || category!=='All' || minPrice>0 || maxPrice<20000000" class="btn btn-ghost btn-xs" @click="q=''; category='All'; minPrice=0; maxPrice=20000000; applyFiltersImmediate()">Reset semua</button>
      </div>
    </div>

    <!-- Stats -->
    <div class="mt-4 text-sm opacity-70">
      Menampilkan <span class="font-semibold">{{ paginated.length }}</span> dari
      <span class="font-semibold">{{ filtered.length }}</span> hasil (hal. {{ page }} / {{ totalPages }})
    </div>

    <!-- Product Grid -->
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <article v-for="p in paginated" :key="p.id" class="card bg-base-100 border border-base-300/60 hover:border-primary/40 transition duration-200 shadow-sm hover:shadow-lg group">
        <figure class="relative aspect-[4/3] overflow-hidden rounded-t-xl">
          <img
            :src="p.image + '?auto=format&fit=crop&w=800&q=60'"
            :alt="p.name"
            class="h-full w-full object-cover will-change-transform group-hover:scale-[1.03] transition"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 25vw, 300px"
          />
          <div class="absolute left-2 top-2 flex gap-2">
            <div v-if="p.isNew" class="badge badge-info badge-sm">Baru</div>
            <div v-if="p.isBest" class="badge badge-warning badge-sm">Best</div>
            <div class="badge badge-ghost badge-sm">{{ p.category }}</div>
          </div>
        </figure>
        <div class="card-body p-4">
          <h3 class="card-title text-base leading-tight line-clamp-2 min-h-[2.5rem]">{{ p.name }}</h3>

          <div class="flex flex-wrap gap-2 min-h-6">
            <div v-for="t in p.tags" :key="t" class="badge badge-outline badge-sm">{{ t }}</div>
          </div>

          <div class="mt-1 text-lg font-bold">{{ rupiahRange(p) }}</div>

          <div class="card-actions mt-2 items-center justify-between">
            <NuxtLink :to="`/products/${p.slug}`" class="btn btn-sm">Detail</NuxtLink>
          </div>
        </div>
      </article>
    </div>

    <!-- Empty state -->
    <div v-if="filtered.length===0" class="mt-10">
      <div class="mockup-browser border bg-base-300">
        <div class="mockup-browser-toolbar">
          <div class="input">Tidak ada produk untuk filter saat ini…</div>
        </div>
        <div class="p-6">
          <p class="opacity-70">Coba ubah kata kunci atau rentang harga.</p>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages>1" class="mt-8 join grid grid-cols-2 sm:join-horizontal">
      <button class="btn join-item" :disabled="page===1" @click="goPage(page-1)" aria-label="Halaman sebelumnya">« Prev</button>
      <button class="btn join-item" :disabled="page===totalPages" @click="goPage(page+1)" aria-label="Halaman berikutnya">Next »</button>
    </div>
  </section>
</template>

<style scoped>
/* Hide horizontal scrollbar for category tabs on small screens (decorative) */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
