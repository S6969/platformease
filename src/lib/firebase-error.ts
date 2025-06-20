import { FirebaseError } from 'firebase/app';

export class FirebaseErrorHandler {
  static handleError(error: unknown): string {
    if (error instanceof FirebaseError) {
      // Handle specific Firebase error codes
      switch (error.code) {
        case 'auth/invalid-email':
          return 'Invalid email address format.';
        case 'auth/user-disabled':
          return 'This account has been disabled.';
        case 'auth/user-not-found':
          return 'No account found with this email.';
        case 'auth/wrong-password':
          return 'Incorrect password.';
        case 'auth/email-already-in-use':
          return 'An account already exists with this email.';
        case 'auth/weak-password':
          return 'Password should be at least 6 characters.';
        case 'auth/operation-not-allowed':
          return 'Operation not allowed.';
        case 'auth/too-many-requests':
          return 'Too many attempts. Please try again later.';
        default:
          console.error('Firebase Error:', error);
          return 'An error occurred. Please try again.';
      }
    }
    
    // Handle non-Firebase errors
    console.error('Non-Firebase Error:', error);
    return 'An unexpected error occurred.';
  }

  static isFirebaseError(error: unknown): error is FirebaseError {
    return error instanceof FirebaseError;
  }
}

// Rate limiting utility
export class RateLimiter {
  private static attempts = new Map<string, number[]>();
  private static MAX_ATTEMPTS = 5;
  private static TIME_WINDOW = 60000; // 1 minute in milliseconds

  static checkRateLimit(operationKey: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(operationKey) || [];

    // Remove attempts outside the time window
    const recentAttempts = attempts.filter(
      timestamp => now - timestamp < this.TIME_WINDOW
    );

    if (recentAttempts.length >= this.MAX_ATTEMPTS) {
      return false; // Rate limit exceeded
    }

    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(operationKey, recentAttempts);
    return true;
  }

  static resetAttempts(operationKey: string): void {
    this.attempts.delete(operationKey);
  }
} 