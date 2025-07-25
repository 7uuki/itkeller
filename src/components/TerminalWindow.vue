<template>
  <div class="terminal-container">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="btn-close" @click="$emit('close')" :title="isModal ? 'Close Terminal' : 'Close Terminal'"></span>
        <span class="btn-minimize" @click="$emit('minimize')" :title="isModal ? 'Minimize Terminal' : 'Minimize Terminal'"></span>
        <span class="btn-maximize" @click="$emit('maximize')" :title="isModal ? 'Maximize Terminal' : 'Maximize Terminal'"></span>
      </div>
      
      <div v-if="!isModal" class="terminal-title">Terminal</div>
      <div v-else class="terminal-title">Terminal - Maximized</div>
      
      <div class="header-right">
        <!-- Action Buttons - Only show in terminal mode -->
        <div v-if="activeView === 'terminal'" class="action-buttons">
          <button 
            @click="clearTerminal"
            class="action-btn"
            title="Clear Terminal"
          >
            <img :src="BroomIcon" alt="Clear" class="action-icon" />
          </button>
          <button 
            @click="showHelp"
            class="action-btn"
            title="Show Help"
          >
            <img :src="QuestionMarkIcon" alt="Help" class="action-icon" />
          </button>
        </div>
        
        <!-- View Toggle Buttons in Header -->
        <div class="header-toggle">
          <div class="toggle-button">
            <button 
              @click="$emit('update:activeView', 'terminal')"
              :class="{ active: activeView === 'terminal' }"
              class="toggle-option toggle-left"
            >
              Terminal
            </button>
            <div class="toggle-divider">|</div>
            <button 
              @click="$emit('update:activeView', 'classic')"
              :class="{ active: activeView === 'classic' }"
              class="toggle-option toggle-right"
            >
              Classic
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Terminal Body -->
    <div v-if="activeView === 'terminal'" class="terminal-body" :class="{ 'modal-body': isModal }">
      <div class="terminal-history">
        <div v-for="(entry, index) in commandHistory" :key="index" class="history-entry">
          <div class="prompt-line">
            <span class="user">{{ username }}</span>@<span class="hostname">{{ hostname }}</span>:<span class="path">{{ currentPath }}</span>$ <span class="command-text">{{ entry.command }}</span>
          </div>
          <div v-if="entry.output" class="output">{{ entry.output }}</div>
        </div>
      </div>
      <div class="terminal-input-line" @click="focusInput">
        <span class="prompt">
          <span class="user">{{ username }}</span>@<span class="hostname">{{ hostname }}</span>:<span class="path">{{ currentPath }}</span>$ 
        </span>
        <div class="input-container">
          <textarea 
            ref="terminalInput"
            :value="currentCommand"
            @input="$emit('update:currentCommand', ($event.target as HTMLTextAreaElement).value); autoResizeTextarea()"
            @keydown.enter.prevent="executeCommand"
            @keydown.up="navigateHistory(-1)"
            @keydown.down="navigateHistory(1)"
            @keydown.tab.prevent="autoComplete"
            @focus="$emit('update:isInputFocused', true); autoResizeTextarea()"
            @blur="$emit('update:isInputFocused', false)"
            class="terminal-input"
            placeholder="Type a command..."
            spellcheck="false"
            autocomplete="off"
            rows="1"
          ></textarea>
        </div>
      </div>
    </div>
    
    <!-- Classic Body -->
    <div v-if="activeView === 'classic'" class="classic-body" :class="{ 'modal-body': isModal }">
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
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import BroomIcon from '../assets/broom.svg'
import QuestionMarkIcon from '../assets/questionmark.svg'

