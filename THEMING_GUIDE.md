# Vue Theming Guide

## **Best Practices for Consistent Styling with Different Themes**

### **1. CSS Custom Properties (CSS Variables) - ✅ RECOMMENDED**

This is what we've implemented - the most flexible and performant approach:

```css
/* Define themes */
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --button-bg: #007bff;
}

[data-theme="dark"] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --button-bg: #0d6efd;
}

/* Use in components */
.component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

**Advantages:**
- Real-time theme switching
- No CSS-in-JS overhead
- Excellent performance
- Works with any framework
- Easy to maintain

### **2. Pinia Store for Theme Management (Alternative)**

```typescript
// stores/theme.ts
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'light' as 'light' | 'dark' | 'pink'
  }),
  
  actions: {
    setTheme(theme: 'light' | 'dark' | 'pink') {
      this.currentTheme = theme
      document.documentElement.setAttribute('data-theme', theme)
    }
  }
})
```

### **3. Tailwind CSS with Theme Support**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#007bff',
          dark: '#0d6efd',
          pink: '#ec4899'
        }
      }
    }
  }
}
```

### **4. Styled Components with Vue**

```bash
npm install vue-styled-components
```

```vue
<template>
  <StyledButton :theme="currentTheme">
    Click me
  </StyledButton>
</template>

<script setup lang="ts">
import styled from 'vue-styled-components'

const StyledButton = styled('button', {
  theme: String
})`
  background-color: ${props => 
    props.theme === 'dark' ? '#0d6efd' : '#007bff'
  };
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
`
</script>
```

### **5. SCSS with Theme Mixins**

```scss
// styles/themes.scss
$themes: (
  light: (
    bg-primary: #ffffff,
    text-primary: #212529,
    button-bg: #007bff
  ),
  dark: (
    bg-primary: #1a1a1a,
    text-primary: #ffffff,
    button-bg: #0d6efd
  ),
  pink: (
    bg-primary: #fdf2f8,
    text-primary: #831843,
    button-bg: #ec4899
  )
);

@mixin theme($theme-name) {
  $theme-map: map-get($themes, $theme-name);
  
  @each $key, $value in $theme-map {
    --#{$key}: #{$value};
  }
}

:root {
  @include theme(light);
}

[data-theme="dark"] {
  @include theme(dark);
}

[data-theme="pink"] {
  @include theme(pink);
}
```

### **6. Vue 3 Provide/Inject for Theme**

```typescript
// composables/useThemeProvider.ts
import { provide, inject, ref } from 'vue'

const ThemeSymbol = Symbol('theme')

export function provideTheme() {
  const theme = ref('light')
  
  provide(ThemeSymbol, {
    theme,
    setTheme: (newTheme: string) => {
      theme.value = newTheme
      document.documentElement.setAttribute('data-theme', newTheme)
    }
  })
  
  return { theme }
}

export function useTheme() {
  const themeContext = inject(ThemeSymbol)
  if (!themeContext) {
    throw new Error('useTheme must be used within a theme provider')
  }
  return themeContext
}
```

## **Our Implementation Features:**

✅ **Real-time theme switching**
✅ **Persistent theme preference**
✅ **System preference detection**
✅ **Smooth transitions**
✅ **TypeScript support**
✅ **Composable architecture**
✅ **Performance optimized**

## **Usage in Components:**

```vue
<template>
  <div class="my-component">
    <h2>Current theme: {{ currentThemeLabel }}</h2>
    <button @click="toggleTheme">Switch Theme</button>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { currentThemeLabel, toggleTheme } = useTheme()
</script>

<style scoped>
.my-component {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  padding: 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}
</style>
```

## **Adding New Themes:**

1. Add theme variables to `style.css`
2. Add theme to `useTheme.ts` types and arrays
3. Add theme icon/label to the composable

The system is completely extensible and maintainable!
