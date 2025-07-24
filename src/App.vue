<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Navigation from './components/Navigation.vue'
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
  
  // Ensure scroll is at top on mount (handles cases where browser tries to restore position)
  window.scrollTo(0, 0)
  
  // Ensure scroll is at top on mount (handles cases where browser tries to restore position)
  window.scrollTo(0, 0)
  
  initTheme()
})
</script>

<template>
  <div class="app">
    <!-- Global Custom Cursor - Only on non-mobile devices -->
    <div v-if="!isMobile" class="custom-cursor" ref="cursor"></div>
    
    <Navigation />
    <main>
      <router-view />
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
