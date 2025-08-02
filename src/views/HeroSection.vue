<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTypingReveal } from '../composables/useTypingReveal'
import { useInteractiveBackground } from '../composables/useInteractiveBackground'
import { useLanguage } from '../composables/useLanguage'
import ImageModal from '../components/ImageModal.vue'
import LinkIcon from '../components/LinkIcon.vue'
import profilePicture from '../assets/picture.png'
import mailIcon from '@/assets/mail.svg?raw'
import githubIcon from '@/assets/github.svg?raw'
import linkedinIcon from '@/assets/linkedin.svg?raw'

const { t } = useLanguage()

const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Interactive background
const { canvas, canvasContainer } = useInteractiveBackground({
  particleCount: 150,
  maxParticleSize: 2.5,
  minParticleSize: 0.8,
  connectionDistance: 120,
  mouseInfluence: 160,
  animationSpeed: 0.25,
  colors: ['var(--accent-primary)', 'var(--accent-secondary)', 'var(--accent-tertiary)'],
  enableConnections: true,
  enableMouseInteraction: true
})

// Scroll reveal for hero content
const { element: heroContent, style: contentStyle } = useScrollReveal({
  delay: 200,
  translateY: '0px',
  duration: '0.5s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

// Typing effect for hero title
const { element: titleElement, displayHtml: titleDisplayHtml, style: titleStyle } = useTypingReveal({
  text: '<span class="thick break-after-hi">Hi!</span> <span class="keep-together">My name is</span> <br><span class="thick">Lukas Keller</span>',
  typeSpeed: 45,
  showCursor: true,
  cursorChar: '|',
  cursorBlinkSpeed: 800,
  hideCursorWhenDone: true,
  hideCursorDelay: 3000,
  delay: 200,
  translateY: '40px',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

const { element: subtitleElement, style: subtitleStyle } = useScrollReveal({
  delay: 200,
  translateY: '40px',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

const { element: socialElement, style: socialStyle } = useScrollReveal({
  delay: 800,
  translateY: '30px',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})


// Staggered reveal for hero cards
</script>


<template>
  <section id="hero" class="hero">
    <!-- Interactive Background -->
    <div class="interactive-background" ref="canvasContainer">
      <canvas ref="canvas" class="background-canvas"></canvas>
    </div>
    
    <div class="hero-container" ref="heroContent" :style="contentStyle">
      
      <div class="hero-visual" ref="subtitleElement" :style="subtitleStyle" >
        <ImageModal 
            :src="profilePicture" 
            alt=""
            size="large"
            :flipped="false"
          />
      </div>
      <div class="hero-content" >
        <h1 class="hero-title" ref="titleElement" :style="titleStyle" v-html="titleDisplayHtml"></h1>
        <div ref="subtitleElement" :style="subtitleStyle" >
          <p class="hero-subtitle" >{{ t.hero.description }}</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" @click="">Download CV</button>
            <button class="btn btn-secondary btn-with-arrow" @click="scrollTo('contact')">
              <span class="btn-text">{{ t.hero.getInTouch }}</span>
              <div class="btn-arrow"></div>
            </button>
          </div>
        </div>
        
        <!-- Social Media Links -->
        <div class="social-links" ref="socialElement" :style="socialStyle">
          
          <LinkIcon 
            :svg-content="mailIcon"
            href="mailto:info@itkeller.com"
            :title="t.hero.emailTitle"
            alt="Email"
            :size="25"
            fill-color="none"
            stroke-color="var(--text-primary)"
            :stroke-width="2"
          />
          <LinkIcon 
            :svg-content="githubIcon"
            href="https://github.com/7uuki"
            :title="t.hero.githubTitle"
            alt="GitHub"
            :size="25"
            fill-color="var(--text-primary)"
          />
          <LinkIcon 
            :svg-content="linkedinIcon"
            href="https://www.linkedin.com/in/lukas-keller-52867b258"
            :title="t.hero.linkedinTitle"
            alt="LinkedIn"
            :size="25"
            fill-color="var(--text-primary)"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0px 2rem 0rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.interactive-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background-canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  gap: 0rem;
  align-items: center;
  position: relative;
  z-index: 1;
  pointer-events: none;
  flex: 1;
  align-self: center;
}

.hero-content {
  text-align: left;
  position: relative;
  z-index: 2;
  pointer-events: auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.hero-title :deep(.thick) {
  font-weight: 700;
}

.hero-title :deep(.keep-together) {
  white-space: nowrap;
}

@media (max-width: 600px) {
  .hero-title :deep(.break-after-hi)::after {
    content: '\A';
    white-space: pre;
  }
  
  .hero-title :deep(.keep-together) {
    white-space: normal;
  }
}



.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.typing-cursor {
  animation: blink 1s infinite;
  color: var(--button-bg);
  font-weight: normal;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  pointer-events: auto;
}

.btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--button-bg);
  color: var(--button-text);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
  background: radial-gradient(circle, #f97316, #ec4899);
  z-index: -1;
}

.btn-primary::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
  background: linear-gradient(
    45deg,
    var(--accent-primary) 0%,
    var(--accent-secondary) 25%,
    var(--accent-tertiary) 50%,
    var(--accent-secondary) 75%,
    var(--accent-tertiary) 100%
  );
  background-size: 400% 400%;
  animation: fluidGradient 4s ease-in-out infinite;
  filter: blur(1px);
}

.btn-primary:hover::before,
.btn-primary:hover::after {
  opacity: 1;
}

.btn-primary:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 8px 25px var(--shadow);
  color: white;
}

@keyframes fluidGradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  padding: 0;
}

.btn-secondary:hover {
  background-color: transparent;
  color: var(--text-primary);
}

.btn-with-arrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-with-arrow:hover {
  gap: 1rem;
}

.btn-with-arrow:hover .btn-text {
  transform: scale(1.1);
}

.btn-text {
  transition: transform 0.3s ease;
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
  /* Make the arrow inherit the current text color */
  background-color: currentColor;
  mask: url('../assets/arrow-right.svg') no-repeat center;
  mask-size: contain;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;
  justify-content: flex-start;
  align-items: center;
  pointer-events: auto;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  pointer-events: auto;
}

.hero-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 400px;
}

.hero-card {
  background-color: var(--bg-accent);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.hero-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px var(--shadow);
}

.card-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.hero-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.hero-card p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .hero {
    height: 98vh;
  }

  .hero-container {
    grid-template-columns: 1fr;
    gap: 0rem;
    text-align: center;
    align-items: center;
    flex: none;
  }

  .hero-title {
    font-size: 2.5rem;
    margin-top: 0;
  }

  .hero-content {
    text-align: center;
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .hero-card {
    padding: 1.5rem;
  }

  .social-links {
    justify-content: center;
    margin-top: 1.5rem;
    gap: 2rem;
  }
}
</style>
