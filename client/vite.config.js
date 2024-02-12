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
      // Add an alias for graphql-tag to resolve its path
      'graphql-tag': require.resolve('graphql-tag'),
      // Add an alias for react-router-dom to resolve module paths
      'react-router-dom': 'react-router-dom',
    },
  },
});
