<template>
  <section id="portfolio" class="portfolio">
    <div class="portfolio-container">
      <div class="section-header" ref="headerElement" :style="headerStyle">
        <h2>{{ t.portfolio.title }}</h2>
        <p>{{ t.portfolio.subtitle }}</p>
      </div>
      
      <div class="portfolio-filters">
        <button 
          v-for="filter in translatedFilters" 
          :key="filter.key"
          :class="['filter-btn', { active: activeFilter === filter.key }]"
          @click="setFilter(filter.key)"
        >
          {{ filter.label }}
        </button>
      </div>
      
      <div class="portfolio-grid">
        <div 
          v-for="(project, index) in filteredProjects" 
          :key="project.id"
          class="portfolio-item"
          :class="project.size"
          :ref="setPortfolioRef(index)"
          :style="getPortfolioStyle(index)"
        >
          <div class="portfolio-image">
            <div class="portfolio-overlay">
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
              <div class="portfolio-tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <div class="portfolio-actions">
                <button class="action-btn">{{ t.portfolio.viewProject }}</button>
                <button class="action-btn secondary">{{ t.portfolio.sourceCode }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

const activeFilter = ref('All')

// Translated filters
const translatedFilters = computed(() => [
  { key: 'All', label: t.value.portfolio.filters.all },
  { key: 'Web Apps', label: t.value.portfolio.filters.webApps },
  { key: 'Mobile Apps', label: t.value.portfolio.filters.mobileApps },
  { key: 'UI/UX', label: t.value.portfolio.filters.uiux },
  { key: 'Backend', label: t.value.portfolio.filters.backend }
])

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React and Node.js',
    category: 'Web Apps',
    tags: ['React', 'Node.js', 'MongoDB'],
    size: 'large'
  },
  {
    id: 2,
    title: 'Task Manager App',
    description: 'Mobile app for productivity and task management',
    category: 'Mobile Apps',
    tags: ['React Native', 'TypeScript'],
    size: 'medium'
  },
  {
    id: 3,
    title: 'Brand Identity',
    description: 'Complete brand identity design for tech startup',
    category: 'UI/UX',
    tags: ['Figma', 'Adobe XD'],
    size: 'medium'
  },
  {
    id: 4,
    title: 'API Gateway',
    description: 'Microservices API gateway with authentication',
    category: 'Backend',
    tags: ['Node.js', 'Docker', 'AWS'],
    size: 'small'
  },
  {
    id: 5,
    title: 'Dashboard Analytics',
    description: 'Real-time analytics dashboard for business insights',
    category: 'Web Apps',
    tags: ['Vue.js', 'Chart.js', 'WebSocket'],
    size: 'large'
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    description: 'iOS and Android fitness tracking application',
    category: 'Mobile Apps',
    tags: ['Flutter', 'Firebase'],
    size: 'small'
  },
  {
    id: 7,
    title: 'Design System',
    description: 'Comprehensive design system for SaaS platform',
    category: 'UI/UX',
    tags: ['Figma', 'Storybook'],
    size: 'medium'
  },
  {
    id: 8,
    title: 'Payment Gateway',
    description: 'Secure payment processing system',
    category: 'Backend',
    tags: ['Python', 'PostgreSQL', 'Redis'],
    size: 'small'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

// Scroll reveal for section header
const { element: headerElement, style: headerStyle } = useScrollReveal({
  delay: 0,
  translateY: '40px',
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

// Staggered reveal for portfolio items
const { getItemStyle: getPortfolioStyle, setItemRef: setPortfolioRef } = useStaggeredReveal(8, 100)
</script>

<style scoped>
.portfolio {
  padding: 100px 2rem;
  background-color: var(--bg-secondary);
}

.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.portfolio-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  background-color: transparent;
  color: var(--text-secondary);
  border: 2px solid var(--border-color);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.filter-btn:hover,
.filter-btn.active {
  background-color: var(--button-bg);
  color: var(--button-text);
  border-color: var(--button-bg);
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  grid-auto-rows: 250px;
}

.portfolio-item {
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.portfolio-item.large {
  grid-column: span 2;
  grid-row: span 2;
}

.portfolio-item.medium {
  grid-row: span 2;
}

.portfolio-item.small {
  grid-row: span 1;
}

.portfolio-image {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--button-bg), var(--button-hover));
  position: relative;
  overflow: hidden;
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
  transform: translateY(0);
}

.portfolio-item:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 40px var(--shadow);
}

.portfolio-overlay h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.portfolio-overlay p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.portfolio-tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
}

.tag {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  backdrop-filter: blur(10px);
}

.portfolio-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid white;
  background-color: transparent;
  color: white;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.action-btn:hover {
  background-color: white;
  color: var(--text-primary);
}

.action-btn.secondary {
  border-color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 300px;
  }
  
  .portfolio-item.large,
  .portfolio-item.medium {
    grid-column: span 1;
    grid-row: span 1;
  }
  
  .portfolio-filters {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 1rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}
</style>
