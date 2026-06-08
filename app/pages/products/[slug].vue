<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter, useHead } from '#imports'
import { createError } from '#app'
import { useProducts, type SubService } from '~/composables/useProducts'

// Assume this composable exists per your snippet
const { bySlug, byCategory, rupiah } = useProducts()

const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug))
const product = computed(() => bySlug(slug.value))

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Produk tidak ditemukan' })
}

// Tabs — dinamis: tab "Paket & Harga" muncul hanya jika produk punya subServices
const tabs = computed(() => {
  const t: Array<{ key: string; label: string }> = [
    { key: 'specs', label: 'Spesifikasi' },
  ]
  if (product.value?.subServices?.length) {
    t.push({ key: 'pricing', label: 'Paket & Harga' })
  }
  return t
})
const activeTab = ref<string>('specs')

/**
 * Sub-layanan dikelompokkan berdasarkan field `group`.
 * Jika tidak ada group → semua masuk ke grup tanpa nama ('').
 */
const subServiceGroups = computed(() => {
  if (!product.value?.subServices?.length) return []
  const map = new Map<string, SubService[]>()
  for (const s of product.value.subServices) {
    const key = s.group ?? ''
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(s)
  }
  return Array.from(map.entries()).map(([name, items]) => ({ name, items }))
})


// Toast
/**
 * Navigasi ke halaman /daftar dengan query param layanan pre-filled.
 * Tidak langsung redirect ke WhatsApp agar tidak dianggap bridge page oleh Google Ads.
 */
function ambilAntrian() {
  router.push({
    path: '/daftar',
    query: { layanan: product.value!.name },
  })
}

// Related
const related = computed(() => byCategory(product.value!.category, product.value!.slug).slice(0, 4))

// SEO — title menyertakan brand + lokasi, OG tags lengkap untuk share preview
useHead({
  title: `${product.value!.name} \u2013 SSDC Senyum Sehat Dental Care Payakumbuh`,
  meta: [
    {
      name: 'description',
      content: product.value!.description
        ? `${product.value!.description.slice(0, 155)}...`
        : `Layanan ${product.value!.name} di SSDC Senyum Sehat Dental Care Payakumbuh. Daftar konsultasi gratis via WhatsApp.`,
    },
    { property: 'og:title', content: `${product.value!.name} \u2013 SSDC Payakumbuh` },
    { property: 'og:type', content: 'product' },
    { property: 'og:url', content: `https://ssdc.my.id/products/${product.value!.slug}` },
    {
      property: 'og:description',
      content: product.value!.description || `Layanan ${product.value!.name} berkualitas di SSDC Payakumbuh.`,
    },
    { property: 'og:image', content: product.value!.image || 'https://ssdc.my.id/og-image.jpg' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '600' },
    { property: 'og:image:alt', content: product.value!.name },
  ],
  link: [
    { rel: 'canonical', href: `https://ssdc.my.id/products/${product.value!.slug}` },
  ],
})
</script>

