<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container" :class="{ 'legal-page': $route.path !== '/' }">
      <div class="nav-left">
        <div class="language-toggle-container">
          <LanguageToggle />
        </div>
        
        <div class="theme-toggle-container">
          <ThemeToggleSwitch />
        </div>
        
        <div class="nav-brand">
          <router-link to="/" class="brand-link">
            <h2>ItKeller.com</h2>
          </router-link>
        </div>
      </div>
      
      <!-- Show navigation menu only on home page -->
      <ul v-if="$route.path === '/'" class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <li class="nav-item">
          <NavbarButton target-section="hero" @navigate="handleNavigation">{{ t.nav.home }}</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="about" @navigate="handleNavigation">{{ t.nav.about }}</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="academic" @navigate="handleNavigation">{{ t.nav.academic }}</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="services" @navigate="handleNavigation">{{ t.nav.services }}</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="portfolio" @navigate="handleNavigation">{{ t.nav.portfolio }}</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="contact" @navigate="handleNavigation">{{ t.nav.contact }}</NavbarButton>
        </li>
      </ul>
      
      <!-- Show legal navigation on legal pages -->
      <ul v-if="$route.path !== '/'" class="nav-menu legal-nav-menu">
        <li class="nav-item">
          <LegalSwitch />
        </li>
        <li class="nav-item">
          <ArrowButton :text="t.nav.goBackHome" @click="() => router.push('/')" />
        </li>
      </ul>
      
      <div class="nav-right">
        <div v-if="$route.path === '/'" class="nav-toggle" @click="toggleMobileMenu">
          <span class="hamburger"></span>
          <span class="hamburger"></span>
          <span class="hamburger"></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import NavbarButton from './NavbarButton.vue'
import ThemeToggleSwitch from './ThemeToggleSwitch.vue'
import LanguageToggle from './LanguageToggle.vue'
import ArrowButton from './ArrowButton.vue'
import LegalSwitch from './LegalSwitch.vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '../composables/useLanguage'

const router = useRouter()
const { t } = useLanguage()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleNavigation = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-primary);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  box-shadow: 0 2px 20px var(--shadow);
}

.nav-container {
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: relative;
  min-width: 0; /* Allow flex items to shrink */
}

/* Keep normal layout for all pages since we now have navigation on legal pages too */
.nav-container {
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-shrink: 0; /* Prevent left side from shrinking */
  min-width: 200px; /* Minimum width for left side */
}

.language-toggle-container {
  display: flex;
  align-items: center;
}

.theme-toggle-container {
  display: flex;
  align-items: center;
}

.nav-brand .brand-link {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s ease;
}

.nav-brand .brand-link:hover {
  color: var(--button-bg);
}

.nav-brand h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  transition: color 0.3s ease;
  white-space: nowrap; /* Prevent brand name from wrapping */
}

.nav-brand .brand-link:hover h2 {
  color: var(--button-bg);
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
  margin-left: 2rem; /* Minimum gap between brand and menu */
  margin-right: 2rem; /* Minimum gap between menu and right side */
}

.legal-nav-menu {
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.nav-item {
  position: relative;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 1001;
  flex-shrink: 0; /* Prevent right side from shrinking */
}

.mobile-theme-toggle {
  display: none;
}

.desktop-only {
  display: list-item;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
}

.hamburger {
  width: 25px;
  height: 3px;
  background-color: var(--text-primary);
  margin: 2px 0;
  transition: 0.3s;
  display: block;
}

/* Medium screens - prevent text wrapping in navigation */
@media (max-width: 1100px) and (min-width: 901px) {
  .nav-menu {
    gap: 1.5rem;
    margin-left: 1.5rem;
    margin-right: 1.5rem;
  }
  
  .nav-item {
    white-space: nowrap;
  }
}

@media (max-width: 1000px) and (min-width: 901px) {
  .nav-menu {
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    font-size: 0.9rem;
  }
  
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .nav-left {
    min-width: 180px;
  }
}

@media (max-width: 900px) {
  .nav-container {
    padding: 0 1rem;
  }
  
  .nav-left {
    gap: 1rem;
    min-width: 160px;
  }
  
  .nav-brand h2 {
    font-size: 1.3rem;
  }

  .nav-menu {
    position: fixed;
    top: 70px;
    right: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: var(--bg-primary);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 2rem;
    transition: right 0.3s ease;
    z-index: 999;
    margin-left: 0;
    margin-right: 0;
  }

  .nav-menu.active {
    right: 0;
  }
  
  .legal-nav-menu {
    position: static;
    background: transparent;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0;
    height: auto;
    width: auto;
    gap: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
  }

  .nav-right {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    gap: 0.8rem;
  }

  .desktop-only {
    display: none;
  }

  .mobile-theme-toggle {
    display: block;
  }

  .nav-toggle {
    display: flex;
  }
}
</style>
