<template>
  <div class="terminal-container">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <span class="btn-close" 
          @click="$emit('close')" 
          @mouseenter="showTooltip($event, isModal ? 'Close Terminal' : 'Close Terminal')"
          @mouseleave="hideTooltip"
        ></span>
        <span class="btn-minimize" 
          @click="$emit('minimize')" 
          @mouseenter="showTooltip($event, isModal ? 'Minimize Terminal' : 'Minimize Terminal')"
          @mouseleave="hideTooltip"
        ></span>
        <span class="btn-maximize" 
          @click="$emit('maximize')" 
          @mouseenter="showTooltip($event, isModal ? 'Maximize Terminal' : 'Maximize Terminal')"
          @mouseleave="hideTooltip"
        ></span>
      </div>
      
      <!-- Dialog Status Indicator - Only show on desktop or when absolutely necessary -->
      <div v-if="terminalRef.isInDialog.value && isTerminalMode && !isMobile" class="dialog-status-left" >
        <div class="live-indicator" 
          @mouseenter="showTooltip($event, getDialogModeTooltip())"
          @mouseleave="hideTooltip"
        >
          <div class="live-dot"></div>
          <span class="live-text no-text-cursor">Dialog</span>
        </div>
        
        <!-- Dialog Control Buttons - Right next to Dialog Mode -->
        <div class="dialog-buttons-inline">
          <button 
            @click="retryDialog"
            class="glass-btn retry-glass-btn"
            @mouseenter="showTooltip($event, getRetryTooltip())"
            @mouseleave="hideTooltip"
          >
            <img :src="RetryIcon" alt="Retry" class="glass-btn-icon" />
          </button>
          <button 
            @click="cancelDialog"
            class="glass-btn cancel-glass-btn"
            @mouseenter="showTooltip($event, getCancelTooltip())"
            @mouseleave="hideTooltip"
          >
            <img :src="CrossIcon" alt="Cancel" class="glass-btn-icon" />
          </button>
        </div>
      </div>
      
      <div v-if="!isModal && (!isMobile || activeView !== 'terminal')" class="terminal-title">Contact Me</div>
      <div v-else-if="isModal" class="terminal-title">Terminal - Maximized</div>
      
      <div class="header-right">
        <!-- Mobile Dialog Controls - Show on mobile when in dialog -->
        <div v-if="isMobile && terminalRef.isInDialog.value && isTerminalMode" class="mobile-dialog-controls">
          <button 
            @click="retryDialog"
            class="mobile-dialog-btn retry-btn"
            @mouseenter="showTooltip($event, 'Restart')"
            @mouseleave="hideTooltip"
          >
            <img :src="RetryIcon" alt="Retry" class="mobile-dialog-icon" />
          </button>
          <button 
            @click="cancelDialog"
            class="mobile-dialog-btn cancel-dialog-btn"
            @mouseenter="showTooltip($event, 'Cancel')"
            @mouseleave="hideTooltip"
          >
            <img :src="CrossIcon" alt="Cancel" class="mobile-dialog-icon" />
          </button>
        </div>

        <!-- Action Buttons - Simplified on mobile -->
        <div class="action-buttons" v-if="isTerminalMode">
          <!-- Clear Terminal Button with Confirmation - Hidden on mobile when in dialog -->
          <div class="clear-button-container" v-if="!isMobile || !terminalRef.isInDialog.value">
            <!-- Normal state - single delete button -->
            <button 
              v-if="!showClearConfirmation"
              @click="initiateClearConfirmation"
              class="action-btn"
              @mouseenter="showTooltip($event, getClearTooltip())"
              @mouseleave="hideTooltip"
            >
              <img :src="DeleteIcon" alt="Clear" class="action-icon" />
            </button>
            
            <!-- Confirmation state - two buttons -->
            <div v-if="showClearConfirmation" class="confirmation-buttons">
              <button 
                @click="confirmClearTerminal"
                class="action-btn confirm-btn"
                @mouseenter="showTooltip($event, 'Confirm')"
                @mouseleave="hideTooltip"
              >
                <img :src="ConfirmIcon" alt="Confirm" class="confirm-icon" />
              </button>
              <button 
                @click="cancelClearConfirmation"
                @dblclick="cancelClearConfirmation"
                class="action-btn cancel-btn"
                @mouseenter="showTooltip($event, 'Cancel')"
                @mouseleave="hideTooltip"
              >
                <img :src="CrossIcon" alt="Cancel" class="cancel-icon" />
              </button>
            </div>
          </div>
          
          <!-- Help Button - Always show but simplified on mobile -->
          <button 
            @click="showHelp"
            class="action-btn"
            @mouseenter="showTooltip($event, getHelpTooltip())"
            @mouseleave="hideTooltip"
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
              {{ isMobile ? 'Term' : 'Terminal' }}
            </button>
            <div class="toggle-divider">|</div>
            <button 
              @click="updateActiveView('classic')"
              :class="{ active: activeView === 'classic' }"
              class="toggle-option toggle-right"
            >
              {{ isMobile ? 'Form' : 'Classic' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Terminal Body -->
    <div v-show="activeView === 'terminal'" ref="terminalBody" class="terminal-body" :class="{ 'modal-body': isModal }">
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
            @keydown.enter.exact.prevent="executeCommand()"
            @keydown.shift.enter.prevent="insertLineBreak()"
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
      
      <!-- Mobile Enter Button - Only show on mobile -->
      <button 
        v-if="isMobile" 
        @click="executeCommand"
        class="mobile-enter-btn"
        :class="{ 'has-content': terminalRef.currentCommand.value.trim() }"
      >
        <img :src="EnterIcon" alt="Enter" class="mobile-enter-icon" />
      </button>
    </div>
    
    <!-- Classic Body -->
    <div v-show="activeView === 'classic'" class="classic-body" :class="{ 'modal-body': isModal }">
      <div class="classic-content">
        <ContactForm />
      </div>
    </div>
  </div>

  <!-- Custom Tooltip - Outside terminal container for proper positioning -->
  <Teleport to="body">
    <div 
      v-if="tooltipVisible" 
      class="custom-tooltip"
      :style="{
        left: tooltipPosition.x + 'px',
        top: tooltipPosition.y + 'px'
      }"
    >
      {{ tooltipText }}
      <div class="tooltip-arrow"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import DeleteIcon from '../assets/delete.svg'
import QuestionMarkIcon from '../assets/questionmark.svg'
import RetryIcon from '../assets/retry.svg'
import CrossIcon from '../assets/cross.svg'
import ConfirmIcon from '../assets/confirm.svg'
import EnterIcon from '../assets/enter.svg'
import { UseTerminal } from '@/composables/useTerminal'
import ContactForm from './ContactForm.vue'
const terminalRef = defineModel<UseTerminal>('terminal', { required: true })

defineProps<{ isModal?: boolean }>()

// Detect if we're on mobile
const isMobile = ref(false)

// Function to check if device is mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const activeView = ref<'terminal' | 'classic'>('terminal')  
const isTerminalMode = computed(() => activeView.value === 'terminal')
const isInputFocused = ref(false)

// Clear confirmation state
const showClearConfirmation = ref(false)
const clearConfirmationTimeout = ref<NodeJS.Timeout | null>(null)

// Custom tooltip state
const tooltipVisible = ref(false)
const tooltipText = ref('')
const tooltipPosition = ref({ x: 0, y: 0 })
const tooltipTimeout = ref<NodeJS.Timeout | null>(null)

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
  
  // On mobile, when switching to terminal mode, auto-start contact dialog
  if (isMobile.value && view === 'terminal') {
    nextTick(() => {
      setTimeout(() => {
        if (!terminalRef.value.isInDialog.value) {
          terminalRef.value.currentCommand.value = 'contact'
          terminalRef.value.executeCommand()
        }
      }, 100)
    })
  }
}

