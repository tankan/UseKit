import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  sourcemap: true,
  external: ['vue', 'react', 'svelte', 'alova'],
})

