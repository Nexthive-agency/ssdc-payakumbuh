<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'

import { useProducts, type Product } from '~/composables/useProducts'

const { products, rupiah } = useProducts()

// Router state
const router = useRouter()
const route = useRoute()

// Query-bound filter states
const categories = ['All','scaling','whitening','checkup','root-canal', 'crown', 'xrays', 'fillings'] as const
const q = ref<string>((route.query.q as string) || '')
const category = ref<string>((route.query.cat as string) || 'All')
const sortBy = ref<string>((route.query.sort as string) || 'popular')
const minPrice = ref<number>(Number(route.query.min ?? 0))
const maxPrice = ref<number>(Number(route.query.max ?? 20000000))
const page = ref<number>(Number(route.query.page ?? 1))
const pageSize = ref<number>(12)

// SEO (optimized for better search engine visibility)
useHead({
  title: 'Daftar Produk Kesehatan Gigi – Toko Dokter Gigi Terpercaya',
  meta: [
    { name: 'description', content: 'Temukan berbagai layanan perawatan gigi terbaik di Toko Dokter Gigi kami. Dapatkan pemutihan gigi, pembersihan karang gigi, dan perawatan lainnya untuk senyuman yang lebih sehat!' },
    { name: 'keywords', content: 'dokter gigi, pemutihan gigi, pembersihan karang gigi, perawatan saluran akar, perawatan gigi, kesehatan gigi, scaling, whitening' },
    { name: 'robots', content: 'index, follow' }
  ]
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
}

// Optional: focus search on mount for desktop
const searchEl = ref<HTMLInputElement | null>(null)
onMounted(() => {
  if (window.matchMedia('(min-width: 1024px)').matches) {
    searchEl.value?.focus()
  }
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
      <div class="grid grid-cols-1 gap-3 md:grid-cols-12 md:items-end">
        <!-- Search -->
        <label class="input input-bordered flex items-center gap-2 md:col-span-5">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 opacity-60" viewBox="0 0 24 24" fill="currentColor"><path d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 5.5 5.5a7.5 7.5 0 0 0 11.15 11.15Z"/></svg>
          <input ref="searchEl" v-model="q" @input="applyFiltersDebounced" @keyup.enter="applyFiltersImmediate" type="text" class="grow" placeholder="Cari produk, tag..." aria-label="Cari produk" />
          <button class="btn btn-sm" @click="applyFiltersImmediate">Cari</button>
        </label>

        <!-- Categories Tabs (scrollable on small) -->
        <div class="md:col-span-3 overflow-x-auto no-scrollbar">
          <div class="tabs tabs-boxed w-max md:w-full">
            <button v-for="c in categories" :key="c" type="button"
              class="tab whitespace-nowrap"
              :class="{ 'tab-active': category===c }"
              @click="category = c; applyFiltersImmediate()">{{ c }}</button>
          </div>
        </div>

        <!-- Sorter -->
        <label class="form-control md:col-span-2">
          <select v-model="sortBy" class="select select-bordered" @change="applyFiltersImmediate" aria-label="Urutkan produk">
            <option value="popular">Terpopuler</option>
            <option value="rating">Rating</option>
            <option value="price_asc">Harga: Murah → Mahal</option>
            <option value="price_desc">Harga: Mahal → Murah</option>
          </select>
        </label>

        <!-- Price Filter -->
        <div class="md:col-span-2">
          <div class="dropdown dropdown-end w-full">
            <div tabindex="0" role="button" class="btn btn-outline w-full">Filter Harga</div>
            <div tabindex="0" class="dropdown-content z-[1] card card-compact bg-base-100 w-80 p-4 shadow">
              <div class="grid grid-cols-2 gap-3">
                <label class="form-control">
                  <div class="label"><span class="label-text">Min</span></div>
                  <input v-model.number="minPrice" type="number" class="input input-bordered" min="0" step="1000" />
                </label>
                <label class="form-control">
                  <div class="label"><span class="label-text">Max</span></div>
                  <input v-model.number="maxPrice" type="number" class="input input-bordered" min="0" step="1000" />
                </label>
              </div>
              <div class="mt-3 flex justify-between items-center">
                <span class="text-xs opacity-70">{{ rupiah(minPrice) }} – {{ rupiah(maxPrice) }}</span>
                <button class="btn btn-primary btn-sm" @click="applyFiltersImmediate">Terapkan</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active filter chips -->
      <div class="mt-3 flex flex-wrap gap-2 text-xs">
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

          <div class="mt-1 text-lg font-bold">{{ rupiah(p.price) }}</div>

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
