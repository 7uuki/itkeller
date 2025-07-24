<template>
  <section id="services" class="services">
    <div class="services-container">
      <div class="section-header" ref="headerElement" :style="headerStyle">
        <h2>{{ t.services.title }}</h2>
        <p>{{ t.services.subtitle }}</p>
      </div>
      
      <div class="services-grid">
        <div 
          class="service-card" 
          v-for="(service, index) in translatedServices" 
          :key="service.id"
          :ref="setServiceRef(index)"
          :style="getServiceStyle(index)"
        >
          <div class="service-icon">{{ service.icon }}</div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.description }}</p>
          <ul class="service-features">
            <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
          </ul>
          <button class="service-btn">{{ t.services.learnMore }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()

// Translated services
const translatedServices = computed(() => [
  {
    id: 1,
    icon: '🌐',
    title: t.value.services.webDev.title,
    description: t.value.services.webDev.description,
    features: t.value.services.webDev.features
  },
  {
    id: 2,
    icon: '📱',
    title: t.value.services.mobileApp.title,
    description: t.value.services.mobileApp.description,
    features: t.value.services.mobileApp.features
  },
  {
    id: 3,
    icon: '🎨',
    title: t.value.services.uiux.title,
    description: t.value.services.uiux.description,
    features: t.value.services.uiux.features
  },
  {
    id: 4,
    icon: '⚡',
    title: t.value.services.performance.title,
    description: t.value.services.performance.description,
    features: t.value.services.performance.features
  },
  {
    id: 5,
    icon: '🔧',
    title: t.value.services.maintenance.title,
    description: t.value.services.maintenance.description,
    features: t.value.services.maintenance.features
  },
  {
    id: 6,
    icon: '☁️',
    title: t.value.services.cloud.title,
    description: t.value.services.cloud.description,
    features: t.value.services.cloud.features
  }
])

// Scroll reveal for section header
const { element: headerElement, style: headerStyle } = useScrollReveal({
  delay: 0,
  translateY: '40px',
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

// Staggered reveal for service cards
const { getItemStyle: getServiceStyle, setItemRef: setServiceRef } = useStaggeredReveal(6, 10)
</script>

<style scoped>
.services {
  padding: 100px 2rem;
  
  background-color: var(--bg-primary);
}

.services-container {
  max-width: 1200px;
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
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.service-card {
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--button-bg), var(--button-hover));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px var(--shadow);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.service-card h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.service-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 2rem;
}

.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
}

.service-features li {
  color: var(--text-secondary);
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.service-features li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--button-bg);
  font-weight: bold;
}

.service-btn {
  background-color: transparent;
  color: var(--button-bg);
  border: 2px solid var(--button-bg);
  padding: 0.8rem 2rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.service-btn:hover {
  background-color: var(--button-bg);
  color: var(--button-text);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .service-card {
    padding: 2rem;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
}
</style>
