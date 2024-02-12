import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve'; // Import the nodeResolve plugin

export default defineConfig({
  plugins: [
    react(),
    nodeResolve(), // Include the nodeResolve plugin
  ],
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
  build: {
    rollupOptions: {
      input: '/client/src/main.jsx', // Correctly specify the entry point for client-side code
      external: ['graphql-tag'],
    },
  },
});
