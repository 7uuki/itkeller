import { ref, computed, onMounted, onUnmounted } from 'vue'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  delay?: number
  once?: boolean
  // Animation options
  duration?: string
  easing?: string
  translateY?: string
  translateX?: string
  scale?: number
  rotate?: string
  opacity?: { from: number; to: number }
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    delay = 0,
    once = true,
    duration = '0.8s',
    easing = 'cubic-bezier(0.16, 1, 0.3, 1)',
    translateY = '40px',
    translateX = '0px',
    scale = 1,
    rotate = '0deg',
    opacity = { from: 0, to: 1 }
  } = options

  const isVisible = ref(false)
  const element = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const style = computed(() => {
    const transforms = []
    
    if (translateY !== '0px') {
      transforms.push(`translateY(${isVisible.value ? '0px' : translateY})`)
    }
    if (translateX !== '0px') {
      transforms.push(`translateX(${isVisible.value ? '0px' : translateX})`)
    }
    if (scale !== 1) {
      transforms.push(`scale(${isVisible.value ? 1 : scale})`)
    }
    if (rotate !== '0deg') {
      transforms.push(`rotate(${isVisible.value ? '0deg' : rotate})`)
    }

    return {
      transform: transforms.length > 0 ? transforms.join(' ') : 'none',
      opacity: isVisible.value ? opacity.to : opacity.from,
      transition: `all ${duration} ${easing}`,
      transitionDelay: `${delay}ms`
    }
  })

  const observeElement = () => {
    if (!element.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (delay > 0) {
              setTimeout(() => {
                isVisible.value = true
              }, delay)
            } else {
              isVisible.value = true
            }
            
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element.value)
  }

  onMounted(() => {
    observeElement()
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    element,
    isVisible,
    style
  }
}
