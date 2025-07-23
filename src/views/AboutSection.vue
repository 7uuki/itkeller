<template>
  <section id="about" class="about">
    <div class="about-container">
      <div class="section-header" ref="headerElement" :style="headerStyle">
        <h2>About Me</h2>
        <p>Getting to know who I am and what I do</p>
      </div>
      
      <div class="about-content">
        <div class="about-text" ref="textElement" :style="textStyle">
          <h3>Hello, I'm a Web Developer</h3>
          <p>With over 5 years of experience in creating digital solutions that make a difference. I specialize in modern web technologies and love bringing ideas to life through code.</p>
          <p>My passion lies in creating user-friendly, responsive, and performant web applications that provide excellent user experiences.</p>
          
          <div class="skills-grid no-text-cursor">
            <div 
              class="skill-item" 
              v-for="(skill, index) in skills" 
              :key="skill.name"
              :ref="setSkillRef(index)"
              :style="getSkillStyle(index)"
            >
              <div class="skill-icon">{{ skill.icon }}</div>
              <div class="skill-info">
                <h4>{{ skill.name }}</h4>
                <p>{{ skill.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="about-stats no-text-cursor" ref="statsElement" :style="statsStyle">
          <div  
            class="stat-box" 
            v-for="(stat, index) in stats" 
            :key="stat.label"
            :ref="setStatRef(index)"
            :style="getStatStyle(index)"
          >
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollReveal } from '../composables/useScrollReveal'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'

const skills = [
  {
    name: 'Frontend Development',
    icon: '💻',
    description: 'Vue.js, React, TypeScript'
  },
  {
    name: 'Backend Development',
    icon: '⚙️',
    description: 'Node.js, Python, APIs'
  },
  {
    name: 'UI/UX Design',
    icon: '🎨',
    description: 'Figma, Adobe XD'
  },
  {
    name: 'Database',
    icon: '💾',
    description: 'PostgreSQL, MongoDB'
  }
]

const stats = [
  { number: '50+', label: 'Projects Completed' },
  { number: '5+', label: 'Years Experience' },
  { number: '20+', label: 'Happy Clients' },
  { number: '100%', label: 'Success Rate' }
]

// Scroll reveal for section header
const { element: headerElement, style: headerStyle } = useScrollReveal({
  delay: 0,
  translateY: '50px',
  duration: '1s',
  easing: 'cubic-bezier(0.23, 1, 0.32, 1)'
})

// Scroll reveal for text content
const { element: textElement, style: textStyle } = useScrollReveal({
  delay: 50,
  translateY: '30px',
  translateX: '-20px',
  opacity: { from: 0, to: 1 }
})

// Scroll reveal for stats
const { element: statsElement, style: statsStyle } = useScrollReveal({
  delay: 80,
  translateY: '50px',
  scale: 0.9,
  duration: '0.8s'
})

// Staggered reveal for skills
const { getItemStyle: getSkillStyle, setItemRef: setSkillRef } = useStaggeredReveal(4, 30)

// Staggered reveal for stats
const { getItemStyle: getStatStyle, setItemRef: setStatRef } = useStaggeredReveal(4, 20)
</script>

<style scoped>
.about {
  padding: 100px 2rem;
  background-color: var(--bg-secondary);
}

.about-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text h3 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
}

.about-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--shadow);
}

.skill-icon {
  font-size: 2rem;
  min-width: 60px;
  text-align: center;
}

.skill-info h4 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.skill-info p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.about-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.stat-box {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px var(--shadow);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--button-bg);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .about-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-header h2 {
    font-size: 2rem;
  }
}
</style>
