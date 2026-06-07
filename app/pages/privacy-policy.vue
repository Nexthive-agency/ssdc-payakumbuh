<script setup lang="ts">
import { useHead } from '#imports'

useHead({
  title: 'Kebijakan Privasi – SSDC Senyum Sehat Dental Care Payakumbuh',
  meta: [
    {
      name: 'description',
      content:
        'Kebijakan Privasi SSDC Senyum Sehat Dental Care Payakumbuh. Informasi mengenai cara kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
    },
    { name: 'robots', content: 'index, follow' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://ssdc.my.id/privacy-policy' },
    { property: 'og:title', content: 'Kebijakan Privasi – SSDC Senyum Sehat Dental Care Payakumbuh' },
    { property: 'og:description', content: 'Kebijakan Privasi SSDC Senyum Sehat Dental Care Payakumbuh mengenai pengumpulan, penggunaan, dan perlindungan data pribadi Anda.' },
    { property: 'og:image', content: 'https://ssdc.my.id/og-image.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://ssdc.my.id/privacy-policy' },
  ],
})

// Format display (bahasa Indonesia) dan ISO 8601 (untuk machine-readable datetime attribute)
const lastUpdated = '1 Juni 2025'
const lastUpdatedISO = '2025-06-01'
const clinicName = 'SSDC Senyum Sehat Dental Care Payakumbuh'
const clinicEmail = 'ssdc.payakumbuh@gmail.com'
const clinicAddress = 'Jl. Pahlawan No. 86A, Sawah Padang, Payakumbuh Selatan, Kota Payakumbuh, Sumatera Barat 26222'
const clinicPhone = '085121009692'
const siteUrl = 'https://ssdc.my.id'
</script>

<template>
  <main
    class="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16"
    aria-labelledby="heading-privacy"
  >
    <!-- Header -->
    <div class="mb-10">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-1.5 text-sm text-[#6E1A7E] hover:text-[#52135f] transition mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Beranda
      </NuxtLink>

      <h1
        id="heading-privacy"
        class="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] leading-tight"
      >
        Kebijakan Privasi
      </h1>
      <p class="mt-2 text-sm text-gray-500">
        Terakhir diperbarui: <time :datetime="lastUpdatedISO">{{ lastUpdated }}</time>
      </p>
    </div>

    <!-- Divider -->
    <div class="border-t border-purple-100 mb-10" />

    <!-- Konten -->
    <div class="prose prose-purple max-w-none space-y-10 text-gray-700 leading-relaxed">

      <!-- Pengantar -->
      <section aria-labelledby="sec-intro">
        <h2 id="sec-intro" class="text-xl font-bold text-[#6E1A7E] mb-3">1. Pengantar</h2>
        <p>
          Selamat datang di <strong>{{ clinicName }}</strong> (<a :href="siteUrl" class="text-[#6E1A7E] underline hover:text-[#52135f]">{{ siteUrl }}</a>).
          Kami berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda.
        </p>
        <p class="mt-3">
          Kebijakan Privasi ini menjelaskan jenis data yang kami kumpulkan, cara penggunaannya, dan hak-hak Anda terkait data tersebut ketika Anda mengunjungi website kami atau menggunakan layanan kami.
        </p>
      </section>

      <!-- Data yang Dikumpulkan -->
      <section aria-labelledby="sec-data">
        <h2 id="sec-data" class="text-xl font-bold text-[#6E1A7E] mb-3">2. Data yang Kami Kumpulkan</h2>
        <p>Kami dapat mengumpulkan beberapa jenis data berikut:</p>

        <h3 class="font-semibold text-gray-800 mt-4 mb-2">a. Data yang Anda Berikan Secara Langsung</h3>
        <p>Ketika Anda mengisi formulir pendaftaran konsultasi di website kami, kami mengumpulkan:</p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>Nama lengkap</li>
          <li>Nomor telepon / WhatsApp</li>
          <li>Jenis layanan yang Anda minati</li>
        </ul>
        <p class="mt-3 text-sm text-gray-500 italic">
          Catatan: Data formulir ini dikirimkan langsung melalui WhatsApp dan <strong>tidak disimpan di server</strong> website kami.
        </p>

        <h3 class="font-semibold text-gray-800 mt-4 mb-2">b. Data yang Dikumpulkan Secara Otomatis</h3>
        <p>Ketika Anda mengunjungi website kami, beberapa data dikumpulkan secara otomatis oleh layanan pihak ketiga yang kami gunakan, meliputi:</p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>Alamat IP dan informasi perangkat (browser, sistem operasi)</li>
          <li>Halaman yang dikunjungi dan durasi kunjungan</li>
          <li>Sumber referral (dari mana Anda mengakses website kami)</li>
          <li>Data interaksi seperti klik dan scroll</li>
        </ul>
      </section>

      <!-- Layanan Pihak Ketiga -->
      <section aria-labelledby="sec-thirdparty">
        <h2 id="sec-thirdparty" class="text-xl font-bold text-[#6E1A7E] mb-3">3. Layanan Pihak Ketiga</h2>
        <p>Website kami menggunakan layanan pihak ketiga berikut yang memiliki kebijakan privasi masing-masing:</p>

        <div class="mt-4 space-y-4">
          <div class="border border-gray-200 rounded-xl p-4">
            <h3 class="font-semibold text-gray-800">Google Analytics &amp; Google Ads</h3>
            <p class="text-sm text-gray-600 mt-1">
              Digunakan untuk menganalisis traffic website dan mengukur efektivitas iklan. Google mengumpulkan data anonim tentang perilaku pengunjung melalui cookies.
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-[#6E1A7E] underline mt-1 inline-block"
            >
              Lihat Kebijakan Privasi Google →
            </a>
          </div>

          <div class="border border-gray-200 rounded-xl p-4">
            <h3 class="font-semibold text-gray-800">Google Maps</h3>
            <p class="text-sm text-gray-600 mt-1">
              Digunakan untuk menampilkan peta lokasi klinik. Google Maps dapat mengumpulkan data lokasi dan interaksi peta.
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-[#6E1A7E] underline mt-1 inline-block"
            >
              Lihat Kebijakan Privasi Google →
            </a>
          </div>

          <div class="border border-gray-200 rounded-xl p-4">
            <h3 class="font-semibold text-gray-800">WhatsApp (Meta)</h3>
            <p class="text-sm text-gray-600 mt-1">
              Tombol dan link pendaftaran di website kami mengarah ke WhatsApp. Ketika Anda menggunakannya, data percakapan diproses oleh Meta/WhatsApp sesuai kebijakan privasi mereka.
            </p>
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-[#6E1A7E] underline mt-1 inline-block"
            >
              Lihat Kebijakan Privasi WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <!-- Penggunaan Data -->
      <section aria-labelledby="sec-usage">
        <h2 id="sec-usage" class="text-xl font-bold text-[#6E1A7E] mb-3">4. Cara Kami Menggunakan Data</h2>
        <p>Data yang kami kumpulkan digunakan untuk:</p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>Menghubungi Anda untuk konfirmasi pendaftaran konsultasi</li>
          <li>Meningkatkan kualitas website dan pengalaman pengguna</li>
          <li>Menganalisis efektivitas kampanye iklan Google Ads</li>
          <li>Memenuhi kewajiban hukum yang berlaku</li>
        </ul>
        <p class="mt-3">
          <strong>Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga</strong> untuk tujuan komersial tanpa persetujuan Anda.
        </p>
      </section>

      <!-- Cookies -->
      <section aria-labelledby="sec-cookies">
        <h2 id="sec-cookies" class="text-xl font-bold text-[#6E1A7E] mb-3">5. Cookies</h2>
        <p>
          Website kami menggunakan cookies — file kecil yang disimpan di perangkat Anda — melalui layanan Google Analytics dan Google Ads untuk tujuan analitik dan pengukuran iklan.
        </p>
        <p class="mt-3">
          Anda dapat menonaktifkan cookies melalui pengaturan browser Anda. Namun perlu diketahui bahwa menonaktifkan cookies dapat mempengaruhi fungsionalitas sebagian fitur website.
        </p>
        <p class="mt-3">
          Untuk opt-out dari Google Analytics, Anda dapat menggunakan
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            class="text-[#6E1A7E] underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>.
        </p>
      </section>

      <!-- Keamanan Data -->
      <section aria-labelledby="sec-security">
        <h2 id="sec-security" class="text-xl font-bold text-[#6E1A7E] mb-3">6. Keamanan Data</h2>
        <p>
          Kami menerapkan langkah-langkah keamanan teknis yang wajar untuk melindungi website dan data Anda, termasuk penggunaan HTTPS dan Content Security Policy (CSP). Namun, tidak ada metode transmisi data melalui internet yang 100% aman.
        </p>
        <p class="mt-3">
          Data formulir pendaftaran yang Anda kirimkan langsung diteruskan ke WhatsApp dan tidak disimpan di server kami, sehingga risiko kebocoran data dari sisi website kami minimal.
        </p>
      </section>

      <!-- Hak Pengguna -->
      <section aria-labelledby="sec-rights">
        <h2 id="sec-rights" class="text-xl font-bold text-[#6E1A7E] mb-3">7. Hak Anda</h2>
        <p>Sesuai dengan peraturan perlindungan data yang berlaku, Anda berhak untuk:</p>
        <ul class="list-disc list-inside mt-2 space-y-1 text-gray-600">
          <li>Mengetahui data pribadi apa yang kami miliki tentang Anda</li>
          <li>Meminta koreksi atas data yang tidak akurat</li>
          <li>Meminta penghapusan data Anda dari sistem kami</li>
          <li>Menolak penggunaan data Anda untuk tujuan tertentu</li>
        </ul>
        <p class="mt-3">
          Untuk mengajukan permintaan terkait hak-hak tersebut, hubungi kami melalui informasi kontak di bawah ini.
        </p>
      </section>

      <!-- Perubahan Kebijakan -->
      <section aria-labelledby="sec-changes">
        <h2 id="sec-changes" class="text-xl font-bold text-[#6E1A7E] mb-3">8. Perubahan Kebijakan Privasi</h2>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan diberitahukan dengan memperbarui tanggal "Terakhir diperbarui" di bagian atas halaman ini. Kami mendorong Anda untuk meninjau halaman ini secara berkala.
        </p>
      </section>

      <!-- Kontak -->
      <section aria-labelledby="sec-contact" class="bg-purple-50 border border-purple-100 rounded-2xl p-6">
        <h2 id="sec-contact" class="text-xl font-bold text-[#6E1A7E] mb-3">9. Hubungi Kami</h2>
        <p class="mb-4">
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami:
        </p>
        <address class="not-italic space-y-2 text-gray-700">
          <p>
            <strong>{{ clinicName }}</strong>
          </p>
          <p>📍 {{ clinicAddress }}</p>
          <p>
            📞
            <a :href="`tel:+62${clinicPhone}`" class="text-[#6E1A7E] underline hover:text-[#52135f]">
              {{ clinicPhone }}
            </a>
          </p>
          <p>
            📧
            <a :href="`mailto:${clinicEmail}`" class="text-[#6E1A7E] underline hover:text-[#52135f]">
              {{ clinicEmail }}
            </a>
          </p>
          <p>
            💬 WhatsApp:
            <a
              href="https://wa.me/6285121009692"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[#6E1A7E] underline hover:text-[#52135f]"
            >
              wa.me/6285121009692
            </a>
          </p>
        </address>
      </section>

    </div>

    <!-- Bottom link -->
    <div class="mt-12 pt-6 border-t border-purple-100 text-center">
      <NuxtLink
        to="/"
        class="text-sm text-[#6E1A7E] underline hover:text-[#52135f] transition"
      >
        ← Kembali ke Beranda
      </NuxtLink>
    </div>
  </main>
</template>

<style scoped>
/* Override prose defaults agar konsisten dengan warna brand */
address p {
  margin: 0;
}
</style>
