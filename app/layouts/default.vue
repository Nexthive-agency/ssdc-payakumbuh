<script setup lang="ts">
</script>

<template>
    <div>
        <!--
          Skip Navigation Link — WCAG 2.1 AA requirement.
          Tersembunyi secara visual tapi muncul saat difokus keyboard (Tab pertama).
          Memungkinkan pengguna screen reader / keyboard meloncat ke konten utama.
        -->
        <a
          href="#main-content"
          class="skip-nav"
        >
          Langsung ke konten utama
        </a>

        <Navbar />
        <main id="main-content">
            <slot />
        </main>
        <Footer />
    </div>
</template>

<style>
/* Skip navigation — hanya visible saat focused (keyboard navigation) */
.skip-nav {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: #6E1A7E;
  color: white;
  font-weight: bold;
  font-size: 0.875rem;
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;
  transition: top 0.2s ease;
}
.skip-nav:focus {
  top: 0;
  outline: 3px solid #fff;
  outline-offset: 2px;
}
</style>