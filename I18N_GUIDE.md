# 🌍 Internationalization (i18n) Guide

This project includes a smart internationalization system that supports German and English languages.

## 🚀 Features

- **Language Toggle**: Switch between German (🇩🇪) and English (🇺🇸) in the navbar
- **Smart Detection**: Automatically detects browser language on first visit
- **Persistent Storage**: Remembers user's language preference using localStorage
- **Type Safety**: Full TypeScript support with strongly typed translations
- **Easy Configuration**: Simple configuration file for adding/modifying translations

## 📁 File Structure

```
src/
├── config/
│   └── languages.ts          # Translation configuration and data
├── composables/
│   └── useLanguage.ts         # Language management composable
└── components/
    └── LanguageToggle.vue     # Language switcher component
```

## 🔧 How to Use

### Using Translations in Components

Import the `useLanguage` composable and use the `t` (translate) function:

```vue
<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()
</script>

<template>
  <div>
    <h1>{{ t.hero.title }}</h1>
    <p>{{ t.hero.description }}</p>
    <button>{{ t.hero.getInTouch }}</button>
  </div>
</template>
```

### Adding New Translations

1. Open `src/config/languages.ts`
2. Add your new translation keys to the `Translation` interface:

```typescript
export interface Translation {
  // ... existing translations
  newSection: {
    title: string
    description: string
  }
}
```

3. Add the translations for both languages:

```typescript
export const translations: Record<string, Translation> = {
  en: {
    // ... existing translations
    newSection: {
      title: "My New Section",
      description: "This is a new section"
    }
  },
  de: {
    // ... existing translations
    newSection: {
      title: "Mein neuer Bereich",
      description: "Das ist ein neuer Bereich"
    }
  }
}
```

### Language Toggle Component

The `LanguageToggle` component is already integrated into the navbar and provides:

- Flag icon display (🇺🇸/🇩🇪)
- Language name on desktop
- Responsive design (icon only on mobile)
- Smooth transitions

## 🎯 Language Detection

The system uses this priority order:

1. **User Preference**: Previously selected language from localStorage
2. **Browser Language**: Detects browser language (en/de)
3. **Default**: Falls back to English

## 📱 Responsive Design

- **Desktop**: Shows flag + language name
- **Mobile**: Shows flag icon only
- **Extra Small**: Circular button with flag only

## 🛠️ API Reference

### useLanguage()

Returns an object with:

- `t`: Reactive translation object
- `currentLang`: Current language code ('en' | 'de')
- `switchLanguage(lang)`: Switch to specific language
- `toggleLanguage()`: Toggle between en/de
- `getCurrentLanguageIcon()`: Get flag emoji
- `getCurrentLanguageName()`: Get language name

### Adding New Languages

To add a new language (e.g., French):

1. Add the language code to `availableLanguages` in `languages.ts`
2. Add the translation object to the `translations` record
3. Update the icon/name functions in `useLanguage.ts`

## ✨ Examples

### Basic Usage
```vue
<!-- Display translated text -->
<h1>{{ t.nav.home }}</h1>

<!-- Use in attributes -->
<button :title="t.theme.toggle">Toggle</button>

<!-- Dynamic content -->
<p>{{ t.hero.greeting }} {{ userName }}!</p>
```

### Conditional Rendering
```vue
<template>
  <div>
    <p v-if="currentLang === 'de'">Willkommen!</p>
    <p v-else>Welcome!</p>
  </div>
</template>
```

This system makes it easy to create a multilingual experience while maintaining type safety and developer experience!
