import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Import the React plugin

export default defineConfig({
  plugins: [react()], // Use the React plugin
  build: {
    outDir: 'dist', // Specify the output directory for built assets
    rollupOptions: {
    },
  },
});
