<template>
  <div class="terminal-container">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="btn-close" @click="$emit('close')" :title="isModal ? 'Close Terminal' : 'Close Terminal'"></span>
        <span class="btn-minimize" @click="$emit('minimize')" :title="isModal ? 'Minimize Terminal' : 'Minimize Terminal'"></span>
        <span class="btn-maximize" @click="$emit('maximize')" :title="isModal ? 'Maximize Terminal' : 'Maximize Terminal'"></span>
      </div>
      
      <!-- Dialog Status Indicator - Right of macOS buttons -->
      <div v-if="terminalRef.isInDialog.value" class="dialog-status-left">
        <div class="live-indicator" :title="getDialogModeTooltip()">
          <div class="live-dot"></div>
          <span class="live-text no-text-cursor">Dialog Mode</span>
        </div>
        
        <!-- Dialog Control Buttons - Right next to Dialog Mode -->
        <div class="dialog-buttons-inline">
          <button 
            @click="retryDialog"
            class="glass-btn retry-glass-btn"
            :title="getRetryTooltip()"
          >
            <img :src="RetryIcon" alt="Retry" class="glass-btn-icon" />
          </button>
          <button 
            @click="cancelDialog"
            class="glass-btn cancel-glass-btn"
            :title="getCancelTooltip()"
          >
            <img :src="CrossIcon" alt="Cancel" class="glass-btn-icon" />
          </button>
        </div>
      </div>
      
      <div v-if="!isModal" class="terminal-title">Contact Me</div>
      <div v-else class="terminal-title">Terminal - Maximized</div>
      
      <div class="header-right">
        <!-- Action Buttons - Always show, but help behavior changes in dialog -->
        <div class="action-buttons">
          <button 
            @click="clearTerminal"
            class="action-btn"
            :title="getClearTooltip()"
          >
            <img :src="DeleteIcon" alt="Clear" class="action-icon" />
          </button>
          <button 
            @click="showHelp"
            class="action-btn"
            :title="getHelpTooltip()"
          >
            <img :src="QuestionMarkIcon" alt="Help" class="action-icon" />
          </button>
        </div>
        
        <!-- View Toggle Buttons in Header -->
        <div class="header-toggle">
          <div class="toggle-button">
            <button 
              @click="updateActiveView('terminal')"
              :class="{ active: activeView === 'terminal' }"
              class="toggle-option toggle-left"
            >
              Terminal
            </button>
            <div class="toggle-divider">|</div>
            <button 
              @click="updateActiveView('classic')"
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
        <div v-for="(entry, index) in terminalRef.commandHistory.value" :key="index" class="history-entry">
          <div class="prompt-line">
            <!-- Show different prompt for dialog mode -->
            <span v-if="entry.command.startsWith('> ')">{{ entry.command }}</span>
            <span v-else>
              <span class="user">{{ terminalRef.username }}</span>@<span class="hostname">{{ terminalRef.hostname }}</span>:<span class="path">{{ terminalRef.currentPath }}</span>$ <span class="command-text">{{ entry.command }}</span>
            </span>
          </div>
          <div v-if="entry.output" class="output">{{ entry.output }}</div>
        </div>
      </div>
      <div class="terminal-input-line" @click="focusInput">
        <span class="prompt">
          <!-- Dynamic prompt based on dialog state -->
          <span v-if="terminalRef.isInDialog.value" class="dialog-prompt">></span>
          <span v-else>
            <span class="user">{{ terminalRef.username }}</span>@<span class="hostname">{{ terminalRef.hostname }}</span>:<span class="path">{{ terminalRef.currentPath }}</span>$ 
          </span>
        </span>
        <div class="input-container">
          <textarea 
            ref="terminalInput"
            :value="terminalRef.currentCommand.value"
            @input="updateCurrentCommand(($event.target as HTMLTextAreaElement).value); autoResizeTextarea()"
            @keydown.enter.prevent="executeCommand()"
            @keydown.down="terminalRef.navigateHistory(-1)"
            @keydown.up="terminalRef.navigateHistory(1)"
            @keydown.tab.prevent="terminalRef.autoComplete()"
            @keydown.shift.tab.prevent=""
            @focus="updateIsInputFocused(true); autoResizeTextarea()"
            @blur="updateIsInputFocused(false)"
            class="terminal-input"
            :placeholder="terminalRef.isInDialog.value ? 'Type your response...' : 'Type a command...'"
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
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import DeleteIcon from '../assets/delete.svg'
import QuestionMarkIcon from '../assets/questionmark.svg'
import RetryIcon from '../assets/retry.svg'
import CrossIcon from '../assets/cross.svg'
import { UseTerminal } from '@/composables/useTerminal'
const terminalRef = defineModel<UseTerminal>('terminal', { required: true })

defineProps<{ isModal?: boolean }>()

const activeView = ref<'terminal' | 'classic'>('terminal')  
const isInputFocused = ref(false)

defineEmits<{
  close: []
  minimize: []
  maximize: []
}>()

const updateIsInputFocused = (focused: boolean) => {
  isInputFocused.value = focused
}
const updateCurrentCommand = (command: string) => {
  terminalRef.value.currentCommand.value = command
}
const updateActiveView = (view: 'terminal' | 'classic') => {
  activeView.value = view
}

const executeCommand = () => {
  terminalRef.value.executeCommand()
}

const cancelDialog = () => {
  const output = terminalRef.value.cancelDialog()
  if (output) {
    terminalRef.value.addToHistory({ command: '^C', output })
  }
}

const retryDialog = () => {
  const output = terminalRef.value.restartDialog()
  if (output) {
    terminalRef.value.addToHistory({ command: 'restart', output })
  }
}

const terminalInput = ref<HTMLTextAreaElement>()

