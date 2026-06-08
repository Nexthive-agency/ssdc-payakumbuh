// composables/useProducts.ts
//
// Gambar disimpan di /public/img/products/ (bukan bundled Vite asset)
// agar tidak masuk ke bundle JS dan bisa di-serve langsung oleh server.
//
// Sumber data: list_pelayanan_ssdc_lengkap.md — Rate Card SSDC drg. Munadiyah & Partners

import { ref, computed } from 'vue'

// ─── Tipe Data ────────────────────────────────────────────────────────────────

/**
 * Sub-layanan: ditampilkan sebagai tabel harga di halaman detail layanan induk.
 * Tidak memiliki slug sendiri dan tidak muncul sebagai card di katalog.
 */
export type SubService = {
  /** Nama sub-layanan, misal "Paket Silver" atau "Kunjungan I" */
  label: string
  /** Keterangan singkat tindakan */
  detail?: string
  /** Harga (jika rentang: harga terendah) */
  price: number
  /** Harga tertinggi — opsional, untuk tindakan dengan rentang harga */
  priceMax?: number
  /**
   * Label grup untuk mengelompokkan sub-layanan dalam satu tabel.
   * Contoh: "Pemasangan di SSDC" vs "Pemasangan di Luar SSDC"
   */
  group?: string
}

export type Product = {
  id: number
  name: string
  slug: string
  /** Harga mulai dari (digunakan untuk sorting & filter harga) */
  price: number
  /** Harga tertinggi — opsional, untuk kartu yang menampilkan rentang */
  priceMax?: number
  rating: number
  category:
    | 'scaling'
    | 'fillings'
    | 'root-canal'
    | 'xrays'
    | 'extraction'
    | 'aesthetic'
    | 'whitening'
    | 'orthodontics'
    | 'crown'
  /** Path ke gambar di /public/ — contoh: '/img/products/karang_gigi/1.png' */
  image: string
  tags?: string[]
  isNew?: boolean
  isBest?: boolean
  description?: string
  specs?: Record<string, string | number>
  /**
   * Sub-layanan Tier 2 — tampil sebagai tabel di halaman detail [slug].vue.
   * Jika ada, tab "Paket & Harga" akan muncul otomatis.
   */
  subServices?: SubService[]
}

// ─── Data Produk ──────────────────────────────────────────────────────────────

