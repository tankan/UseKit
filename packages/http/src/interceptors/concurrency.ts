/**
 * 并发控制拦截器
 */

import type { ConcurrencyConfig, RequestConfig } from '../types'

export class ConcurrencyInterceptor {
  private config: Required<ConcurrencyConfig>
  private pending: Map<string, AbortController>
  private queue: Array<() => void>
  private activeCount = 0

  constructor(config?: ConcurrencyConfig) {
    this.config = {
      enabled: config?.enabled ?? false,
      maxConcurrent: config?.maxConcurrent ?? 6,
      cancelDuplicates: config?.cancelDuplicates ?? true,
    }
    this.pending = new Map()
    this.queue = []
  }

  get enabled(): boolean {
    return this.config.enabled
  }

  /**
   * 生成请求键
   */
  private generateKey(config: RequestConfig): string {
    const { url, method = 'GET', params } = config
    const paramsStr = params ? JSON.stringify(params) : ''
    return `${method}:${url}:${paramsStr}`
  }

  /**
   * 检查并发
   */
  async checkConcurrency(config: RequestConfig): Promise<void> {
    const key = this.generateKey(config)

    // 取消重复请求
    if (this.config.cancelDuplicates && this.pending.has(key)) {
      const controller = this.pending.get(key)
      controller?.abort()
      this.pending.delete(key)
    }

    // 创建新的 AbortController
    const controller = new AbortController()
    this.pending.set(key, controller)

    // 检查并发数
    if (this.activeCount >= this.config.maxConcurrent) {
      await new Promise<void>((resolve) => {
        this.queue.push(resolve)
      })
    }

    this.activeCount++
  }

  /**
   * 释放并发
   */
  release(config: RequestConfig): void {
    const key = this.generateKey(config)
    this.pending.delete(key)
    this.activeCount--

    // 处理队列
    if (this.queue.length > 0) {
      const resolve = this.queue.shift()
      if (resolve) {
        this.activeCount++
        resolve()
      }
    }
  }

  /**
   * 清除所有待处理请求
   */
  clear(): void {
    this.pending.forEach((controller) => controller.abort())
    this.pending.clear()
    this.queue = []
    this.activeCount = 0
  }
}

