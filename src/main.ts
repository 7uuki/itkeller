import { createApp } from 'vue'
import './styles/style.css'
import './styles/cursor.css'
import App from './App.vue'

// Prevent scroll restoration on page reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}



// Ensure page starts at top on load
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 0)
})

createApp(App).mount('#app')
