<template>
  <section id="test" class="test-section">
    <!-- Interactive Background -->
    
    <div class="container">
      
      <h2 
        :ref="titleReveal.element" 
        :style="titleReveal.style.value"
        class="test-title"
      >
        Test Section
      </h2>
      
      <p 
        :ref="descriptionReveal.element"
        :style="descriptionReveal.style.value" 
        class="test-description"
      >
        This is a test section with 100vh height for layout testing and development purposes.
      </p>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useInteractiveBackground } from '../composables/useInteractiveBackground'


// Scroll reveal animations
const titleReveal = useScrollReveal({
  translateY: '50px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 100
})

const descriptionReveal = useScrollReveal({
  translateY: '40px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 200
})
</script>

<style scoped>
.test-section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow: hidden;
}

.background-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.test-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.test-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .test-title {
    font-size: 2rem;
  }
  
  .test-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .test-title {
    font-size: 1.75rem;
  }
}
</style>
