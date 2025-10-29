/**
 * 重试拦截器
 */

import type { RetryConfig } from '../types'
import { sleep } from '@usekit/shared'

export class RetryInterceptor {
  private config: Required<RetryConfig>

  constructor(config?: RetryConfig) {
    this.config = {
      enabled: config?.enabled ?? true,
      maxRetries: config?.maxRetries ?? 3,
      retryDelay: config?.retryDelay ?? 1000,
      retryDelayMultiplier: config?.retryDelayMultiplier ?? 2,
      retryableStatusCodes: config?.retryableStatusCodes ?? [408, 429, 500, 502, 503, 504],
      shouldRetry: config?.shouldRetry ?? ((error, retryCount) => {
        if (retryCount >= this.config.maxRetries) return false
        
        // 检查是否为网络错误
        if (error?.name === 'TypeError' && error?.message === 'Failed to fetch') {
          return true
        }

        // 检查状态码
        const status = error?.response?.status
        return status ? this.config.retryableStatusCodes.includes(status) : false
      }),
    }
  }

  get enabled(): boolean {
    return this.config.enabled
  }

  /**
   * 执行带重试的请求
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: any
    
    for (let retryCount = 0; retryCount <= this.config.maxRetries; retryCount++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error
        
        // 判断是否需要重试
        if (!this.config.shouldRetry(error, retryCount)) {
          throw error
        }

        // 计算延迟时间（指数退避）
        const delay = this.config.retryDelay * Math.pow(this.config.retryDelayMultiplier, retryCount)
        
        // 延迟后重试
        await sleep(delay)
      }
    }

    throw lastError
  }
}

