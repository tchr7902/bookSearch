import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        secure: false,
        changeOrigin: true
      }
    }
  },
  optimizeDeps: {
    include: ['graphql-tag'],
  },
  resolve: {
    alias: {
      // Add an alias for react-router-dom to resolve module paths
      'react-router-dom': 'react-router-dom',
    },
  },
});
