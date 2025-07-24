<template>
  <div class="theme-toggle-switch">
    <button 
      class="theme-toggle-btn"
      :class="{ 'is-cycling': isCycling }"
      @click="handleThemeToggle"
      :title="`Current: ${themeLabels[currentTheme]} - Click to change`"
    >
      <span class="theme-icon" :key="currentTheme">
        {{ currentThemeIcon }}
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'

const { 
  currentTheme,
  themeLabels,
  currentThemeIcon,
  toggleTheme
} = useTheme()

const isCycling = ref(false)

const handleThemeToggle = () => {
  isCycling.value = true
  
  // Use View Transition API if available, fallback to regular toggle
  if (!document.startViewTransition) {
    toggleTheme()
    // Reset animation state faster for fallback
    setTimeout(() => {
      isCycling.value = false
    }, 20)
  } else {
    document.startViewTransition(() => {
      toggleTheme()
    }).finished.finally(() => {
      // Reset animation state when view transition completes
      isCycling.value = false
    })
  }
}
</script>

<style scoped>
.theme-toggle-switch {
  display: flex;
  align-items: center;
  padding: 0.1rem 0;
  background: transparent;
}

.theme-toggle-btn {
  background: none;
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
  padding: 0.4rem;
  border-radius: 50%;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.theme-toggle-btn:hover {
  color: var(--button-bg);
  border-color: var(--button-bg);
  transform: scale(1.05);
  box-shadow: 0 2px 8px var(--shadow);
}

.theme-toggle-btn.is-cycling {
  animation: themeSwitch 0.2s ease-in-out;
  border-color: var(--accent-primary);
}

.theme-icon {
  transition: all 0.15s ease;
  display: block;
}

.theme-toggle-btn.is-cycling .theme-icon {
  animation: iconSpin 0.2s ease-in-out;
}

@keyframes themeSwitch {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95) rotate(90deg);
    box-shadow: 0 0 10px var(--accent-primary);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes iconSpin {
  0% {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
  50% {
    transform: rotate(90deg) scale(0.9);
    opacity: 0.8;
  }
  100% {
    transform: rotate(180deg) scale(1);
    opacity: 1;
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .theme-toggle-btn {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
    padding: 0.3rem;
  }
}

/* Extra small mobile screens */
@media (max-width: 480px) {
  .theme-toggle-btn {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
    padding: 0.25rem;
  }
}
</style>
