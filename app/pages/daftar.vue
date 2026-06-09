<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useHead } from '#imports'

useHead({
  title: 'Daftar Konsultasi – SSDC Senyum Sehat Dental Care Payakumbuh',
  meta: [
    {
      name: 'description',
      content:
        'Daftarkan diri Anda untuk konsultasi dan perawatan gigi di SSDC Senyum Sehat Dental Care Payakumbuh. Isi form, kami akan segera menghubungi Anda.',
    },
    // Sembunyikan halaman ini dari hasil pencarian organik,
    // tapi tetap accessible oleh Google Ads reviewer agar tidak dianggap cloaking.
    { name: 'robots', content: 'noindex, follow' },
  ],
})

const route = useRoute()

// Pre-fill layanan dari query param (?layanan=...) yang dikirim dari halaman produk
const layananOptions = [
  'Konsultasi Umum / Pemeriksaan Gigi',
  'Scaling / Pembersihan Karang Gigi',
  'Behel Gigi (Ortodontik)',
  'Bleaching / Pemutihan Gigi',
  'Veneer Gigi',
  'Pencabutan Gigi',
  'Tambal Gigi',
  'Crown / Jaket Gigi',
  'Perawatan Saluran Akar (PSA)',
  'Perawatan Gigi Anak',
  'Lainnya',
]

const form = ref({
  nama: '',
  nomor: '',
  layanan: '',
})

const isSubmitting = ref(false)
const formError = ref('')
const submitSuccess = ref(false)

// Flag: apakah layanan datang dari query param produk (nama bebas)
const isFromProduct = ref(false)

// Pre-fill layanan dari URL query saat komponen mount
onMounted(() => {
  const layananFromQuery = route.query.layanan as string | undefined
  if (layananFromQuery) {
    // Cek apakah ada exact match di opsi standar
    const matched = layananOptions.find(
      (opt) => opt.toLowerCase() === layananFromQuery.toLowerCase()
    )
    if (matched) {
      // Cocok dengan opsi standar – gunakan dropdown biasa
      form.value.layanan = matched
    } else {
      // Tidak cocok (nama produk spesifik) – tampilkan sebagai text input pre-filled
      form.value.layanan = layananFromQuery
      isFromProduct.value = true
    }
  }
})

// Validasi
function validateForm(): string {
  if (!form.value.nama.trim()) return 'Nama wajib diisi.'
  if (!form.value.nomor.trim()) return 'Nomor HP wajib diisi.'
  if (!/^[0-9+\-\s]{8,15}$/.test(form.value.nomor.trim()))
    return 'Nomor HP tidak valid (8-15 digit).'
  if (!form.value.layanan.trim()) return 'Pilih layanan yang diinginkan.'
  return ''
}

/**
 * Submit handler.
 * Flow: validasi → catat konversi Google Ads → buka WA tab baru dengan pesan pre-filled.
 * WA dibuka di tab baru (_blank) agar user tetap berada di halaman ini.
 */
function handleSubmit() {
  formError.value = ''
  const err = validateForm()
  if (err) {
    formError.value = err
    return
  }

  isSubmitting.value = true

  // Catat konversi Google Ads – HANYA saat form benar-benar di-submit
  if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', 'ads_conversion_Formulir_1', {
      event_category: 'lead',
      event_label: 'form_pendaftaran_halaman_daftar',
    })
  }

  const pesan =
    `Halo SSDC, saya ingin mendaftarkan diri untuk konsultasi/perawatan gigi.\n\n` +
    `Nama: ${form.value.nama}\n` +
    `No. HP: ${form.value.nomor}\n` +
    `Layanan: ${form.value.layanan}\n\n` +
    `Mohon informasinya mengenai jadwal dan prosedur pendaftaran. Terima kasih! 🦷`

  const waUrl = `https://wa.me/6285121009692?text=${encodeURIComponent(pesan)}`

  setTimeout(() => {
    // Buka WA di tab baru – user tetap di halaman ini (tidak redirect keluar)
    window.open(waUrl, '_blank', 'noopener,noreferrer')
    isSubmitting.value = false
    submitSuccess.value = true
    // Reset form
    form.value = { nama: '', nomor: '', layanan: '' }
  }, 400)
}
</script>

