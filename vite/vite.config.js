import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/secret_santa/",
  build: {
    // CRITICAL: Change output directory from 'dist' to 'docs'
    outDir: 'docs'
  },
  plugins: [
    // Ensure the React plugin is configured for both .js and .jsx files
    react({
      include: '**/*.{jsx,js}',
    })
  ],
});