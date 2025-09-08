import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      root: 'src',
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
      }
    };
});
