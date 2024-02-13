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
    outDir: 'dist', // Specify the output directory for built assets
    rollupOptions: {
      input: {
        // Specify the entry points for both client and server-side code
        main: '/client/src/main.jsx', // Client-side entry point
        server: '/server/server.js' // Server-side entry point
      },
      external: ['graphql-tag'],
    },
  },
});