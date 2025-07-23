<template>
  <section id="academic" class="academic">
    <div class="academic-container">
      <div class="section-header" ref="headerElement" :style="headerStyle">
        <h2>My Academic Journey</h2>
        <p>Exploring my educational background and achievements</p>
      </div>
      
      <div class="academic-content">
        <div 
          class="academic-item" 
          v-for="(item, index) in academicItems" 
          :key="item.id"
          :ref="setItemRef(index)"
          :style="getItemStyle(index)"
          @click="toggleItem(index)"
          :class="{ expanded: expandedItems.includes(index) }"
        >
          <div class="academic-header">
            <div class="academic-icon">
              <img :src="item.icon" :alt="item.institution + ' logo'" />
            </div>
            <div class="academic-info">
              <div class="title-row">
                <h3>{{ item.institution }}</h3>
                <div class="academic-dates">{{ item.dates }}</div>
              </div>
            </div>
            <div class="expand-icon" :class="{ rotated: expandedItems.includes(index) }">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <Transition name="accordion">
            <div class="academic-details" v-if="expandedItems.includes(index)">
              <div class="academic-details-content">
                <div class="degree-info">
                  <h4>{{ item.degree }}</h4>
                  <p v-if="item.field">{{ item.field }}</p>
                </div>
                <div class="description">
                  <p>{{ item.description }}</p>
                </div>
                <div class="achievements" v-if="item.achievements">
                  <h5>Key Courses:</h5>
                  <ul>
                    <li v-for="achievement in item.achievements" :key="achievement">{{ achievement }}</li>
                  </ul>
                </div>
                <div class="conclusion" v-if="item.conclusion">
                  <ul>
                    <li v-for="conclusionItem in item.conclusion" :key="conclusionItem">{{ conclusionItem }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useStaggeredReveal } from '../composables/useStaggeredReveal'
import kreuzgasseIcon from '../assets/kreuzgasse.png'
import fhIcon from '../assets/fhaachen.png'
import matseIcon from '../assets/matse.png'

const expandedItems = ref<number[]>([])

const academicItems = [
    {
    id: 1,
    institution: 'FH Aachen University',
    dates: 'Sep 2023 - Sep 2026',
    degree: 'Bachelor of Science',
    field: 'Angewandte Mathematik und Informatik',
    icon: fhIcon,
    description: 'Dual study program with integrated IHK degree as MATSE in 3 years. Combination of mathematics and computer science. Practice-oriented through close integration into the training company. Numerous electives and critical examination of topics such as data protection, AI and information security.',
    achievements: [
      'Analysis, Stochastics, Linear Algebra',
      'Numerics, Algorithms & Data Structures',
      'Java, C++, Cobol',
    ],
    conclusion: [
      'Final grade: TBD'
    ]
  },
  {
    id: 2,
    institution: 'Matse Ausbildung',
    dates: 'Sep 2023 - Sep 2026',
    degree: 'IHK degree as MATSE (Mathematisch-technische/r Softwareentwicklerin und –entwickler)',
    field: 'Vocational Training as a mathematical-technical software developer',
    icon: matseIcon,
    description: 'In-service training at Barmenia-Gothaer Insurance, parallel and integrated into the study program at FH-Aachen',
    achievements: [
      'Android App Development Project',
      'Software Project Management: Development+Presentation at trade fair'
    ],
    conclusion: []
  },
  
  {
    id: 3,
    institution: 'Gymnasium Kreuzgasse',
    dates: 'Aug 2016 - Aug 2023',
    degree: 'Abitur Nordrhein-Westfalen',
    field: '',
    icon: kreuzgasseIcon,
    description: 'at Gymnasium Kreuzgasse in a bilingual class with a focus on French',
    achievements: [
      'Mathematics',
      'German',
      'Computer Science',
      'Social sciences'
    ],
    conclusion: [
      'Final grade: 1.2'
    ]
  }
]

const toggleItem = (index: number) => {
  const itemIndex = expandedItems.value.indexOf(index)
  if (itemIndex > -1) {
    // Close the clicked item
    expandedItems.value.splice(itemIndex, 1)
  } else {
    // Close all other items and open the clicked one simultaneously
    expandedItems.value = [index]
  }
}

// Scroll reveal animations
const { element: headerElement, style: headerStyle } = useScrollReveal({
  translateY: '50px',
  duration: '0.8s'
})

const { 
  getItemStyle, 
  setItemRef 
} = useStaggeredReveal(academicItems.length, 150)
</script>

