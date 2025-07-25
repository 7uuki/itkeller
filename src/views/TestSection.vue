<template>
  <section id="test" class="test-section">
    <!-- Interactive Background -->
    
    <div class="container">
      
      <h2 
        :ref="titleReveal.element" 
        :style="titleReveal.style.value"
        class="test-title"
      >
        Test Section
      </h2>
      
      <p 
        :ref="descriptionReveal.element"
        :style="descriptionReveal.style.value" 
        class="test-description"
      >
        This is a test section with 100vh height for layout testing and development purposes.
      </p>
      
      <!-- Restore Terminal Button (when terminal is closed/minimized) -->
      <div 
        v-if="!isTerminalVisible"
        class="restore-terminal-container"
      >
        <button 
          @click="isTerminalVisible = true"
          class="restore-terminal-btn"
          title="Restore Terminal"
        >
          <span class="restore-icon">🖥️</span>
          Restore Terminal
        </button>
      </div>
      
      
      <!-- Terminal Container with Toggle -->
      <div 
        v-if="isTerminalVisible"
        :ref="terminalReveal.element"
        :style="terminalReveal.style.value"
        class="view-container"
      >
        <TerminalWindow
          :is-modal="false"
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
          @close="closeTerminal"
          @minimize="minimizeTerminal"
          @maximize="maximizeTerminal"
          @clear-terminal="clearTerminal"
          @update:active-view="(view: 'terminal' | 'classic') => activeView = view"
          @update:is-input-focused="(focused: boolean) => isInputFocused = focused"
          @update:current-command="(command: string) => currentCommand = command"
        />
      </div>
      
    </div>
    
    <!-- Terminal Modal -->
    <TerminalModal
      :is-open="isModalOpen"
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
      @close="closeModal"
      @minimize="handleMinimizeFromModal"
      @clear-terminal="clearTerminal"
      @update:active-view="(view) => activeView = view"
      @update:is-input-focused="(focused) => isInputFocused = focused"
      @update:current-command="(command) => currentCommand = command"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTerminal } from '../composables/useTerminal'
import TerminalModal from '../components/TerminalModal.vue'
import TerminalWindow from '../components/TerminalWindow.vue'

// View state
const activeView = ref<'terminal' | 'classic'>('terminal')
const isInputFocused = ref(false)
const isModalOpen = ref(false)
const isTerminalVisible = ref(true)

// Terminal configuration and setup
const terminal = useTerminal({
  username: 'dear',
  hostname: 'stranger',
  currentPath: '~/ca',
  cursorBlinkInterval: 530,
  maxHistorySize: 50,
  customCommands: {
    portfolio: () => 'Welcome to my portfolio! Try commands like: about, skills, projects, contact',
    about: () => 'I am a passionate developer with expertise in web technologies.\nSpecializing in Vue.js, TypeScript, and modern web development.',
    skills: () => 'Technical Skills:\n• Frontend: Vue.js, React, TypeScript, HTML5, CSS3\n• Backend: Node.js, Python, PHP\n• Tools: Git, Docker, VS Code\n• Databases: MySQL, MongoDB, PostgreSQL',
    projects: () => 'Recent Projects:\n1. Interactive Portfolio Website (Vue.js + TypeScript)\n2. E-commerce Platform (React + Node.js)\n3. Task Management App (Vue.js + Express)\n4. Real-time Chat Application (Socket.io)',
    contact: () => 'Get in touch:\n📧 Email: your.email@example.com\n💼 LinkedIn: linkedin.com/in/yourprofile\n🐱 GitHub: github.com/yourusername',
    theme: () => 'Portfolio theme: Modern dark theme with interactive elements\nBuilt with: Vue 3, TypeScript, Vite',
    sudo: (args) => {
      if (args.length === 0) return 'sudo: command not found'
      return '[sudo] password for developer: Permission denied. Nice try! 😉'
    }
  }
})

// Destructure what we need from the terminal composable
const {
  currentCommand,
  commandHistory,
  showCursor,
  terminalInput,
  executeCommand,
  navigateHistory,
  autoComplete,
  username,
  hostname,
  currentPath
} = terminal

// Scroll reveal animations
const titleReveal = useScrollReveal({
  translateY: '50px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 100
})

const descriptionReveal = useScrollReveal({
  translateY: '40px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 200
})

const terminalReveal = useScrollReveal({
  translateY: '30px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 300
})

// Button functions
const closeTerminal = () => {
  isTerminalVisible.value = false
}

const minimizeTerminal = () => {
  isTerminalVisible.value = false
  // Could add animation or different state here
}

const maximizeTerminal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleMinimizeFromModal = () => {
  isModalOpen.value = false
  isTerminalVisible.value = true
}

const clearTerminal = () => {
  // Clear the command history
  commandHistory.value = []
}

const autoResizeTextarea = () => {
  if (terminalInput.value) {
    terminalInput.value.style.height = 'auto'
    terminalInput.value.style.height = terminalInput.value.scrollHeight + 'px'
  }
}

// Watch for changes in currentCommand to auto-resize textarea
watch(currentCommand, () => {
  nextTick(() => {
    autoResizeTextarea()
  })
})
</script>

<style scoped>
.test-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

.background-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.test-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.test-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

/* Restore Terminal Button */
.restore-terminal-container {
  margin: 32px 0;
  display: flex;
  justify-content: center;
}

.restore-terminal-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--accent-primary);
  color: #000;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.restore-terminal-btn:hover {
  background: var(--accent-secondary);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.restore-terminal-btn:active {
  transform: translateY(0);
}

.restore-icon {
  font-size: 16px;
}

/* View Container Base Styles */
.view-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .test-title {
    font-size: 2rem;
  }
  
  .test-description {
    font-size: 1rem;
  }
  
  .view-container {
    margin: 0 8px;
  }
}

@media (max-width: 480px) {
  .test-title {
    font-size: 1.75rem;
  }
}
</style>
