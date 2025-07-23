<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Your Portfolio</h3>
          <p>Creating amazing digital experiences with modern web technologies.</p>
        </div>
        
        <div class="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><FooterButton target-section="hero" @navigate="scrollTo">Home</FooterButton></li>
            <li><FooterButton target-section="about" @navigate="scrollTo">About</FooterButton></li>
            <li><FooterButton target-section="services" @navigate="scrollTo">Services</FooterButton></li>
            <li><FooterButton target-section="portfolio" @navigate="scrollTo">Portfolio</FooterButton></li>
            <li><FooterButton target-section="contact" @navigate="scrollTo">Contact</FooterButton></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4>Connect</h4>
          <div class="social-links">
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">GitHub</a>
            <a href="#" class="social-link">Twitter</a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 Your Portfolio. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterButton from '../components/FooterButton.vue'

const scrollTo = (elementId: string) => {
  const element = document.getElementById(elementId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 3rem 2rem 1rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.footer-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.footer-section p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: var(--button-bg);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  padding: 0.5rem 1rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  transition: all 0.3s ease;
}

.social-link:hover {
  background-color: var(--button-bg);
  color: var(--button-text) !important;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.footer-bottom p {
  color: var(--text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>
