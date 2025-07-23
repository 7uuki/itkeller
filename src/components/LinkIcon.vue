<template>
  <div 
    class="link-icon-wrapper no-text-cursor"
    @mouseenter="startHoverTimer"
    @mouseleave="clearHoverTimer"
  >
    <button 
      class="link-icon" 
      @click="handleClick"
      :class="{ 'is-hovered': showTooltip }"
      :style="{ 
        '--icon-size': size + 'px',
        '--svg-fill': fillColor,
        '--svg-stroke': strokeColor,
        '--svg-stroke-width': strokeWidth + 'px'
      }"
    >
      <!-- Use SVG if provided, otherwise fallback to img -->
      <div 
        v-if="svgSrc || svgContent"
        class="svg-container"
        v-html="processedSvg"
      />
      <img v-else :src="iconSrc" :alt="alt" />
    </button>
    <div 
      class="custom-tooltip" 
      :class="{ 'show': showTooltip }"
    >
      {{ title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  // Link functionality
  href: string
  title?: string
  alt?: string
  size?: number
  target?: '_blank' | '_self'
  
  // Legacy img support
  iconSrc?: string
  
  // SVG functionality
  svgSrc?: string
  svgContent?: string
  fillColor?: string
  strokeColor?: string
  strokeWidth?: number
  preserveColors?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  alt: '',
  size: 28,
  target: '_blank',
  fillColor: 'var(--text-primary)',
  strokeColor: 'none',
  strokeWidth: 1,
  preserveColors: false
})

const showTooltip = ref(false)
const svgContent = ref<string>('')
let hoverTimer: number | null = null

const processedSvg = computed(() => {
  if (!svgContent.value) return ''
  
  let processed = svgContent.value
  
  // Only handle size - let CSS handle colors via :deep selectors
  processed = processed.replace(/<svg([^>]*)>/i, (_, attributes) => {
    let cleanAttributes = attributes
      .replace(/width="[^"]*"/g, '')
      .replace(/height="[^"]*"/g, '')
      .replace(/width='[^']*'/g, '')
      .replace(/height='[^']*'/g, '')
    
    // Add data attribute for CSS targeting based on preserveColors
    const dataAttr = props.preserveColors ? ' data-preserve-colors="true"' : ' data-preserve-colors="false"'
    
    return `<svg${cleanAttributes} width="var(--icon-size)" height="var(--icon-size)"${dataAttr}>`
  })
  
  return processed
})

const loadSvg = async () => {
  if (props.svgContent) {
    svgContent.value = props.svgContent
    return
  }
  
  if (props.svgSrc) {
    try {
      const response = await fetch(props.svgSrc)
      if (response.ok) {
        svgContent.value = await response.text()
      } else {
        console.error('Failed to load SVG:', props.svgSrc)
      }
    } catch (error) {
      console.error('Error loading SVG:', error)
    }
  }
}

const startHoverTimer = () => {
  hoverTimer = window.setTimeout(() => {
    showTooltip.value = true
  }, 500)
}

const clearHoverTimer = () => {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  showTooltip.value = false
}

const handleClick = () => {
  if (props.href.startsWith('mailto:')) {
    window.location.href = props.href
  } else {
    window.open(props.href, props.target)
  }
}

onMounted(() => {
  loadSvg()
})

// Watch for changes in SVG props
watch([() => props.svgSrc, () => props.svgContent], () => {
  loadSvg()
})

// Cleanup timer on component unmount
onUnmounted(() => {
  clearHoverTimer()
})
</script>

<style scoped>
.link-icon-wrapper {
  position: relative;
  display: inline-block;
  /* Add padding to prevent jittering when element moves */
  padding: 4px;
  margin: -4px;
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.link-icon::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: translate(-50%, -50%);
  z-index: -1;
}

.link-icon-wrapper:hover .link-icon {
  transform: translateY(-4px) scale(1.05);
  animation: bounce 0.6s ease-out;
}

.link-icon-wrapper:hover .link-icon::before {
  width: 100px;
  height: 100px;
}

.link-icon img,
.svg-container {
  width: var(--icon-size);
  height: var(--icon-size);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  opacity: 0.7;
  transform-origin: center;
}

.svg-container :deep(svg) {
  width: var(--icon-size);
  height: var(--icon-size);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Only apply custom colors when not preserving original colors */
.svg-container :deep(svg[data-preserve-colors="false"]) path,
.svg-container :deep(svg[data-preserve-colors="false"]) circle,
.svg-container :deep(svg[data-preserve-colors="false"]) rect,
.svg-container :deep(svg[data-preserve-colors="false"]) polygon,
.svg-container :deep(svg[data-preserve-colors="false"]) ellipse,
.svg-container :deep(svg[data-preserve-colors="false"]) line,
.svg-container :deep(svg[data-preserve-colors="false"]) polyline {
  fill: var(--svg-fill) !important;
  stroke: var(--svg-stroke) !important;
  stroke-width: var(--svg-stroke-width) !important;
}



.link-icon-wrapper:hover .link-icon img,
.link-icon-wrapper:hover .link-icon .svg-container {
  opacity: 1;
  transform: scale(1.15) rotate(5deg);
  animation: wiggle 0.8s ease-in-out;
}

/* Legacy img filter for non-SVG icons */
.link-icon-wrapper:hover .link-icon img {
  filter: brightness(0) saturate(100%) invert(0.1) sepia(1) saturate(7) hue-rotate(180deg);
}

.custom-tooltip {
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--bg-accent, #2a2a2a);
  color: var(--text-primary, #ffffff);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  backdrop-filter: blur(10px);
}

.custom-tooltip::after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-bottom-color: var(--bg-accent, #2a2a2a);
}

.custom-tooltip.show {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(4px);
}

/* Animation for tooltip appearance */
@keyframes tooltipSlideIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(4px) scale(1);
  }
}

.custom-tooltip.show {
  animation: tooltipSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Fun hover animations */
@keyframes bounce {
  0% { transform: translateY(-4px) scale(1.05); }
  30% { transform: translateY(-8px) scale(1.08); }
  50% { transform: translateY(-6px) scale(1.06); }
  70% { transform: translateY(-7px) scale(1.07); }
  100% { transform: translateY(-4px) scale(1.05); }
}

@keyframes wiggle {
  0% { transform: scale(1.15) rotate(5deg); }
  25% { transform: scale(1.18) rotate(-3deg); }
  50% { transform: scale(1.16) rotate(4deg); }
  75% { transform: scale(1.17) rotate(-2deg); }
  100% { transform: scale(1.15) rotate(5deg); }
}
</style>
