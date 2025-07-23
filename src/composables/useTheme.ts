import { ref, computed, watch } from 'vue'

export type Theme = 'light' | 'dark' | 'pink'

// Reactive theme state
const currentTheme = ref<Theme>('light')

// Available themes
const themes: Theme[] = ['light', 'dark', 'pink']

// Theme labels for display
const themeLabels: Record<Theme, string> = {
  light: '☀️ Light',
  dark: '🌙 Dark', 
  pink: '🌸 Pink'
}

export function useTheme() {
  // Apply theme to document
  const applyTheme = (theme: Theme) => {
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
    }
  }

  // Set theme
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    applyTheme(theme)
    localStorage.setItem('theme', theme)
  }

  // Toggle to next theme
  const toggleTheme = () => {
    const currentIndex = themes.indexOf(currentTheme.value)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  // Get current theme icon
  const currentThemeIcon = computed(() => {
    const icons = {
      light: '☀️',
      dark: '🌙',
      pink: '🌸'
    }
    return icons[currentTheme.value]
  })

  // Get current theme label
  const currentThemeLabel = computed(() => {
    return themeLabels[currentTheme.value]
  })

  // Initialize theme from localStorage
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme && themes.includes(savedTheme)) {
      setTheme(savedTheme)
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }

  // Watch for theme changes
  watch(currentTheme, (newTheme) => {
    applyTheme(newTheme)
  })

  return {
    currentTheme: computed(() => currentTheme.value),
    themes,
    themeLabels,
    currentThemeIcon,
    currentThemeLabel,
    setTheme,
    toggleTheme,
    initTheme
  }
}
