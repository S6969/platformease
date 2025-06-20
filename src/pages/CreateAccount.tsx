import React, { 
  useState, 
  useEffect, 
  useCallback, 
  useRef, 
  useMemo, 
  useReducer, 
  Suspense, 
  lazy, 
  memo, 
  useTransition 
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { testFirebaseConnection, measureAuthPerformance } from '@/utils/firebase-test';

// Lazy load components
const Header = lazy(() => import('../components/Header'));
const Footer = lazy(() => import('../components/Footer'));

// Performance monitoring hook
const usePerformanceMonitor = (operationName: string) => {
  const perfRef = useRef({
    startTime: 0,
    markName: `${operationName}_start`,
    measureName: `${operationName}_measure`
  });
  
  const start = useCallback(() => {
    if (typeof performance !== 'undefined') {
      perfRef.current.startTime = performance.now();
      performance.mark(perfRef.current.markName);
    }
  }, []);
  
  const end = useCallback(() => {
    if (typeof performance !== 'undefined' && perfRef.current.startTime > 0) {
      const endTime = performance.now();
      performance.measure(
        perfRef.current.measureName,
        perfRef.current.markName
      );
      console.debug(`${operationName} took ${endTime - perfRef.current.startTime}ms`);
      perfRef.current.startTime = 0;
    }
  }, [operationName]);
  
  return { start, end };
};

// Define validation error types for type safety
interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  username?: string;
}

// Define form data types for type safety
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

// Define loading states for different operations
interface LoadingState {
  emailSignUp: boolean;
  googleSignUp: boolean;
  validation: {
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    username: boolean;
  };
  firebaseConnection: boolean;
}

// Action types for form reducer
type FormAction = 
  | { type: 'SET_FIELD'; field: keyof FormData; value: string }
  | { type: 'RESET_FORM' }
  | { type: 'SET_FORM'; data: FormData };

// Action types for validation reducer
type ValidationAction =
  | { type: 'SET_ERROR'; field: keyof ValidationErrors; error: string }
  | { type: 'CLEAR_ERROR'; field: keyof ValidationErrors }
  | { type: 'RESET_ERRORS' };

// Action types for loading state reducer
type LoadingAction =
  | { type: 'SET_LOADING'; operation: keyof LoadingState; value: boolean }
  | { type: 'SET_VALIDATION_LOADING'; field: keyof LoadingState['validation']; value: boolean }
  | { type: 'RESET_LOADING' };

// Form reducer function
const formReducer = (state: FormData, action: FormAction): FormData => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return { email: '', password: '', confirmPassword: '', username: '' };
    case 'SET_FORM':
      return { ...action.data };
    default:
      return state;
  }
};

// Validation reducer function
const validationReducer = (state: ValidationErrors, action: ValidationAction): ValidationErrors => {
  switch (action.type) {
    case 'SET_ERROR':
      return { ...state, [action.field]: action.error };
    case 'CLEAR_ERROR': {
      const newState = { ...state };
      delete newState[action.field];
      return newState;
    }
    case 'RESET_ERRORS':
      return {};
    default:
      return state;
  }
};

// Loading state reducer function
const loadingReducer = (state: LoadingState, action: LoadingAction): LoadingState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, [action.operation]: action.value };
    case 'SET_VALIDATION_LOADING':
      return { 
        ...state, 
        validation: { 
          ...state.validation, 
          [action.field]: action.value 
        } 
      };
    case 'RESET_LOADING':
      return {
        emailSignUp: false,
        googleSignUp: false,
        validation: {
          email: false,
          password: false,
          confirmPassword: false,
          username: false
        },
        firebaseConnection: false
      };
    default:
      return state;
  }
};

