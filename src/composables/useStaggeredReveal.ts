import { ref, onMounted, onUnmounted } from 'vue'

// Simpler staggered reveal function
export function useStaggeredReveal(itemCount: number, staggerDelay: number = 100) {
  const items = ref<Array<{ isVisible: boolean }>>([])
  let observer: IntersectionObserver | null = null
  const elementsToObserve = ref<HTMLElement[]>([])

  const initializeItems = () => {
    items.value = Array.from({ length: itemCount }, () => ({
      isVisible: false
    }))
  }

  const observeItems = () => {
    if (elementsToObserve.value.length === 0) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-reveal-index') || '0')
            
            // Stagger the animation
            setTimeout(() => {
              if (items.value[index]) {
                items.value[index].isVisible = true
              }
            }, index * staggerDelay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    elementsToObserve.value.forEach((element, index) => {
      if (element) {
        element.setAttribute('data-reveal-index', index.toString())
        observer?.observe(element)
      }
    })
  }

  const getItemStyle = (index: number) => ({
    transform: items.value[index]?.isVisible ? 'translateY(0)' : 'translateY(30px)',
    opacity: items.value[index]?.isVisible ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${index * 50}ms`
  })

  const setItemRef = (index: number) => (el: any) => {
    if (el && el instanceof HTMLElement) {
      elementsToObserve.value[index] = el
      // Observe items when all refs are set
      if (elementsToObserve.value.filter(Boolean).length === itemCount) {
        setTimeout(observeItems, 100)
      }
    }
  }

  onMounted(() => {
    initializeItems()
    elementsToObserve.value = new Array(itemCount).fill(null)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    items,
    getItemStyle,
    setItemRef
  }
}
