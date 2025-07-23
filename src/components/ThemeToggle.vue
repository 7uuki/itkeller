<script setup lang="ts">
import { useTheme } from '../composables/useTheme'

const { 
  currentThemeIcon, 
  toggleTheme 
} = useTheme()
</script>

<template>
  <button 
    class="theme-toggle"
    @click="toggleTheme"
    :title="'Toggle theme'"
  >
    {{ currentThemeIcon }}
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: 2px solid var(--border-color);
  color: var(--text-secondary);
  border-radius: 50%;
  font-size: 1.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0.4rem;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.theme-toggle:hover {
  color: var(--button-bg);
  border-color: var(--button-bg);
  transform: scale(1.05);
}
</style>