<template>
  <section class="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-10">

    <!-- Breadcrumb -->
    <nav class="text-sm breadcrumbs" aria-label="Breadcrumb">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/products">Layanan</NuxtLink></li>
        <li aria-current="page">{{ product!.name }}</li>
      </ul>
    </nav>

    <!-- Header -->
    <div class="mt-4 grid gap-6 lg:grid-cols-2">
      <!-- Gallery -->
      <div class="card bg-base-100 border border-base-300/70 shadow-sm overflow-hidden relative">
        <figure class="aspect-4/4">
          <img
            :src="product!.image + '?auto=format&fit=crop&w=1200&q=70'"
            :alt="product!.name"
            class="h-full w-full object-cover select-none will-change-transform hover:scale-[1.02] transition"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 1024px) 100vw, 640px"
          />
        </figure>
        <div class="absolute left-4 top-4 flex gap-2">
          <div v-if="product!.isNew" class="badge badge-info badge-sm">Baru</div>
          <div v-if="product!.isBest" class="badge badge-warning badge-sm">Best</div>
          <div class="badge badge-ghost badge-sm">{{ product!.category }}</div>
        </div>
      </div>

      <!-- Info -->
      <div class="space-y-4">
        <h1 class="text-2xl md:text-3xl font-extrabold leading-tight">{{ product!.name }}</h1>

        <div class="text-3xl font-bold">{{ rupiah(product!.price) }}</div>

        <p class="opacity-80 leading-relaxed">
          {{ product!.description || 'Produk berkualitas untuk kebutuhan harianmu.' }}
        </p>

        <div class="flex gap-2 flex-wrap min-h-6">
          <div v-for="t in product!.tags" :key="t" class="badge badge-outline">{{ t }}</div>
        </div>

        <div class="divider my-2"></div>

        <div class="flex flex-wrap items-end gap-3">
          <button
            id="btn-ambil-antrian"
            class="btn btn-primary"
            @click="ambilAntrian"
          >
            🦷 Ambil Antrian
          </button>
          <button class="btn btn-outline" @click="router.push('/products')">Kembali ke List</button>
        </div>

        <!-- Tabs -->
        <div class="mt-6">
          <div class="tabs tabs-lifted" role="tablist" aria-label="Detail produk tabs">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="tab"
              role="tab"
              :aria-selected="activeTab === tab.key"
              :class="{ 'tab-active': activeTab === tab.key }"
              @click="activeTab = tab.key"
            >{{ tab.label }}</button>
          </div>

          <div class="p-4 border-x border-b rounded-b-box">
            <!-- Tab: Spesifikasi -->
            <section v-show="activeTab === 'specs'">
              <div v-if="product!.specs" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="(val, key) in product!.specs" :key="String(key)" class="flex justify-between gap-4">
                  <span class="opacity-70">{{ key }}</span>
                  <span class="font-medium text-right">{{ val }}</span>
                </div>
              </div>
              <p v-else class="opacity-70">Spesifikasi belum tersedia.</p>
            </section>

            <!-- Tab: Paket & Harga -->
            <section v-if="activeTab === 'pricing' && subServiceGroups.length">
              <div
                v-for="group in subServiceGroups"
                :key="group.name"
                class="mb-6 last:mb-0"
              >
                <!-- Header grup (hanya tampil jika ada nama grup) -->
                <h3 v-if="group.name" class="text-sm font-semibold uppercase tracking-wide opacity-60 mb-2">
                  {{ group.name }}
                </h3>

                <div class="overflow-x-auto">
                  <table class="table table-sm w-full">
                    <thead>
                      <tr>
                        <th>Layanan</th>
                        <th class="hidden sm:table-cell">Keterangan</th>
                        <th class="text-right">Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="sub in group.items" :key="sub.label + (sub.group ?? '')">
                        <td class="font-medium">{{ sub.label }}</td>
                        <td class="hidden sm:table-cell opacity-70">{{ sub.detail ?? '–' }}</td>
                        <td class="text-right font-semibold whitespace-nowrap">
                          {{ rupiah(sub.price) }}
                          <span v-if="sub.priceMax"> – {{ rupiah(sub.priceMax) }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- Related -->
    <div class="mt-10">
      <h2 class="text-xl font-bold mb-4">Produk terkait</h2>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="p in related" :key="p.id" class="card bg-base-100 border border-base-300/60 hover:border-primary/40 transition duration-200 shadow-sm hover:shadow-lg">
          <figure class="aspect-[4/3] overflow-hidden">
            <img :src="p.image + '?auto=format&fit=crop&w=700&q=60'" :alt="p.name" class="h-full w-full object-cover will-change-transform hover:scale-[1.03] transition" loading="lazy" decoding="async" />
          </figure>
          <div class="card-body p-4">
            <h3 class="card-title text-base leading-tight line-clamp-2 min-h-[2.5rem]">{{ p.name }}</h3>
            <div class="text-lg font-bold">{{ rupiah(p.price) }}</div>
            <div class="card-actions justify-end">
              <NuxtLink :to="`/products/${p.slug}`" class="btn btn-sm">Lihat</NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Improve tap targets and subtle UX */
.tab { transition: background-color .15s ease, color .15s ease; }
</style>
