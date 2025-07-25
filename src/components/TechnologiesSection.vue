<template>
  <section class="technologies-section">
    <div class="title-section">
      <h2 class="main-title">Technologies I Work With</h2>
      <p class="subtitle">Modern tools for modern solutions</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// No props or logic needed for this simple component
</script>

<style scoped>
.technologies-section {
  text-align: center;
  background-color: var(--bg-secondary);
}

.title-section {
    
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  font-size: 1.5rem;
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

@media (max-width: 768px) {
  .technologies-section {
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
  .technologies-section {
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
