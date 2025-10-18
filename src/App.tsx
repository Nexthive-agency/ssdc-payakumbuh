export default function Home() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/image/bg-hero.jpg"
          alt="Background Klinik Gigi SSDC Payakumbuh"
          className="absolute inset-0 w-full h-full object-cover object-center -z-30"
        />
        <img
          src="/src/assets/image/overlay.png"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover object-center z-10 pointer-events-none select-none opacity-10"
        />
        <div className="absolute bottom-0 left-0 z-20 hidden lg:block lg:w-[50%] xl:w-[50%]">
          <img
            src="/src/assets/image/char-ssdc.png"
            alt="Maskot SSDC Senyum Sehat Dental Care Payakumbuh"
            className="object-contain w-full h-auto select-none pointer-events-none"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-[60%] h-full bg-gradient-to-l from-background via-background to-transparent -z-10 hidden md:block" />
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-7xl px-6 md:pr-16 pb-24 text-white flex flex-col items-center md:items-end text-center md:text-right space-y-2">
            <img
              src="/src/assets/image/logo.png"
              alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
              className="w-[300px] h-auto object-contain"
            />
            <div className="relative max-w-md w-full flex justify-center md:justify-end">
              <div className="relative">
                <img
                  src="/src/assets/image/bg-button1.png"
                  alt="Text Background"
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
              <p className="font-bold">Daftar Sekarang</p>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src="/src/assets/image/whatsapp.png"
                  alt="Logo WhatsApp resmi SSDC"
                  className="w-[45px] h-[45px] object-contain"
                />
              </a>
              <a
                href="https://www.instagram.com/akunmu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hubungi kami via WhatsApp"
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src="/src/assets/image/instagram.png"
                  alt="Logo Instagram resmi SSDC"
                  className="w-[45px] h-[45px] object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#A25BD9]/10 px-6 py-16 overflow-hidden">
        <img
          src="/src/assets/image/overlay.png"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-10 pointer-events-none select-none -z-10"
        />

        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center relative">
          <div className="text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start mb-2">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl md:text-4xl font-extrabold">
                  Temukan Kami
                </h2>
                <div className="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    src="/src/assets/image/disini-tag.png"
                    alt="Tag Disini"
                    className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <span className="relative z-10 text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold">
                    Disini!
                  </span>
                </div>
              </div>
            </div>

            <p className="mb-4">
              Jl. Pahlawan 86A Sawah Padang, Payakumbuh Selatan
            </p>

            <div className="rounded-2xl overflow-hidden shadow-lg border border-purple-300 w-full max-w-md mx-auto lg:mx-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7815754724784!2d100.6307959!3d-0.24590070000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2ab4cf7fbd789f%3A0x4119d8a8e90c6794!2sDepan%20kantor%20Gol%20kar%2C%20Jl.%20Pahlawan%20dekat%20SULTAN%20MADANI%20RESIDENCE%20No.86A%2C%20Sawah%20Padang%2C%20Kec.%20Payakumbuh%20Sel.%2C%20Kota%20Payakumbuh%2C%20Sumatera%20Barat%2026222!5e0!3m2!1sid!2sid!4v1760688562168!5m2!1sid!2sid"
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
              <p className="text-2xl md:text-3xl font-bold">
                Berikan Ulasan dan Saran
              </p>

              <div className="flex items-center gap-3">
                <p className="text-2xl md:text-3xl font-bold">untuk</p>
                <img
                  src="/src/assets/image/logo.png"
                  alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
                  className="w-[120px] h-auto object-contain"
                />
                <div className="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    src="/src/assets/image/disini-tag.png"
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
                src="/src/assets/image/qrcode.png"
                alt="QR code menuju halaman ulasan Google SSDC Payakumbuh"
                className="w-[200px] h-auto object-contain drop-shadow-lg"
              />
              <a
                href="https://g.page/r/CTI8PIVnMXtbEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm mt-2 text-center lg:text-end underline hover:text-purple-900"
              >
                https://g.page/r/CTI8PIVnMXtbEBM/review
              </a>
            </div>

            <div className="absolute -bottom-2/12 hidden -left-1 -translate-x-1/2 lg:flex items-end justify-center z-0">
              <img
                src="/src/assets/image/maskot1.png"
                alt="Maskot Dokter Gigi Senyum Sehat Dental Care Payakumbuh"
                className="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
              <img
                src="/src/assets/image/maskot2.png"
                alt="Maskot Pasien Senang SSDC Dental Care"
                className="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
