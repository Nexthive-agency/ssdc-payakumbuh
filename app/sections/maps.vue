<script setup>
import overlay from "~/assets/img/overlay.png";
import disiniTag from "~/assets/img/disini-tag.png";
import logo from "~/assets/img/logo.png";
import qrcode from "~/assets/img/qrcode.png";
import maskot1 from "~/assets/img/maskot1.png";
import maskot2 from "~/assets/img/maskot2.png";
</script>
<template>
  <section id="maps" style="background-color: #AD4CC2; color: white;" class="relative min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden text-white">
        <img
          :src="overlay"
          alt="Overlay"
          width={1920}
          height={1080}
          class="absolute inset-0 w-full h-full object-cover object-center opacity-10 pointer-events-none select-none -z-10"
        />
        <div class="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center relative">
          <div class="text-center lg:text-left">
            <div class="flex flex-col items-center lg:items-start mb-2">
              <div class="flex items-center gap-2">
                <h2 class="text-3xl md:text-4xl font-extrabold">
                  Temukan Kami
                </h2>
                <div class="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    :src="disiniTag"
                    alt="Tag Disini"
                    loading="lazy"
                    class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <span class="relative z-10 text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold">
                    Disini!
                  </span>
                </div>
              </div>
            </div>
            <p class="mb-4">
              Jl. Pahlawan 86A Sawah Padang, Payakumbuh Selatan
            </p>
            <div class="mb-6 w-full max-w-md mx-auto lg:mx-0">
              <a
                href="https://maps.app.goo.gl/UgqNyU4NiHZmELRr6"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-block w-full bg-[#6E1A7E] text-white font-bold px-6 py-3 rounded-xl drop-shadow-lg transition-transform duration-200 hover:scale-[1.02] hover:bg-[#52135f] text-lg"
              >
                Lihat Rute di Google Maps
              </a>
            </div>
            <div class="rounded-2xl overflow-hidden shadow-lg border border-purple-300 w-full max-w-md mx-auto lg:mx-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7815929430785!2d100.62820577447748!3d-0.24584223537294264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2ab4cf792d0f9b%3A0x5b7b3167853c3c32!2sSSDC%20Senyum%20Sehat%20Dental%20Care%20Payakumbuh!5e0!3m2!1sid!2sid!4v1761482352922!5m2!1sid!2sid"
                width="600"
                height="400"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                class="w-full h-[400px] border-0"
                title="Lokasi SSDC Senyum Sehat Dental Care Payakumbuh"
              ></iframe>
            </div>
          </div>
          <div class="relative flex flex-col items-center lg:items-end justify-center lg:justify-end space-y-8">
            <div class="flex flex-wrap items-center justify-center gap-3 mb-3 z-10">
              <p class="text-2xl md:text-3xl font-bold">
                Berikan Ulasan dan Saran
              </p>
              <div class="flex items-center gap-3">
                <p class="text-2xl md:text-3xl font-bold">untuk</p>
                <img
                  :src="logo"
                  alt="Logo SSDC Senyum Sehat Dental Care Payakumbuh"
                  class="w-[120px] h-auto object-contain"
                />
                <div class="relative w-[120px] h-[45px] flex items-center justify-center">
                  <img
                    :src="disiniTag"
                    alt="Tag Disini"
                    class="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                  />
                  <span class="relative z-10 text-[#6E1A7E] tracking-[-1px] text-lg sm:text-xl lg:text-2xl font-bold">
                    Disini!
                  </span>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center z-10">
              <img
                :src="qrcode"
                alt="QR code menuju halaman ulasan Google SSDC Payakumbuh"
                width={200}
                height={200}
                loading="lazy"
                class="w-[200px] h-auto object-contain drop-shadow-lg"
              />
              <div class="mt-4 bg-white w-fit h-fit text-[#6E1A7E] px-10 py-2 rounded-full drop-shadow-lg transition-transform duration-200 hover:scale-105">
                <a
                  href="https://g.page/r/CTI8PIVnMXtbEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-bold whitespace-nowrap"
                >
                  Berikan Ulasan Disini
                </a>
              </div>
            </div>
            <div class="absolute -bottom-2/12 hidden -left-1 -translate-x-1/2 lg:flex items-end justify-center z-0">
              <img
                :src="maskot1"
                alt="Maskot Dokter Gigi Senyum Sehat Dental Care Payakumbuh"
                width={180}
                height={250}
                loading="lazy"
                class="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
              <img
                :src="maskot2"
                alt="Maskot Pasien Senang SSDC Dental Care"
                width={180}
                height={250}
                loading="lazy"
                class="object-contain w-[180px] sm:w-[200px] md:w-[150px]"
              />
            </div>
          </div>
        </div>
      </section>
</template>