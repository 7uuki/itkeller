<template>
  <div class="loading-screen" :class="{ 'fade-out': fadeOut }">
    <div class="loading-content">
      <div class="logo-container">
        <h1 class="loading-logo">ItKeller.com</h1>
        <div class="loading-subtitle">{{ t.loading.text }}</div>
      </div>
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

const fadeOut = ref(false)

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  hidden: []
}>()

onMounted(() => {
  if (!props.show) {
    fadeOut.value = true
    setTimeout(() => {
      emit('hidden')
    }, 500)
  }
})

defineExpose({
  hide: () => {
    fadeOut.value = true
    setTimeout(() => {
      emit('hidden')
    }, 500)
  }
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
}

.loading-screen.fade-out {
  opacity: 0;
  visibility: hidden;
}

.loading-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.loading-logo {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 2s ease-in-out infinite;
}

.loading-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  opacity: 0.8;
}

.loading-spinner {
  position: relative;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { 
    opacity: 1;
    transform: scale(1);
  }
  50% { 
    opacity: 0.8;
    transform: scale(1.05);
  }
}

/* Dark theme adjustments */
[data-theme="dark"] .loading-screen {
  background: var(--bg-primary);
}

/* Pink theme adjustments */
[data-theme="pink"] .loading-screen {
  background: var(--bg-primary);
}

@media (max-width: 768px) {
  .loading-logo {
    font-size: 2rem;
  }
  
  .loading-subtitle {
    font-size: 0.9rem;
  }
  
  .spinner {
    width: 35px;
    height: 35px;
  }
}
</style>
