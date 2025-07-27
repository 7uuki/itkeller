<template>
  <section class="scrolling-icons-section">
    <div class="scrolling-container" :class="{ 'scroll-boosting': isScrollBoosting }">
      <div class="scrolling-track" ref="scrollingTrack" :style="{ animationDuration: `${animationDuration}s` }">
        <!-- Generate enough copies to ensure full screen coverage -->
        <template v-for="copy in copiesNeeded" :key="`copy-${copy}`">
          <div v-for="(icon, index) in icons" :key="`copy-${copy}-icon-${index}`" class="icon-item">
            <div class="icon-wrapper">
              <img :src="icon.src" :alt="icon.title" class="icon-image no-text-cursor" />
              <span class="icon-title no-text-cursor">{{ icon.title }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div v-if="showTitle" class="title-section">
      <h2 class="main-title">Technologies I Work With</h2>
      <p class="subtitle">Modern tools for modern solutions</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

interface IconItem {
  src: string
  title: string
}

const props = defineProps<{
  icons?: IconItem[]
  speed?: number // pixels per second
  height?: string
  showTitle?: boolean
}>()

// Default icons using available assets
const defaultIcons: IconItem[] = [
    { src: 'src/assets/scrollingicons/css3.svg', title: 'CSS' },
    { src: 'src/assets/scrollingicons/docker.svg', title: 'Docker' },
    { src: 'src/assets/scrollingicons/git.svg', title: 'Git' },
    { src: 'src/assets/scrollingicons/html5.svg', title: 'HTML' },
    { src: 'src/assets/scrollingicons/javascript.svg', title: 'JavaScript' },
    { src: 'src/assets/scrollingicons/vue.svg', title: 'Vue.js' },
    { src: 'src/assets/scrollingicons/nodejs.svg', title: 'Node.js' },
    { src: 'src/assets/scrollingicons/postgresql.svg', title: 'PostgreSQL' },
    { src: 'src/assets/scrollingicons/python.svg', title: 'Python' },
    { src: 'src/assets/scrollingicons/react.svg', title: 'React' },
    { src: 'src/assets/scrollingicons/springboot.svg', title: 'Spring Boot' },
    { src: 'src/assets/scrollingicons/typescript.svg', title: 'TypeScript' },
    { src: 'src/assets/scrollingicons/vue.svg', title: 'Vue.js' },
]

const icons = computed(() => props.icons || defaultIcons)
const speed = computed(() => props.speed || 40) // pixels per second
const height = computed(() => props.height || '80px')
const showTitle = computed(() => props.showTitle !== false) // default to true

// Calculate how many copies we need to ensure full screen coverage
const screenWidth = computed(() => {
  if (typeof window !== 'undefined') {
    return window.innerWidth
  }
  return 1920 // fallback for SSR
})

const copiesNeeded = computed(() => {
  const iconWidth = 100 // increased for horizontal layout
  const singleSetWidth = icons.value.length * iconWidth
  return Math.ceil((screenWidth.value * 3) / singleSetWidth) + 2 // Extra copies for seamless coverage
})

// Scroll boost effect - makes scrolling animation faster when user scrolls
const isScrollBoosting = ref(false)
const scrollingTrack = ref<HTMLElement>()
let scrollTimeout: NodeJS.Timeout | null = null
let slowdownInterval: NodeJS.Timeout | null = null

// Configuration for scroll boost effect
const SCROLL_SPEED_MULTIPLIER = 2.5 // How much faster the animation gets (2.5x speed)
const SCROLL_RESET_DELAY = 200 // How long to wait before starting slowdown (ms)
const SLOWDOWN_STEPS = 10 // Number of steps for smooth slowdown
const SLOWDOWN_INTERVAL = 30 // Time between each slowdown step (ms)

// Calculate base animation duration (without scroll boost)
const animationDuration = computed(() => {
  const iconWidth = 100
  const singleSetWidth = icons.value.length * iconWidth
  return singleSetWidth / speed.value
})

const handleScroll = () => {
  // Clear any existing slowdown interval
  if (slowdownInterval) {
    clearInterval(slowdownInterval)
    slowdownInterval = null
  }
  
  if (!isScrollBoosting.value) {
    isScrollBoosting.value = true
    
    // Change playback rate instead of duration to avoid animation reset
    if (scrollingTrack.value) {
      const animations = scrollingTrack.value.getAnimations()
      animations.forEach((animation: Animation) => {
        animation.playbackRate = SCROLL_SPEED_MULTIPLIER
      })
    }
  }
  
  // Clear existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  
  // Start smooth slowdown after delay
  scrollTimeout = setTimeout(() => {
    smoothSlowdown()
  }, SCROLL_RESET_DELAY)
}

// Smooth slowdown function that gradually reduces speed
const smoothSlowdown = () => {
  if (!scrollingTrack.value) {
    isScrollBoosting.value = false
    return
  }

  const animations = scrollingTrack.value.getAnimations()
  if (animations.length === 0) {
    isScrollBoosting.value = false
    return
  }

  let currentStep = 0
  const targetRate = 1
  const startRate = SCROLL_SPEED_MULTIPLIER

  slowdownInterval = setInterval(() => {
    currentStep++
    
    // Use easeOut curve for smooth deceleration
    const progress = currentStep / SLOWDOWN_STEPS
    const easeOutProgress = 1 - Math.pow(1 - progress, 3) // Cubic ease-out
    
    const currentRate = startRate - (startRate - targetRate) * easeOutProgress
    
    animations.forEach((animation: Animation) => {
      animation.playbackRate = currentRate
    })
    
    // Complete the slowdown
    if (currentStep >= SLOWDOWN_STEPS) {
      if (slowdownInterval) {
        clearInterval(slowdownInterval)
        slowdownInterval = null
      }
      isScrollBoosting.value = false
      animations.forEach((animation: Animation) => {
        animation.playbackRate = targetRate
      })
    }
  }, SLOWDOWN_INTERVAL)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
  if (slowdownInterval) {
    clearInterval(slowdownInterval)
  }
})
</script>

