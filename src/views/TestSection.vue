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
      
      <!-- Terminal Container with Toggle -->
      <div 
        :ref="terminalReveal.element"
        :style="terminalReveal.style.value"
        class="view-container terminal-container"
      >
        <div class="terminal-header">
          <div class="terminal-buttons">
            <span class="btn-close"></span>
            <span class="btn-minimize"></span>
            <span class="btn-maximize"></span>
          </div>
          
          <!-- View Toggle Buttons in Header -->
          <div class="header-toggle">
            <div class="toggle-button">
              <button 
                @click="activeView = 'terminal'"
                :class="{ active: activeView === 'terminal' }"
                class="toggle-option toggle-left"
              >
                Terminal
              </button>
              <div class="toggle-divider">|</div>
              <button 
                @click="activeView = 'classic'"
                :class="{ active: activeView === 'classic' }"
                class="toggle-option toggle-right"
              >
                Classic
              </button>
            </div>
          </div>
        </div>
        
        <!-- Terminal Body -->
        <div v-if="activeView === 'terminal'" class="terminal-body">
          <div class="terminal-history">
            <div v-for="(entry, index) in commandHistory" :key="index" class="history-entry">
              <div class="prompt-line">
                <span class="user">{{ username }}</span>@<span class="hostname">{{ hostname }}</span>:<span class="path">{{ currentPath }}</span>$ {{ entry.command }}
              </div>
              <div v-if="entry.output" class="output">{{ entry.output }}</div>
            </div>
          </div>
          <div class="terminal-input-line">
            <span class="prompt">
              <span class="user">{{ username }}</span>@<span class="hostname">{{ hostname }}</span>:<span class="path">{{ currentPath }}</span>$ 
            </span>
            <div class="input-container">
              <span class="typed-text">{{ currentCommand }}</span>
              <span v-if="showCursor && isInputFocused" class="cursor">|</span>
              <input 
                ref="terminalInput"
                v-model="currentCommand"
                @keydown.enter="executeCommand"
                @keydown.up="navigateHistory(-1)"
                @keydown.down="navigateHistory(1)"
                @keydown.tab.prevent="autoComplete"
                @focus="isInputFocused = true"
                @blur="isInputFocused = false"
                class="terminal-input"
                placeholder="Type a command..."
                spellcheck="false"
                autocomplete="off"
              />
            </div>
          </div>
        </div>
        
        <!-- Classic Body -->
        <div v-if="activeView === 'classic'" class="classic-body">
          <div class="classic-content">
            <p>This is a placeholder for the classic view.</p>
            <p>Content to be determined...</p>
            <div class="placeholder-items">
              <div class="placeholder-item">📊 Dashboard</div>
              <div class="placeholder-item">📈 Analytics</div>
              <div class="placeholder-item">⚙️ Settings</div>
              <div class="placeholder-item">📝 Documentation</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTerminal } from '../composables/useTerminal'

// View state
const activeView = ref<'terminal' | 'classic'>('terminal')
const isInputFocused = ref(false)

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

/* View Container Base Styles */
.view-container {
  max-width: 800px;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Terminal Styles */
.terminal-container {
  background: #1e1e1e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.terminal-header {
  background: #2d2d2d;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
}

/* Header Toggle Styles */
.header-toggle {
  display: flex;
  align-items: center;
}

.header-toggle .toggle-button {
  display: flex;
  align-items: center;
  background: #1e1e1e;
  border-radius: 6px;
  padding: 2px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  border: 1px solid #404040;
}

.header-toggle .toggle-option {
  padding: 6px 12px;
  border: none;
  background: transparent;
  color: #888;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 4px;
  position: relative;
}

.header-toggle .toggle-option:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.header-toggle .toggle-option.active {
  background: var(--accent-secondary);
  color: #000;
  font-weight: 600;
}

.header-toggle .toggle-divider {
  color: #404040;
  font-size: 12px;
  margin: 0 2px;
  user-select: none;
}

.terminal-buttons {
  display: flex;
  gap: 8px;
}

.terminal-buttons span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.btn-close {
  background: #ff5f57;
}

.btn-minimize {
  background: #ffbd2e;
}

.btn-maximize {
  background: #28ca42;
}

.terminal-title {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
}

.terminal-body {
  background: #1e1e1e;
  color: #ffffff;
  padding: 16px;
  height: 400px;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
}

.terminal-history {
  margin-bottom: 16px;
}

.history-entry {
  margin-bottom: 8px;
}

.prompt-line {
  color: #ffffff;
  margin-bottom: 4px;
}

.prompt-line .user {
  color: var(--accent-primary);
  font-weight: 600;
}

.prompt-line .hostname {
  color: var(--accent-primary);
  font-weight: 600;
}

.prompt-line .path {
  color: var(--accent-secondary);
  font-weight: 600;
}

.output {
  color: var(--text-accent);
  white-space: pre-line;
  margin-left: 0;
  font-family: inherit;
}

.terminal-input-line {
  display: flex;
  align-items: center;
  position: relative;
}

.input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.typed-text {
  color: #ffffff;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  white-space: pre;
}

.prompt {
  color: #ffffff;
  white-space: nowrap;
  margin-right: 8px;
}

.prompt .user {
  color: var(--accent-primary);
  font-weight: 600;
}

.prompt .hostname {
  color: var(--accent-primary);
  font-weight: 600;
}

.prompt .path {
  color: var(--accent-secondary);
  font-weight: 600;
}

.terminal-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: transparent;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  caret-color: transparent;
}

.terminal-input::placeholder {
  color: transparent;
}

.terminal-input:focus + .cursor {
  opacity: 1;
}

.cursor {
  color: #ffffff;
  font-weight: bold;
  animation: blink 1.06s infinite;
  margin-left: -2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Custom scrollbar for terminal */
.terminal-body::-webkit-scrollbar {
  width: 6px;
}

.terminal-body::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.terminal-body::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.terminal-body::-webkit-scrollbar-thumb:hover {
  background: #777;
}

/* Classic View Styles */
.classic-body {
  background: #1e1e1e;
  color: #d1d5db;
  padding: 16px;
  height: 400px;
  max-height: 400px;
  overflow-y: auto;
  font-size: 14px;
  line-height: 1.4;
}

.classic-content {
  text-align: left;
}

.classic-content p {
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.placeholder-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 20px;
}

.placeholder-item {
  background: #1e1e1e;
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #404040;
  color: #fff;
  font-size: 13px;
  transition: all 0.3s ease;
  cursor: pointer;
}

.placeholder-item:hover {
  background: #3d3d3d;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Custom scrollbar for classic body */
.classic-body::-webkit-scrollbar {
  width: 6px;
}

.classic-body::-webkit-scrollbar-track {
  background: #2d2d2d;
}

.classic-body::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 3px;
}

.classic-body::-webkit-scrollbar-thumb:hover {
  background: #777;
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
  
  .header-toggle .toggle-option {
    padding: 5px 8px;
    font-size: 11px;
  }
  
  .view-container {
    margin: 0 8px;
  }
  
  .placeholder-items {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}

@media (max-width: 480px) {
  .test-title {
    font-size: 1.75rem;
  }
}
</style>
