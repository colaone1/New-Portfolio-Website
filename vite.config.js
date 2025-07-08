import { defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { imagetools } from 'vite-imagetools';
import { splitVendorChunkPlugin } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/New-Portfolio-Website/',
  server: {
    port: 3000,
    strictPort: true,
    host: true, // Expose to network
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'isotope-layout', 'just-validate', 'lozad'],
        },
      },
    },
  },
  plugins: [
    compression(), // Preserve gzip compression
    imagetools(), // Preserve image optimization
    splitVendorChunkPlugin(), // Preserve code splitting
  ],
  resolve: {
    alias: {
      '@': '/',
    },
  },
  optimizeDeps: {
    include: ['lodash', 'date-fns'],
  },
});
