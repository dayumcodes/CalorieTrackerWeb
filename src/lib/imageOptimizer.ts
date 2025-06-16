/**
 * Utility to handle image optimization
 */

/**
 * Generate a srcset attribute with different image sizes
 */
export function generateSrcSet(
  baseUrl: string,
  widths: number[],
  format: 'webp' | 'jpg' | 'jpeg' | 'png' | 'avif' = 'webp'
): string {
  return widths
    .map((width) => {
      // Check if baseUrl already has query parameters
      const separator = baseUrl.includes('?') ? '&' : '?';
      return `${baseUrl}${separator}width=${width}&format=${format} ${width}w`;
    })
    .join(', ');
}

/**
 * Create responsive sizes attribute
 */
export function generateSizes(sizesConfig: string[]): string {
  return sizesConfig.join(', ');
}

/**
 * Get image dimensions to prevent layout shifts
 */
export function getImageDimensions(
  url: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
    };
    img.onerror = reject;
    img.src = url;
  });
}

/**
 * Lazy load images by using IntersectionObserver
 */
export function setupLazyLoading(): void {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          if (lazyImage.dataset.src) {
            lazyImage.src = lazyImage.dataset.src;
          }
          if (lazyImage.dataset.srcset) {
            lazyImage.srcset = lazyImage.dataset.srcset;
          }
          observer.unobserve(lazyImage);
        }
      });
    },
    {
      rootMargin: '200px', // Start loading when image is 200px from viewport
    }
  );

  // Target all images with data-src attribute
  document.querySelectorAll('img[data-src]').forEach((img) => {
    observer.observe(img);
  });
} 