<style scoped>
.academic {
  padding: 100px 0;
  background-color: var(--bg-primary);
  position: relative;
  overflow: hidden;
}

.academic-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-header {
  text-align: center;
  margin-bottom: 80px;
}

.section-header h2 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 20px;
  background: linear-gradient(
    -45deg,
    var(--accent-primary),
    var(--accent-secondary),
    var(--accent-tertiary),
    var(--accent-primary),
    var(--accent-secondary)
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 15s ease-in-out infinite;
}

.section-header p {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.academic-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;
}

.academic-item {
  background: var(--bg-secondary);
  border-radius: 20px;
  padding: 20px 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.academic-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at top left, rgba(var(--accent-primary-rgb), 0.25) 0%, transparent 50%),
    radial-gradient(ellipse at top right, rgba(var(--accent-secondary-rgb), 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at bottom left, rgba(var(--accent-secondary-rgb), 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, rgba(var(--accent-primary-rgb), 0.2) 0%, transparent 50%),
    linear-gradient(135deg, 
      rgba(var(--accent-primary-rgb), 0.08) 0%, 
      rgba(var(--accent-secondary-rgb), 0.12) 25%,
      rgba(var(--accent-primary-rgb), 0.06) 50%,
      rgba(var(--accent-secondary-rgb), 0.1) 75%,
      rgba(var(--accent-primary-rgb), 0.08) 100%
    );
  opacity: 0.1;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}

.academic-item:hover::before {
  opacity: 1;
}

.academic-item:hover {
  transform: translateY(-2px);
}

.academic-header {
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 1;
}

.academic-icon {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  position: relative;
  z-index: 2;

}

.academic-icon img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  position: relative;
  z-index: 3;
  border-radius: 5px;
  background-color: white
}

.academic-info {
  flex: 1;
  position: relative;
  z-index: 2;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.academic-info h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  position: relative;
  z-index: 2;
}

.academic-dates {
  color: var(--text-accent);
  font-size: 0.95rem;
  font-weight: 600;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.expand-icon {
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 2;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 3px;
}

.expand-icon.rotated {
  transform: rotate(180deg);
  color: var(--accent-primary);
}

.academic-details {
  overflow: hidden;
  margin-top: 10px;
  border-top: 1px solid var(--border-color);
  position: relative;
  z-index: 2;
}

.academic-details-content {
  padding-top: 20px;
}

/* Smooth Accordion Animation */
.accordion-enter-active {
  transition: all 0.7s cubic-bezier(0.1, 0, 0.3, 1);
}

.accordion-leave-active {
  transition: all 0.4s cubic-bezier(0.1, 0, 0.3, 1);
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to {
  max-height: 600px;
  opacity: 1;
}

.accordion-leave-from {
  max-height: 600px;
  opacity: 1;
}

.degree-info h4 {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 5px;
  margin-top: 0;
}

.degree-info p {
  color: var(--accent-primary);
  font-weight: 500;
  margin-bottom: 15px;
}

.description p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.achievements h5 {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 0;
}

.achievements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.achievements li {
  color: var(--text-secondary);
  padding: 5px 0;
  padding-left: 20px;
  list-style-type: disc;
  margin-left: 20px;
}

.achievements li::before {
  display: none;
}

.conclusion ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
  margin-bottom: 0;
}

.conclusion li {
  color: var(--text-secondary);
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
}

.conclusion li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
}

@keyframes gradientShift {
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

/* Responsive Design */
@media (max-width: 768px) {
  .academic {
    padding: 80px 0;
  }
  
  .academic-container {
    padding: 0 15px;
  }
  
  .section-header {
    margin-bottom: 60px;
  }
  
  .academic-item {
    padding: 16px 20px;
  }
  
  /* Mobile-specific background behavior */
  .academic-item::before {
    opacity: 0;
  }
  
  .academic-item.expanded::before {
    opacity: 1;
  }
  
  .academic-item:hover::before {
    opacity: 0;
  }
  
  .academic-header {
    gap: 12px;
  }
  
  .academic-icon {
    width: 44px;
    height: 44px;
  }
  
  .academic-icon img {
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }
  
  .academic-info h3 {
    font-size: 1.1rem;
  }
  
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .academic-dates {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .academic-header {
    gap: 10px;
  }
  
  .title-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  
  .expand-icon {
    margin-left: auto;
    width: 20px;
    height: 20px;
  }
}
</style>
