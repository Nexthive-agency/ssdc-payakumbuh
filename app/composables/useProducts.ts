// composables/useProducts.ts
import { ref, computed } from 'vue'
import cabut_dewasa_1 from '@/assets/img/products/cabut_dewasa/1.jpeg'
import cabut_dewasa_2 from '@/assets/img/products/cabut_dewasa/2.jpeg'
import cabut_anak_1 from '@/assets/img/products/cabut_anak/1.jpg'
import crown_belakang_1 from '@/assets/img/products/crown_gigi/crown_belakang/1.jpeg'
import crown_belakang_2 from '@/assets/img/products/crown_gigi/crown_belakang/2.jpeg'
import gigi_palsu from '@/assets/img/products/gigi_palsu_penuh_ra_rb/1.jpeg'
import perawatan_akar_after_rontgen_1 from '@/assets/img/products/perawatan_akar_after_rontgen/1.png'
import perawatan_akar_after_rontgen_2 from '@/assets/img/products/perawatan_akar_after_rontgen/2.png'
import tambal_gigi_rkt_1 from '@/assets/img/products/tambal_gigi_rk/1.png'
import tambal_gigi_gic_1 from '@/assets/img/products/tambal_gigi_gic/1.png'
import karang_gigi_1 from '@/assets/img/products/karang_gigi/1.png'
import veneer_direct_diastema_closure_1 from '@/assets/img/products/veneer_direct_diastema_closure/1.jpeg'
import veneer_direct_diastema_closure_2 from '@/assets/img/products/veneer_direct_diastema_closure/2.jpeg'
import veneer_indirect_1 from '@/assets/img/products/veener_indirect/1.png'
import bleaching_gigi from '@/assets/img/products/bleaching_gigi/1.png'
import behel_ceramic_1 from '@/assets/img/products/behel_cramic/1.png'
import aligner from '@/assets/img/products/aligner/1.png'
import behel_lepasan_anak from '@/assets/img/products/behel_lepasan_anak/1.png'
import retainer_vacum from '@/assets/img/products/retainer_vacum/1.png'
import kontrol_behel_1 from '@/assets/img/products/kontrol_behel/1.png'
import kontrol_behel_2 from '@/assets/img/products/kontrol_behel/2.png'
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
    description: 'Jaga kesehatan mulut Anda dengan Pembersihan Karang Gigi profesional di Payakumbuh. Scaling gigi teratur menghilangkan plak, noda, dan karang gigi membandel, mencegah radang gusi dan bau mulut. Dapatkan sensasi bersih optimal dengan harga terjangkau (Mulai dari Rp 250.000)!',
    specs: { Harga: 'Rp 250.000 - 350.000' }
  },
  {
    id: 2,
    name: 'Tambal Gigi RK',
    slug: 'tambal-gigi-rk',
    price: 300000,
    rating: 4.5,
    category: 'fillings',
    image: tambal_gigi_rkt_1,
    tags: ['Tambalan Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Tambal gigi berlubang Anda dengan Resin Komposit (RK) berkualitas premium yang kuat dan menyerupai gigi asli (estetik). Kami menawarkan solusi tambalan gigi yang cepat, awet, dan mengembalikan fungsi kunyah serta keindahan senyum Anda. Cek harga tambal gigi di Payakumbuh!',
    specs: { Harga: 'Rp 300.000' }
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
    description: 'Tambal Gigi GIC (Glass Ionomer Cement), pilihan ideal untuk tambalan kecil atau gigi anak. Bahan ini melepaskan Fluoride untuk perlindungan ekstra terhadap kerusakan gigi lanjutan. Prosedur cepat dan harga sangat terjangkau.',
    specs: { Harga: 'Rp 100.000 - 200.000', Durasi: '1 Jam' }
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
    description: 'Jangan cabut gigi yang sakit parah! Perawatan Saluran Akar (PSA) adalah prosedur profesional yang menyelamatkan gigi dari infeksi. Kami menawarkan prosedur minim rasa sakit untuk mengobati pulpa gigi, melindungi gigi belakang, dan menghindari pencabutan.',
    specs: { Harga: 'Rp 150.000 - 1.000.000' }
  },
  {
    id: 5,
    name: 'Rontgen Peripikal',
    slug: 'rontgen-peripikal',
    price: 100000,
    rating: 4.3,
    category: 'xrays',
    image: rontgen_periapikal_1,
    tags: ['Rontgen', 'Pemeriksaan Gigi'],
    isBest: false,
    description: 'Dapatkan diagnosa pasti dengan Rontgen Periapikal. Diperlukan untuk melihat kondisi akar, infeksi, kista, atau sebelum cabut gigi. Proses cepat dengan radiasi minim, membantu dokter gigi merencanakan perawatan yang paling tepat.',
    specs: { Harga: 'Rp 100.000' }
  },
  {
    id: 6,
    name: 'Cabut Gigi Dewasa',
    slug: 'cabut-gigi-dewasa',
    price: 200000,
    rating: 4.6,
    category: 'scaling',
    image: cabut_dewasa_1, // Gambar pertama
    image2: cabut_dewasa_2, // Gambar kedua
    tags: ['Cabut Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Layanan Pencabutan Gigi Dewasa yang profesional dan higienis. Dilakukan untuk gigi rusak parah, infeksi, atau persiapan kawat gigi (ortodonti). Ditangani dokter gigi berpengalaman dengan protokol sterilisasi ketat di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 200.000 - 2.000.000' }
  },
  {
    id: 7,
    name: 'Cabut Gigi Anak',
    slug: 'cabut-gigi-anak',
    price: 150000,
    rating: 4.4,
    category: 'scaling',
    image: cabut_anak_1, // Gambar pertama
    tags: ['Cabut Gigi', 'Perawatan Gigi'],
    isBest: false,
    description: 'Cabut Gigi Susu yang ramah anak (child-friendly). Prosedur cepat, minim nyeri, dan dirancang untuk pengalaman positif anak Anda, memastikan pertumbuhan gigi permanen yang sehat.',
    specs: { Harga: 'Rp 150.000' }
  },
  {
    id: 8,
    name: 'Veneer direct',
    slug: 'veneers-direct',
    price: 500000,
    rating: 4.7,
    category: 'crown',
    image: veneer_direct_diastema_closure_1, // Gambar pertama
    image2: veneer_direct_diastema_closure_2, // Gambar kedua
    tags: ['Veneer', 'Estetika', 'Dental Care'],
    isBest: true,
    description: 'Veneer Direct (Komposit) – Senyum impian dalam 1x kunjungan! Prosedur minim invasif untuk menutup celah (diastema closure), perubahan warna, atau bentuk gigi tidak rata. Veneer estetik dengan hasil custom dan cepat.',
    specs: { Harga: 'Rp 500.000' }
  },
  {
    id: 9,
    name: 'Veneer Indirect',
    slug: 'veneers-indirect',
    price: 3000000,
    rating: 4.7,
    category: 'crown',
    image: veneer_indirect_1, // Gambar pertama
    tags: ['Veneer', 'Estetika', 'Dental Care'],
    isBest: true,
    description: 'Veneer Indirect (Porselen) – Solusi estetika premium dengan ketahanan superior dan warna stabil. Dapatkan tampilan gigi alami dan sempurna yang permanen. Konsultasikan Veneer Porselen terbaik Anda di klinik kami.',
    specs: { Harga: 'Rp 3.000.000' }
  },
  {
    id: 10,
    name: 'Bleaching Gigi',
    slug: 'bleaching-gigi',
    price: 2000000,
    rating: 4.7,
    category: 'whitening',  
    image: bleaching_gigi,
    tags: ['Whitening', 'Estetika', 'Dental Care'],  // Added tags
    isBest: true,
    description: 'Bleaching Gigi (Dental Whitening) profesional untuk gigi putih cerah dan senyum lebih percaya diri. Hilangkan noda membandel dan tingkatkan kecerahan gigi Anda secara aman dan efektif. Cek harga bleaching gigi terbaik!',
    specs: { Harga: 'Rp 2.000.000' }
  },
  {
    id: 11,
    name: 'Behel Metal Ra/Rb',
    slug: 'behel-metal-ra-rb',
    price: 4000000,
    rating: 4.5,
    category: 'orthodontics',
    image: behel_metal_ra_rb_1,
    tags: ['Behel', 'Orthodontics'],
    isBest: false,
    description: 'Behel Metal – Pilihan ortodonti paling andal dan terjangkau. Efektif merapikan gigi dari kasus ringan hingga kompleks. Perawatan kawat gigi yang kuat dan terpercaya oleh dokter ortho di Payakumbuh.',
    specs: { Harga: 'Rp 3.500.000 - 5.000.000' }
  },
  {
    id: 12,
    name: 'Behel Ceramic',
    slug: 'behel-ceramic',
    price: 6000000,
    rating: 4.9,
    category: 'orthodontics',
    image: behel_ceramic_1,
    tags: ['Behel', 'Orthodontics'],
    isBest: true,
    description: 'Ingin merapikan gigi tanpa mengorbankan penampilan? Behel Keramik adalah solusinya. Warna bracket keramik yang transparan menyerupai warna gigi asli, menjadikannya pilihan estetik yang efektif untuk meratakan gigi. Dapatkan perawatan ortho terpercaya dengan tampilan minimalis di SSDC Payakumbuh. Hubungi kami untuk jadwal konsultasi!',
    specs: { Harga: 'Rp 6.000.000' }
  },
  {
    id: 13,
    name: 'Aligner',
    slug: 'aligner',
    price: 12000000,
    rating: 4.9,
    category: 'orthodontics',  // Added category
    image: aligner,
    tags: ['Aligner', 'Orthodontics'],  // Added tags
    isBest: true,
    description: 'Aligner – Metode perataan gigi transparan dan nyaman, solusi modern pengganti behel konvensional. Aligner gigi dapat dilepas pasang, efektif, dan hampir tidak terlihat. Cek biaya aligner premium di SSDC.',
    specs: { Harga: 'Rp 12.000.000 - 18.000.000' }
  },
  {
    id: 14,
    name: 'Behel Lepasan Anak',
    slug: 'behel-lepasan-anak',
    price: 1000000,
    rating: 4.9,
    category: 'orthodontics',  // Added category
    image: behel_lepasan_anak,
    tags: ['Behel', 'Orthodontics'],  // Added tags
    isBest: true,
    description: 'Behel Lepasan Anak – Alat ortodonti preventif untuk mengarahkan pertumbuhan rahang dan gigi permanen anak. Penting untuk intervensi dini dalam kasus gigi berjejal atau crossbite.',
    specs: { Harga: 'Rp 1.000.000' }
  },
  {
    id: 15,
    name: 'Retainer Vacum',
    slug: 'retainer-vacum',
    price: 500000,
    rating: 4.9,
    category: 'orthodontics',  // Added category
    image: retainer_vacum,
    tags: ['Retainer', 'Orthodontics'],  // Added tags
    isBest: true,
    description: 'Retainer Vacum – Penting setelah melepas behel untuk mempertahankan posisi gigi baru Anda. Retainer transparan yang nyaman dipakai untuk mencegah gigi kembali bergeser.',
    specs: { Harga: 'Rp 500.000' }
  },
  {
    id: 16,
    name: 'Kontrol Behel',
    slug: 'kontrol-behel',
    price: 100000,
    rating: 4.9,
    category: 'orthodontics',  // Added category
    image: kontrol_behel_1,
    image2: kontrol_behel_2,
    tags: ['Behel', 'Orthodontics'],  // Added tags
    isBest: true,
    description: 'Layanan Kontrol Behel rutin untuk memastikan pergerakan gigi berjalan sesuai rencana perawatan. Jaga efektivitas kawat gigi Anda dengan kontrol berkala oleh dokter ahli.',
    specs: { Harga: 'Rp 50.000 - 200.000' }
  },
  {
    id: 17,
    name: 'Gigi Palsu',
    slug: 'gigi-palsu',
    price: 350000,
    rating: 4.6,
    category: 'crown',
    image: gigi_palsu, // Gambar untuk produk ini
    tags: ['Gigi Palsu', 'Dental Care'],
    isBest: true,
    description: 'Kembalikan fungsi kunyah dan senyum penuh percaya diri Anda! Kami menyediakan pembuatan gigi palsu lepasan (sebagian atau penuh) yang dibuat presisi dan terasa nyaman di mulut. Gigi palsu dirancang estetis dan fungsional agar Anda dapat makan dan berbicara dengan normal kembali. Konsultasikan material gigi palsu terbaik untuk Anda di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 150.000 - 1.500.000' }
  },
  {
    id: 18,
    name: 'Mahkota Gigi',
    slug: 'mahkota-gigi',
    price: 1500000,
    rating: 4.7,
    category: 'crown',
    image: crown_belakang_1, // Gambar pertama
    image2: crown_belakang_2, // Gambar kedua 
    tags: ['Mahkota Gigi', 'Estetika', 'Gigi Palsu'],
    isBest: false,
    description: 'Dapatkan solusi restorasi gigi yang kuat dan tampil cantik dengan Mahkota PFM. Mahkota ini menggabungkan kekuatan kerangka metal dengan lapisan porselen yang menyerupai gigi asli. Cocok untuk gigi belakang yang membutuhkan daya tahan kunyah tinggi sekaligus menjaga estetika senyum Anda. Konsultasikan Mahkota PFM Anda di SSDC Payakumbuh.',
    specs: { Harga: 'Rp 1.500.000 - 3.500.000' }
  },
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
