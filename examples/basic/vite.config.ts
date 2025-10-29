import { defineConfig } from 'vite'

// Vite 7.x 优化配置
export default defineConfig({
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    
    // Vite 7.x HMR 性能优化
    hmr: {
      overlay: true,
    },
    
    // 更快的冷启动
    warmup: {
      clientFiles: [
        './src/**/*.ts',
        './index.html',
      ],
    },
  },
  
  // 构建优化（Vite 7.x）
  build: {
    target: 'es2022',
    outDir: 'dist',
    
    // 代码分割优化
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['@usekit/core'],
        },
      },
    },
    
    // 压缩优化
    minify: 'esbuild',
    
    // 源码映射
    sourcemap: true,
  },
  
  // 依赖优化（Vite 7.x 改进）
  optimizeDeps: {
    include: ['@usekit/core'],
    
    // 预构建优化
    force: false,
  },
  
  // TypeScript 配置
  esbuild: {
    target: 'es2022',
    drop: ['console', 'debugger'],
  },
})

