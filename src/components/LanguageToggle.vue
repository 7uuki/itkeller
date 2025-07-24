<template>
  <div class="language-toggle">
    <button 
      class="language-option"
      :class="{ active: currentLang === 'de' }"
      @click="() => switchLanguage('de')"
      :title="t.language.toggle"
    >
      DE
    </button>
    <span class="language-separator">|</span>
    <button 
      class="language-option"
      :class="{ active: currentLang === 'en' }"
      @click="() => switchLanguage('en')"
      :title="t.language.toggle"
    >
      EN
    </button>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '../composables/useLanguage'

const { 
  t,
  currentLang,
  switchLanguage
} = useLanguage()
</script>

<style scoped>
.language-toggle {
  display: flex;
  align-items: center;
  gap: 0.05rem;
  padding: 0.1rem 0;
  background: transparent;
  transition: all 0.3s ease;
}

.language-option {
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 0.2rem 0.3rem;
  border-radius: 3px;
  transition: all 0.3s ease;
  min-width: 24px;
  text-align: center;
}

.language-option:hover {
  color: var(--button-bg);
  background-color: var(--bg-secondary);
}

.language-option.active {
  color: var(--button-text);
  background-color: var(--button-bg);
  font-weight: 700;
}

.language-separator {
  color: var(--text-secondary);
  font-size: 0.8rem;
  opacity: 0.6;
  margin: 0 0.1rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .language-toggle {
    gap: 0.25rem;
  }
  
  .language-option {
    font-size: 0.8rem;
    padding: 0.15rem 0.25rem;
    min-width: 20px;
  }
  
  .language-separator {
    font-size: 0.75rem;
    margin: 0 0.05rem;
  }
}

/* Extra small mobile screens */
@media (max-width: 480px) {
  .language-toggle {
    gap: 0.2rem;
  }
  
  .language-option {
    font-size: 0.75rem;
    padding: 0.1rem 0.2rem;
    min-width: 18px;
  }
}
</style>
