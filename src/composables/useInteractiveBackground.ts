import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface InteractiveBackgroundOptions {
  particleCount?: number
  maxParticleSize?: number
  minParticleSize?: number
  connectionDistance?: number
  mouseInfluence?: number
  animationSpeed?: number
  colors?: string[]
  enableConnections?: boolean
  enableMouseInteraction?: boolean
}

export function useInteractiveBackground(options: InteractiveBackgroundOptions = {}) {
  const {
    particleCount = 60,
    maxParticleSize = 3,
    minParticleSize = 1,
    connectionDistance = 150,
    mouseInfluence = 100,
    animationSpeed = 0.5,
    colors = ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'],
    enableConnections = true,
    enableMouseInteraction = true
  } = options

  const canvas = ref<HTMLCanvasElement | null>(null)
  const canvasContainer = ref<HTMLElement | null>(null)
  
  let ctx: CanvasRenderingContext2D | null = null
  let particles: Particle[] = []
  let animationFrameId: number | null = null
  let mouse = { x: 0, y: 0 }

  const resizeCanvas = () => {
    if (!canvas.value || !canvasContainer.value) return
    
    const container = canvasContainer.value
    
    canvas.value.width = container.offsetWidth
    canvas.value.height = container.offsetHeight
    canvas.value.style.width = container.offsetWidth + 'px'
    canvas.value.style.height = container.offsetHeight + 'px'
  }

  const getColorValue = (cssVar: string): string => {
    if (cssVar.startsWith('var(')) {
      const varName = cssVar.slice(4, -1)
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim()
    }
    return cssVar
  }

  const createParticle = (): Particle => {
    if (!canvas.value) throw new Error('Canvas not initialized')
    
    return {
      x: Math.random() * canvas.value.width,
      y: Math.random() * canvas.value.height,
      vx: (Math.random() - 0.5) * animationSpeed,
      vy: (Math.random() - 0.5) * animationSpeed,
      size: Math.random() * (maxParticleSize - minParticleSize) + minParticleSize,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }
  }

  const initParticles = () => {
    particles = []
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle())
    }
  }

  const updateParticles = () => {
    if (!canvas.value) return

    particles.forEach(particle => {
      // Mouse interaction
      if (enableMouseInteraction) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence
          particle.vx -= (dx / distance) * force * 0.5
          particle.vy -= (dy / distance) * force * 0.5
        }
      }

      // Update position
      particle.x += particle.vx
      particle.y += particle.vy

      // Boundary collision with smooth bounce
      if (particle.x <= 0 || particle.x >= canvas.value!.width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.value!.width, particle.x))
      }
      if (particle.y <= 0 || particle.y >= canvas.value!.height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvas.value!.height, particle.y))
      }

      // Add slight drift back to original speed
      particle.vx *= 0.995
      particle.vy *= 0.995
      
      // Random slight movement to keep things dynamic
      particle.vx += (Math.random() - 0.5) * 0.01
      particle.vy += (Math.random() - 0.5) * 0.01
    })
  }

  const drawConnections = () => {
    if (!ctx || !enableConnections) return

    particles.forEach((particleA, i) => {
      particles.slice(i + 1).forEach(particleB => {
        const dx = particleA.x - particleB.x
        const dy = particleA.y - particleB.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.3
          const colorA = getColorValue(particleA.color)
          const colorB = getColorValue(particleB.color)
          
          // Create gradient line
          const gradient = ctx!.createLinearGradient(
            particleA.x, particleA.y,
            particleB.x, particleB.y
          )
          gradient.addColorStop(0, `${colorA}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)
          gradient.addColorStop(1, `${colorB}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`)

          ctx!.strokeStyle = gradient
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(particleA.x, particleA.y)
          ctx!.lineTo(particleB.x, particleB.y)
          ctx!.stroke()
        }
      })
    })
  }

  const drawParticles = () => {
    if (!ctx) return

    particles.forEach(particle => {
      const color = getColorValue(particle.color)
      
      // Create radial gradient for glow effect
      const gradient = ctx!.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 3
      )
      gradient.addColorStop(0, `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`)
      gradient.addColorStop(1, `${color}00`)

      ctx!.fillStyle = gradient
      ctx!.beginPath()
      ctx!.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2)
      ctx!.fill()

      // Draw core particle
      ctx!.fillStyle = `${color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`
      ctx!.beginPath()
      ctx!.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx!.fill()
    })
  }

  const animate = () => {
    if (!ctx || !canvas.value) return

    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
    
    updateParticles()
    drawConnections()
    drawParticles()
    
    animationFrameId = requestAnimationFrame(animate)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!canvas.value || !canvasContainer.value) return
    
    const rect = canvas.value.getBoundingClientRect()
    mouse.x = event.clientX - rect.left
    mouse.y = event.clientY - rect.top
  }

  const handleResize = () => {
    resizeCanvas()
    initParticles()
  }

  const init = () => {
    if (!canvas.value) return

    ctx = canvas.value.getContext('2d')
    if (!ctx) return

    resizeCanvas()
    initParticles()
    animate()
  }

  onMounted(() => {
    if (canvas.value) {
      init()
      
      window.addEventListener('resize', handleResize)
      if (enableMouseInteraction && canvasContainer.value) {
        canvasContainer.value.addEventListener('mousemove', handleMouseMove)
      }
    }
  })

  onUnmounted(() => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener('resize', handleResize)
    if (canvasContainer.value) {
      canvasContainer.value.removeEventListener('mousemove', handleMouseMove)
    }
  })

  return {
    canvas,
    canvasContainer,
    init
  }
}
