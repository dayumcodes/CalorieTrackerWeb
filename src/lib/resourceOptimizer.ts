/**
 * Resource optimization utilities
 */

/**
 * Preload critical fonts to improve CLS (Cumulative Layout Shift)
 * @param fontUrls List of critical font URLs to preload
 */
export function preloadCriticalFonts(fontUrls: string[]): void {
  if (typeof document === 'undefined') return;
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2'; // Adjust based on your font type
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Defer non-critical CSS loading
 * @param stylesheetUrl URL of the stylesheet to load asynchronously
 */
export function loadCssAsync(stylesheetUrl: string): void {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = stylesheetUrl;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
}

/**
 * Prefetch resources that will be needed soon
 * @param urls List of URLs to prefetch
 * @param type The type of resource, defaults to 'fetch'
 */
export function prefetchResources(
  urls: string[], 
  type: 'fetch' | 'dns-prefetch' | 'preconnect' = 'fetch'
): void {
  if (typeof document === 'undefined') return;
  
  urls.forEach(url => {
    const link = document.createElement('link');
    
    switch (type) {
      case 'fetch':
        link.rel = 'prefetch';
        break;
      case 'dns-prefetch':
        link.rel = 'dns-prefetch';
        break;
      case 'preconnect':
        link.rel = 'preconnect';
        link.crossOrigin = 'anonymous';
        break;
    }
    
    link.href = url;
    document.head.appendChild(link);
  });
}

/**
 * Initialize resource optimization
 */
export function initResourceOptimization(): void {
  // Apply prefetching for common domains
  prefetchResources(['https://fonts.googleapis.com', 'https://fonts.gstatic.com'], 'preconnect');
  
  // Setup script loading priorities
  document.querySelectorAll('script[data-priority="low"]').forEach((script) => {
    (script as HTMLScriptElement).setAttribute('async', 'true');
    (script as HTMLScriptElement).setAttribute('defer', 'true');
  });
} 