<style scoped>
.scrolling-icons-section {
  width: 100%;
  min-height: 10vh;
  overflow: hidden;
  background-color: var(--bg-secondary);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.scrolling-container {
  width: 100%;
  height: v-bind(height);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding-top: 20px;
  transition: all 0.3s ease-out;
}

.scrolling-container::before,
.scrolling-container::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20vw;
  z-index: 10;
  pointer-events: none;
}

.scrolling-container::before {
  left: 0;
  background: linear-gradient(to right, var(--bg-secondary) 0%, var(--bg-secondary) 70%, transparent 100%);
}

.scrolling-container::after {
  right: 0;
  background: linear-gradient(to left, var(--bg-secondary) 0%, var(--bg-secondary) 70%, transparent 100%);
}

.scrolling-track {
  display: flex;
  align-items: center;
  animation: scroll-infinite linear infinite;
  white-space: nowrap;
  will-change: transform;
  /* Start with icons already visible and flowing seamlessly */
  transform: translateX(0);
}

.icon-item {
  flex-shrink: 0;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 120px;
}

.icon-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  min-width: 100px;
  cursor: pointer;
}


.icon-image {
  width: 32px;
  height: 32px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.icon-wrapper:hover .icon-image {
  transform: scale(1.15);
}

.icon-title {
  font-size: 1.2rem;
  color: var(--text-secondary);
  text-align: left;
  font-family: "Space Mono", monospace;
  font-weight: 400;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.icon-wrapper:hover .icon-title {
  font-weight: 800;
}

.title-section {
  padding: 2rem 1rem 1rem 1rem;
  text-align: center;
  background-color: var(--bg-secondary);
}

.main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  font-family: "Space Mono", monospace;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin: 0;
  font-family: "Space Mono", monospace;
  font-weight: 400;
}

@keyframes scroll-infinite {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / v-bind(copiesNeeded)));
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .scrolling-container::before,
  .scrolling-container::after {
    display: none;
  }

  .scrolling-icons-section {
    min-height: 2vh;
  }

  .icon-item {
    margin-right: 2rem;
    min-width: 100px;
  }
  
  .icon-wrapper {
    padding: 0.5rem;
    min-width: 80px;
    gap: 0.4rem;
  }
  
  .icon-image {
    width: 28px;
    height: 28px;
  }
  
  .icon-title {
    font-size: 0.7rem;
  }
  
  .title-section {
    padding: 1.5rem 1rem;
  }
  
  .main-title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .icon-item {
    margin-right: 1.5rem;
    min-width: 80px;
  }
  
  .icon-wrapper {
    padding: 0.4rem;
    min-width: 60px;
    gap: 0.3rem;
  }
  
  .icon-image {
    width: 24px;
    height: 24px;
  }
  
  .icon-title {
    font-size: 0.9rem;
  }
  
  .title-section {
    padding: 1rem;
  }
  
  .main-title {
    font-size: 1.5rem;
  }
  
  .subtitle {
    font-size: 0.9rem;
  }
}
</style>
