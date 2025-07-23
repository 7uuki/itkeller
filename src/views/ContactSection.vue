<template>
  <section id="contact" class="contact-section">
    <div class="container">
      
      <h2 
        :ref="titleReveal.element" 
        :style="titleReveal.style.value"
        class="contact-title"
      >
        Contact me
      </h2>
      
      <p 
        :ref="descriptionReveal.element"
        :style="descriptionReveal.style.value" 
        class="contact-description"
      >
        We offer tailored design solutions to meet your unique needs. Whether it's UX/UI design, branding, or 
        website development, we're here to bring your ideas to life.
      </p>
      
      <form 
        :ref="formReveal.element"
        :style="formReveal.style.value"
        class="contact-form" 
        @submit.prevent="handleSubmit"
      >
        <div class="form-row">
          <div class="form-group">
            <input 
              type="text" 
              id="fullName" 
              v-model="form.fullName"
              placeholder="Full name"
              required
            />
          </div>
          <div class="form-group">
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              placeholder="Email address"
              required
            />
          </div>
        </div>
        
        <div class="form-group message-group">
          <textarea 
            id="message" 
            v-model="form.message"
            placeholder="Write a message"
            rows="8"
            required
          ></textarea>
        </div>
        
        <button type="submit" class="book-call-btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <!-- Success Animation Overlay -->
      <div v-if="showSuccessAnimation" class="success-overlay" @click="closeSuccessAnimation">
        <div class="success-modal">
          <Vue3Lottie 
            v-if="emailSuccessAnimation"
            :animation-data="emailSuccessAnimation"
            :height="200"
            :width="200"
            :loop="false"
            @complete="onAnimationComplete"
          />
          <div v-else class="loading-placeholder">
            <div class="spinner"></div>
          </div>
          <h3 class="success-title">Email Sent Successfully!</h3>
          <p class="success-message">Thank you for your message! We'll get back to you soon.</p>
          <button class="close-btn" @click="closeSuccessAnimation">Close</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { Vue3Lottie } from 'vue3-lottie'

const form = ref({
  fullName: '',
  email: '',
  message: ''
})

const showSuccessAnimation = ref(false)
const isSubmitting = ref(false)
const emailSuccessAnimation = ref(null)

// Load the Lottie animation
onMounted(async () => {
  try {
    console.log('Loading Lottie animation...')
    const response = await fetch('/Emailsuccessfullysent.lottie')
    console.log('Response status:', response.status)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const animationData = await response.json()
    console.log('Animation data loaded:', animationData)
    emailSuccessAnimation.value = animationData
  } catch (error) {
    console.error('Failed to load Lottie animation:', error)
  }
})

// Scroll reveal animations
const titleReveal = useScrollReveal({
  translateY: '50px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 100
})

const descriptionReveal = useScrollReveal({
  translateY: '40px',
  opacity: { from: 0, to: 1 },
  duration: '0.8s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 200
})

const formReveal = useScrollReveal({
  translateY: '50px',
  opacity: { from: 0, to: 1 },
  duration: '0.9s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 300
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Handle form submission here
  console.log('Form submitted:', form.value)
  
  // You can add your form submission logic here
  // For example, send to an API endpoint
  
  // Reset form after submission
  form.value = {
    fullName: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
  console.log('Showing success animation...')
  showSuccessAnimation.value = true
}

const closeSuccessAnimation = () => {
  showSuccessAnimation.value = false
}

const onAnimationComplete = () => {
  // Animation completed, you can add additional logic here if needed
  console.log('Animation completed')
}
</script>

<style scoped>
.contact-section {
  padding: 80px 0;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
}

.contact-icon {
  margin-bottom: 32px;
}

.mail-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.mail-icon:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

.contact-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--text-primary);
}

.contact-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 48px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.contact-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  width: 100%;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
  resize: none;
  box-sizing: border-box;
}

.form-group textarea {
  min-height: 140px;
  overflow-y: auto;
}

/* Custom scrollbar for textarea */
.form-group textarea::-webkit-scrollbar {
  width: 6px;
}

.form-group textarea::-webkit-scrollbar-track {
  background: transparent;
}

.form-group textarea::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.form-group textarea::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* Remove ALL scrollbar buttons and arrows */
.form-group textarea::-webkit-scrollbar-button {
  width: 0;
  height: 0;
  display: none;
}

.form-group textarea::-webkit-scrollbar-button:start:decrement,
.form-group textarea::-webkit-scrollbar-button:end:increment {
  width: 0;
  height: 0;
  display: none;
}

.form-group textarea::-webkit-scrollbar-corner {
  background: transparent;
  display: none;
}

/* Firefox scrollbar */
.form-group textarea {
  scrollbar-width: thin;
  scrollbar-color: var(--border-color) transparent;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: var(--text-secondary);
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 3px rgba(var(--accent-primary-rgb), 0.1);
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 6px;
  text-align: left;
  padding-left: 4px;
}

.form-group.message-group {
  margin-bottom: 24px;
}

.form-group.message-group textarea {
  margin-bottom: 0;
}

.book-call-btn {
  width: 100%;
  max-width: 100%;
  padding: 16px 32px;
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

.book-call-btn:hover {
  background: var(--button-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px var(--shadow);
}

.book-call-btn:active {
  transform: translateY(0);
}

.book-call-btn:disabled {
  background: var(--border-color);
  color: var(--text-secondary);
  cursor: not-allowed;
  transform: none;
}

.book-call-btn:disabled:hover {
  background: var(--border-color);
  transform: none;
  box-shadow: none;
}

/* Success Animation Overlay */
.success-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.success-modal {
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
}

.success-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 20px 0 10px 0;
}

.success-message {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 30px;
}

.close-btn {
  background: var(--button-bg);
  color: var(--button-text);
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: var(--button-hover);
  transform: translateY(-2px);
}

.loading-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
  margin: 0 auto;
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

/* Mobile responsiveness */
@media (max-width: 768px) {
  .contact-section {
    padding: 60px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .contact-title {
    font-size: 2rem;
  }
  
  .contact-description {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  
  .form-row {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-bottom: 12px;
  }
  
  .form-group input,
  .form-group textarea {
    padding: 14px 16px;
  }
  
  .form-group textarea {
    margin-bottom: 20px;
  }
  
  .book-call-btn {
    padding: 14px 28px;
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .contact-title {
    font-size: 1.75rem;
  }
  
  .mail-icon {
    width: 56px;
    height: 56px;
  }
  
  .mail-icon svg {
    width: 28px;
    height: 28px;
  }
}
</style>
