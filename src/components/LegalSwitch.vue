<template>
  <div class="legal-switch-container">
    <!-- Sliding background indicator -->
    <div 
      class="switch-indicator" 
      :class="{ 'slide-right': currentPage === '/datenschutz' }"
    ></div>
    
    <!-- Switch buttons -->
    <router-link 
      to="/impressum" 
      class="legal-switch-button"
      :class="{ active: currentPage === '/impressum' }"
    >
      {{ t.nav.impressum }}
    </router-link>
    <router-link 
      to="/datenschutz" 
      class="legal-switch-button"
      :class="{ active: currentPage === '/datenschutz' }"
    >
      {{ t.nav.datenschutz }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const route = useRoute()
const { t } = useLanguage()

const currentPage = computed(() => route.path)
</script>

<style scoped>
.legal-switch-container {
  display: flex;
  background-color: var(--bg-accent);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
}

.switch-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 8px);
  height: calc(100% - 8px);
  background-color: var(--button-bg);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 0;
  transition: transform 0.2s ease;
}

.switch-indicator.slide-right {
  transform: translateX(calc(100% + 8px));
}

.legal-switch-button {
  padding: 0.4rem 0.8rem;
  background-color: transparent;
  border: none;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-block;
  min-width: 85px;
  text-align: center;
  position: relative;
  z-index: 1;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.legal-switch-button.active {
  color: var(--button-text);
}

.legal-switch-button:not(.active) {
  color: var(--text-secondary);
}

.legal-switch-button:not(.active):hover {
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .legal-switch-container {
    padding: 3px;
    border-radius: 10px;
  }

  .switch-indicator {
    top: 3px;
    left: 3px;
    width: calc(50% - 6px);
    height: calc(100% - 6px);
    border-radius: 7px;
  }
  
  .switch-indicator.slide-right {
    transform: translateX(calc(100% + 6px));
  }

  .legal-switch-button {
    padding: 0.35rem 0.7rem;
    font-size: 0.75rem;
    min-width: 75px;
    border-radius: 7px;
  }
}
</style>