<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5eaff] via-white to-[#fce4ff] py-16 px-4"
    aria-labelledby="heading-daftar"
  >
    <div class="w-full max-w-lg">

      <!-- Judul -->
      <div class="flex flex-col items-center mb-8 text-center">
        <h1 id="heading-daftar" class="text-2xl md:text-3xl font-extrabold text-[#6E1A7E] leading-tight">
          Daftar Konsultasi Gratis
        </h1>
        <p class="text-gray-500 text-sm mt-2 max-w-xs">
          Isi form di bawah ini. Kami akan langsung membalas via WhatsApp untuk konfirmasi jadwal Anda.
        </p>
      </div>

      <!-- Card form -->
      <div class="bg-white rounded-3xl shadow-xl border border-purple-100 p-8">

        <!-- Pesan sukses setelah submit -->
        <div
          v-if="submitSuccess"
          class="flex flex-col items-center text-center py-6 gap-4"
          role="status"
          aria-live="polite"
        >
          <div class="text-5xl">✅</div>
          <h2 class="text-xl font-bold text-[#6E1A7E]">Pendaftaran Berhasil Dikirim!</h2>
          <p class="text-gray-500 text-sm">
            WhatsApp kami sudah terbuka di tab baru. Tim SSDC akan segera membalas konfirmasi jadwal Anda.
          </p>
          <button
            class="mt-2 text-sm text-[#6E1A7E] underline hover:text-[#52135f] transition"
            @click="submitSuccess = false"
          >
            Daftar lagi untuk anggota keluarga lain?
          </button>
        </div>

        <!-- Form utama -->
        <form
          v-else
          id="form-pendaftaran-daftar"
          @submit.prevent="handleSubmit"
          aria-label="Form pendaftaran konsultasi SSDC"
          novalidate
          class="space-y-5"
        >

          <!-- Nama -->
          <div>
            <label
              for="input-nama"
              class="block text-sm font-semibold text-gray-700 mb-1"
            >
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              id="input-nama"
              v-model="form.nama"
              type="text"
              name="nama"
              placeholder="contoh: Budi Santoso"
              autocomplete="name"
              maxlength="80"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E1A7E] focus:border-transparent transition"
              required
            />
          </div>

          <!-- Nomor HP -->
          <div>
            <label
              for="input-nomor"
              class="block text-sm font-semibold text-gray-700 mb-1"
            >
              No. HP / WhatsApp <span class="text-red-500">*</span>
            </label>
            <input
              id="input-nomor"
              v-model="form.nomor"
              type="tel"
              name="nomor"
              placeholder="contoh: 08123456789"
              autocomplete="tel"
              maxlength="15"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E1A7E] focus:border-transparent transition"
              required
            />
          </div>

          <!-- Layanan -->
          <div>
            <label
              for="input-layanan"
              class="block text-sm font-semibold text-gray-700 mb-1"
            >
              Layanan yang Diinginkan <span class="text-red-500">*</span>
            </label>

            <!-- Jika dari produk spesifik: tampilkan nama produk sebagai readonly + link ganti -->
            <div v-if="isFromProduct" class="space-y-1.5">
              <div class="w-full border border-[#6E1A7E]/40 bg-purple-50 rounded-xl px-4 py-2.5 text-sm text-[#6E1A7E] font-medium flex items-center justify-between gap-2">
                <span>🦷 {{ form.layanan }}</span>
                <button
                  type="button"
                  class="text-xs text-gray-400 hover:text-gray-600 underline whitespace-nowrap"
                  @click="isFromProduct = false; form.layanan = ''"
                >
                  Ganti
                </button>
              </div>
              <!-- Hidden input agar nilai tetap ikut validasi form -->
              <input type="hidden" name="layanan" :value="form.layanan" />
            </div>

            <!-- Jika dari hero / manual: tampilkan dropdown standar -->
            <select
              v-else
              id="input-layanan"
              v-model="form.layanan"
              name="layanan"
              class="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#6E1A7E] focus:border-transparent transition bg-white"
              required
            >
              <option value="" disabled>-- Pilih layanan --</option>
              <option v-for="opt in layananOptions" :key="opt" :value="opt">
                {{ opt }}
              </option>
            </select>
          </div>

          <!-- Error -->
          <p v-if="formError" class="text-red-500 text-xs font-medium" role="alert">
            ⚠ {{ formError }}
          </p>

          <!-- Submit -->
          <button
            id="btn-submit-daftar"
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-[#6E1A7E] hover:bg-[#5a1467] disabled:opacity-60 text-white font-bold py-3 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg text-sm"
          >
            <span v-if="isSubmitting">⏳ Memproses...</span>
            <span v-else>✅ Daftar Sekarang via WhatsApp</span>
          </button>

          <!-- Disclaimer -->
          <p class="text-gray-400 text-[11px] text-center leading-tight">
            Data Anda aman. Kami tidak akan menyebarkan informasi pribadi Anda kepada pihak ketiga.
          </p>
        </form>
      </div>

      <!-- Link kembali -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="text-sm text-[#6E1A7E] hover:text-[#52135f] underline transition"
        >
          ← Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