const executeCommand = () => {
  terminalRef.value.executeCommand()
  // Scroll to bottom after command execution to show new output
  nextTick(() => {
    scrollToBottom()
  })
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
const terminalBody = ref<HTMLDivElement>()

// Auto-resize textarea function
const autoResizeTextarea = () => {
  if (terminalInput.value) {
    terminalInput.value.style.height = 'auto'
    terminalInput.value.style.height = terminalInput.value.scrollHeight + 'px'
    
    // Scroll to bottom after resizing to keep input visible
    nextTick(() => {
      scrollToBottom()
    })
  }
}

// Focus input function
const focusInput = () => {
  if (terminalInput.value) {
    terminalInput.value.focus()
  }
}

// Insert line break function for Shift+Enter
const insertLineBreak = () => {
  const textarea = terminalInput.value
  if (textarea) {
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const currentValue = terminalRef.value.currentCommand.value
    const newValue = currentValue.substring(0, start) + '\n' + currentValue.substring(end)
    
    terminalRef.value.currentCommand.value = newValue
    
    // Set cursor position after the inserted line break
    nextTick(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 1
      autoResizeTextarea()
      scrollToBottom()
    })
  }
}

// Scroll to bottom function
const scrollToBottom = () => {
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

const clearTerminal = () => {
  terminalRef.value.cancelDialog()
  terminalRef.value.clearHistory()
}

// Clear confirmation methods
const initiateClearConfirmation = () => {
  showClearConfirmation.value = true
  
  // Auto-cancel after 3 seconds if no action is taken
  clearConfirmationTimeout.value = setTimeout(() => {
    cancelClearConfirmation()
  }, 5000)
}

const confirmClearTerminal = () => {
  if (clearConfirmationTimeout.value) {
    clearTimeout(clearConfirmationTimeout.value)
    clearConfirmationTimeout.value = null
  }
  clearTerminal()
  showClearConfirmation.value = false
}

const cancelClearConfirmation = () => {
  if (clearConfirmationTimeout.value) {
    clearTimeout(clearConfirmationTimeout.value)
    clearConfirmationTimeout.value = null
  }
  showClearConfirmation.value = false
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
• Use the cancel button to exit anytime
• Use the retry button to restart from beginning`,
    default: `📋 Dialog Help:
• Follow the prompts step by step
• Use the cancel button to exit the dialog
• Use the retry button to restart from beginning
• Type your responses and press Enter`
  }
  return helpTexts[dialogName] || helpTexts.default
}

// Tooltip generators
const getDialogModeTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'unknown'
  const currentStep = (terminalRef.value.currentDialog.value?.currentStep || 0) + 1
  const totalSteps = terminalRef.value.currentDialog.value?.definition.steps.length || 0
  return `Active Dialog: ${dialogName} (Step ${currentStep}/${totalSteps})\nUse buttons to cancel or restart`
}

const getRetryTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'dialog'
  return `Restart ${dialogName} from the beginning`
}

const getCancelTooltip = (): string => {
  const dialogName = terminalRef.value.currentDialog.value?.definition.name || 'dialog'
  return `Cancel ${dialogName} and return to terminal`
}

const getClearTooltip = (): string => {
  return terminalRef.value.isInDialog.value 
    ? 'Clear terminal history'
    : 'Clear terminal history'
}

const getHelpTooltip = (): string => {
  return terminalRef.value.isInDialog.value
    ? 'Show dialog-specific help'
    : 'Show available commands and help'
}

// Custom tooltip functions
const showTooltip = (event: MouseEvent, text: string) => {
  // Clear any existing timeout
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
  }
  
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  
  tooltipText.value = text
  // Position tooltip relative to viewport
  tooltipPosition.value = {
    x: rect.left + rect.width / 2,
    y: rect.top - 10 // A bit more space above the button
  }
  
  // Show tooltip after a delay
  tooltipTimeout.value = setTimeout(() => {
    tooltipVisible.value = true
  }, 400) // 750ms delay
}

const hideTooltip = () => {
  // Clear the timeout if user moves mouse away before tooltip shows
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
    tooltipTimeout.value = null
  }
  tooltipVisible.value = false
}

// Lifecycle hooks
onMounted(() => {
  // Check if mobile and set default view
  checkMobile()
  
  // Set default view based on device type
  if (isMobile.value) {
    activeView.value = 'classic'
  } else {
    activeView.value = 'terminal'
    // Auto-start contact dialog when terminal mode is active on desktop
    nextTick(() => {
      // Add a small delay to ensure terminal is fully initialized
      setTimeout(() => {
        terminalRef.value.currentCommand.value = 'contact'
        terminalRef.value.executeCommand()
      }, 100)
    })
  }
  
  // Add resize listener
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  // Clear tooltip timeout to prevent memory leaks
  if (tooltipTimeout.value) {
    clearTimeout(tooltipTimeout.value)
  }
  // Clear confirmation timeout to prevent memory leaks
  if (clearConfirmationTimeout.value) {
    clearTimeout(clearConfirmationTimeout.value)
  }
  // Remove resize listener
  window.removeEventListener('resize', checkMobile)
})

// Watch for changes in currentCommand to auto-resize textarea
watch(() => terminalRef.value.currentCommand, () => {
  nextTick(() => {
    autoResizeTextarea()
  })
})

// Watch for dialog state changes to hide tooltips when buttons disappear
watch(() => terminalRef.value.isInDialog.value, () => {
  // Hide tooltip when dialog state changes (buttons may disappear)
  hideTooltip()
})

// Watch for view changes to hide tooltips
watch(activeView, () => {
  // Hide tooltip when switching views
  hideTooltip()
})

// Watch for clear confirmation state changes to hide tooltips
watch(showClearConfirmation, () => {
  // Hide tooltip when confirmation buttons appear/disappear
  hideTooltip()
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
  width: 28px;
  height: 28px;
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
  width: 14px;
  height: 14px;
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
  overflow-x: hidden;
  font-size: 14px;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  word-wrap: break-word;
}

.terminal-body.modal-body {
  height: auto;
  max-height: none;
  flex: 1;
}

.terminal-history {
  margin-bottom: 8px;
  text-align: left;
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.history-entry {
  margin-bottom: 8px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
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
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
}

.output {
  color: #b1b1b1;
  white-space: pre-wrap;
  margin-left: 0;
  font-family: inherit;
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;
  max-width: 100%;
  hyphens: auto;
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

/* Clear Button Confirmation Styles */
.clear-button-container {
  position: relative;
  display: flex;
  align-items: center;
}

.confirmation-buttons {
  display: flex;
  gap: 3px;
  animation: confirmationSlideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.confirm-btn {
  background: rgba(34, 197, 94, 0.15) !important;
  color: #22c55e !important;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.15s ease;
  width: 24px !important;
  height: 24px !important;
  border: 1px solid rgba(34, 197, 94, 0.3);
}

.confirm-btn:hover {
  background: rgba(34, 197, 94, 0.25) !important;
  transform: translateY(-0.5px);
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
}

.confirm-btn:active {
  background: rgba(34, 197, 94, 0.35) !important;
  transform: translateY(0);
}

.cancel-btn {
  background: rgba(239, 68, 68, 0.15) !important;
  color: #ef4444 !important;
  font-weight: 500;
  font-size: 12px;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;
  width: 24px !important;
  height: 24px !important;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.cancel-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(220, 38, 38, 0.2) 0%, transparent 100%);
  transform: translateX(-100%);
  animation: autoCancel 3s linear forwards;
  pointer-events: none;
}

.cancel-btn:hover {
  background: rgba(239, 68, 68, 0.25) !important;
  transform: translateY(-0.5px);
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}

.cancel-btn:active {
  background: rgba(239, 68, 68, 0.35) !important;
  transform: translateY(0);
}

/* Icon styles for confirmation buttons */
.confirm-icon,
.cancel-icon {
  width: 12px;
  height: 12px;
  opacity: 0.9;
}

.confirm-icon {
  filter: brightness(0) saturate(100%) invert(47%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%);
}

.cancel-icon {
  filter: brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%);
}

@keyframes autoCancel {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
}

@keyframes confirmationSlideIn {
  from {
    opacity: 0;
    transform: translateX(-10px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

/* Classic View Styles */
.classic-body {
  background: #1e1e1e;
  color: #d1d5db;
  padding: 16px;
  height: 400px;
  max-height: 400px;
  overflow: hidden; /* Changed from overflow-y: auto to prevent scrollbar flash */
  font-size: 14px;
  line-height: 1.4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.classic-body.modal-body {
  height: auto;
  max-height: none;
  flex: 1;
}

.classic-content {
  min-width: 100%;

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
    padding: 8px 12px;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .terminal-title {
    font-size: 12px;
    position: static;
    transform: none;
    order: 1;
    flex: 1;
    text-align: left;
    margin-left: 8px;
  }
  
  .header-right {
    order: 2;
    flex-shrink: 0;
    gap: 8px;
  }
  
  .header-toggle .toggle-option {
    padding: 4px 8px;
    font-size: 11px;
  }
  
  .header-toggle .toggle-button {
    padding: 1px;
  }
  
  /* Mobile dialog controls */
  .mobile-dialog-controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  
  .mobile-dialog-btn {
    width: 23px;
    height: 23px;
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
  }
  
  .mobile-dialog-btn:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: translateY(-1px);
  }
  
  .mobile-dialog-btn:active {
    transform: translateY(0);
    background: rgba(255, 255, 255, 0.2);
  }
  
  .cancel-dialog-btn:hover {
    background: rgba(255, 68, 68, 0.2) !important;
    border-color: rgba(255, 68, 68, 0.3) !important;
  }
  
  .cancel-dialog-btn:active {
    background: rgba(255, 68, 68, 0.3) !important;
  }
  
  .retry-btn:hover {
    background: rgba(68, 68, 255, 0.2) !important;
    border-color: rgba(68, 68, 255, 0.3) !important;
  }
  
  .retry-btn:active {
    background: rgba(68, 68, 255, 0.3) !important;
  }
  
  .mobile-dialog-icon {
    width: 14px;
    height: 14px;
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%);
    opacity: 0.9;
  }
  
  /* Hide action buttons when in dialog on mobile to save space */
  .action-buttons {
    gap: 4px;
  }
  
  .action-btn {
    width: 24px;
    height: 24px;
  }
  
  .action-icon {
    width: 12px;
    height: 12px;
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

  .custom-tooltip {
    font-size: 12px;
    padding: 8px 12px;
    min-width: 150px;
    max-width: 280px;
  }
  
  /* Mobile enter button */
  .terminal-body {
    position: relative;
    padding-bottom: 16px; /* Normal padding, button will be positioned relative to content */
  }
  
  .mobile-enter-btn {
    position: sticky;
    bottom: 16px;
    float: right;
    clear: both;
    margin-top: 16px;
    margin-left: auto;
    display: flex;
    width: 48px;
    height: 48px;
    min-width: 48px;
    min-height: 48px;
    border: none;
    border-radius: 50%;
    background: var(--accent-primary);
    color: #000;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 
      0 4px 16px rgba(0, 0, 0, 0.2),
      0 0 0 0 rgba(var(--accent-primary-rgb), 0.4);
    z-index: 10;
    opacity: 0.7;
    transform: scale(0.9);
    flex-shrink: 0;
  }
  
  .mobile-enter-btn.has-content {
    opacity: 1;
    transform: scale(1);
    animation: enterPulse 2s ease-in-out infinite;
  }
  
  .mobile-enter-icon {
    width: 20px;
    height: 20px;
    filter: brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%);
    opacity: 0.9;
    flex-shrink: 0;
  }
  
  .mobile-enter-btn:hover {
    transform: scale(1.05);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.25),
      0 0 0 4px rgba(var(--accent-primary-rgb), 0.2);
  }
  
  .mobile-enter-btn:active {
    transform: scale(0.95);
    background: var(--accent-secondary);
  }
  
  @keyframes enterPulse {
    0%, 100% {
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.2),
        0 0 0 0 rgba(var(--accent-primary-rgb), 0.4);
    }
    50% {
      box-shadow: 
        0 4px 16px rgba(0, 0, 0, 0.2),
        0 0 0 8px rgba(var(--accent-primary-rgb), 0.2);
    }
  }
}

/* Custom Tooltip Styles */
.custom-tooltip {
  position: fixed;
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 
    0 8px 25px rgba(0, 0, 0, 0.15),
    0 0 0 1px var(--border-color);
  backdrop-filter: blur(10px);
  z-index: 10000;
  pointer-events: none;
  transform: translateX(-50%) translateY(-100%);
  white-space: pre-line;
  min-width: 180px;
  max-width: 320px;
  text-align: center;
  animation: tooltipFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  font-family: 'Space Mono', monospace;
  border: 1px solid rgba(var(--accent-primary-rgb), 0.2);
}

.custom-tooltip::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(135deg, 
    rgba(var(--accent-primary-rgb), 0.1) 0%, 
    rgba(var(--accent-secondary-rgb), 0.1) 100%);
  border-radius: 8px;
  z-index: -1;
}

.tooltip-arrow {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--bg-primary);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.tooltip-arrow::before {
  content: '';
  position: absolute;
  top: -7px;
  left: -6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--border-color);
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-90%) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%) scale(1);
  }
}
</style>