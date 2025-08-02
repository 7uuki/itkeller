<template>
  <div class="lottie-container">
    <div v-if="!isLoaded" class="loading-placeholder">
      <div class="spinner"></div>
    </div>
    <DotLottieVue 
      v-show="isLoaded"
      ref="lottieRef"
      :style="{ height: props.height + 'px', width: props.width + 'px' }" 
      :speed="2" 
      :autoplay="props.shouldPlay"
      :loop="props.loop"
      :src="props.animationPath"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

interface Props {
  animationPath: string
  height?: number
  width?: number
  loop?: boolean
  shouldPlay?: boolean
  preload?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  height: 200,
  width: 200,
  loop: false,
  shouldPlay: false,
  preload: true
})

const emit = defineEmits<{
  complete: []
  ready: []
}>()

const lottieRef = ref<InstanceType<typeof DotLottieVue> | null>(null)
const isLoaded = ref(false)
const isReady = ref(false)
const dotLottieInstance = ref<any>(null)

// Setup DotLottie instance and event listeners
const setupDotLottieInstance = async () => {
  if (lottieRef.value) {
    await nextTick()
    try {
      // Try to access the DotLottie instance through the component's internal structure
      dotLottieInstance.value = (lottieRef.value as any).getDotLottieInstance?.() || 
                                (lottieRef.value as any).$refs?.dotLottie ||
                                (lottieRef.value as any).dotLottie
      
      if (dotLottieInstance.value) {
        // Add event listeners
        dotLottieInstance.value.addEventListener?.('ready', onAnimationReady)
        dotLottieInstance.value.addEventListener?.('complete', onAnimationComplete)
        dotLottieInstance.value.addEventListener?.('load', () => {
          isLoaded.value = true
        })
        
        // Mark as ready if the instance is available
        if (!isReady.value) {
          onAnimationReady()
        }
      }
    } catch (error) {
      console.warn('Could not access DotLottie instance:', error)
      // Fallback: assume loaded after a short delay
      setTimeout(() => {
        isLoaded.value = true
        isReady.value = true
        emit('ready')
      }, 100)
    }
  }
}

// Watch for shouldPlay changes to control animation playback
watch(() => props.shouldPlay, (newValue) => {
  if (dotLottieInstance.value) {
    if (newValue) {
      dotLottieInstance.value.play?.()
    } else {
      dotLottieInstance.value.stop?.()
    }
  }
})

// Preload animation when component mounts
onMounted(() => {
  if (props.preload) {
    // Set loaded to true immediately to show the component
    isLoaded.value = true
    setupDotLottieInstance()
  }
})

const onAnimationReady = () => {
  isReady.value = true
  emit('ready')
}

const onAnimationComplete = () => {
  emit('complete')
}

// Expose methods for external control
defineExpose({
  play: () => dotLottieInstance.value?.play?.(),
  stop: () => dotLottieInstance.value?.stop?.(),
  pause: () => dotLottieInstance.value?.pause?.(),
  isLoaded: () => isLoaded.value,
  isReady: () => isReady.value,
  getDotLottieInstance: () => dotLottieInstance.value
})



</script>

<style scoped>
.lottie-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: v-bind('height + "px"');
  width: v-bind('width + "px"');
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--border-color);
  border-top: 4px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
