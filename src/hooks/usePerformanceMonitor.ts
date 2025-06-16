import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  tti: number | null; // Time to Interactive
  fcp: number | null; // First Contentful Paint
  lcp: number | null; // Largest Contentful Paint
}

export const usePerformanceMonitor = (): PerformanceMetrics => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    tti: null,
    fcp: null,
    lcp: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) return;

    // First Contentful Paint
    const processFCP = (entries: PerformanceObserverEntryList): void => {
      const [entry] = entries.getEntries();
      if (entry) {
        setMetrics((prev) => ({ ...prev, fcp: entry.startTime }));
      }
    };

    // Largest Contentful Paint
    const processLCP = (entries: PerformanceObserverEntryList): void => {
      const [entry] = entries.getEntries();
      if (entry) {
        setMetrics((prev) => ({ ...prev, lcp: entry.startTime }));
      }
    };

    // Time to Interactive approximation using First Input Delay
    const processTTI = (): void => {
      if (performance.timing && performance.timing.domInteractive) {
        const tti = performance.timing.domInteractive - performance.timing.navigationStart;
        setMetrics((prev) => ({ ...prev, tti }));
      }
    };

    // Register observers if supported
    if ('PerformanceObserver' in window) {
      try {
        // FCP observer
        const fcpObserver = new PerformanceObserver(processFCP);
        fcpObserver.observe({ type: 'paint', buffered: true });

        // LCP observer
        const lcpObserver = new PerformanceObserver(processLCP);
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Cleanup function
        return () => {
          fcpObserver.disconnect();
          lcpObserver.disconnect();
        };
      } catch (e) {
        console.error('Performance observer error:', e);
      }
    }

    // Fallback for TTI using the old performance timing API
    if ('performance' in window && 'timing' in performance) {
      window.addEventListener('load', processTTI);
      return () => window.removeEventListener('load', processTTI);
    }
  }, []);

  return metrics;
}; 