// Keyboard event handler for Ctrl+C
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.key === 'c' && terminalRef.value.isInDialog.value) {
    event.preventDefault()
    cancelDialog()
  }
}

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

const clearTerminal = () => {
  terminalRef.value.cancelDialog()
  terminalRef.value.clearHistory()
}

// Show help function - context-aware
const showHelp = () => {
  if (terminalRef.value.isInDialog.value) {
    // Dialog-specific help
    const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'dialog'
    const helpText = getDialogHelp(dialogName)
    terminalRef.value.addToHistory({ command: '> help', output: helpText })
  } else {
    // Regular help
    updateCurrentCommand('help')
    terminalRef.value.executeCommand()
  }
}

// Dialog-specific help text
const getDialogHelp = (dialogName: string): string => {
  const helpTexts: Record<string, string> = {
    contact: `📋 Contact Dialog Help:
• Answer each question with your response (Enter to submit)
• If you dont like this dialog style you can switch to classic view (button top-right in header)
• At the end of the dialog, confirm with 'yes' or 'no' to send the message to me :)
• Use Ctrl+Q to cancel anytime (or the button)
• Use Ctrl+R to restart from beginning (or the button)`,
    default: `📋 Dialog Help:
• Follow the prompts step by step
• Use Ctrl+Q to cancel the dialog (or the button)
• Use Ctrl+R to restart from beginning (or the button)
• Type your responses and press Enter`
  }
  return helpTexts[dialogName] || helpTexts.default
}

// Tooltip generators
const getDialogModeTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'unknown'
  const currentStep = (terminalRef.value.currentDialog.value?.currentStep || 0) + 1
  const totalSteps = terminalRef.value.currentDialog.value?.definition.steps.length || 0
  return `Active Dialog: ${dialogName} (Step ${currentStep}/${totalSteps})\nKeyboard shortcuts: Ctrl+Q (cancel), Ctrl+R (restart)`
}

const getRetryTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'dialog'
  return `Restart ${dialogName} from the beginning\nKeyboard shortcut: Ctrl+R`
}

const getCancelTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'dialog'
  return `Cancel ${dialogName} and return to terminal\nKeyboard shortcut: Ctrl+Q`
}

const getClearTooltip = (): string => {
  return terminalRef.value.isInDialog.value 
    ? 'Clear terminal history (dialog continues)'
    : 'Clear terminal history'
}

const getHelpTooltip = (): string => {
  return terminalRef.value.isInDialog.value
    ? 'Show dialog-specific help and shortcuts'
    : 'Show available commands and help'
}

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})

// Watch for changes in currentCommand to auto-resize textarea
watch(() => terminalRef.value.currentCommand, () => {
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

/* Dialog Status Indicator - Left side next to macOS buttons */
.dialog-status-left {
  position: absolute;
  left: 100px; /* Position after the macOS buttons */
  display: flex;
  align-items: center;
  animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 6px 12px;
  border-radius: 20px;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-primary);
  position: relative;
  animation: livePulse 2s ease-in-out infinite;
  box-shadow: 
    0 0 0 0 rgba(var(--accent-primary-rgb, 64, 224, 208), 0.4),
    inset 0 1px 1px rgba(255, 255, 255, 0.3);
}

.live-dot::before {
  content: '';
  position: absolute;
  top: -2.8px;
  left: -2.9px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--accent-primary);
  opacity: 0;
  animation: liveRipple 2s ease-in-out infinite;
}

/* Glass-style buttons for dialog controls */
.dialog-buttons-inline {
  display: flex;
  gap: 8px;
  margin-left: 8px;
  align-items: center;
}

.glass-btn {
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  position: relative;
  box-shadow: 
    0 4px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.glass-btn:active {
  transform: translateY(0);
  background: rgba(255, 255, 255, 0.2);
}

.cancel-glass-btn:hover {
  background: rgba(255, 68, 68, 0.2) !important;
  border-color: rgba(255, 68, 68, 0.3) !important;
}


.cancel-glass-btn:active {
  background: rgba(255, 68, 68, 0.3) !important;
}

.retry-glass-btn:hover {
  background: rgba(68, 68, 255, 0.2) !important;
  border-color: rgba(68, 68, 255, 0.3) !important;
}


.retry-glass-btn:active {
  background: rgba(68, 68, 255, 0.3) !important;
}

.glass-btn-icon {
  width: 14px;
  height: 14px;
  filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
  opacity: 0.9;
}

.live-text {
  color: #fff;
  font-size: 11px;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

@keyframes livePulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes liveRipple {
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Remove default browser tooltips and add custom styling */
.live-indicator,
.glass-btn,
.action-btn {
  position: relative;
}

/* Custom tooltip styling - browser will handle the display */
.live-indicator[title],
.glass-btn[title],
.action-btn[title] {
  cursor: help;
}
.dialog-status {
  display: flex;
  align-items: center;
  animation: fadeInSlide 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.dialog-indicator {
  background: var(--accent-primary);
  color: #000;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
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
  margin-bottom: 8px;
  text-align: left;
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

.dialog-prompt {
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 16px;
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
  
  .dialog-status-left {
    left: 80px; /* Adjust for smaller screens */
  }
  
  .live-indicator {
    padding: 4px 8px;
    gap: 6px;
  }
  
  .live-text {
    font-size: 10px;
  }
  
  .live-dot {
    width: 6px;
    height: 6px;
  }
  
  .live-dot::before {
    width: 10px;
    height: 10px;
    top: -2px;
    left: -2px;
  }
  
  .dialog-buttons-inline {
    margin-left: 8px;
    gap: 6px;
  }
  
  .glass-btn {
    width: 28px;
    height: 28px;
  }
  
  .glass-btn-icon {
    width: 12px;
    height: 12px;
  }
}
</style>