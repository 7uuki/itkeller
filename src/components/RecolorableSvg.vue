<template>
  <div 
    class="recolorable-svg"
    :style="{ 
      '--svg-width': width + 'px',
      '--svg-height': height + 'px',
      '--svg-fill': fillColor,
      '--svg-stroke': strokeColor,
      '--svg-stroke-width': strokeWidth + 'px'
    }"
    v-html="processedSvg"
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Props {
  /** Path to the SVG file or inline SVG content */
  src?: string
  /** Inline SVG content as string */
  content?: string
  /** Fill color for the SVG */
  fillColor?: string
  /** Stroke color for the SVG */
  strokeColor?: string
  /** Stroke width */
  strokeWidth?: number
  /** Width of the SVG */
  width?: number
  /** Height of the SVG */
  height?: number
  /** Whether to preserve original colors */
  preserveColors?: boolean
  /** CSS class to apply to the SVG element */
  svgClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  fillColor: 'currentColor',
  strokeColor: 'none',
  strokeWidth: 1,
  width: 24,
  height: 24,
  preserveColors: false,
  svgClass: ''
})

const svgContent = ref<string>('')

const processedSvg = computed(() => {
  if (!svgContent.value) return ''
  
  let processed = svgContent.value
  
  // If we don't want to preserve original colors, replace them
  if (!props.preserveColors) {
    // Replace fill attributes
    if (props.fillColor !== 'none') {
      processed = processed.replace(/fill="[^"]*"/g, `fill="var(--svg-fill)"`)
      processed = processed.replace(/fill='[^']*'/g, `fill="var(--svg-fill)"`)
      
      // Handle CSS custom properties that might already exist
      processed = processed.replace(/fill="var\([^)]*\)"/g, `fill="var(--svg-fill)"`)
    }
    
    // Replace stroke attributes
    if (props.strokeColor !== 'none') {
      processed = processed.replace(/stroke="[^"]*"/g, `stroke="var(--svg-stroke)"`)
      processed = processed.replace(/stroke='[^']*'/g, `stroke="var(--svg-stroke)"`)
      processed = processed.replace(/stroke-width="[^"]*"/g, `stroke-width="var(--svg-stroke-width)"`)
      processed = processed.replace(/stroke-width='[^']*'/g, `stroke-width="var(--svg-stroke-width)"`)
    }
  }
  
  // Add CSS class if provided
  if (props.svgClass) {
    processed = processed.replace(/<svg([^>]*)>/i, `<svg$1 class="${props.svgClass}">`)
  }
  
  // Set width and height
  processed = processed.replace(/<svg([^>]*)>/i, (_, attributes) => {
    // Remove existing width and height attributes
    let cleanAttributes = attributes
      .replace(/width="[^"]*"/g, '')
      .replace(/height="[^"]*"/g, '')
      .replace(/width='[^']*'/g, '')
      .replace(/height='[^']*'/g, '')
    
    return `<svg${cleanAttributes} width="var(--svg-width)" height="var(--svg-height)">`
  })
  
  return processed
})

const loadSvg = async () => {
  if (props.content) {
    svgContent.value = props.content
    return
  }
  
  if (props.src) {
    try {
      const response = await fetch(props.src)
      if (response.ok) {
        svgContent.value = await response.text()
      } else {
        console.error('Failed to load SVG:', props.src)
      }
    } catch (error) {
      console.error('Error loading SVG:', error)
    }
  }
}

onMounted(() => {
  loadSvg()
})

// Watch for changes in src or content
watch([() => props.src, () => props.content], () => {
  loadSvg()
})
</script>

<style scoped>
.recolorable-svg {
  display: inline-block;
  line-height: 0;
}

.recolorable-svg :deep(svg) {
  width: var(--svg-width);
  height: var(--svg-height);
}

.recolorable-svg :deep(path),
.recolorable-svg :deep(circle),
.recolorable-svg :deep(rect),
.recolorable-svg :deep(polygon),
.recolorable-svg :deep(ellipse),
.recolorable-svg :deep(line),
.recolorable-svg :deep(polyline) {
  fill: var(--svg-fill);
  stroke: var(--svg-stroke);
  stroke-width: var(--svg-stroke-width);
}

/* Override when preserveColors is true */
.preserve-colors :deep(path),
.preserve-colors :deep(circle),
.preserve-colors :deep(rect),
.preserve-colors :deep(polygon),
.preserve-colors :deep(ellipse),
.preserve-colors :deep(line),
.preserve-colors :deep(polyline) {
  fill: inherit;
  stroke: inherit;
  stroke-width: inherit;
}
</style>
