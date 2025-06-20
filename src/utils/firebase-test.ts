import { auth, db } from '../lib/firebase';

export const testFirebaseConnection = async () => {
  console.log('🔥 Testing Firebase Connection...');
  
  try {
    // Test Auth connection
    if (auth) {
      console.log('✅ Firebase Auth initialized successfully');
      console.log('Auth instance:', auth.app.name);
    } else {
      console.error('❌ Firebase Auth not initialized');
      return false;
    }

    // Test Firestore connection
    if (db) {
      console.log('✅ Firebase Firestore initialized successfully');
      console.log('Firestore instance:', db.app.name);
    } else {
      console.error('❌ Firebase Firestore not initialized');
      return false;
    }

    // Test environment variables
    const config = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    };

    if (!config.apiKey || !config.authDomain || !config.projectId) {
      console.error('❌ Missing Firebase environment variables');
      console.log('Current config:', config);
      return false;
    }

    console.log('✅ Firebase environment variables loaded');
    console.log('Project ID:', config.projectId);
    
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    return false;
  }
};

// Performance monitoring
export const measureAuthPerformance = (operation: string) => {
  const start = performance.now();
  
  return {
    end: () => {
      const duration = performance.now() - start;
      console.log(`⏱️ ${operation} took ${duration.toFixed(2)}ms`);
      
      if (duration > 5000) {
        console.warn(`⚠️ Slow operation detected: ${operation} took ${duration.toFixed(2)}ms`);
      }
      
      return duration;
    }
  };
};

