<template>
  <!-- Modal Overlay -->
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="modal-overlay"
      @click="$emit('close')"
    >
      <div class="modal-content" @click.stop>
        <!-- Terminal Window Component -->
        <TerminalWindow
          :is-modal="true"
          :active-view="activeView"
          :current-command="currentCommand"
          :command-history="commandHistory"
          :show-cursor="showCursor"
          :is-input-focused="isInputFocused"
          :username="username"
          :hostname="hostname"
          :current-path="currentPath"
          :execute-command="executeCommand"
          :navigate-history="navigateHistory"
          :auto-complete="autoComplete"
          @close="$emit('close')"
          @minimize="$emit('minimize')"
          @maximize="$emit('maximize')"
          @clear-terminal="$emit('clear-terminal')"
          @update:active-view="$emit('update:activeView', $event)"
          @update:is-input-focused="$emit('update:isInputFocused', $event)"
          @update:current-command="$emit('update:currentCommand', $event)"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import TerminalWindow from './TerminalWindow.vue'

interface Props {
  isOpen: boolean
  activeView: 'terminal' | 'classic'
  currentCommand: string
  commandHistory: any[]
  showCursor: boolean
  isInputFocused: boolean
  username: string
  hostname: string
  currentPath: string
  executeCommand: () => void
  navigateHistory: (direction: number) => void
  autoComplete: () => void
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  minimize: []
  maximize: []
  'update:activeView': [view: 'terminal' | 'classic']
  'update:isInputFocused': [focused: boolean]
  'update:currentCommand': [command: string]
  'clear-terminal': []
}>()

// Handle modal open/close body scroll
watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    // Simply prevent scrolling without changing scroll position
    document.body.style.overflow = 'hidden'
  } else {
    // Restore scrolling
    document.body.style.overflow = ''
  }
})

// Close modal on Escape key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Clean up body styles if component unmounts while modal is open
  if (props.isOpen) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
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
  width: 95vw;
  height: 85vh;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  animation: scaleIn 0.3s ease;
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
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 1rem;
  }
  
  .modal-content {
    width: 98vw;
    height: 90vh;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 100vw;
    height: 95vh;
  }
  
  .modal-overlay {
    padding: 0.5rem;
  }
}
</style>
