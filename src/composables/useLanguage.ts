import { ref, computed } from 'vue'
import { translations, defaultLanguage, type Language, type Translation } from '../config/languages'

const currentLanguage = ref<Language>(defaultLanguage)

// Load saved language from localStorage
const loadSavedLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferred-language')
    if (saved && saved in translations) {
      return saved as Language
    }
    
    // Try to detect browser language
    const browserLang = navigator.language.split('-')[0]
    if (browserLang in translations) {
      return browserLang as Language
    }
  }
  return defaultLanguage
}

// Save language to localStorage
const saveLanguage = (language: Language) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', language)
  }
}

export const useLanguage = () => {
  // Initialize language from saved preference or browser language
  if (currentLanguage.value === defaultLanguage) {
    currentLanguage.value = loadSavedLanguage()
  }

  const t = computed<Translation>(() => {
    return translations[currentLanguage.value] || translations[defaultLanguage]
  })

  const currentLang = computed(() => currentLanguage.value)

  const switchLanguage = (language: Language) => {
    currentLanguage.value = language
    saveLanguage(language)
  }

  const toggleLanguage = () => {
    const newLang = currentLanguage.value === 'en' ? 'de' : 'en'
    switchLanguage(newLang)
  }

  const getCurrentLanguageIcon = () => {
    switch (currentLanguage.value) {
      case 'de':
        return '🇩🇪'
      case 'en':
        return '🇺🇸'
      default:
        return '🇺🇸'
    }
  }

  const getCurrentLanguageName = () => {
    switch (currentLanguage.value) {
      case 'de':
        return 'Deutsch'
      case 'en':
        return 'English'
      default:
        return 'English'
    }
  }

  return {
    t,
    currentLang,
    switchLanguage,
    toggleLanguage,
    getCurrentLanguageIcon,
    getCurrentLanguageName
  }
}
