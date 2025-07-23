<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useTypingReveal } from '../composables/useTypingReveal'
import ImageModal from '../components/ImageModal.vue'
import LinkIcon from '../components/LinkIcon.vue'
import profilePicture from '../assets/picture.png'

const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Scroll reveal for hero content
const { element: heroContent, style: contentStyle } = useScrollReveal({
  delay: 200,
  translateY: '60px',
  duration: '0.5s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
})

// Typing effect for hero title
const { element: titleElement, displayHtml: titleDisplayHtml, style: titleStyle } = useTypingReveal({
  text: '<span class="thick">Hi!</span> My name is <br><span class="thick">Lukas Keller</span>',
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
          <p class="hero-subtitle" >Creating amazing digital experiences with modern web technologies</p>
          <div class="hero-buttons">
            <button class="btn btn-primary" @click="">Download CV</button>
            <button class="btn btn-secondary btn-with-arrow" @click="scrollTo('contact')">
              <span class="btn-text">Get In Touch</span>
              <div class="btn-arrow"></div>
            </button>
          </div>
        </div>
        
        <!-- Social Media Links -->
        <div class="social-links" ref="socialElement" :style="socialStyle">
          
          <LinkIcon 
            svg-src="/src/assets/mail-alt-svgrepo-com.svg"
            href="mailto:your.email@example.com"
            title="Write me an Email"
            alt="Email"
            :size="25"
            fill-color="none"
            stroke-color="var(--text-primary)"
            :stroke-width="2"
          />
          <LinkIcon 
            svg-src="/src/assets/github-142-svgrepo-com.svg"
            href="https://github.com/yourusername"
            title="This is my GitHub"
            alt="GitHub"
            :size="25"
            fill-color="var(--text-primary)"
          />
          <LinkIcon 
            svg-src="/src/assets/linkedin-svgrepo-com.svg"
            href="https://linkedin.com/in/yourprofile"
            title="Take a look at my LinkedIn"
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
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 2rem 2rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
}

.hero-container {
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
}

.hero-content {
  text-align: left;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 400;
  color: var(--text-primary);
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-title :deep(.thick) {
  font-weight: 700;
}



.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
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

/* Animation 1: Flowing Spheres */
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
  transition: opacity 0.3s ease;
  background: #ec4899;
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
  transition: opacity 0.3s ease;
  z-index: -1;
  background: 
    radial-gradient(circle at 20% 50%, #ec4899 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, #f59e0b 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, #f97316 0%, transparent 50%),
    radial-gradient(circle at 90% 90%, #ec4899 0%, transparent 50%),
    radial-gradient(circle at 10% 10%, #f59e0b 0%, transparent 50%);
  background-size: 60% 60%, 40% 40%, 50% 50%, 30% 30%, 35% 35%;
  animation: fluidMovement 4s ease-in-out infinite;
  filter: blur(1px);
  mix-blend-mode: screen;
}

.btn-primary:hover::before,
.btn-primary:hover::after {
  opacity: 1;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow);
  color: white;
}

@keyframes fluidMovement {
  0%, 100% {
    transform: translate(0%, 0%) rotate(0deg);
    background-size: 60% 60%, 40% 40%, 50% 50%, 30% 30%, 35% 35%;
  }
  25% {
    transform: translate(-10%, -15%) rotate(90deg);
    background-size: 50% 50%, 60% 60%, 40% 40%, 45% 45%, 25% 25%;
  }
  50% {
    transform: translate(-20%, 10%) rotate(180deg);
    background-size: 45% 45%, 35% 35%, 60% 60%, 30% 30%, 50% 50%;
  }
  75% {
    transform: translate(15%, -10%) rotate(270deg);
    background-size: 55% 55%, 50% 50%, 35% 35%, 40% 40%, 30% 30%;
  }
}

.btn-secondary {
  background-color: transparent;
  color: var(--text-primary);
  border: 0px solid var(--button-bg);
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
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
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
  .hero-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-content {
    text-align: center;
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
