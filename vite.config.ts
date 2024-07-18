import { URL, fileURLToPath } from 'node:url'
import { dirname, relative } from 'node:path'
import { crx } from '@crxjs/vite-plugin'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Pages from 'vite-plugin-pages'
import vue from '@vitejs/plugin-vue'
import { defineViteConfig as define } from './define.config'

import manifest from './manifest.config'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      src: fileURLToPath(new URL('./src', import.meta.url)),
      stream: "stream-browserify",
      'safe-buffer': "buffer",
    },
  },
  plugins: [
    crx({
      manifest,
      browser: 'chrome',
    }),

    vue(),

    Pages({
      dirs: [
        {
          dir: 'src/pages',
          baseRoute: '',
        },
        {
          dir: 'src/setup/pages',
          baseRoute: 'setup',
        },
        {
          dir: 'src/popup/pages',
          baseRoute: 'popup',
        },
        {
          dir: 'src/options/pages',
          baseRoute: 'options',
        }
      ],
    }),

    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      dirs: ['src/utils/'],
    }),

    {
      name: 'assets-rewrite',
      enforce: 'post',
      apply: 'build',
      transformIndexHtml(html, { path }): string {
        return html.replace(
            /"\/assets\//g,
            `"${relative(dirname(path), '/assets')}/`
        )
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        popup: 'src/popup/index.html',
        setup: 'src/setup/index.html',
      },
    },
    // minify: 'terser',
    terserOptions: {},
    outDir: 'dist/chrome',
  },
  server: {
    port: 8888,
    strictPort: true,
    hmr: {
      port: 8889,
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['vue-demi'],
  },
  assetsInclude: ['src/assets/*/**'],
  define
})
