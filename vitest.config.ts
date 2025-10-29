import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Vitest 4.x 配置优化
    globals: true,
    environment: 'jsdom',
    
    // 并行测试优化（Vitest 4.x 性能提升）
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },
    
    // 覆盖率配置（Vitest 4.x 改进）
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.{js,ts}',
        '**/types/',
        '**/*.d.ts',
        '**/test/**',
        '**/tests/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    
    // 更好的错误提示（Vitest 4.x）
    outputFile: {
      html: './test-results/index.html',
    },
    
    // 测试超时配置
    testTimeout: 10000,
    hookTimeout: 10000,
  },
})

