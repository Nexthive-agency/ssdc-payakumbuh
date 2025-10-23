import bgHero from "./assets/image/bg-hero.jpg";
import overlay from "./assets/image/overlay.png";
import logo from "./assets/image/logo.png";
import bgButton1 from "./assets/image/bg-button1.png";
import instagram from "./assets/image/instagram.png";
import disiniTag from "./assets/image/disini-tag.png";
import qrcode from "./assets/image/qrcode.png";
import maskot1 from "./assets/image/maskot1.png";
import maskot2 from "./assets/image/maskot2.png";
import keluarga from "./assets/image/keluarga.png";
import facebook from "./assets/image/facebook.png";
import tiktok from "./assets/image/tiktok.png";
import perawatan1 from "./assets/image/perawatan1.jpg";
import perawatan2 from "./assets/image/perawatan1.jpg";
import perawatan3 from "./assets/image/perawatan1.jpg";
import before1 from "./assets/image/before1.jpg";
import after1 from "./assets/image/bg-hero.jpg";
import before2 from "./assets/image/before1.jpg";
import after2 from "./assets/image/bg-hero.jpg";
import before3 from "./assets/image/before1.jpg";
import after3 from "./assets/image/bg-hero.jpg";

export default function Home() {
  const mapsAddress = "Jl. Pahlawan 86A Sawah Padang, Payakumbuh Selatan";
  const mapsRouteUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    mapsAddress
  )}`;

  const testimonials = [
    {
      quote:
        "Pelayanan ramah, dokternya teliti banget, dan hasil scaling-nya bersih. Tempatnya juga nyaman dan mudah dijangkau. Sangat recommended!",
      name: "Rina S.",
      image: perawatan1,
      alt: "Pasien sedang melakukan perawatan pembersihan karang gigi",
    },
    {
      quote:
        "Anak saya awalnya takut ke dokter gigi, tapi di SSDC jadi berani karena dokternya sabar dan komunikatif. Terima kasih SSDC!",
      name: "Budi H. (Wali)",
      image: perawatan2,
      alt: "Dokter sedang berinteraksi dengan pasien anak",
    },
    {
      quote:
        "Proses cabut giginya cepat dan tanpa rasa sakit berlebihan. Semua staff profesional. Pilihan terbaik untuk perawatan gigi di Payakumbuh.",
      name: "Fira A.",
      image: perawatan3,
      alt: "Pasien menunjukkan senyum sehat setelah perawatan",
    },
  ];

  const beforeAfterCases = [
    {
      title: "Pembersihan Karang Gigi (Scaling)",
      beforeImage: before1,
      afterImage: after1,
      description: "Hasil maksimal menghilangkan plak dan karang gigi yang membandel.",
    },
    {
      title: "Perawatan Estetik Veneer",
      beforeImage: before2,
      afterImage: after2,
      description: "Perubahan senyum drastis untuk penampilan yang lebih percaya diri.",
    },
    {
      title: "Penambalan Komposit",
      beforeImage: before3,
      afterImage: after3,
      description: "Mengembalikan bentuk dan fungsi gigi yang berlubang dengan estetik yang sempurna.",
    },
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src={bgHero}
          width={1920}
          height={1080}
          alt="Background Klinik Gigi SSDC Payakumbuh"
          className="absolute inset-0 w-full h-full object-cover object-center -z-30"
        />
        <img
          src={overlay}
          alt="Overlay"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none select-none opacity-10"
        />
        <div className="absolute bottom-0 left-0 z-20 hidden lg:block lg:w-[50%] xl:w-[50%]">
          <img
            src={keluarga}
            alt="Maskot SSDC Senyum Sehat Dental Care Payakumbuh"
            width={700}
            height={900}
            loading="eager"
            className="object-contain w-full h-auto select-none pointer-events-none"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[60%] h-full bg-gradient-to-l from-background via-background to-transparent -z-10 hidden md:block" />
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 md:pr-16 pb-24 text-white flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <img
              src={logo}
              alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
              width={300}
              height={80}
              loading="eager"
              className="w-[300px] h-auto object-contain"
            />
            <div className="relative max-w-md w-full flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src={bgButton1}
                  alt="Text Background"
                  width={450}
                  height={80}
                  loading="eager"
                  className="w-[450px] h-auto object-contain"
                />
                <h1 className="absolute inset-0 flex items-center justify-center text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold text-center opacity-95 drop-shadow-lg">
                  Senyum Sehat Dental Care
                </h1>
              </div>
            </div>
            <div className="text-sm sm:text-base md:text-lg font-bold drop-shadow-lg">
              Drg. Munadiyah & Partner
            </div>
            <div className="bg-white w-fit h-fit text-[#6E1A7E] px-10 py-2 rounded-full drop-shadow-lg">
              <a
                href="https://wa.me/6285121009692?text=Halo%20SSDC%2C%20saya%20ingin%20mendaftar%20untuk%20konsultasi%2Fperawatan%20gigi.%0AMohon%20informasinya%20mengenai%20jadwal%20dan%20prosedur%20pendaftaran.%0ATerima%20kasih."
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="font-bold">Daftar Sekarang</p>
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <a
                href="https://www.instagram.com/doktergigi.payakumbuh/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram SSDC"
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={instagram}
                  alt="Logo Instagram resmi SSDC"
                  width={45}
                  height={45}
                  loading="eager"
                  className="w-[45px] h-[45px] object-contain"
                />
              </a>
              <a
                href="https://www.facebook.com/SSDC-Senyum-Sehat-Dental-Care-100063684277732/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook SSDC"
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={facebook}
                  alt="Logo Facebook resmi SSDC"
                  width={45}
                  height={45}
                  loading="eager"
                  className="w-[45px] h-[45px] object-contain"
                />
              </a>
              <a
                href="https://www.tiktok.com/@senyumsehatdentalcare"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok SSDC"
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={tiktok}
                  alt="Logo TikTok resmi SSDC"
                  width={45}
                  height={45}
                  loading="eager"
                  className="w-[45px] h-[45px] object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white/90 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] mb-2">
              Apa Kata Pasien Kami?
            </h2>
            <p className="text-xl text-gray-600">
              Lihat pengalaman mereka yang sudah mendapatkan Senyum Sehat di SSDC.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#A25BD9]/10 p-4 rounded-2xl shadow-lg border border-[#A25BD9]/30 transform transition duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col"
              >
                <div className="mb-4 overflow-hidden rounded-xl h-48 md:h-56">
                  <img
                    src={testimonial.image}
                    alt={testimonial.alt}
                    width={400}
                    height={200}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <div className="text-2xl text-[#6E1A7E] font-serif mb-2">“</div>
                  <p className="text-gray-700 italic mb-4 flex-grow">{testimonial.quote}</p>
                  <div className="text-right pt-2 border-t border-gray-300">
                    <p className="font-bold text-[#6E1A7E]">- {testimonial.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-[#6E1A7E]/5 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#6E1A7E] mb-2">
              Lihat Perubahannya <span className="text-white">(Before & After)</span>
            </h2>
            <p className="text-xl text-white">
              Kami menciptakan senyum terbaik untuk setiap pasien.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beforeAfterCases.map((kasus, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl overflow-hidden group transform transition duration-300 hover:scale-[1.03] border border-[#6E1A7E]/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={kasus.beforeImage}
                    alt={`Sebelum: ${kasus.title}`}
                    width={400}
                    height={256}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 group-hover:opacity-0"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                    <span className="text-2xl font-bold">SEBELUM</span>
                  </div>
                  <img
                    src={kasus.afterImage}
                    alt={`Sesudah: ${kasus.title}`}
                    width={400}
                    height={256}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-white bg-[#6E1A7E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-2xl font-bold">SESUDAH</span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-bold text-[#6E1A7E] mb-2">{kasus.title}</h3>
                  <p className="text-gray-600 text-sm">{kasus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#A25BD9]/10 px-6 py-16 overflow-hidden">
        <img
          src={overlay}
          alt="Overlay"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover object-center opacity-10 pointer-events-none select-none -z-10"
        />
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center relative">
          <div className="text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-extrabold">Temukan Kami</h2>
                <div className="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    src={disiniTag}
                    alt="Tag Disini"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <span className="relative z-10 text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold">
                    Disini!
                  </span>
                </div>
              </div>
            </div>
            <p className="mb-4">Jl. Pahlawan 86A Sawah Padang, Payakumbuh Selatan</p>
            <div className="mb-6 w-full max-w-md mx-auto lg:mx-0">
              <a
                href={mapsRouteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full bg-[#6E1A7E] text-white font-bold px-6 py-3 rounded-xl drop-shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#52135f] text-lg"
              >
                Lihat Rute di Google Maps
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-purple-300 w-full max-w-md mx-auto lg:mx-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7815913401755!2d100.6307807!3d-0.2458476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2ab4cf792d0f9b%3A0x5b7b3167853c3c32!2sSSDC%20Senyum%20Sehat%20Dental%20Care%20Payakumbuh!5e0!3m2!1sid!2sid!4v1761054951094!5m2!1sid!2sid"
                width="600"
                height="400"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[400px] border-0"
                title="Lokasi SSDC Senyum Sehat Dental Care Payakumbuh"
              ></iframe>
            </div>
          </div>
          <div className="relative flex flex-col items-center lg:items-end justify-center lg:justify-end space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-3 z-10">
              <p className="text-2xl md:text-3xl font-bold">Berikan Ulasan dan Saran</p>
              <div className="flex items-center gap-3">
                <p className="text-2xl md:text-3xl font-bold">untuk</p>
                <img
                  src={logo}
                  alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
                  className="w-[120px] h-auto object-contain"
                />
                <div className="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    src={disiniTag}
                    alt="Tag Disini"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <span className="relative z-10 text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold">
                    Disini!
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center z-10">
              <img
                src={qrcode}
                alt="QR code menuju halaman ulasan Google SSDC Payakumbuh"
                width={200}
                height={200}
                loading="lazy"
                className="w-[200px] h-auto object-contain drop-shadow-lg"
              />
              <div className="mt-4 bg-white w-fit h-fit text-[#6E1A7E] px-10 py-2 rounded-full drop-shadow-lg transition-transform duration-200 hover:scale-105">
                <a
                  href="https://g.page/r/CTI8PIVnMXtbEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold whitespace-nowrap"
                >
                  Berikan Ulasan Disini
                </a>
              </div>
            </div>
            <div className="absolute -bottom-2/12 hidden -left-1 -translate-x-1/2 lg:flex items-end justify-center z-0">
              <img
                src={maskot1}
                alt="Maskot Dokter Gigi Senyum Sehat Dental Care Payakumbuh"
                width={180}
                height={250}
                loading="lazy"
                className="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
              <img
                src={maskot2}
                alt="Maskot Pasien Senang SSDC Dental Care"
                width={180}
                height={250}
                loading="lazy"
                className="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
