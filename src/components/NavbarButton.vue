<template>
  <button 
    class="nav-link"
    @click="handleClick"
    :class="{ active: isActive }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  targetSection: string
  isActive?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  navigate: [targetSection: string]
}>()

const handleClick = () => {
  emit('navigate', props.targetSection)
}
</script>

<style scoped>
.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
  cursor: pointer;
  background: none;
  border: none;
  font-size: inherit;
  font-family: inherit;
  position: relative;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-link:hover {
  color: var(--button-bg);
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--button-bg);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: var(--button-bg);
}
</style>
