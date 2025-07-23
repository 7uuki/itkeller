# Terminal Composable Usage Guide

The `useTerminal` composable provides a flexible and reusable terminal interface that can be easily configured for different use cases.

## Basic Usage

```typescript
import { useTerminal } from '@/composables/useTerminal'

// Basic setup with default configuration
const terminal = useTerminal()

// Destructure what you need
const {
  currentCommand,
  commandHistory,
  showCursor,
  terminalInput,
  executeCommand,
  navigateHistory,
  autoComplete
} = terminal
```

## Advanced Configuration

```typescript
const terminal = useTerminal({
  username: 'developer',
  hostname: 'portfolio',
  currentPath: '~/projects',
  cursorBlinkInterval: 530,
  maxHistorySize: 50,
  
  // Add custom initial history
  initialHistory: [
    { command: 'echo "Welcome!"', output: 'Welcome!' },
    { command: 'whoami', output: 'developer' }
  ],
  
  // Add custom commands
  customCommands: {
    portfolio: () => 'Welcome to my portfolio!',
    skills: () => 'My technical skills...',
    projects: () => 'Recent projects...',
    contact: () => 'Contact information...',
    
    // Commands with arguments
    greet: (args) => `Hello ${args.join(' ')}!`,
    
    // Interactive commands
    sudo: (args) => 'Permission denied. Nice try! 😉'
  }
})
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `username` | string | 'user' | Username displayed in prompt |
| `hostname` | string | 'localhost' | Hostname displayed in prompt |
| `currentPath` | string | '~' | Current path displayed in prompt |
| `prompt` | string | undefined | Custom prompt (overrides user@host:path format) |
| `cursorBlinkInterval` | number | 530 | Cursor blink speed in milliseconds |
| `maxHistorySize` | number | 100 | Maximum number of commands to keep in history |
| `initialHistory` | TerminalHistoryEntry[] | Default welcome messages | Initial command history |
| `customCommands` | TerminalCommand | {} | Object with custom command implementations |

## Default Commands

The terminal comes with these built-in commands:
- `help` - Shows available commands
- `echo [text]` - Echoes back text
- `clear` - Clears terminal history
- `date` - Shows current date/time
- `whoami` - Shows username
- `hostname` - Shows hostname
- `ls` - Lists directory contents
- `pwd` - Shows current directory
- `history` - Shows command history
- `uname` - Shows system information
- `uptime` - Shows system uptime
- `env` - Shows environment variables
- `ps` - Shows running processes

## Methods

The composable returns these useful methods:

- `addCustomCommand(name, handler)` - Add a command dynamically
- `removeCommand(name)` - Remove a command
- `addToHistory(entry)` - Add entry to history programmatically
- `clearHistory()` - Clear all history
- `focusInput()` - Focus the terminal input

## Template Usage

```vue
<template>
  <div class="terminal-container">
    <div class="terminal-body">
      <!-- History -->
      <div class="terminal-history">
        <div v-for="(entry, index) in commandHistory" :key="index" class="history-entry">
          <div class="prompt-line">
            <span class="user">developer</span>@<span class="hostname">portfolio</span>:<span class="path">~/projects</span>$ {{ entry.command }}
          </div>
          <div v-if="entry.output" class="output">{{ entry.output }}</div>
        </div>
      </div>
      
      <!-- Input Line -->
      <div class="terminal-input-line">
        <span class="prompt">
          <span class="user">developer</span>@<span class="hostname">portfolio</span>:<span class="path">~/projects</span>$ 
        </span>
        <div class="input-container">
          <span class="typed-text">{{ currentCommand }}</span>
          <span v-if="showCursor" class="cursor">|</span>
          <input 
            ref="terminalInput"
            v-model="currentCommand"
            @keydown.enter="executeCommand"
            @keydown.up="navigateHistory(-1)"
            @keydown.down="navigateHistory(1)"
            @keydown.tab.prevent="autoComplete"
            class="terminal-input"
            placeholder="Type a command..."
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </div>
</template>
```

## Styling

The terminal uses these CSS classes that you can customize:
- `.terminal-container` - Main terminal wrapper
- `.terminal-body` - Terminal content area
- `.prompt-line` - Command history prompt
- `.user` - Username styling (green)
- `.hostname` - Hostname styling (green)
- `.path` - Path styling (blue)
- `.output` - Command output styling
- `.cursor` - Blinking cursor
- `.typed-text` - Currently typed text

## Examples

### Portfolio Terminal
```typescript
const portfolioTerminal = useTerminal({
  username: 'visitor',
  hostname: 'portfolio',
  currentPath: '~',
  customCommands: {
    about: () => 'Software developer with 5+ years experience...',
    skills: () => 'JavaScript, TypeScript, Vue.js, React...',
    contact: () => 'email@example.com | linkedin.com/in/profile'
  }
})
```

### Gaming Terminal
```typescript
const gameTerminal = useTerminal({
  username: 'player',
  hostname: 'game-server',
  currentPath: '/game',
  customCommands: {
    inventory: () => 'Sword, Shield, 100 Gold',
    stats: () => 'Level: 5, HP: 100/100, MP: 50/50',
    map: () => 'You are in the Forest of Shadows'
  }
})
```
