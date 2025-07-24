<template>
  <button class="btn btn-secondary btn-with-arrow" @click="handleClick">
    <span class="btn-text">{{ text }}</span>
    <div class="btn-arrow"></div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

interface Emits {
  (e: 'click'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleClick = () => {
  emit('click')
}
</script>

<style scoped>
.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem; /* Override to match legal nav buttons */
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  border: 0px solid var(--button-bg);
  padding: 0.5rem 1rem; /* Match legal nav button padding */
}

.btn-secondary:hover {
  background-color: transparent;
  color: var(--text-primary);
}

.btn-with-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-width: 160px; /* Fixed width to prevent layout shifts */
  position: relative;
  font-size: 0.9rem; /* Match legal nav button font size */
}

.btn-with-arrow:hover .btn-text {
  transform: translateX(-0.25rem) scale(1.1);
}

.btn-with-arrow:hover .btn-arrow {
  transform: translateX(0.5rem);
}

.btn-text {
  transition: all 0.3s ease;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  /* Make the arrow inherit the current text color */
  background-color: currentColor;
  mask: url('../assets/arrow-right.svg') no-repeat center;
  mask-size: contain;
}
</style>
