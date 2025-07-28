import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

export interface TerminalCommand {
  [key: string]: (args: string[]) => string
}

export interface TerminalHistoryEntry {
  command: string
  output?: string
}

export interface DialogStep {
  prompt: string
  validation?: (input: string) => string | null // Returns error message or null if valid
  transform?: (input: string) => string // Transform the input before storing
}

export interface DialogDefinition {
  name: string
  steps: DialogStep[]
  onComplete: (data: Record<string, string>) => string // Returns completion message
}

export interface TerminalConfig {
  username?: string
  hostname?: string
  currentPath?: string
  prompt?: string
  cursorBlinkInterval?: number
  maxHistorySize?: number
  initialHistory?: TerminalHistoryEntry[]
  customCommands?: TerminalCommand
  dialogs?: DialogDefinition[]
}

export interface UseTerminal {
  username: string
  hostname: string
  currentPath: string
  currentCommand: any
  commandHistory: any
  historyIndex: any
  showCursor: any
  terminalInput: any
  formattedPrompt: any
  isInDialog: any
  currentDialog: any
  executeCommand: () => void
  navigateHistory: (direction: number) => void
  autoComplete: () => void
  focusInput: () => void
  addCustomCommand: (name: string, handler: (args: string[]) => string) => void
  removeCommand: (name: string) => void
  addToHistory: (entry: TerminalHistoryEntry) => void
  clearHistory: () => void
  addDialog: (dialog: DialogDefinition) => void
  cancelDialog: () => string
  restartDialog: () => string
}