const _products = ref<Product[]>([

  // ── 1. Pembersihan Karang Gigi ─────────────────────────────────────────────
  {
    id: 1,
    name: 'Pembersihan Karang Gigi',
    slug: 'karang-gigi',
    price: 250000,
    priceMax: 350000,
    rating: 4.7,
    category: 'scaling',
    image: '/img/products/karang_gigi/1.png',
    tags: ['Scaling', 'Karang Gigi'],
    isBest: true,
    description:
      'Jaga kesehatan mulut Anda dengan Pembersihan Karang Gigi profesional di Payakumbuh. Scaling gigi teratur menghilangkan plak, noda, dan karang gigi membandel, mencegah radang gusi dan bau mulut. Dapatkan sensasi bersih optimal dengan harga terjangkau!',
    specs: {
      Harga: 'Rp 250.000 – 350.000',
      Keterangan: 'Tergantung grade karang gigi',
    },
  },

  // ── 2. Tambal Gigi RK ──────────────────────────────────────────────────────
  {
    id: 2,
    name: 'Tambal Gigi RK',
    slug: 'tambal-gigi-rk',
    price: 300000,
    rating: 4.5,
    category: 'fillings',
    image: '/img/products/tambal_gigi_rk/1.png',
    tags: ['Tambalan Gigi', 'Resin Komposit'],
    description:
      'Tambal gigi berlubang dengan Resin Komposit (RK) berkualitas premium — kuat, tahan lama, dan menyerupai warna gigi asli. Solusi tambalan yang cepat, estetis, dan mengembalikan fungsi kunyah serta senyum Anda.',
    specs: {
      Harga: 'Rp 300.000',
      Material: 'Resin Komposit',
      Keterangan: 'Harga bisa berubah sesuai kondisi gigi',
    },
  },

  // ── 3. Tambal Gigi GIC ─────────────────────────────────────────────────────
  {
    id: 3,
    name: 'Tambal Gigi GIC',
    slug: 'tambal-gigi-gic',
    price: 200000,
    rating: 4.6,
    category: 'fillings',
    image: '/img/products/tambal_gigi_gic/1.png',
    tags: ['Tambalan Gigi', 'Glass Ionomer'],
    description:
      'Tambal Gigi GIC (Glass Ionomer Cement) — pilihan ideal untuk tambalan kecil atau gigi anak. Material ini melepaskan Fluoride secara perlahan untuk perlindungan ekstra. Prosedur cepat dengan harga sangat terjangkau.',
    specs: {
      Harga: 'Rp 200.000',
      Material: 'Glass Ionomer Cement',
      Keterangan: 'Harga bisa berubah sesuai kondisi gigi',
    },
  },

  // ── 4. Pulp Capping / Cariesstop ──────────────────────────────────────────
  {
    id: 4,
    name: 'Pulp Capping / Cariesstop',
    slug: 'pulp-capping',
    price: 100000,
    rating: 4.5,
    category: 'fillings',
    image: '/img/products/tambal_gigi_gic/1.png', // placeholder — belum ada foto khusus
    tags: ['Perawatan Pulpa', 'Pencegahan Karies'],
    isNew: true,
    description:
      'Pulp Capping adalah tindakan perlindungan pulpa gigi agar tidak perlu dirawat saluran akar (PSA). Cariesstop menghentikan perkembangan karies secara klinis. Tindakan preventif ini jauh lebih hemat dibanding harus menjalani PSA penuh.',
    specs: {
      Harga: 'Rp 100.000',
      Indikasi: 'Perlindungan pulpa / penghentian karies',
    },
  },

  // ── 5. Perawatan Saluran Akar ──────────────────────────────────────────────
  {
    id: 5,
    name: 'Perawatan Saluran Akar',
    slug: 'perawatan-saluran-akar',
    price: 150000,
    priceMax: 1000000,
    rating: 4.8,
    category: 'root-canal',
    image: '/img/products/perawatan_akar_after_rontgen/1.png',
    tags: ['Saluran Akar', 'PSA'],
    isBest: true,
    description:
      'Jangan cabut gigi yang sakit parah! Perawatan Saluran Akar (PSA) menyelamatkan gigi dari infeksi dan kematian pulpa. Prosedur minim rasa sakit, dilakukan dalam 3 kunjungan dengan hasil terbaik dan tahan lama.',
    specs: {
      'Total Kunjungan': '3x',
      Anestesi: 'Injeksi lokal',
    },
    subServices: [
      {
        label: 'Kunjungan I',
        detail: 'Obat + tambal sementara',
        price: 150000,
      },
      {
        label: 'Kunjungan II',
        detail: 'Preparasi + ganti obat',
        price: 350000,
      },
      {
        label: 'Kunjungan III',
        detail: 'Obturasi + tambal permanen',
        price: 1000000,
      },
    ],
  },

  // ── 6. Rontgen Periapikal ──────────────────────────────────────────────────
  {
    id: 6,
    name: 'Rontgen Periapikal',
    slug: 'rontgen-periapikal',
    price: 100000,
    rating: 4.3,
    category: 'xrays',
    image: '/img/products/rontgen_periapikal/1.png',
    tags: ['Rontgen', 'Diagnosa Gigi'],
    description:
      'Dapatkan diagnosa pasti dengan Rontgen Periapikal. Diperlukan untuk melihat kondisi akar, infeksi, kista, atau persiapan sebelum cabut gigi. Proses cepat dengan radiasi minim, membantu dokter merencanakan perawatan paling tepat.',
    specs: {
      Harga: 'Rp 100.000 / gigi',
      Durasi: '± 5 menit',
    },
  },

  // ── 7. Cabut Gigi Dewasa ───────────────────────────────────────────────────
  {
    id: 7,
    name: 'Cabut Gigi Dewasa',
    slug: 'cabut-gigi-dewasa',
    price: 200000,
    priceMax: 2000000,
    rating: 4.6,
    category: 'extraction',
    image: '/img/products/cabut_dewasa/1.jpeg',
    tags: ['Cabut Gigi', 'Bedah Gigi'],
    description:
      'Layanan pencabutan gigi dewasa profesional dan higienis — dari pencabutan biasa hingga odontektomi (bedah gigi impaksi). Ditangani dokter gigi berpengalaman dengan anestesi lokal dan protokol sterilisasi ketat di SSDC Payakumbuh.',
    specs: {
      Anestesi: 'Injeksi lokal',
    },
    subServices: [
      {
        label: 'Cabut Gigi Biasa',
        detail: 'Tingkat kesulitan standar',
        price: 200000,
      },
      {
        label: 'Cabut Gigi Sulit',
        detail: 'Tingkat kesulitan lebih tinggi',
        price: 300000,
      },
      {
        label: 'Cabut Gigi Molar III',
        detail: 'Gigi geraham ketiga',
        price: 300000,
        priceMax: 500000,
      },
      {
        label: 'Odontektomi',
        detail: 'Bedah pencabutan gigi impaksi',
        price: 2000000,
      },
    ],
  },

  // ── 8. Cabut Gigi Anak ─────────────────────────────────────────────────────
  {
    id: 8,
    name: 'Cabut Gigi Anak',
    slug: 'cabut-gigi-anak',
    price: 150000,
    rating: 4.4,
    category: 'extraction',
    image: '/img/products/cabut_anak/1.jpg',
    tags: ['Cabut Gigi', 'Perawatan Anak'],
    description:
      'Cabut Gigi Susu yang ramah anak (child-friendly). Prosedur cepat dan minim nyeri dengan injeksi anestesi lokal, dirancang untuk pengalaman yang positif agar anak tidak trauma ke dokter gigi.',
    specs: {
      Harga: 'Rp 150.000',
      Anestesi: 'Injeksi',
    },
  },

  // ── 9. Veneer Direct ───────────────────────────────────────────────────────
  {
    id: 9,
    name: 'Veneer Direct',
    slug: 'veneers-direct',
    price: 500000,
    rating: 4.7,
    category: 'aesthetic',
    image: '/img/products/veneer_direct_diastema_closure/1.jpeg',
    tags: ['Veneer', 'Estetika Gigi'],
    isBest: true,
    description:
      'Veneer Direct (Komposit) — senyum impian dalam 1x kunjungan! Prosedur minim invasif untuk menutup celah (diastema closure), noda membandel, atau bentuk gigi yang tidak rata. Hasil custom, cepat, dan terjangkau.',
    specs: {
      Harga: 'Rp 500.000 / gigi',
      Metode: 'Komposit langsung',
      Kunjungan: '1x',
    },
  },

  // ── 10. Veneer Indirect ────────────────────────────────────────────────────
  {
    id: 10,
    name: 'Veneer Indirect',
    slug: 'veneers-indirect',
    price: 3000000,
    rating: 4.7,
    category: 'aesthetic',
    image: '/img/products/veener_indirect/1.png',
    tags: ['Veneer', 'Estetika Gigi', 'Porselen'],
    isBest: true,
    description:
      'Veneer Indirect (Porselen) — solusi estetika premium dengan ketahanan superior dan warna stabil jangka panjang. Tampilan gigi alami dan sempurna yang permanen. Konsultasikan Veneer Porselen terbaik Anda di SSDC.',
    specs: {
      Harga: 'Rp 3.000.000 / gigi',
      Material: 'Porselen',
      Kunjungan: '2x',
    },
  },

  // ── 11. Bleaching Gigi ─────────────────────────────────────────────────────
  {
    id: 11,
    name: 'Bleaching Gigi',
    slug: 'bleaching-gigi',
    price: 2000000,
    rating: 4.7,
    category: 'whitening',
    image: '/img/products/bleaching_gigi/1.png',
    tags: ['Whitening', 'Pemutihan Gigi'],
    isBest: true,
    description:
      'Bleaching Gigi (Dental Whitening) profesional untuk gigi putih cerah dan senyum lebih percaya diri. Hilangkan noda membandel dari kopi, teh, atau rokok secara aman dan efektif. Paket termasuk RA/RB + scaling.',
    specs: {
      Harga: 'Rp 2.000.000',
      Termasuk: 'RA/RB + Scaling',
      Durasi: '± 1 jam',
    },
  },

  // ── 12. Behel Metal RA/RB ──────────────────────────────────────────────────
  {
    id: 12,
    name: 'Behel Metal RA/RB',
    slug: 'behel-metal-ra-rb',
    price: 3500000,
    priceMax: 5000000,
    rating: 4.5,
    category: 'orthodontics',
    image: '/img/products/behel_metal/1.png',
    tags: ['Behel', 'Kawat Gigi'],
    description:
      'Behel Metal — pilihan ortodonti paling andal dan terjangkau untuk merapikan gigi dari kasus ringan hingga kompleks. Tersedia dalam 3 paket sesuai kebutuhan dan budget Anda.',
    specs: {
      'Jenis Bracket': 'Metal',
      Rahang: 'RA/RB',
    },
    subServices: [
      {
        label: 'Paket Silver',
        detail: 'Paket behel metal standar',
        price: 3500000,
      },
      {
        label: 'Paket Gold',
        detail: 'Paket behel metal menengah',
        price: 4000000,
      },
      {
        label: 'Paket Platinum',
        detail: 'Paket behel metal premium',
        price: 5000000,
      },
    ],
  },

  // ── 13. Behel Ceramic ──────────────────────────────────────────────────────
  {
    id: 13,
    name: 'Behel Ceramic',
    slug: 'behel-ceramic',
    price: 6000000,
    rating: 4.9,
    category: 'orthodontics',
    image: '/img/products/behel_cramic/1.png',
    tags: ['Behel', 'Kawat Gigi', 'Estetika'],
    isBest: true,
    description:
      'Behel Keramik dengan bracket transparan yang menyerupai warna gigi asli. Pilihan estetik untuk merapikan gigi tanpa mengorbankan penampilan, tetap efektif untuk semua tingkatan kasus ortodonti.',
    specs: {
      Harga: 'Rp 6.000.000',
      'Jenis Bracket': 'Keramik transparan',
      Rahang: 'RA/RB',
    },
  },

  // ── 14. Aligner ────────────────────────────────────────────────────────────
  {
    id: 14,
    name: 'Aligner',
    slug: 'aligner',
    price: 12000000,
    priceMax: 18000000,
    rating: 4.9,
    category: 'orthodontics',
    image: '/img/products/aligner/1.png',
    tags: ['Aligner', 'Ortodonti Modern'],
    isBest: true,
    description:
      'Aligner transparan — solusi modern pengganti behel konvensional. Dapat dilepas pasang, hampir tidak terlihat, dan nyaman dipakai sehari-hari. Tersedia paket Basic dan Advance sesuai kompleksitas kasus gigi Anda.',
    specs: {
      Material: 'Plastik transparan',
      'Bisa Dilepas': 'Ya',
    },
    subServices: [
      {
        label: 'Aligner Basic',
        detail: 'Untuk kasus ringan hingga sedang',
        price: 12000000,
      },
      {
        label: 'Aligner Advance',
        detail: 'Untuk kasus kompleks',
        price: 18000000,
      },
    ],
  },

  // ── 15. Behel Lepasan Anak ─────────────────────────────────────────────────
  {
    id: 15,
    name: 'Behel Lepasan Anak',
    slug: 'behel-lepasan-anak',
    price: 1000000,
    rating: 4.9,
    category: 'orthodontics',
    image: '/img/products/behel_lepasan_anak/1.png',
    tags: ['Behel Anak', 'Ortodonti Preventif'],
    isBest: true,
    description:
      'Behel Lepasan Anak — alat ortodonti preventif untuk mengarahkan pertumbuhan rahang dan posisi gigi permanen anak sejak dini. Intervensi awal mencegah kasus gigi berjejal atau crossbite yang lebih kompleks di kemudian hari.',
    specs: {
      'Harga mulai': 'Rp 1.000.000',
      Tipe: 'Lepasan / Removable',
    },
  },

  // ── 16. Retainer Vacuum ────────────────────────────────────────────────────
  {
    id: 16,
    name: 'Retainer Vacuum',
    slug: 'retainer-vacuum',
    price: 500000,
    rating: 4.9,
    category: 'orthodontics',
    image: '/img/products/retainer_vacum/1.png',
    tags: ['Retainer', 'Pasca Behel'],
    isBest: true,
    description:
      'Retainer Vacuum transparan — wajib dipakai setelah melepas behel untuk mempertahankan posisi gigi yang sudah rapi. Nyaman, hampir tidak terlihat, dan mencegah gigi kembali bergeser.',
    specs: {
      Harga: 'Rp 500.000 / rahang',
      Material: 'Plastik vakum transparan',
    },
  },

  // ── 17. Kontrol Behel ──────────────────────────────────────────────────────
  {
    id: 17,
    name: 'Kontrol Behel',
    slug: 'kontrol-behel',
    price: 50000,
    priceMax: 200000,
    rating: 4.9,
    category: 'orthodontics',
    image: '/img/products/kontrol_behel/1.png',
    tags: ['Kontrol Behel', 'Perawatan Rutin'],
    isBest: true,
    description:
      'Layanan kontrol dan perawatan rutin kawat gigi: kontrol berkala, ganti kawat, ganti bracket, hingga lem ortho. Tersedia untuk pasien yang pasang behel di SSDC maupun di klinik lain.',
    specs: {
      Frekuensi: '± setiap 4–6 minggu',
    },
    subServices: [
      // Grup: Pemasangan di SSDC
      {
        label: 'Kontrol Behel',
        detail: 'Kontrol rutin',
        price: 150000,
        group: 'Pemasangan di SSDC',
      },
      {
        label: 'Ganti Kawat',
        detail: 'Per rahang',
        price: 50000,
        group: 'Pemasangan di SSDC',
      },
      {
        label: 'Ganti Bracket',
        detail: 'Per pcs',
        price: 100000,
        group: 'Pemasangan di SSDC',
      },
      {
        label: 'Lem Ortho',
        detail: 'Per tindakan',
        price: 50000,
        group: 'Pemasangan di SSDC',
      },
      // Grup: Pemasangan di Luar SSDC
      {
        label: 'Kontrol Behel',
        detail: 'Kontrol rutin',
        price: 200000,
        group: 'Pemasangan di Luar SSDC',
      },
      {
        label: 'Ganti Kawat',
        detail: 'Per rahang',
        price: 100000,
        group: 'Pemasangan di Luar SSDC',
      },
      {
        label: 'Ganti Bracket',
        detail: 'Per pcs',
        price: 200000,
        group: 'Pemasangan di Luar SSDC',
      },
      {
        label: 'Lem Ortho',
        detail: 'Per tindakan',
        price: 100000,
        group: 'Pemasangan di Luar SSDC',
      },
    ],
  },

  // ── 18. Gigi Palsu ─────────────────────────────────────────────────────────
  {
    id: 18,
    name: 'Gigi Palsu',
    slug: 'gigi-palsu',
    price: 150000,
    priceMax: 1800000,
    rating: 4.6,
    category: 'crown',
    image: '/img/products/gigi_palsu_penuh_ra_rb/1.jpeg',
    tags: ['Gigi Palsu', 'Prostodontik'],
    isBest: true,
    description:
      'Kembalikan fungsi kunyah dan senyum penuh percaya diri! Tersedia dalam berbagai material: dari lepasan sederhana hingga Thermosens premium. Dibuat presisi sesuai bentuk mulut agar nyaman dan terasa natural.',
    specs: {
      Tipe: 'Lepasan (sebagian atau penuh)',
    },
    subServices: [
      {
        label: 'Gigi Palsu Lepasan',
        detail: 'Acrylic dasar',
        price: 350000,
      },
      {
        label: 'Plat Akrilik',
        detail: 'Plat akrilik standar',
        price: 150000,
      },
      {
        label: 'Plat Lentur',
        detail: 'Fleksibel dan nyaman',
        price: 1150000,
      },
      {
        label: 'Thermosens',
        detail: 'Material premium',
        price: 1800000,
      },
    ],
  },

  // ── 19. Mahkota Gigi (Crown) ───────────────────────────────────────────────
  {
    id: 19,
    name: 'Mahkota Gigi (Crown)',
    slug: 'mahkota-gigi',
    price: 1500000,
    priceMax: 3500000,
    rating: 4.7,
    category: 'crown',
    image: '/img/products/crown_gigi/crown_belakang/1.jpeg',
    tags: ['Crown', 'Restorasi Gigi'],
    description:
      'Restorasi gigi dengan mahkota (crown) untuk gigi yang patah, lemah pasca PSA, atau butuh perbaikan estetika. Tersedia 3 material: PFM (metal-porselen), full porselen, dan zirconia premium.',
    specs: {
      Kunjungan: '2x',
      Anestesi: 'Lokal',
    },
    subServices: [
      {
        label: 'Crown PFM',
        detail: 'Metal + porselen, kuat untuk gigi belakang',
        price: 1500000,
      },
      {
        label: 'Crown Porselen',
        detail: 'Full porselen, hasil estetis natural',
        price: 3500000,
      },
      {
        label: 'Crown Zirconia',
        detail: 'Zirconia premium, terkuat & paling estetis',
        price: 3500000,
      },
    ],
  },

])

// ─── Composable ───────────────────────────────────────────────────────────────

export function useProducts() {
  const products = computed(() => _products.value)

  const bySlug = (slug: string) =>
    products.value.find(p => p.slug === slug)

  const byCategory = (cat: Product['category'], exceptSlug?: string) =>
    products.value.filter(p => p.category === cat && p.slug !== exceptSlug)

  /** Format angka ke Rupiah: Rp 1.500.000 */
  const rupiah = (n: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(n)

  /**
   * Tampilkan harga di card katalog.
   * - Jika ada priceMax → "Mulai Rp X"
   * - Jika tidak ada    → "Rp X"
   */
  const rupiahRange = (p: Product): string => {
    if (p.priceMax) return `Mulai ${rupiah(p.price)}`
    return rupiah(p.price)
  }

  return { products, bySlug, byCategory, rupiah, rupiahRange }
}
