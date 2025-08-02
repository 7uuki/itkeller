<template>
  <section id="about" class="about">
    <div class="about-container">
      <div class="section-header" ref="headerElement" :style="headerStyle">
        <h2>
          {{ t.about.title }}
          <div class="title-underline" ref="underlineElement">
            <svg viewBox="0 0 240 40" class="underline-svg">
              <path
                d="M12,20 Q60,18 120,22 T228,20"
                stroke="url(#gradient)"
                stroke-width="20"
                fill="none"
                stroke-linecap="round"
                class="underline-path"
                :class="{ 'animate-draw': underlineAnimationTriggered }"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:var(--accent-primary);stop-opacity:1" />
                  <stop offset="50%" style="stop-color:var(--accent-secondary);stop-opacity:1" />
                  <stop offset="100%" style="stop-color:var(--accent-tertiary);stop-opacity:1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </h2>
        <p>{{ t.about.subtitle }}</p>
      </div>
      
      <div class="about-content">
        <div class="about-text" ref="textElement" :style="textStyle">
          <h3>Hello, I'm Lukas Keller</h3>
          <p>{{ t.about.description }}</p>
          
          <div class="closing-text">
            <p>{{ t.about.closing }}</p>
          </div>
        </div>
        
        <div class="about-skills-highlight no-text-cursor" ref="statsElement" :style="statsStyle">
          <div class="skills-highlight-grid">
            <div  
              class="skill-highlight-item" 
              v-for="(skill, index) in translatedSkillsHighlight" 
              :key="skill.name"
              :ref="setStatRef(index)"
              :style="getStatStyle(index)"
            >
              <div class="skill-highlight-icon">{{ skill.icon }}</div>
              <div class="skill-highlight-content">
                <div class="skill-highlight-name">{{ skill.name }}</div>
                <div class="skill-highlight-desc">{{ skill.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

// Ref for the underline animation trigger
const underlineAnimationTriggered = ref(false)
const underlineElement = ref<HTMLElement | null>(null)

// Custom scroll observer for underline animation
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (underlineElement.value) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !underlineAnimationTriggered.value) {
            // Delay the animation slightly to ensure the element is fully visible
            setTimeout(() => {
              underlineAnimationTriggered.value = true
            }, 600)
          }
        })
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Start animation a bit before fully visible
      }
    )
    observer.observe(underlineElement.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

// Translated skills for the highlight section
const translatedSkillsHighlight = computed(() => [
  {
    name: t.value.about.skills.backend.name,
    icon: '🔧',
    description: t.value.about.skills.backend.description
  },
  {
    name: t.value.about.skills.frontend.name,
    icon: '💻',
    description: t.value.about.skills.frontend.description
  },
  {
    name: t.value.about.skills.mathematics.name,
    icon: '📊',
    description: t.value.about.skills.mathematics.description
  }
])

// Scroll reveal for section header
const { element: headerElement, style: headerStyle } = useScrollReveal({
  delay: 0,
  translateY: '50px',
  duration: '1s',
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
})

// Scroll reveal for text content
const { element: textElement, style: textStyle } = useScrollReveal({
  delay: 50,
  translateY: '30px',
  translateX: '-20px',
  opacity: { from: 0, to: 1 }
})

// Scroll reveal for skills highlight
const { element: statsElement, style: statsStyle } = useScrollReveal({
  delay: 80,
  translateY: '50px',
  scale: 0.9,
  duration: '0.8s'
})

// Staggered reveal for skills
const { getItemStyle: getStatStyle, setItemRef: setStatRef } = useStaggeredReveal(3, 20)
</script>

<style scoped>
.about {
  padding: 50px 2rem 100px 2rem;
  background-color: var(--bg-secondary);
}

.about-container {
  max-width: 1300px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.title-underline {
  position: absolute;
  bottom: -8px;
  left: -10%;
  right: -10%;
  width: 120%;
  height: 40px;
  z-index: 1;
  pointer-events: none;
}

.underline-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}

.underline-path {
  stroke-dasharray: 600;
  stroke-dashoffset: 600;
  opacity: 0;
}

.underline-path.animate-draw {
  animation: staggeredLoadingBar 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.3s;
}

@keyframes staggeredLoadingBar {
  0% {
    opacity: 0;
    stroke-dashoffset: 600;
  }
  10% {
    opacity: 1;
    stroke-dashoffset: 600;
  }
  25% {
    stroke-dashoffset: 480;
  }
  40% {
    stroke-dashoffset: 360;
  }
  55% {
    stroke-dashoffset: 240;
  }
  70% {
    stroke-dashoffset: 120;
  }
  85% {
    stroke-dashoffset: 60;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.closing-text {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.closing-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.about-skills-highlight {
  padding: 0;
  background: transparent;
}

.skills-highlight-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.skill-highlight-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.skill-highlight-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(var(--accent-primary-rgb), 0.08), 
              0 10px 25px rgba(var(--accent-secondary-rgb), 0.08),
              0 5px 15px rgba(var(--accent-tertiary-rgb), 0.08);
  border-color: var(--button-bg);
}

.skill-highlight-icon {
  font-size: 2rem;
  min-width: 50px;
  text-align: center;
  transition: transform 0.3s ease;
}

.skill-highlight-item:hover .skill-highlight-icon {
  transform: scale(1.2) rotate(5deg);
}

.skill-highlight-content {
  flex: 1;
}

.skill-highlight-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-secondary);
  margin-bottom: 0.3rem;
  transition: color 0.3s ease;
}

.skill-highlight-item:hover .skill-highlight-name {
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 50%, var(--accent-tertiary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.skill-highlight-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .title-underline {
    width: 120%;
    left: -10%;
    right: -10%;
    bottom: -12px;
    height: 35px;
  }

  .underline-path {
    stroke-width: 15;
  }

  .about-text h3 {
    font-size: 1.5rem;
  }

  .about-skills-highlight {
    margin-top: 2rem;
  }

  .skills-highlight-grid {
    gap: 1rem;
  }

  .skill-highlight-item {
    padding: 1rem;
  }

  .skill-highlight-icon {
    font-size: 1.5rem;
    min-width: 40px;
  }
}
</style>
