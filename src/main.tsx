import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import { initResourceOptimization } from './lib/resourceOptimizer'
import { setupLazyLoading } from './lib/imageOptimizer'

// Enable React concurrent features
const root = createRoot(document.getElementById("root")!)

// Initialize resource optimization
if (typeof window !== 'undefined') {
  // Apply optimizations after initial render
  window.addEventListener('load', () => {
    // Setup lazy loading for images
    setupLazyLoading()
    
    // Initialize resource optimizations
    initResourceOptimization()
    
    // Register service worker if in production
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').catch(error => {
          console.error('SW registration failed:', error)
        })
      })
    }
  })
}

// Render the app with StrictMode in development for extra checks
root.render(
  import.meta.env.DEV ? (
    <StrictMode>
      <App />
    </StrictMode>
  ) : (
    <App />
  )
)
