<template>
  <div>
    <!-- Circular Image Thumbnail -->
    <div 
      class="image-thumbnail"
      :class="{ 'small': size === 'small', 'medium': size === 'medium', 'large': size === 'large' }"
      @click="openModal"
      :title="alt"
    >
      <img 
        :src="src" 
        :alt="alt" 
        class="thumbnail-img imagenodrdag"
        :class="{ 'flipped': flipped }"
        loading="lazy"
      />
    </div>

    <!-- Modal Overlay -->
    <Teleport to="body">
      <div 
        v-if="isModalOpen" 
        class="modal-overlay"
        @click="closeModal"
      >
        <div class="modal-content" @click.stop>
          <!-- Close Button -->
          <button 
            class="close-btn"
            @click="closeModal"
            aria-label="Close image"
          >
            ✕
          </button>
          
          <!-- Full Size Image -->
          <img 
            :src="src" 
            :alt="alt" 
            class="modal-img imagenodrdag"
            :class="{ 'flipped': flipped }"
          />
          
          <!-- Optional Caption -->
          <div v-if="caption" class="image-caption">
            {{ caption }}
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  src: string
  alt: string
  size?: 'small' | 'medium' | 'large'
  caption?: string
  flipped?: boolean
}

withDefaults(defineProps<Props>(), {
  size: 'medium',
  caption: '',
  flipped: false
})

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
  // Prevent scrolling but keep scrollbar visible
  document.body.style.overflowY = 'scroll'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${window.scrollY}px`
  document.body.style.width = '100%'
}

const closeModal = () => {
  const scrollY = document.body.style.top
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.overflowY = ''
  document.body.style.width = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
  isModalOpen.value = false
}

// Close modal on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Clean up body styles if component unmounts while modal is open
  if (isModalOpen.value) {
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.overflowY = ''
    document.body.style.width = ''
  }
})
</script>

<style scoped>
/* Thumbnail Styles */
.image-thumbnail {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow);
  border: 3px solid var(--border-color);
}

.image-thumbnail:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px var(--shadow);
  border-color: var(--button-bg);
}

.image-thumbnail.small {
  width: 60px;
  height: 60px;
}

.image-thumbnail.medium {
  width: 120px;
  height: 120px;
}

.image-thumbnail.large {
  width: 200px;
  height: 200px;
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.thumbnail-img.flipped {
  transform: scaleX(-1);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 2rem;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: scaleIn 0.3s ease;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: -10px;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  z-index: 10001;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: var(--button-bg);
  color: var(--button-text);
  transform: scale(1.1);
}

.modal-img {
  width: 400px;
  height: 400px;
  object-fit: cover;
  object-position: center;
  border-radius: 8px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.modal-img.flipped {
  transform: scaleX(-1);
}

.image-caption {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  border-radius: 6px;
  font-size: 0.9rem;
  text-align: center;
  max-width: 500px;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Dark theme adjustments */
[data-theme="dark"] .close-btn {
  background-color: rgba(45, 45, 45, 0.9);
  color: var(--text-primary);
}

[data-theme="dark"] .image-caption {
  background-color: rgba(45, 45, 45, 0.9);
  color: var(--text-primary);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .close-btn {
    top: -40px;
    right: 0;
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
  
  .modal-img {
    width: 300px;
    height: 300px;
  }
  
  .image-thumbnail.large {
    width: 150px;
    height: 150px;
  }
  
  .image-thumbnail.medium {
    width: 100px;
    height: 100px;
  }
}
</style>
