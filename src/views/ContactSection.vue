<template>
  <section id="contact" class="contact-section">
    <div class="container">
      
      <h2 
        :ref="titleReveal.element" 
        :style="titleReveal.style.value"
        class="contact-title"
      >
        {{ t.contact.title }}
      </h2>
      
      <p 
        :ref="descriptionReveal.element"
        :style="descriptionReveal.style.value" 
        class="contact-description"
      >
        {{ t.contact.subtitle }}
      </p>
      
      <!-- Terminal Container -->
      <div 
        :ref="terminalReveal.element"
        :style="terminalReveal.style.value"
        class="terminal-container"
      >
        <TerminalWindow
          v-model:terminal="terminal"
          :is-modal="false"
          @close="closeTerminal"
          @minimize="minimizeTerminal"
          @maximize="maximizeTerminal"
        />
      </div>
    </div>

    <!-- Preload success animation (hidden) -->
    <div class="hidden-preload">
      <LottieAnimation 
        :animation-path="'https://lottie.host/c2fb13b4-1140-4d1a-9528-a5e40f2ca2d3/FoiIzdx292.lottie'"
        :height="1"
        :width="1"
        :loop="false"
        :should-play="false"
        :preload="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useLanguage } from '../composables/useLanguage'
import { useTerminal } from '../composables/useTerminal'
import TerminalWindow from '../components/TerminalWindow.vue'
import LottieAnimation from '../components/LottieAnimation.vue'

const { t } = useLanguage()

// Terminal configuration and setup
const terminal = useTerminal({
  username: 'visitor',
  hostname: 'portfolio',
  currentPath: '~/contact',
  cursorBlinkInterval: 530,
  maxHistorySize: 50,
  customCommands: {
    portfolio: () => 'Welcome to my portfolio! Try commands like: about, skills, projects, contact',
    about: () => 'I am a passionate developer with expertise in web technologies.\nSpecializing in Vue.js, TypeScript, and modern web development.',
    skills: () => 'Technical Skills:\n• Frontend: Vue.js, React, TypeScript, HTML5, CSS3\n• Backend: Node.js, Python, PHP\n• Tools: Git, Docker, VS Code\n• Databases: MySQL, MongoDB, PostgreSQL',
    projects: () => 'Recent Projects:\n1. Interactive Portfolio Website (Vue.js + TypeScript)\n2. E-commerce Platform (React + Node.js)\n3. Task Management App (Vue.js + Express)\n4. Real-time Chat Application (Socket.io)',
    theme: () => 'Portfolio theme: Modern dark theme with interactive elements\nBuilt with: Vue 3, TypeScript, Vite',
    sudo: (args) => {
      if (args.length === 0) return 'sudo: command not found'
      return '[sudo] password for developer: Permission denied. Nice try! 😉'
    }
  }
})

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

// Terminal control functions
const closeTerminal = () => {
  // Could hide terminal or show alternative contact method
  console.log('Terminal closed')
}

const minimizeTerminal = () => {
  // Could minimize terminal or switch to classic view
  console.log('Terminal minimized')
}

const maximizeTerminal = () => {
  // Could open terminal in modal
  console.log('Terminal maximized')
}
</script>

<style scoped>
.contact-section {
  padding: 80px 0;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.contact-icon {
  margin-bottom: 32px;
}

.mail-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.mail-icon:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.contact-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

/* Terminal Container */
.terminal-container {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Hidden preload container */
.hidden-preload {
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .contact-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-description {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .terminal-container {
    margin: 0 8px;
  }
}

@media (max-width: 480px) {
  .contact-title {
    font-size: 1.75rem;
  }
  
  .mail-icon {
    width: 56px;
    height: 56px;
  }
  
  .mail-icon svg {
    width: 28px;
    height: 28px;
  }
}
</style>
