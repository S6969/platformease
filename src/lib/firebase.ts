// Import only the functions you need from the SDKs
import { initializeApp, type FirebaseOptions, getApps } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { FirebaseErrorHandler, RateLimiter } from "./firebase-error";
import { firebaseConfig, validateFirebaseConfig } from "./firebase-config";

// Firebase configuration is imported from firebase-config.ts

class FirebaseService {
  private static instance: FirebaseService;
  private app;
  private analytics: any = null;
  private auth: Auth | null = null;
  private db;

  private constructor() {
    // Validate configuration before initialization
    validateFirebaseConfig(firebaseConfig);
    
    // Initialize Firebase only if it hasn't been initialized
    if (getApps().length === 0) {
      this.app = initializeApp(firebaseConfig);
      
      // Analytics will be loaded lazily when needed
      this.analytics = null;

      // Initialize Auth
      try {
        this.auth = getAuth(this.app);
      } catch (error) {
        console.error('Auth initialization failed:', FirebaseErrorHandler.handleError(error));
        throw error;
      }

      // Initialize Firestore
      try {
        this.db = getFirestore(this.app);
      } catch (error) {
        console.error('Firestore initialization failed:', FirebaseErrorHandler.handleError(error));
        throw error;
      }
    } else {
      this.app = getApps()[0];
      this.auth = getAuth();
      this.db = getFirestore();
    }
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  public getApp() {
    return this.app;
  }

  public getAnalytics() {
    return this.analytics;
  }

  public getAuth() {
    return this.auth;
  }

  public getDb() {
    return this.db;
  }

  // Example of a rate-limited operation
  public async signIn(email: string, password: string) {
    if (!this.auth) {
      throw new Error('Auth is not initialized');
    }

    const operationKey = `signin_${email}`;
    if (!RateLimiter.checkRateLimit(operationKey)) {
      throw new Error('Too many sign-in attempts. Please try again later.');
    }

    try {
      // Your sign-in logic here using this.auth
      // const result = await signInWithEmailAndPassword(this.auth, email, password);
      // return result;
    } catch (error) {
      throw new Error(FirebaseErrorHandler.handleError(error));
    }
  }
}

// Export a singleton instance
export const firebaseService = FirebaseService.getInstance();

// Export convenience getters
export const app = firebaseService.getApp();
export const analytics = firebaseService.getAnalytics();
export const auth = firebaseService.getAuth();
export const db = firebaseService.getDb();

// Export any other Firebase services you want to use
// For example:
// export const firestore = getFirestore(app); 