import { createContext, useContext, useCallback, ReactNode, useState, useMemo } from 'react';

interface CacheItem<T> {
  data: T;
  expiry: number;
}

interface CacheContextType {
  get: <T>(key: string) => T | null;
  set: <T>(key: string, value: T, ttlSeconds?: number) => void;
  invalidate: (key: string) => void;
  clear: () => void;
}

const CacheContext = createContext<CacheContextType | null>(null);

interface CacheProviderProps {
  children: ReactNode;
  defaultTtl?: number;
}

export const CacheProvider = ({ 
  children, 
  defaultTtl = 300 // 5 minutes default TTL
}: CacheProviderProps) => {
  const [cache, setCache] = useState<Record<string, CacheItem<unknown>>>({});
  
  // Get a value from cache
  const get = useCallback(<T,>(key: string): T | null => {
    const item = cache[key] as CacheItem<T> | undefined;
    
    if (!item) return null;
    
    // Check if item is expired
    if (item.expiry < Date.now()) {
      // Remove expired item
      invalidate(key);
      return null;
    }
    
    return item.data;
  }, [cache]);
  
  // Set a value in cache with optional TTL
  const set = useCallback(<T,>(key: string, value: T, ttlSeconds = defaultTtl): void => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data: value,
        expiry: Date.now() + (ttlSeconds * 1000),
      },
    }));
  }, [defaultTtl]);
  
  // Invalidate a specific key
  const invalidate = useCallback((key: string): void => {
    setCache(prev => {
      const newCache = { ...prev };
      delete newCache[key];
      return newCache;
    });
  }, []);
  
  // Clear the entire cache
  const clear = useCallback((): void => {
    setCache({});
  }, []);
  
  // Create context value with memoization
  const contextValue = useMemo(() => ({
    get,
    set,
    invalidate,
    clear,
  }), [get, set, invalidate, clear]);
  
  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
};

// Custom hook to use the cache
export const useCache = (): CacheContextType => {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
}; 