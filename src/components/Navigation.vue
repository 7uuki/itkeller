<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>ItKeller.com</h2>
      </div>
      
      <ul class="nav-menu" :class="{ active: isMobileMenuOpen }">
        <li class="nav-item">
          <NavbarButton target-section="hero" @navigate="handleNavigation">Home</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="about" @navigate="handleNavigation">About</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="academic" @navigate="handleNavigation">Academic</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="services" @navigate="handleNavigation">Services</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="portfolio" @navigate="handleNavigation">Portfolio</NavbarButton>
        </li>
        <li class="nav-item">
          <NavbarButton target-section="contact" @navigate="handleNavigation">Contact</NavbarButton>
        </li>
        <li class="nav-item desktop-only">
          <ThemeToggle />
        </li>
      </ul>
      
      <div class="nav-right">
        <div class="mobile-theme-toggle">
          <ThemeToggle />
        </div>
        <div class="nav-toggle" @click="toggleMobileMenu">
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
import ThemeToggle from './ThemeToggle.vue'


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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: relative;
}

.nav-brand h2 {
  margin: 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: 700;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 2rem;
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

@media (max-width: 768px) {
  .nav-container {
    position: relative;
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
  }

  .nav-menu.active {
    right: 0;
  }

  .nav-right {
    position: absolute;
    right: 2rem;
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
