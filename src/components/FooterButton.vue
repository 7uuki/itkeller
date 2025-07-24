<template>
  <router-link 
    :to="targetRoute"
    class="footer-link"
  >
    <slot />
  </router-link>
</template>

<script setup lang="ts">
interface Props {
  targetRoute: string
}

defineProps<Props>()
</script>

<style scoped>
.footer-link {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 600;
  display: inline-block;
}

.footer-link:hover {
  color: var(--button-bg);
}
</style>
