// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: 'public/popup.html',
      },
      output: {
        entryFileNames: 'src/popup/[name].js',
        chunkFileNames: 'src/popup/[name].js',
        assetFileNames: 'src/popup/[name].[ext]',
      }
    }
  }
});