// Create memoized form field component
const FormField = memo(({ 
  id, 
  name, 
  type, 
  value, 
  onChange, 
  placeholder, 
  label, 
  icon: Icon, 
  error, 
  isLoading, 
  toggleVisibility, 
  showPassword 
}: {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  icon: React.ComponentType<any>;
  error?: string;
  isLoading: boolean;
  toggleVisibility?: () => void;
  showPassword?: boolean;
}) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          id={id}
          name={name}
          type={toggleVisibility ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`pl-10 ${toggleVisibility ? 'pr-10' : ''}`}
          placeholder={placeholder}
          required
          disabled={isLoading}
        />
        {toggleVisibility && (
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
});
FormField.displayName = 'FormField';

// Create memoized role display component
const RoleDisplay = memo(({ role }: { role: string }) => {
  const roleDisplay = role === 'entrepreneur' ? '💡 Entrepreneur' : '🧠 Partner';
  
  return (
    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
      <p className="text-sm text-green-700 dark:text-green-300">
        Selected Role: <strong>{roleDisplay}</strong>
      </p>
      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
        You can change your role anytime from settings
      </p>
    </div>
  );
});
RoleDisplay.displayName = 'RoleDisplay';

// Create memoized form divider component
const FormDivider = memo(() => (
  <div className="text-center mb-6">
    <div className="relative">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-background text-gray-500">OR</span>
      </div>
    </div>
  </div>
));
FormDivider.displayName = 'FormDivider';

// Main component
const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  
  // Use reducers for complex state management
  const [formData, dispatchFormData] = useReducer(formReducer, {
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  
  const [validationErrors, dispatchValidationErrors] = useReducer(validationReducer, {});
  
  const [loadingState, dispatchLoadingState] = useReducer(loadingReducer, {
    emailSignUp: false,
    googleSignUp: false,
    validation: {
      email: false,
      password: false,
      confirmPassword: false,
      username: false
    },
    firebaseConnection: false
  });
  
  // Enhanced validation cache with timestamps for expiration
  const validationCache = useRef(new Map<string, { valid: boolean, timestamp: number }>());
  
  // Queue for batch validation processing
  const validationQueue = useRef<Array<{ field: keyof FormData, value: string }>>([]);
  
  // Performance monitoring
  const formLoadPerf = usePerformanceMonitor('FormLoad');
  const formSubmitPerf = usePerformanceMonitor('FormSubmit');
  const validationPerf = usePerformanceMonitor('Validation');

  // Setup validation batch processing
  useEffect(() => {
    // Process validation queue every 100ms to batch validations
    const intervalId = setInterval(() => {
      if (validationQueue.current.length > 0) {
        validationPerf.start();
        const batch = [...validationQueue.current];
        validationQueue.current = [];
        
        // Process batch of validations
        batch.forEach(({ field, value }) => {
          validateFieldImpl(field, value);
        });
        validationPerf.end();
      }
    }, 100);
    
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
  // Component initialization effect
  useEffect(() => {
    formLoadPerf.start();
    
    // Get the selected role from localStorage
    const role = localStorage.getItem('user-role');
    if (!role) {
      // If no role selected, redirect back to role selection
      navigate('/role-selection');
      return;
    }
    setSelectedRole(role);
    
    // Test Firebase connection on component mount
    let isMounted = true;
    
    // Set loading state for Firebase connection
    dispatchLoadingState({ 
      type: 'SET_LOADING', 
      operation: 'firebaseConnection', 
      value: true 
    });
    
    const connectionTest = async () => {
      try {
        const success = await testFirebaseConnection();
        if (isMounted) {
          if (!success) {
            toast({
              title: "Connection Issue",
              description: "There might be a connection issue with Firebase. Check console for details.",
              variant: "destructive",
            });
          }
          dispatchLoadingState({ 
            type: 'SET_LOADING', 
            operation: 'firebaseConnection', 
            value: false 
          });
        }
      } catch (error) {
        if (isMounted) {
          toast({
            title: "Connection Error",
            description: "Failed to test Firebase connection",
            variant: "destructive",
          });
          dispatchLoadingState({ 
            type: 'SET_LOADING', 
            operation: 'firebaseConnection', 
            value: false 
          });
        }
      }
    };
    
    connectionTest();
    formLoadPerf.end();
    
    // Set up cache cleanup interval - clear old cache entries every 5 minutes
    const cacheCleanupInterval = setInterval(() => {
      const now = Date.now();
      const expirationTime = 5 * 60 * 1000; // 5 minutes
      
      validationCache.current.forEach((value, key) => {
        if (now - value.timestamp > expirationTime) {
          validationCache.current.delete(key);
        }
      });
    }, 60 * 1000); // Check every minute
    
    // Cleanup function
    return () => {
      isMounted = false;
      clearInterval(cacheCleanupInterval);
    };
  }, [navigate, formLoadPerf]);

  // Optimized input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update form data in a non-blocking way
    startTransition(() => {
      dispatchFormData({ 
        type: 'SET_FIELD', 
        field: name as keyof FormData, 
        value 
      });
    });
    
    // Queue validation for batch processing
    validationQueue.current.push({ 
      field: name as keyof FormData, 
      value 
    });
    
    // Update loading state for validation
    dispatchLoadingState({
      type: 'SET_VALIDATION_LOADING',
      field: name as keyof LoadingState['validation'],
      value: true
    });
  }, []);
  
  // Memoized password strength validator
  const validatePasswordStrength = useCallback((password: string): string | null => {
    // Cache key for password validation
    const cacheKey = `password-strength:${password}`;
    
    // Check cache first
    if (validationCache.current.has(cacheKey)) {
      const cachedResult = validationCache.current.get(cacheKey);
      if (cachedResult && cachedResult.valid) {
        return null;
      }
    }
    
    if (password.length < 8) {
      return 'Password must be at least 8 characters';
    }
    
    // Check for complexity requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
    
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!hasNumbers) {
      return 'Password must contain at least one number';
    }
    if (!hasSpecialChars) {
      return 'Password must contain at least one special character';
    }
    
    // Cache the result
    validationCache.current.set(cacheKey, { valid: true, timestamp: Date.now() });
    return null;
  }, []);
  
  // Implementation of field validation (not debounced)
  const validateFieldImpl = useCallback((field: keyof FormData, value: string) => {
    const cacheKey = `${field}:${value}`;
    
    // Check cache first for instant results (with timestamp check)
    if (validationCache.current.has(cacheKey)) {
      const cachedResult = validationCache.current.get(cacheKey);
      if (cachedResult && Date.now() - cachedResult.timestamp < 5 * 60 * 1000) { // 5 minute cache validity
        // Set loading state to false for this field
        dispatchLoadingState({
          type: 'SET_VALIDATION_LOADING',
          field: field as keyof LoadingState['validation'],
          value: false
        });
        return;
      }
    }
    
    switch (field) {
      case 'email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'email', 
            error: 'Email is required' 
          });
        } else if (!emailRegex.test(value)) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'email', 
            error: 'Please enter a valid email' 
          });
        } else {
          dispatchValidationErrors({ type: 'CLEAR_ERROR', field: 'email' });
          validationCache.current.set(cacheKey, { valid: true, timestamp: Date.now() });
        }
        break;
      }
      case 'password': {
        if (!value) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'password', 
            error: 'Password is required' 
          });
        } else {
          const passwordError = validatePasswordStrength(value);
          if (passwordError) {
            dispatchValidationErrors({ 
              type: 'SET_ERROR', 
              field: 'password', 
              error: passwordError 
            });
          } else {
            dispatchValidationErrors({ type: 'CLEAR_ERROR', field: 'password' });
            validationCache.current.set(cacheKey, { valid: true, timestamp: Date.now() });
            
            // Also validate confirmPassword if it exists
            if (formData.confirmPassword) {
              // Queue validation for batch processing
              validationQueue.current.push({ 
                field: 'confirmPassword', 
                value: formData.confirmPassword 
              });
            }
          }
        }
        break;
      }
      case 'confirmPassword': {
        if (!value) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'confirmPassword', 
            error: 'Please confirm your password' 
          });
        } else if (value !== formData.password) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'confirmPassword', 
            error: 'Passwords do not match' 
          });
        } else {
          dispatchValidationErrors({ type: 'CLEAR_ERROR', field: 'confirmPassword' });
          validationCache.current.set(cacheKey, { valid: true, timestamp: Date.now() });
        }
        break;
      }
      case 'username': {
        if (!value) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'username', 
            error: 'Username is required' 
          });
        } else if (value.length < 2) {
          dispatchValidationErrors({ 
            type: 'SET_ERROR', 
            field: 'username', 
            error: 'Username must be at least 2 characters' 
          });
        } else {
          dispatchValidationErrors({ type: 'CLEAR_ERROR', field: 'username' });
          validationCache.current.set(cacheKey, { valid: true, timestamp: Date.now() });
        }
        break;
      }
    }
    
    // Set loading state to false for this field
    dispatchLoadingState({
      type: 'SET_VALIDATION_LOADING',
      field: field as keyof LoadingState['validation'],
      value: false
    });
  }, [formData.password, validatePasswordStrength]);
  
  // Optimized form validation
  const validateForm = useCallback(() => {
    formSubmitPerf.start();
    
    // Clear validation cache for fresh validation
    validationCache.current.clear();
    
    // Validate all fields immediately without debouncing
    const fields: Array<keyof FormData> = ['email', 'password', 'confirmPassword', 'username'];
    
    // Reset all validation loading states
    fields.forEach(field => {
      dispatchLoadingState({
        type: 'SET_VALIDATION_LOADING',
        field,
        value: true
      });
    });
    
    // Perform immediate validation
    fields.forEach(field => validateFieldImpl(field, formData[field]));
    
    // Check for errors after validation
    const hasErrors = Object.keys(validationErrors).length > 0;
    const hasEmptyFields = !formData.email || !formData.password || !formData.confirmPassword || !formData.username;
    
    if (hasEmptyFields || hasErrors) {
      if (hasEmptyFields) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: Object.values(validationErrors)[0],
          variant: "destructive",
        });
      }
      
      // Reset validation loading states
      fields.forEach(field => {
        dispatchLoadingState({
          type: 'SET_VALIDATION_LOADING',
          field,
          value: false
        });
      });
      
      formSubmitPerf.end();
      return false;
    }
    
    formSubmitPerf.end();
    return true;
  }, [formData, validationErrors, validateFieldImpl, formSubmitPerf]);

  // Optimized form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // Set loading state
    dispatchLoadingState({ type: 'SET_LOADING', operation: 'emailSignUp', value: true });
    const performanceMonitor = measureAuthPerformance('Account Creation');
    
    try {
      // Dynamic import the auth module for code splitting
      const authModule = await import('@/lib/firebase-auth');
      
      const { user, error } = await authModule.signUpWithEmail({
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: selectedRole
      });

      if (error) {
        // More specific error handling
        if (error.includes('email-already-in-use')) {
          toast({
            title: "Account Error",
            description: "This email is already in use. Please try a different email or login.",
            variant: "destructive",
          });
        } else if (error.includes('weak-password')) {
          toast({
            title: "Password Error",
            description: "The password is too weak. Please choose a stronger password.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        }
        return;
      }

      if (user) {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        
        // Navigate in a non-blocking way
        startTransition(() => {
          navigate('/dashboard');
        });
      }
    } catch (error) {
      console.error('Account creation error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during account creation",
        variant: "destructive",
      });
    } finally {
      performanceMonitor.end();
      dispatchLoadingState({ type: 'SET_LOADING', operation: 'emailSignUp', value: false });
    }
  }, [formData, selectedRole, navigate, validateForm]);

  // Optimized Google sign up
  const handleGoogleSignUp = useCallback(async () => {
    // Set loading state
    dispatchLoadingState({ type: 'SET_LOADING', operation: 'googleSignUp', value: true });
    const performanceMonitor = measureAuthPerformance('Google Sign Up');
    
    try {
      // Dynamic import the auth module for code splitting
      const authModule = await import('@/lib/firebase-auth');
      
      const { user, error } = await authModule.signInWithGoogle(selectedRole);

      if (error) {
        // More specific error handling
        if (error.includes('popup-closed-by-user')) {
          toast({
            title: "Sign-in Cancelled",
            description: "Google sign-in was cancelled. Please try again.",
            variant: "destructive",
          });
        } else if (error.includes('account-exists')) {
          toast({
            title: "Account Exists",
            description: "An account already exists with this email. Please try logging in.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: error,
            variant: "destructive",
          });
        }
        return;
      }

      if (user) {
        toast({
          title: "Success",
          description: "Signed in with Google successfully!",
        });
        
        // Navigate in a non-blocking way
        startTransition(() => {
          navigate('/dashboard');
        });
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast({
        title: "Error",
        description: "Failed to sign in with Google. Please try again later.",
        variant: "destructive",
      });
    } finally {
      performanceMonitor.end();
      dispatchLoadingState({ type: 'SET_LOADING', operation: 'googleSignUp', value: false });
    }
  }, [selectedRole, navigate]);

  // Optimized navigation
  const handleLoginRedirect = useCallback(() => {
    startTransition(() => {
      navigate('/login');
    });
  }, [navigate]);
  
  // Derived state values (computed once for the component)
  const isAnyLoading = useMemo(() => {
    return (
      loadingState.emailSignUp || 
      loadingState.googleSignUp || 
      Object.values(loadingState.validation).some(Boolean) ||
      loadingState.firebaseConnection ||
      isPending
    );
  }, [loadingState, isPending]);

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div className="p-8 text-center">Loading header...</div>}>
        <Header />
      </Suspense>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => navigate('/role-selection')}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Role Selection
          </button>

          {/* Performance monitoring indicator (only visible in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="text-xs bg-black/5 dark:bg-white/5 rounded p-2 mb-4">
              <p>Performance monitoring enabled</p>
              {isPending && <p className="text-amber-500">⟳ Transition in progress...</p>}
              {Object.entries(loadingState.validation).some(([_, v]) => v) && (
                <p className="text-blue-500">⟳ Validation in progress...</p>
              )}
            </div>
          )}

          <div className="text-center mb-8">
            <h1 className="text-3xl font-inter font-bold text-gray-900 dark:text-white mb-4">
              Create Your Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Join PlatformEase and start building amazing projects
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Sign Up with Email
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email field */}
              <FormField
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                label="Email Address"
                icon={Mail}
                error={validationErrors.email}
                isLoading={isAnyLoading}
              />

              {/* Password field */}
              <FormField
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                label="Create Password"
                icon={Lock}
                error={validationErrors.password}
                isLoading={isAnyLoading}
                toggleVisibility={() => setShowPassword(!showPassword)}
                showPassword={showPassword}
              />

              {/* Confirm Password field */}
              <FormField
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                label="Confirm Password"
                icon={Lock}
                error={validationErrors.confirmPassword}
                isLoading={isAnyLoading}
                toggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                showPassword={showConfirmPassword}
              />

              {/* Username field */}
              <FormField
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a unique username"
                label="Username"
                icon={User}
                error={validationErrors.username}
                isLoading={isAnyLoading}
              />

              {/* Role display - memoized component */}
              <RoleDisplay role={selectedRole} />

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isAnyLoading}
              >
                {loadingState.emailSignUp ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </div>

          {/* Form divider - memoized component */}
          <FormDivider />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <Button 
              onClick={handleGoogleSignUp}
              variant="outline" 
              className="w-full"
              disabled={isAnyLoading}
            >
              {loadingState.googleSignUp ? "Connecting..." : "Continue with Google"}
            </Button>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <button 
                onClick={handleLoginRedirect}
                className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                disabled={isAnyLoading}
              >
                Log In
              </button>
            </p>
          </div>

          {/* Role explanation section - static content */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Why We Ask for Your Role
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>• Personalize your dashboard</li>
              <li>• Suggest relevant templates or projects</li>
              <li>• Match you with collaborators or clients</li>
            </ul>
          </div>
        </div>
      </main>

      <Suspense fallback={<div className="p-8 text-center">Loading footer...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default CreateAccount;
