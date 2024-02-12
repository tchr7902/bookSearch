// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  resolve: {
    alias: {
      // Add an alias for react-router-dom to resolve module paths
      'react-router-dom': path.resolve(__dirname, 'node_modules/react-router-dom'),
    },
  },
  build: {
    rollupOptions: {
      external: ['axios', '@apollo/client'],

    }
  }
});