export function useTerminal(config: TerminalConfig = {}): UseTerminal {
  // Configuration with defaults
  const {
    username = 'user',
    hostname = 'localhost',
    currentPath = '~',
    prompt = '',
    cursorBlinkInterval = 530,
    maxHistorySize = 100,
    initialHistory = [
      { command: 'echo "Welcome to the interactive terminal!"', output: 'Welcome to the interactive terminal!' },
    ],
    customCommands = {},
    dialogs = []
  } = config

  // Terminal state
  const currentCommand = ref('')
  const commandHistory = ref<TerminalHistoryEntry[]>([...initialHistory])
  const historyIndex = ref(-1)
  const showCursor = ref(true)
  const terminalInput = ref<HTMLInputElement>()

  // Dialog state
  const isInDialog = ref(false)
  const currentDialog = ref<{
    definition: DialogDefinition
    currentStep: number
    data: Record<string, string>
  } | null>(null)

  // Available dialogs
  const availableDialogs = ref<DialogDefinition[]>([
    // Default contact dialog
    {
      name: 'contact',
      steps: [
        {
          prompt: '👋 Hi there! Let\'s get in touch.\n\nWhat\'s your name?',
        },
        {
          prompt: 'Cool. What\'s your email address?',
          validation: (input: string) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            return emailRegex.test(input) ? null : 'Oops, that doesn\'t look like a valid email. Try again:'
          }
        },
        {
          prompt: 'What would you like to say?',
        }
      ],
      onComplete: (data) => {
        const confirmation = `You're about to send:
---
Name: ${data.step0}
Email: ${data.step1}
Message: ${data.step2}
---

Send it? (yes/no)`
        return confirmation
      }
    },
    ...dialogs
  ])

  // Build the formatted prompt
  const formattedPrompt = computed(() => {
    if (isInDialog.value) {
      return '> '
    }
    return prompt || `${username}@${hostname}:${currentPath}$ `
  })

  // Dialog management functions
  const startDialog = (dialogName: string): string => {
    const dialog = availableDialogs.value.find(d => d.name === dialogName)
    if (!dialog) {
      return `Dialog '${dialogName}' not found. Available dialogs: ${availableDialogs.value.map(d => d.name).join(', ')}`
    }

    isInDialog.value = true
    currentDialog.value = {
      definition: dialog,
      currentStep: 0,
      data: {}
    }

    return dialog.steps[0].prompt
  }

  const processDialogInput = (input: string): string => {
    if (!currentDialog.value) return ''

    const dialog = currentDialog.value
    const currentStep = dialog.definition.steps[dialog.currentStep]

    // Handle special confirmation step for contact dialog
    if (dialog.definition.name === 'contact' && dialog.currentStep === dialog.definition.steps.length) {
      if (input.toLowerCase() === 'yes') {
        isInDialog.value = false
        const result = '📬 Sending...\n✅ Message sent! Thanks, ' + (dialog.data.step0 || 'there') + '!'
        currentDialog.value = null
        return result
      } else if (input.toLowerCase() === 'no') {
        isInDialog.value = false
        currentDialog.value = null
        return '❌ Message cancelled.'
      } else {
        return 'Please answer with "yes" or "no":'
      }
    }

    // Validate input if validation function exists
    if (currentStep.validation) {
      const validationError = currentStep.validation(input)
      if (validationError) {
        return validationError
      }
    }

    // Transform input if transform function exists
    const processedInput = currentStep.transform ? currentStep.transform(input) : input

    // Store the input
    dialog.data[`step${dialog.currentStep}`] = processedInput

    // Move to next step
    dialog.currentStep++

    // Check if we've completed all steps
    if (dialog.currentStep >= dialog.definition.steps.length) {
      // For contact dialog, show confirmation
      if (dialog.definition.name === 'contact') {
        return dialog.definition.onComplete(dialog.data)
      } else {
        // For other dialogs, complete immediately
        isInDialog.value = false
        const result = dialog.definition.onComplete(dialog.data)
        currentDialog.value = null
        return result
      }
    }

    // Show next step prompt
    return dialog.definition.steps[dialog.currentStep].prompt
  }

  // Default commands
  const defaultCommands: TerminalCommand = {
    help: () => {
      const allCommands = { ...defaultCommands, ...customCommands }
      const dialogCommands = availableDialogs.value.map(d => d.name)
      return `This is a simple terminal emulator. You can type commands to interact with it.
Available commands: ${Object.keys(allCommands).join(', ')}
Available dialogs: ${dialogCommands.join(', ')}`
    },
    echo: (args) => args.join(' '),
    clear: () => {
      commandHistory.value = []
      return ''
    },
    date: () => new Date().toString(),
    whoami: () => 'I would like to know :)',
    ls: () => 'Documents  Downloads  Pictures  Videos  Projects',
    pwd: () => currentPath === '~' ? `/home/${username}` : currentPath,
    history: () => commandHistory.value.map((entry, i) => `${i + 1}  ${entry.command}`).join('\n'),
    uname: () => 'Linux localhost 5.15.0 x86_64 GNU/Linux',
    uptime: () => {
      const uptime = Math.floor(Math.random() * 1000000)
      return `up ${Math.floor(uptime / 3600)} hours, ${Math.floor((uptime % 3600) / 60)} minutes`
    },
    // Dynamic dialog commands
    ...Object.fromEntries(
      availableDialogs.value.map(dialog => [
        dialog.name,
        () => startDialog(dialog.name)
      ])
    )
  }

  // Combine default and custom commands
  const commands = { ...defaultCommands, ...customCommands }

  // Terminal functions
  const executeCommand = () => {
    console.log('Executing command:', currentCommand.value)
    const command = currentCommand.value.trim()
    if (!command) return

    let output = ''
    const wasInDialog = isInDialog.value

    // Handle dialog input
    if (isInDialog.value) {
      output = processDialogInput(command)
    } else {
      // Handle regular commands
      const [cmd, ...args] = command.split(' ')

      // Check if it's a dialog command
      const dialogCommand = availableDialogs.value.find(d => d.name === cmd)
      if (dialogCommand) {
        output = startDialog(cmd)
      } else if (commands[cmd]) {
        output = commands[cmd](args)
      } else {
        output = `bash: command not found (use 'help' to see available commands)`
      }
    }

    // Add to history (except for clear command)
    if (command !== 'clear') {
      if (wasInDialog) {
        // For dialog, show the input with > prefix
        commandHistory.value.push({ command: `> ${command}`, output })
      } else {
        // For regular commands, show with normal prompt
        commandHistory.value.push({ command, output })
      }
    }

    // Limit history size
    if (commandHistory.value.length > maxHistorySize) {
      commandHistory.value = commandHistory.value.slice(-maxHistorySize)
    }

    currentCommand.value = ''
    historyIndex.value = -1

    // Scroll to bottom after command execution
    nextTick(() => {
      const terminalBody = document.querySelector('.terminal-body')
      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight
      }
    })
  }

  const navigateHistory = (direction: number) => {
    if (commandHistory.value.length === 0 || isInDialog.value) return

    const newIndex = historyIndex.value + direction
    if (newIndex >= 0 && newIndex < commandHistory.value.length) {
      historyIndex.value = newIndex
      currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - newIndex].command
    } else if (newIndex < 0) {
      historyIndex.value = -1
      currentCommand.value = ''
    }
  }

  const autoComplete = () => {
    if (isInDialog.value) return
    
    const command = currentCommand.value.trim()
    if (!command) return

    const availableCommands = [...Object.keys(commands), ...availableDialogs.value.map(d => d.name)]
    const matches = availableCommands.filter(cmd => cmd.startsWith(command))
    
    if (matches.length === 1) {
      currentCommand.value = matches[0]
    } else if (matches.length > 1) {
      const output = matches.join('  ')
      commandHistory.value.push({ command: currentCommand.value, output })
      currentCommand.value = ''
    }
  }

  const focusInput = () => {
    terminalInput.value?.focus()
  }

  const addCustomCommand = (name: string, handler: (args: string[]) => string) => {
    commands[name] = handler
  }

  const removeCommand = (name: string) => {
    delete commands[name]
  }

  const addToHistory = (entry: TerminalHistoryEntry) => {
    commandHistory.value.push(entry)
    if (commandHistory.value.length > maxHistorySize) {
      commandHistory.value = commandHistory.value.slice(-maxHistorySize)
    }
  }

  const clearHistory = () => {
    commandHistory.value = []
    historyIndex.value = -1
    currentCommand.value = ''
  }

  const addDialog = (dialog: DialogDefinition) => {
    availableDialogs.value.push(dialog)
    // Add the dialog as a command
    commands[dialog.name] = () => startDialog(dialog.name)
  }

  const cancelDialog = (): string => {
    if (!isInDialog.value) return ''
    
    isInDialog.value = false
    const dialogName = currentDialog.value?.definition.name || 'dialog'
    currentDialog.value = null
    return `❌ ${dialogName} cancelled.`
  }

  const restartDialog = (): string => {
    if (!currentDialog.value) return ''
    
    const dialogName = currentDialog.value.definition.name
    return startDialog(dialogName)
  }

  // Cursor blinking effect
  let cursorInterval: NodeJS.Timeout

  onMounted(() => {
    cursorInterval = setInterval(() => {
      showCursor.value = !showCursor.value
    }, cursorBlinkInterval)

    // Focus the terminal input when clicking on the terminal
    const terminal = document.querySelector('.terminal-body')
    terminal?.addEventListener('click', focusInput)
  })

  onUnmounted(() => {
    if (cursorInterval) {
      clearInterval(cursorInterval)
    }
  })

  return {
    // State
    currentCommand,
    commandHistory,
    historyIndex,
    showCursor,
    terminalInput,
    formattedPrompt,
    isInDialog,
    currentDialog,
    
    // Actions
    executeCommand,
    navigateHistory,
    autoComplete,
    focusInput,
    addCustomCommand,
    removeCommand,
    addToHistory,
    clearHistory,
    addDialog,
    cancelDialog,
    restartDialog,

    // Configuration
    username,
    hostname,
    currentPath
  }
}


//TODO clear funktiiert in dialoge 
// buttons weg wenn classic mode
// contact dialoge als standard anfang
// schönerere Hover
// manchmal kein autoscroll bei commands z.B. h tab
// bestätigen Löschen