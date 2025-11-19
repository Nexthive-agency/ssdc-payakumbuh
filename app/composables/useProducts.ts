// composables/useProducts.ts
import { ref, computed } from 'vue'
import cabut_dewasa_1 from '@/assets/img/products/cabut_dewasa/1.jpeg'
import cabut_dewasa_2 from '@/assets/img/products/cabut_dewasa/2.jpeg'
import cabut_anak_1 from '@/assets/img/products/cabut_anak/1.jpg'
import crown_belakang_1 from '@/assets/img/products/crown_gigi/crown_belakang/1.jpeg'
import crown_belakang_2 from '@/assets/img/products/crown_gigi/crown_belakang/2.jpeg'
import crown_depan_1 from '@/assets/img/products/crown_gigi/crown_depan/1.jpg'
import crown_depan_2 from '@/assets/img/products/crown_gigi/crown_depan/2.jpg'
import gigi_palsu from '@/assets/img/products/gigi_palsu_penuh_ra_rb/1.jpeg'
import perawatan_akar_after_rontgen_1 from '@/assets/img/products/perawatan_akar_after_rontgen/1.png'
import perawatan_akar_after_rontgen_2 from '@/assets/img/products/perawatan_akar_after_rontgen/2.png'
import tambal_gigi_rkt_1 from '@/assets/img/products/tambal_gigi_rk/1.jpg'
import tambal_gigi_gic_1 from '@/assets/img/products/tambal_gigi_gic/1.png'
import karang_gigi_1 from '@/assets/img/products/karang_gigi/1.png'
import vacum_retainer_1 from '@/assets/img/products/vacum_retainer/1.jpeg'
import vacum_retainer_2 from '@/assets/img/products/vacum_retainer/2.jpeg'
import veneer_direct_diastema_closure_1 from '@/assets/img/products/veneer_direct_diastema_closure/1.jpeg'
import veneer_direct_diastema_closure_2 from '@/assets/img/products/veneer_direct_diastema_closure/2.jpeg'
import veneer_indirect_1 from '@/assets/img/products/veener_indirect/1.png'
import behel_ceramic_1 from '@/assets/img/products/behel_cramic/1.png'
import behel_metal_ra_rb_1 from '@/assets/img/products/behel_metal/1.png'
import rontgen_periapikal_1 from '@/assets/img/products/rontgen_periapikal/1.png'

export type Product = {
  id: number
  name: string
  slug: string
  price: number
  rating: number
  category: 'scaling' | 'whitening' | 'checkup' | 'root-canal' | 'crown' | 'orthodontics' | 'xrays' | 'fillings'
  image: string
  image2?: string
  tags?: string[]
  isNew?: boolean
  isBest?: boolean
  description?: string
  specs?: Record<string, string | number>
}

