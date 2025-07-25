import { ref, onMounted, onUnmounted } from 'vue'

export function useCustomCursor() {
  const cursor = ref<HTMLElement | null>(null)

  onMounted(() => {
    const cursorElement = cursor.value
    if (!cursorElement) return

    // Direct cursor position update without any lag
    const updateCursor = (e: MouseEvent) => {
      if (cursorElement) {
        cursorElement.style.left = e.clientX + 'px'
        cursorElement.style.top = e.clientY + 'px'
      }
    }

    const handleMouseEnter = (e: MouseEvent) => {
      try {
        if (!e || !e.target) return
        const target = e.target as HTMLElement
        if (!target || typeof target.classList === 'undefined') return
        
        // Check for clickable elements first (buttons, links, etc.)
        if (isClickableElement(target)) {
          cursorElement?.classList.add('pointer-cursor')
          cursorElement?.classList.remove('text-cursor')
        }
        // Check if element or parent has no-text-cursor class
        else if (hasNoTextCursor(target)) {
          // Don't change cursor for elements marked as no-text-cursor
          return
        }
        // Then check for text elements
        else if (isTextElement(target)) {
          cursorElement?.classList.add('text-cursor')
          cursorElement?.classList.remove('pointer-cursor')
        }
      } catch (error) {
        // Silently handle any errors to prevent breaking the app
        console.warn('useCustomCursor handleMouseEnter error:', error)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      try {
        if (!e || !e.target) return
        const target = e.target as HTMLElement
        if (!target || typeof target.classList === 'undefined') return
        
        if (isClickableElement(target) || hasNoTextCursor(target) || isTextElement(target)) {
          cursorElement?.classList.remove('text-cursor', 'pointer-cursor')
        }
      } catch (error) {
        // Silently handle any errors to prevent breaking the app
        console.warn('useCustomCursor handleMouseLeave error:', error)
      }
    }

    const handleMouseDown = () => {
      cursorElement?.classList.add('clicked')
    }

    const handleMouseUp = () => {
      cursorElement?.classList.remove('clicked')
    }

    // Helper function to check for elements that shouldn't show text cursor
    const hasNoTextCursor = (target: HTMLElement | null): boolean => {
      try {
        if (!target || typeof target.classList === 'undefined') return false
        return !!(
          target.classList.contains('no-text-cursor') ||
          target.closest('.no-text-cursor')
        )
      } catch (error) {
        console.warn('useCustomCursor hasNoTextCursor error:', error)
        return false
      }
    }

    // Helper function to check for clickable elements
    const isClickableElement = (target: HTMLElement | null): boolean => {
      try {
        if (!target || typeof target.classList === 'undefined') return false
        return !!(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.classList.contains('btn') ||
          target.classList.contains('button') ||
          target.classList.contains('nav-button') ||
          target.classList.contains('navbar-button') ||
          target.classList.contains('footer-button') ||
          target.classList.contains('theme-toggle') ||
          target.classList.contains('expand-icon') ||
          target.classList.contains('academic-item') ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.btn') ||
          target.closest('.button') ||
          target.closest('.nav-button') ||
          target.closest('.navbar-button') ||
          target.closest('.footer-button') ||
          target.closest('.theme-toggle') ||
          target.closest('.expand-icon') ||
          target.closest('.academic-item') ||
          window.getComputedStyle(target).cursor === 'pointer'
        )
      } catch (error) {
        console.warn('useCustomCursor isClickableElement error:', error)
        return false
      }
    }

    // Helper function to check if element should trigger text cursor
    const isTextElement = (target: HTMLElement | null): boolean => {
      try {
        if (!target || typeof target.classList === 'undefined') return false
        
        // First check if element is explicitly marked as no-text-cursor
        if (hasNoTextCursor(target)) return false
        
        // Check if it's a clickable element
        if (isClickableElement(target)) return false
        
        // Check for terminal-specific text elements
        if (
          target.classList.contains('terminal-input') ||
          target.classList.contains('output') ||
          target.classList.contains('command-text') ||
          target.classList.contains('prompt-line') ||
          target.closest('.terminal-input') ||
          target.closest('.output') ||
          target.closest('.command-text') ||
          target.closest('.terminal-history') ||
          target.closest('.history-entry')
        ) {
          return true
        }
        
        // Check for elements that should never show text cursor
        if (
          target.classList.contains('stat-box') ||
          target.classList.contains('stat-number') ||
          target.classList.contains('stat-label') ||
          target.classList.contains('skill-item') ||
          target.classList.contains('skill-icon') ||
          target.classList.contains('skill-info') ||
          target.closest('.stat-box') ||
          target.closest('.skill-item') ||
          target.closest('.about-stats') ||
          target.closest('.skills-grid') ||
          target.closest('.no-text-cursor')
        ) {
          return false
        }
        
        // Only show text cursor for actual readable text elements
        return (
          (target.tagName === 'P' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) || 
          (target.tagName === 'H1' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (target.tagName === 'H2' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) || 
          (target.tagName === 'H3' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) || 
          (target.tagName === 'H4' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) || 
          (target.tagName === 'H5' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (target.tagName === 'H6' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (target.tagName === 'LI' && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (target.tagName === 'SPAN' && !isClickableElement(target) && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (target.classList.contains('academic-dates') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.degree-info') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.description') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.achievements') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.conclusion') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.hero-content') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.about-content') && !target.closest('.stat-box, .skill-item, .no-text-cursor')) ||
          (!!target.closest('.service-description') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.contact-info') && !target.closest('.no-text-cursor')) ||
          (!!target.closest('.section-header') && !target.closest('.no-text-cursor'))
        )
      } catch (error) {
        console.warn('useCustomCursor isTextElement error:', error)
        return false
      }
    }

    // Add event listeners
    document.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
    document.addEventListener('mousedown', handleMouseDown, { passive: true })
    document.addEventListener('mouseup', handleMouseUp, { passive: true })

    onUnmounted(() => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseenter', handleMouseEnter, true)
      document.removeEventListener('mouseleave', handleMouseLeave, true)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    })
  })

  return {
    cursor
  }
}
