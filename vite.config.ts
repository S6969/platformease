import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    warmup: {
      clientFiles: ['./src/main.tsx', './src/App.tsx', './src/pages/Index.tsx']
    }
  },
  plugins: [
    react(),
  ],
  esbuild: {
    // Drop console and debugger in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'firebase/app',
      'firebase/auth'
    ],
    exclude: ['firebase/analytics']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          // Firebase - split into smaller chunks
          if (id.includes('firebase/app') || id.includes('firebase/firestore')) {
            return 'firebase-core';
          }
          if (id.includes('firebase/auth')) {
            return 'firebase-auth';
          }
          if (id.includes('firebase')) {
            return 'firebase-other';
          }
          // UI components
          if (id.includes('@radix-ui')) {
            return 'ui-components';
          }
          // Router
          if (id.includes('react-router')) {
            return 'router';
          }
          // Charts and heavy libraries
          if (id.includes('recharts') || id.includes('date-fns')) {
            return 'charts';
          }
          // Other vendor libraries
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    chunkSizeWarningLimit: 500,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  }
}));
