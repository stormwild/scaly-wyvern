/// <reference types="node" />
import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  base: '/scaly-wyvern/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        grid: resolve(rootDir, 'grid.html'),
      },
    },
  },
})
