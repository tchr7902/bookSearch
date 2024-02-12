import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  plugins: [react(), nodeResolve()], // Include the nodeResolve plugin
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
      // Add aliases for any modules you want to resolve
      // These aliases are optional but can be useful for resolving module paths
      'react-router-dom': 'react-router-dom',
      'graphql-tag': 'graphql-tag',
    },
  },
});
