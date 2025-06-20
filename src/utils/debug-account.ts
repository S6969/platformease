// Debug utility to help identify account creation issues

export const debugAccountCreation = {
  // Network connectivity test
  testNetworkConnectivity: async () => {
    try {
      await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      console.log('✅ Network connectivity: OK');
      return true;
    } catch (error) {
      console.error('❌ Network connectivity: FAILED', error);
      return false;
    }
  },

  // Firebase service test
  testFirebaseServices: async () => {
    try {
      // Test if Firebase Auth domain is reachable
      await fetch(`https://${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      console.log('✅ Firebase Auth domain: Reachable');
      
      // Test if project ID is valid
      const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;
      if (projectId && projectId.length > 0) {
        console.log('✅ Firebase Project ID: Valid');
      } else {
        console.error('❌ Firebase Project ID: Invalid or missing');
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('❌ Firebase services: Not reachable', error);
      return false;
    }
  },

  // Performance bottleneck detection
  detectBottlenecks: () => {
    const performanceEntries = performance.getEntriesByType('navigation');
    if (performanceEntries.length > 0) {
      const navigation = performanceEntries[0] as PerformanceNavigationTiming;
      
      console.log('🔍 Performance Analysis:');
      console.log(`- DNS lookup: ${(navigation.domainLookupEnd - navigation.domainLookupStart).toFixed(2)}ms`);
      console.log(`- Connection: ${(navigation.connectEnd - navigation.connectStart).toFixed(2)}ms`);
      console.log(`- Request: ${(navigation.responseEnd - navigation.requestStart).toFixed(2)}ms`);
      console.log(`- DOM loading: ${(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart).toFixed(2)}ms`);
      
      // Detect slow operations
      if ((navigation.responseEnd - navigation.requestStart) > 3000) {
        console.warn('⚠️ Slow network detected (>3s)');
      }
      
      if ((navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart) > 2000) {
        console.warn('⚠️ Slow DOM processing detected (>2s)');
      }
    }
  },

  // Environment validation
  validateEnvironment: () => {
    const requiredEnvVars = [
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID'
    ];

    let allValid = true;
    console.log('🔍 Environment Variables Check:');
    
    requiredEnvVars.forEach(envVar => {
      const value = import.meta.env[envVar];
      if (value && value.length > 0) {
        console.log(`✅ ${envVar}: Set`);
      } else {
        console.error(`❌ ${envVar}: Missing or empty`);
        allValid = false;
      }
    });

    return allValid;
  },

  // Run all diagnostic tests
  runDiagnostics: async () => {
    console.log('🚀 Running Account Creation Diagnostics...');
    console.log('=' .repeat(50));
    
    const results = {
      network: await debugAccountCreation.testNetworkConnectivity(),
      firebase: await debugAccountCreation.testFirebaseServices(),
      environment: debugAccountCreation.validateEnvironment()
    };
    
    debugAccountCreation.detectBottlenecks();
    
    console.log('=' .repeat(50));
    console.log('📊 Diagnostic Results:');
    console.log(`Network: ${results.network ? '✅' : '❌'}`);
    console.log(`Firebase: ${results.firebase ? '✅' : '❌'}`);
    console.log(`Environment: ${results.environment ? '✅' : '❌'}`);
    
    const allPassed = Object.values(results).every(result => result === true);
    
    if (allPassed) {
      console.log('🎉 All diagnostics passed! Account creation should work normally.');
    } else {
      console.log('⚠️ Some diagnostics failed. Check the issues above.');
    }
    
    return results;
  }
};

// Auto-run diagnostics in development mode
if (import.meta.env.DEV) {
  // Run diagnostics after a short delay to let the app initialize
  setTimeout(() => {
    debugAccountCreation.runDiagnostics();
  }, 2000);
}

