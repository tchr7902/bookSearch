import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias'; // Import the alias plugin

export default defineConfig({
  plugins: [
    react(),
    nodeResolve(),
    alias({
      entries: [
        { find: 'graphql-tag', replacement: 'graphql-tag/dist/graphql-tag.esm.js' },
      ],
    }),
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
});
