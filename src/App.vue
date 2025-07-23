<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navigation from './components/Navigation.vue'
import HeroSection from './views/HeroSection.vue'
import AboutSection from './views/AboutSection.vue'
import AcademicSection from './views/AcademicSection.vue'
import ServicesSection from './views/ServicesSection.vue'
import PortfolioSection from './views/PortfolioSection.vue'
import ContactSection from './views/ContactSection.vue'
import FooterSection from './views/FooterSection.vue'
import { useTheme } from './composables/useTheme'
import { useCustomCursor } from './composables/useCustomCursor'

// Function to detect mobile/touch devices
const isMobileDevice = (): boolean => {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  )
}

const { initTheme } = useTheme()
const isMobile = ref(isMobileDevice())

// Only initialize custom cursor on non-mobile devices
const { cursor } = !isMobile.value ? useCustomCursor() : { cursor: ref(null) }

onMounted(() => {
  // If mobile, ensure default cursor is restored
  if (isMobile.value) {
    const style = document.createElement('style')
    style.id = 'mobile-cursor-override'
    style.textContent = `
      * {
        cursor: auto !important;
      }
    `
    document.head.appendChild(style)
  }
  
  initTheme()
})
</script>

<template>
  <div class="app">
    <!-- Global Custom Cursor - Only on non-mobile devices -->
    <div v-if="!isMobile" class="custom-cursor" ref="cursor"></div>
    
    <Navigation />
    <main>
      <HeroSection />
      <AboutSection />
      <AcademicSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      
    </main>
    <FooterSection />
  </div>
</template>

<style>
.app {
  min-height: 100vh;
}

main {
  scroll-behavior: smooth;
}
</style>