interface Props {
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
  isModal?: boolean
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

const terminalInput = ref<HTMLTextAreaElement>()

// Auto-resize textarea function
const autoResizeTextarea = () => {
  if (terminalInput.value) {
    terminalInput.value.style.height = 'auto'
    terminalInput.value.style.height = terminalInput.value.scrollHeight + 'px'
  }
}

// Focus input function
const focusInput = () => {
  if (terminalInput.value) {
    terminalInput.value.focus()
  }
}

// Clear terminal function
const clearTerminal = () => {
  emit('clear-terminal')
}

// Show help function
const showHelp = () => {
  emit('update:currentCommand', 'help')
  props.executeCommand()
}

// Watch for changes in currentCommand to auto-resize textarea
watch(() => props.currentCommand, () => {
  nextTick(() => {
    autoResizeTextarea()
  })
})
</script>

<style scoped>
/* Terminal Styles */
.terminal-container {
  background: #1e1e1e;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.terminal-header {
  background: #2d2d2d;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #404040;
  flex-shrink: 0;
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
  cursor: pointer;
  transition: all 0.2s ease;
}

.terminal-buttons span:hover {
  transform: scale(1.1);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
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
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

/* Action Buttons */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-buttons {
  display: flex;
  gap: 6px;
  align-items: center;
  animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transform-origin: right center;
}

/* Animation for action buttons */
@keyframes fadeInSlide {
  from {
    opacity: 0;
    transform: translateX(10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Vue transition classes for smoother enter/leave */
.v-enter-active .action-buttons,
.v-leave-active .action-buttons {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.v-enter-from .action-buttons {
  opacity: 0;
  transform: translateX(10px) scale(0.9);
}

.v-leave-to .action-buttons {
  opacity: 0;
  transform: translateX(10px) scale(0.9);
}

.action-btn {
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: #1e1e1e;
  font-size: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
  user-select: none;
  position: relative;
}

.action-btn:hover {
  background: var(--accent-primary);
  transform: translateY(-0.5px);
}

.action-btn:active {
  background: var(--accent-tertiary);
  transform: translateY(0);
}

.action-icon {
  width: 12px;
  height: 12px;
  filter: brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(80%);
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
  background: var(--accent-primary);
  color: #000;
  font-weight: 600;
}

.header-toggle .toggle-divider {
  color: #404040;
  font-size: 12px;
  margin: 0 2px;
  user-select: none;
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
  display: flex;
  flex-direction: column;
}

.terminal-body.modal-body {
  height: auto;
  max-height: none;
  flex: 1;
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
  color: var(--accent-secondary);
  font-weight: 600;
}

.prompt-line .hostname {
  color: var(--accent-secondary);
  font-weight: 600;
}

.prompt-line .path {
  color: var(--accent-tertiary);
  font-weight: 600;
}

.command-text {
  white-space: pre-line;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.output {
  color: #b1b1b1;
  white-space: pre-line;
  margin-left: 0;
  font-family: inherit;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
}

.terminal-input-line {
  display: flex;
  align-items: flex-start;
  position: relative;
  flex-shrink: 0;
  cursor: text;
  min-height: 1.4em;
}

.input-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
}

.prompt {
  color: #ffffff;
  white-space: nowrap;
  margin-right: 8px;
  align-self: flex-start;
  line-height: 1.4em;
}

.prompt .user {
  color: var(--accent-secondary);
  font-weight: 600;
}

.prompt .hostname {
  color: var(--accent-secondary);
  font-weight: 600;
}

.prompt .path {
  color: var(--accent-tertiary);
  font-weight: 600;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  padding: 0;
  margin: 0;
  caret-color: #ffffff;
  word-wrap: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  resize: none;
  min-height: 1.4em;
  overflow: hidden;
  vertical-align: top;
}

.terminal-input::placeholder {
  color: #666;
  opacity: 0.7;
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

.classic-body.modal-body {
  height: auto;
  max-height: none;
  flex: 1;
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
  .terminal-header {
    padding: 10px 12px;
  }
  
  .terminal-title {
    font-size: 12px;
  }
  
  .header-toggle .toggle-option {
    padding: 5px 8px;
    font-size: 11px;
  }
  
  .placeholder-items {
    grid-template-columns: 1fr;
    gap: 8px;
  }
}
</style>
