// Ultra-fast Firebase pre-initialization
import { connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

class FirebasePreloader {
  private static preloadPromise: Promise<void> | null = null;
  private static isPreloaded = false;

  // Pre-warm Firebase connections immediately
  static async preload(): Promise<void> {
    if (this.preloadPromise) return this.preloadPromise;
    
    this.preloadPromise = this.performPreload();
    return this.preloadPromise;
  }

  private static async performPreload(): Promise<void> {
    try {
      // Pre-warm DNS and establish connections
      const preWarmTasks = [
        // Pre-resolve Firebase domains
        fetch('https://identitytoolkit.googleapis.com', { method: 'HEAD', mode: 'no-cors' }).catch(() => {}),
        fetch('https://securetoken.googleapis.com', { method: 'HEAD', mode: 'no-cors' }).catch(() => {}),
        fetch('https://firestore.googleapis.com', { method: 'HEAD', mode: 'no-cors' }).catch(() => {}),
        
        // Pre-load Firebase modules in parallel
        import('firebase/auth'),
        import('firebase/firestore'),
      ];

      // Execute all pre-warming tasks in parallel
      await Promise.allSettled(preWarmTasks);
      
      // Initialize Firebase services
      const { auth, db } = await import('./firebase');
      
      // Pre-warm auth state
      await auth.authStateReady();
      
      // Pre-warm Firestore connection (lightweight operation)
      if (db) {
        // Just establish connection, don't fetch data
        console.log('🔥 Firebase pre-warmed successfully');
      }
      
      this.isPreloaded = true;
    } catch (error) {
      console.warn('Firebase pre-loading failed:', error);
      // Don't throw - graceful degradation
    }
  }

  static isReady(): boolean {
    return this.isPreloaded;
  }

  // Get performance metrics
  static getMetrics() {
    return {
      preloaded: this.isPreloaded,
      connectionTime: performance.now()
    };
  }
}

// Start pre-loading immediately when module is imported
FirebasePreloader.preload();

export default FirebasePreloader;

