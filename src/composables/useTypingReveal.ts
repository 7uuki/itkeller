import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useScrollReveal, type ScrollRevealOptions } from './useScrollReveal'

// Typing effect with scroll reveal integration
export interface TypingEffectOptions extends ScrollRevealOptions {
  text: string
  typeSpeed?: number
  showCursor?: boolean
  cursorChar?: string
  cursorBlinkSpeed?: number
  hideCursorWhenDone?: boolean
  hideCursorDelay?: number
}

export function useTypingReveal(options: TypingEffectOptions) {
  const {
    text,
    typeSpeed = 100,
    showCursor = true,
    cursorChar = '|',
    cursorBlinkSpeed = 500,
    hideCursorWhenDone = true,
    hideCursorDelay = 1000,
    ...scrollOptions
  } = options

  const typedChars = ref(0)
  const isTyping = ref(false)
  const showTypingCursor = ref(true)
  let typingInterval: number | null = null
  let cursorInterval: number | null = null

  // Parse HTML and extract character positions
  const parseHtmlText = () => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = text
    const plainText = tempDiv.textContent || tempDiv.innerText || ''
    return plainText
  }

  const plainText = parseHtmlText()
  
  // Use the base scroll reveal functionality
  const { element, isVisible, style: baseStyle } = useScrollReveal(scrollOptions)

  const startTyping = () => {
    if (isTyping.value || typedChars.value >= plainText.length) return
    
    isTyping.value = true
    
    typingInterval = window.setInterval(() => {
      if (typedChars.value < plainText.length) {
        typedChars.value++
      } else {
        if (typingInterval) {
          clearInterval(typingInterval)
          typingInterval = null
        }
        isTyping.value = false
        
        // Hide cursor after typing is complete (if option is enabled)
        if (hideCursorWhenDone) {
          setTimeout(() => {
            showTypingCursor.value = false
            // Stop cursor blinking when hidden
            if (cursorInterval) {
              clearInterval(cursorInterval)
              cursorInterval = null
            }
          }, hideCursorDelay)
        }
      }
    }, typeSpeed)
  }

  const startCursorBlink = () => {
    if (!showCursor) return
    
    cursorInterval = window.setInterval(() => {
      showTypingCursor.value = !showTypingCursor.value
    }, cursorBlinkSpeed)
  }

  // Watch for visibility and start typing effect
  const stopWatching = ref(() => {})
  
  onMounted(() => {
    const unwatch = watch(isVisible, (visible: boolean) => {
      if (visible && !isTyping.value && typedChars.value === 0) {
        // Start typing after scroll reveal animation begins
        setTimeout(() => {
          startTyping()
          startCursorBlink()
        }, scrollOptions.delay || 0)
      }
    })
    stopWatching.value = unwatch
  })

  onUnmounted(() => {
    if (typingInterval) clearInterval(typingInterval)
    if (cursorInterval) clearInterval(cursorInterval)
    stopWatching.value()
  })

  const displayText = computed(() => {
    const typedText = plainText.substring(0, typedChars.value)
    const cursor = showCursor && showTypingCursor.value ? cursorChar : ''
    return typedText + cursor
  })

  const displayHtml = computed(() => {
    const typedLength = typedChars.value
    const cursor = showCursor && showTypingCursor.value ? `<span class="typing-cursor">${cursorChar}</span>` : ''
    
    // Create HTML with only the typed portion visible
    let result = ''
    let plainTextIndex = 0
    let i = 0
    
    while (i < text.length && plainTextIndex < typedLength) {
      if (text[i] === '<') {
        // Find the end of the HTML tag
        const tagEnd = text.indexOf('>', i)
        if (tagEnd !== -1) {
          result += text.substring(i, tagEnd + 1)
          i = tagEnd + 1
        } else {
          break
        }
      } else {
        result += text[i]
        plainTextIndex++
        i++
      }
    }
    
    return result + cursor
  })

  const style = computed(() => ({
    ...baseStyle.value
  }))

  const resetTyping = () => {
    typedChars.value = 0
    isTyping.value = false
    showTypingCursor.value = true
  }

  return {
    element,
    isVisible,
    displayText,
    displayHtml,
    style,
    isTyping,
    resetTyping
  }
}
