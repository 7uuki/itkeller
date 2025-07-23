<template>
  <button 
    class="footer-link"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  targetSection: string
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
.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.footer-link:hover {
  color: var(--button-bg);
}
</style>
