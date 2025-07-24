<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-left">
          <p>&copy; 2025 ITKeller</p>
        </div>
        
        <div class="footer-center">
          <FooterButton target-route="/impressum">{{ t.nav.impressum }}</FooterButton>
          <span class="separator">-</span>
          <FooterButton target-route="/datenschutz">{{ t.nav.datenschutz }}</FooterButton>
        </div>
        
        <div class="footer-right">
          <div class="social-links">
            <a href="https://www.linkedin.com/in/lukas-keller-52867b258" class="social-link" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span class="social-text">LinkedIn</span>
            </a>
            <a href="https://github.com/7uuki" class="social-link" target="_blank" rel="noopener noreferrer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--text-secondary)">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="social-text">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import FooterButton from '../components/FooterButton.vue'
import { useLanguage } from '../composables/useLanguage'

const { t } = useLanguage()
</script>

<style scoped>
.footer {
  background-color: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding: 1rem 2rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 40px;
  position: relative;
}

.footer-left h3 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.2rem;
}

.footer-left p {
  color: var(--text-secondary);
  margin: 0;
  font-size: 0.9rem;
}

.footer-center {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.separator {
  color: var(--text-secondary);
  font-weight: 300;
}

.footer-right {
  display: flex;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  transition: all 0.3s ease;
  color: var(--text-secondary);
  text-decoration: none;
}

.social-link:hover {
  background-color: var(--button-bg);
  color: var(--button-text) !important;
}

.social-link:hover svg {
  fill: var(--button-text) !important;
}

@media (max-width: 1024px) {
  .social-text {
    display: none;
  }
  
  .social-link {
    padding: 0.25rem;
    width: 32px;
    height: 32px;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    position: static;
  }
  
  .footer-center {
    order: 2;
    position: static;
    transform: none;
    left: auto;
  }
  
  .footer-right {
    order: 3;
  }
}
</style>
