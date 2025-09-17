import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
    return {
      root: 'src',
      base: '/pretty-git-log/',
      build: {
        outDir: '../dist',
        emptyOutDir: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
