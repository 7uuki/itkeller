<template>
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
          :placeholder="t.contact.form.namePlaceholder"
          required
        />
      </div>
      <div class="form-group">
        <input 
          type="email" 
          id="email" 
          v-model="form.email"
          :placeholder="t.contact.form.emailPlaceholder"
          required
        />
      </div>
    </div>
    
    <div class="form-group message-group">
      <textarea 
        id="message" 
        v-model="form.message"
        :placeholder="t.contact.form.messagePlaceholder"
        rows="8"
        required
      ></textarea>
    </div>
    
    <button type="submit" class="book-call-btn" :disabled="isSubmitting">
      {{ isSubmitting ? t.contact.form.sending : t.contact.form.send }}
    </button>
  </form>

  <!-- Success Animation Overlay -->
  <div v-if="showSuccessAnimation" class="success-overlay" @click="closeSuccessAnimation">
    <div class="success-modal">
      <LottieAnimation 
        :animation-path="'https://lottie.host/c2fb13b4-1140-4d1a-9528-a5e40f2ca2d3/FoiIzdx292.lottie'"
        :height="200"
        :width="200"
        :loop="false"
        :should-play="showSuccessAnimation"
        :preload="true"
        @complete="onAnimationComplete"
      />
      <h3 class="success-title">{{ t.contact.form.success }}</h3>
      <p class="success-message">{{ t.contact.form.successMessage }}</p>
      <button class="close-btn" @click="closeSuccessAnimation">{{ t.contact.form.close }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import { useLanguage } from '../composables/useLanguage'
import LottieAnimation from './LottieAnimation.vue'

const { t } = useLanguage()

const form = ref({
  fullName: '',
  email: '',
  message: ''
})

const showSuccessAnimation = ref(false)
const isSubmitting = ref(false)

// Scroll reveal animations
const formReveal = useScrollReveal({
  translateY: '50px',
  opacity: { from: 0, to: 1 },
  duration: '0.9s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  delay: 0
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
  showSuccessAnimation.value = true
}

const closeSuccessAnimation = () => {
  showSuccessAnimation.value = false
}

const onAnimationComplete = () => {
  // Animation completed - could auto-close after a delay if desired
  // setTimeout(() => closeSuccessAnimation(), 2000)
}

</script>

<style scoped>
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
  border: 2px solid #4a4a4a;
  border-radius: 12px;
  background: #2d2d2d;
  color: #e5e5e5;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  resize: none;
  box-sizing: border-box;
  position: relative;
}

.form-group input:hover,
.form-group textarea:hover {
  border-color: var(--accent-secondary);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(var(--accent-primary-rgb), 0.08);
}

/* Enhanced autofill styling */
.form-group input:-webkit-autofill,
.form-group input:-webkit-autofill:hover,
.form-group input:-webkit-autofill:focus,
.form-group input:-webkit-autofill:active,
.form-group textarea:-webkit-autofill,
.form-group textarea:-webkit-autofill:hover,
.form-group textarea:-webkit-autofill:focus,
.form-group textarea:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px#2d2d2d inset !important;
  -webkit-text-fill-color: #e5e5e5 !important;
  border-color: var(--accent-primary) !important;
  caret-color: var(--accent-primary) !important;
  background-color: #2d2d2d !important;
  box-shadow: 
    0 0 0 30px #2d2d2d  inset,
    0 0 0 3px rgba(var(--accent-primary-rgb), 0.15) !important;
}

/* Browser suggestion styling */
.form-group input::-webkit-credentials-auto-fill-button {
  background-color: var(--accent-primary);
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 4px;
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
  color: #e5e5e5;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.form-group input:focus::placeholder,
.form-group textarea:focus::placeholder {
  opacity: 0.4;
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
  transform: translateY(-3px);
  box-shadow: 
    0 12px 35px rgba(var(--accent-primary-rgb), 0.2),
    0 0 25px rgba(var(--accent-primary-rgb), 0.15);
  filter: brightness(1.05);
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

/* Mobile responsiveness */
@media (max-width: 768px) {
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
</style>
