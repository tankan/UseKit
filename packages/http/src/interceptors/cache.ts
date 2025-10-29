/**
 * 缓存拦截器
 */

import type { CacheConfig, RequestConfig, ResponseData } from '../types'
import { isBrowser } from '@usekit/shared'

export class CacheInterceptor {
  private config: Required<CacheConfig>
  private memoryCache: Map<string, { data: any; expiry: number }>

  constructor(config?: CacheConfig) {
    this.config = {
      enabled: config?.enabled ?? false,
      mode: config?.mode ?? 'memory',
      ttl: config?.ttl ?? 5 * 60 * 1000, // 默认 5 分钟
      keyGenerator: config?.keyGenerator ?? this.defaultKeyGenerator,
    }
    this.memoryCache = new Map()
  }

  get enabled(): boolean {
    return this.config.enabled
  }

  /**
   * 默认缓存键生成器
   */
  private defaultKeyGenerator(config: RequestConfig): string {
    const { url, method = 'GET', params } = config
    const paramsStr = params ? JSON.stringify(params) : ''
    return `${method}:${url}:${paramsStr}`
  }

  /**
   * 获取缓存
   */
  get<T = any>(config: RequestConfig): ResponseData<T> | null {
    const key = this.config.keyGenerator(config)
    
    switch (this.config.mode) {
      case 'memory':
        return this.getFromMemory<T>(key)
      case 'localStorage':
        return this.getFromStorage<T>(key, localStorage)
      case 'sessionStorage':
        return this.getFromStorage<T>(key, sessionStorage)
      default:
        return null
    }
  }

  /**
   * 设置缓存
   */
  set<T = any>(config: RequestConfig, data: ResponseData<T>): void {
    const key = this.config.keyGenerator(config)
    const expiry = this.config.ttl === 0 ? 0 : Date.now() + this.config.ttl

    switch (this.config.mode) {
      case 'memory':
        this.setToMemory(key, data, expiry)
        break
      case 'localStorage':
        this.setToStorage(key, data, expiry, localStorage)
        break
      case 'sessionStorage':
        this.setToStorage(key, data, expiry, sessionStorage)
        break
    }
  }

  /**
   * 清除缓存
   */
  clear(config?: RequestConfig): void {
    if (config) {
      const key = this.config.keyGenerator(config)
      this.memoryCache.delete(key)
      
      if (isBrowser) {
        localStorage.removeItem(key)
        sessionStorage.removeItem(key)
      }
    } else {
      this.memoryCache.clear()
      
      if (isBrowser) {
        localStorage.clear()
        sessionStorage.clear()
      }
    }
  }

  /**
   * 从内存缓存获取
   */
  private getFromMemory<T>(key: string): ResponseData<T> | null {
    const cached = this.memoryCache.get(key)
    if (!cached) return null

    // 检查是否过期
    if (cached.expiry !== 0 && cached.expiry < Date.now()) {
      this.memoryCache.delete(key)
      return null
    }

    return cached.data
  }

  /**
   * 设置到内存缓存
   */
  private setToMemory<T>(key: string, data: ResponseData<T>, expiry: number): void {
    this.memoryCache.set(key, { data, expiry })
  }

  /**
   * 从存储获取
   */
  private getFromStorage<T>(key: string, storage: Storage): ResponseData<T> | null {
    if (!isBrowser) return null

    try {
      const cached = storage.getItem(key)
      if (!cached) return null

      const { data, expiry } = JSON.parse(cached)
      
      // 检查是否过期
      if (expiry !== 0 && expiry < Date.now()) {
        storage.removeItem(key)
        return null
      }

      return data
    } catch {
      return null
    }
  }

  /**
   * 设置到存储
   */
  private setToStorage<T>(key: string, data: ResponseData<T>, expiry: number, storage: Storage): void {
    if (!isBrowser) return

    try {
      storage.setItem(key, JSON.stringify({ data, expiry }))
    } catch {
      // 存储失败，忽略
    }
  }
}