const _products = ref<Product[]>([
  {
    id: 1,
    name: 'Pembersihan Karang Gigi',
    slug: 'karang-gigi',
    price: 250000,
    rating: 4.7,
    category: 'scaling',
    image: karang_gigi_1,
    tags: ['Scaling', 'Perawatan Gigi'],
    isBest: true,
    description: 'Bersihkan karang gigi, plak, dan noda membandel yang menyebabkan bau mulut dan radang gusi. Scaling teratur menjaga kesehatan mulut dan mencegah penyakit gusi. Rasakan sensasi gigi bersih optimal hanya di SSDC.',
    specs: { Harga: 'Rp 250.000 - 350.000', Durasi: '30 Menit' }
  },
  {
    id: 2,
    name: 'Tambal Gigi RKT',
    slug: 'tambal-gigi-rk',
    price: 300000,
    rating: 4.5,
    category: 'fillings',
    image: tambal_gigi_rkt_1,
    tags: ['Tambalan Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Tambal gigi berlubang Anda dengan Resin Komposit premium yang kuat dan hasilnya menyerupai gigi asli. Kami menawarkan solusi estetik untuk gigi depan dan belakang, mengembalikan fungsi kunyah dan keindahan senyum Anda. Proses cepat, minim rasa sakit, dan dilakukan oleh drg. berpengalaman. Konsultasi untuk tambalan estetik terbaik di Payakumbuh!',
    specs: { Harga: 'Rp 300.000', Durasi: '1 Jam' }
  },
  {
    id: 3,
    name: 'Tambal Gigi GIC',
    slug: 'tambal-gigi-gic',
    price: 200000,
    rating: 4.6,
    category: 'fillings',
    image: tambal_gigi_gic_1,
    tags: ['Tambalan Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Tambal gigi dengan GIC, bahan tambalan yang melepaskan Fluoride untuk membantu mencegah kerusakan gigi lebih lanjut. Pilihan ideal untuk tambalan sementara, tambalan kecil, atau gigi anak-anak (gigi susu). Prosedur cepat dan sangat baik untuk memperkuat struktur gigi. Dapatkan perlindungan ekstra dari GIC di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 200.000', Durasi: '1 Jam' }
  },
  {
    id: 4,
    name: 'Perawatan Saluran Akar',
    slug: 'perawatan-saluran-akar',
    price: 350000,
    rating: 4.8,
    category: 'root-canal',
    image: perawatan_akar_after_rontgen_1,
    image2: perawatan_akar_after_rontgen_2, // Gambar kedua
    tags: ['Perawatan Saluran Akar', 'Dental Care'],
    isBest: true,
    description: 'Jangan biarkan gigi yang sakit parah dicabut! Perawatan Saluran Akar (PSA) menghilangkan infeksi dan menyelamatkan gigi Anda. Prosedur profesional dan minim rasa sakit untuk mengobati pulpa gigi. Lindungi gigi belakang Anda dari pencabutan.',
    specs: { Harga: 'Rp 350.000', Durasi: '2 Jam' }
  },

  {
    id: 6,
    name: 'Cabut Gigi Anak',
    slug: 'cabut-gigi-anak',
    price: 100000,
    rating: 4.4,
    category: 'scaling',
    image: cabut_anak_1, // Gambar pertama
    tags: ['Cabut Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Hilangkan rasa takut anak Anda saat cabut gigi susu. SSDC menyediakan layanan pencabutan yang ramah anak (child-friendly), cepat, dan dilakukan dengan teknik minim nyeri. Kami memastikan pengalaman positif agar gigi permanen anak Anda dapat tumbuh sehat. Prioritaskan senyum ceria anak Anda bersama Dokter Gigi Anak profesional kami!',
    specs: { Harga: 'Rp 100.000', Durasi: '30 Menit' }
  },
  {
    id: 7,
    name: 'Cabut Gigi Dewasa',
    slug: 'cabut-gigi-dewasa',
    price: 200000,
    rating: 4.6,
    category: 'scaling',
    image: cabut_dewasa_1, // Gambar pertama
    image2: cabut_dewasa_2, // Gambar kedua
    tags: ['Cabut Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Layanan pencabutan gigi dewasa yang profesional dan higienis. Diperlukan untuk gigi yang rusak parah, infeksi, atau persiapan ortodonti (behel). Ditangani oleh drg. berpengalaman, kami memastikan prosedur berlangsung aman dengan protokol sterilisasi ketat. Konsultasikan kebutuhan cabut gigi Anda di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 200.000 - 300.000', Durasi: '30 Menit' }
  },
  {
    id: 8,
    name: 'Rontgen Peripikal',
    slug: 'rontgen-peripikal',
    price: 150000,
    rating: 4.3,
    category: 'xrays',
    image: rontgen_periapikal_1,
    tags: ['Rontgen', 'Pemeriksaan Gigi'],
    isBest: false,
    description: 'Diagnosa masalah gigi, akar, dan tulang di sekitarnya dengan akurat menggunakan Rontgen Periapikal. Diperlukan untuk melihat kondisi infeksi saluran akar, kista, atau sebelum cabut gigi. Proses cepat, radiasi minim, dan hasilnya membantu dokter gigi merencanakan perawatan yang paling tepat. Dapatkan diagnosa pasti di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 150.000', Durasi: '15 Menit' }
  },
  {
    id: 9,
    name: 'Veneer direct',
    slug: 'veneers-direct',
    price: 500000,
    rating: 4.7,
    category: 'crown',
    image: veneer_direct_diastema_closure_1, // Gambar pertama
    image2: veneer_direct_diastema_closure_2, // Gambar kedua
    tags: ['Veneer', 'Estetika', 'Dental Care'],
    isBest: true,
    description: 'Dapatkan senyum impian Anda dalam satu kunjungan! Veneer Direct menggunakan bahan komposit estetik untuk menutupi celah, perubahan warna, atau bentuk gigi yang tidak rata. Prosedur cepat, minim invasif, dan hasilnya custom sesuai keinginan Anda. Tingkatkan kepercayaan diri Anda dengan senyum selebriti di Payakumbuh.',
    specs: { Harga: 'Rp 3.000.000', Durasi: '2 Jam' }
  },
  {
    id: 10,
    name: 'Veneer Indirect',
    slug: 'veneers-indirect',
    price: 3000000,
    rating: 4.7,
    category: 'crown',
    image: veneer_indirect_1, // Gambar pertama
    tags: ['Veneer', 'Estetika', 'Dental Care'],
    isBest: true,
    description: 'Dapatkan hasil estetika gigi terbaik dengan Veneer Indirect (Porselen). Bahan Porselen memiliki ketahanan superior, warna stabil (tidak berubah), dan tampilan yang sangat alami. Solusi permanen untuk bentuk dan warna gigi yang sempurna. Prosedur dilakukan dengan presisi tinggi. Konsultasikan Veneer Porselen premium Anda di SSDC.',
    specs: { Harga: 'Rp 3.000.000', Durasi: '2 Jam' }
  },
  {
    id: 11,
    name: 'Behel Ceramic',
    slug: 'behel-ceramic',
    price: 4000000,
    rating: 4.9,
    category: 'orthodontics',
    image: behel_ceramic_1,
    tags: ['Behel', 'Orthodontics'],
    isBest: true,
    description: 'Ingin merapikan gigi tanpa mengorbankan penampilan? Behel Keramik adalah solusinya. Warna bracket keramik yang transparan menyerupai warna gigi asli, menjadikannya pilihan estetik yang efektif untuk meratakan gigi. Dapatkan perawatan ortho terpercaya dengan tampilan minimalis di SSDC Payakumbuh. Hubungi kami untuk jadwal konsultasi!',
    specs: { Harga: 'Rp 4.000.000', Durasi: '1 Tahun' }
  },
  {
    id: 12,
    name: 'Behel Metal Ra/Rb',
    slug: 'behel-metal-ra-rb',
    price: 6000000,
    rating: 4.5,
    category: 'orthodontics',
    image: behel_metal_ra_rb_1,
    tags: ['Behel', 'Orthodontics'],
    isBest: false,
    description: 'Dapatkan perawatan perataan gigi yang terbukti efektif dengan Behel Metal. Pilihan paling andal dan terjangkau untuk semua kasus gigi, dari yang ringan hingga kompleks. Bracket metal modern dan kuat, memastikan gigi Anda bergerak sesuai rencana perawatan. Percayakan pemasangan behel metal Anda pada dokter ortho terpercaya di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 6.000.000', Durasi: '1 Tahun' }
  },
  {
    id: 13,
    name: 'Mahkota Gigi PFM',
    slug: 'mahkota-gigi-pfm',
    price: 1500000,
    rating: 4.7,
    category: 'crown',
    image: crown_belakang_1, // Gambar pertama
    image2: crown_belakang_2, // Gambar kedua
    tags: ['Mahkota Gigi', 'Estetika', 'Gigi Palsu'],
    isBest: false,
    description: 'Dapatkan solusi restorasi gigi yang kuat dan tampil cantik dengan Mahkota PFM. Mahkota ini menggabungkan kekuatan kerangka metal dengan lapisan porselen yang menyerupai gigi asli. Cocok untuk gigi belakang yang membutuhkan daya tahan kunyah tinggi sekaligus menjaga estetika senyum Anda. Konsultasikan Mahkota PFM Anda di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 1.500.000', Durasi: '2 Jam' }
  },
  {
    id: 14,
    name: 'Gigi Palsu Lepasan',
    slug: 'gigi-palsu-lepas',
    price: 350000,
    rating: 4.6,
    category: 'crown',
    image: gigi_palsu, // Gambar untuk produk ini
    tags: ['Gigi Palsu', 'Dental Care'],
    isBest: true,
    description: 'Kembalikan fungsi kunyah dan senyum penuh percaya diri Anda! Kami menyediakan pembuatan gigi palsu lepasan (sebagian atau penuh) yang dibuat presisi dan terasa nyaman di mulut. Gigi palsu dirancang estetis dan fungsional agar Anda dapat makan dan berbicara dengan normal kembali. Konsultasikan material gigi palsu terbaik untuk Anda di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 350.000', Durasi: '2 Jam' }
  }
])

export function useProducts() {
  const products = computed(() => _products.value)
  const bySlug = (slug: string) => products.value.find(p => p.slug === slug)
  const byCategory = (cat: Product['category'], exceptSlug?: string) =>
    products.value.filter(p => p.category === cat && p.slug !== exceptSlug)

  const rupiah = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n)

  return { products, bySlug, byCategory, rupiah }
}
