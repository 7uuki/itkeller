<template>
  <div class="svg-examples">
    <h2>Recolorable SVG Examples</h2>

    <div class="example">
      <h3>GitHub Icon - Default Color</h3>
      <RecolorableSvg 
        :src="githubIcon"
        :width="32"
        :height="32"
      />
    </div>
    
    <div class="example">
      <h3>GitHub Icon - Accent Primary</h3>
      <RecolorableSvg 
        :src="githubIcon"
        :width="32"
        :height="32"
        fill-color="var(--accent-primary)"
      />
    </div>
    
    <div class="example">
      <h3>GitHub Icon - Accent Secondary Stroke</h3>
      <RecolorableSvg 
        :src="githubIcon"
        :width="32"
        :height="32"
        fill-color="none"
        stroke-color="var(--accent-secondary)"
        :stroke-width="2"
      />
    </div>
    
    <div class="example">
      <h3>GitHub Icon - Theme Aware</h3>
      <RecolorableSvg 
        :src="githubIcon"
        :width="32"
        :height="32"
        fill-color="var(--text-primary)"
      />
    </div>
    

    <div class="example">
      <h3>Inline SVG - Accent Tertiary</h3>
      <RecolorableSvg 
        :content="inlineSvg"
        :width="40"
        :height="40"
        fill-color="var(--accent-tertiary)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import RecolorableSvg from './RecolorableSvg.vue'
import githubIcon from '../assets/github-142-svgrepo-com.svg'

// Example inline SVG
const inlineSvg = `
<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
</svg>
`
</script>

<style scoped>
.svg-examples {
  padding: 2rem;
}

.example {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 8px;
}

.example h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary, #333);
}
</style>
