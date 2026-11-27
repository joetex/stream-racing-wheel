import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the app from /stream-racing-wheel/
  base: '/stream-racing-wheel/',
  server: { port: 3000 },
  preview: { port: 3000 },
  // Keep CRA's output folder so `gh-pages -d build` still works.
  build: { outDir: 'build' },
});
