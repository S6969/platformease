import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { FirebaseErrorHandler } from './firebase-error';
import { db } from './firebase';

interface SignUpData {
  email: string;
  password: string;
  username: string;
  role: string;
}

export const signUpWithEmail = async ({ email, password, username, role }: SignUpData) => {
  try {
    console.log('🚀 Starting account creation...');
    
    // Ultra-fast timeout for immediate feedback
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Operation timed out after 10 seconds')), 10000)
    );
    
    // Ensure Firebase is ready (should be pre-warmed)
    const preloader = await import('./firebase-preloader');
    if (!preloader.default.isReady()) {
      console.warn('Firebase not pre-warmed, initializing now...');
      await preloader.default.preload();
    }
    
    // Create user with email and password (with optimized settings)
    const userCredential = await Promise.race([
      createUserWithEmailAndPassword(auth, email, password),
      timeoutPromise
    ]);
    
    const user = userCredential.user;
    console.log('✅ User created successfully');

    // Update profile with username
    await updateProfile(user, {
      displayName: username
    });

    // Create user document in Firestore
    await createUserDocument(user, { username, role });

    return { user, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { user: null, error: FirebaseErrorHandler.handleError(error) };
  }
};

export const signInWithGoogle = async (role: string) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Create/update user document in Firestore
    await createUserDocument(user, { 
      username: user.displayName || user.email?.split('@')[0] || 'user',
      role 
    });

    return { user, error: null };
  } catch (error) {
    console.error('Google sign-in error:', error);
    return { user: null, error: FirebaseErrorHandler.handleError(error) };
  }
};

const createUserDocument = async (user: User, additionalData: { username: string; role: string }) => {
  if (!user) return;

  const userRef = doc(db, 'users', user.uid);
  const userData = {
    email: user.email,
    username: additionalData.username,
    role: additionalData.role,
    createdAt: new Date(),
    lastLogin: new Date(),
    photoURL: user.photoURL || null,
  };

  try {
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error creating user document:', error);
    throw error;
  }
}; 