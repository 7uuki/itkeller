import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'

export interface TerminalCommand {
  [key: string]: (args: string[]) => string
}

export interface TerminalHistoryEntry {
  command: string
  output?: string
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
}

export function useTerminal(config: TerminalConfig = {}) {
  // Configuration with defaults
  const {
    username = 'user',
    hostname = 'localhost',
    currentPath = '~',
    prompt = '',
    cursorBlinkInterval = 530,
    maxHistorySize = 100,
    initialHistory = [
      { command: 'echo "Welcome to the interactive terminal!"', output: 'Welcome to the interactive terminal!' }
    ],
    customCommands = {}
  } = config

  // Terminal state
  const currentCommand = ref('')
  const commandHistory = ref<TerminalHistoryEntry[]>([...initialHistory])
  const historyIndex = ref(-1)
  const showCursor = ref(true)
  const terminalInput = ref<HTMLInputElement>()

  // Build the formatted prompt
  const formattedPrompt = computed(() => prompt || `${username}@${hostname}:${currentPath}$ `)

  // Default commands
  const defaultCommands: TerminalCommand = {
    help: () => {
      const allCommands = { ...defaultCommands, ...customCommands }
      return `Available commands: ${Object.keys(allCommands).join(', ')}`
    },
    echo: (args) => args.join(' '),
    clear: () => {
      commandHistory.value = []
      return ''
    },
    date: () => new Date().toString(),
    whoami: () => username,
    hostname: () => hostname,
    ls: () => 'Documents  Downloads  Pictures  Videos  Projects',
    pwd: () => currentPath === '~' ? `/home/${username}` : currentPath,
    history: () => commandHistory.value.map((entry, i) => `${i + 1}  ${entry.command}`).join('\n'),
    uname: () => 'Linux localhost 5.15.0 x86_64 GNU/Linux',
    uptime: () => {
      const uptime = Math.floor(Math.random() * 1000000)
      return `up ${Math.floor(uptime / 3600)} hours, ${Math.floor((uptime % 3600) / 60)} minutes`
    },
    env: () => `HOME=/home/${username}\nUSER=${username}\nSHELL=/bin/bash\nPATH=/usr/local/bin:/usr/bin:/bin`,
    ps: () => 'PID TTY          TIME CMD\n 1234 pts/0    00:00:01 bash\n 5678 pts/0    00:00:00 ps'
  }

  // Combine default and custom commands
  const commands = { ...defaultCommands, ...customCommands }

  // Terminal functions
  const executeCommand = () => {
    const command = currentCommand.value.trim()
    if (!command) return

    const [cmd, ...args] = command.split(' ')
    let output = ''

    if (commands[cmd]) {
      output = commands[cmd](args)
    } else {
      output = `bash: command not found (use 'help' to see available commands)`
    }

    // Add to history (except for clear command)
    if (cmd !== 'clear') {
      commandHistory.value.push({ command, output })
      
      // Limit history size
      if (commandHistory.value.length > maxHistorySize) {
        commandHistory.value = commandHistory.value.slice(-maxHistorySize)
      }
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
    if (commandHistory.value.length === 0) return

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
    const command = currentCommand.value.trim()
    if (!command) return

    const availableCommands = Object.keys(commands)
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
    
    // Actions
    executeCommand,
    navigateHistory,
    autoComplete,
    focusInput,
    addCustomCommand,
    removeCommand,
    addToHistory,
    clearHistory,
    
    // Configuration
    username,
    hostname,
    currentPath
  }
}
