/**
 * HTTP 模块类型定义
 */

import type { ConfigurableOptions } from '@usekit/shared'

/**
 * 请求方法
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

/**
 * 请求配置
 */
export interface RequestConfig {
  /**
   * 请求 URL
   */
  url: string

  /**
   * 请求方法
   */
  method?: HttpMethod

  /**
   * 请求头
   */
  headers?: Record<string, string>

  /**
   * 请求参数（URL 查询参数）
   */
  params?: Record<string, any>

  /**
   * 请求体
   */
  data?: any

  /**
   * 超时时间（毫秒）
   */
  timeout?: number

  /**
   * 是否携带凭证
   */
  withCredentials?: boolean
}

/**
 * 响应数据
 */
export interface ResponseData<T = any> {
  /**
   * 响应数据
   */
  data: T

  /**
   * 状态码
   */
  status: number

  /**
   * 状态文本
   */
  statusText: string

  /**
   * 响应头
   */
  headers: Record<string, string>
}

/**
 * 重试配置
 */
export interface RetryConfig extends ConfigurableOptions {
  /**
   * 最大重试次数
   */
  maxRetries?: number

  /**
   * 重试延迟（毫秒）
   */
  retryDelay?: number

  /**
   * 重试延迟倍数（指数退避）
   */
  retryDelayMultiplier?: number

  /**
   * 可重试的状态码
   */
  retryableStatusCodes?: number[]

  /**
   * 自定义重试判断
   */
  shouldRetry?: (error: any, retryCount: number) => boolean
}

/**
 * 缓存配置
 */
export interface CacheConfig extends ConfigurableOptions {
  /**
   * 缓存模式
   */
  mode?: 'memory' | 'localStorage' | 'sessionStorage'

  /**
   * 缓存时间（毫秒），0 表示永久缓存
   */
  ttl?: number

  /**
   * 缓存键生成函数
   */
  keyGenerator?: (config: RequestConfig) => string
}

/**
 * Token 刷新配置
 */
export interface TokenRefreshConfig extends ConfigurableOptions {
  /**
   * Token 刷新函数
   */
  refreshToken: () => Promise<string>

  /**
   * Token 存储键
   */
  tokenKey?: string

  /**
   * Token 头名称
   */
  tokenHeader?: string

  /**
   * Token 前缀
   */
  tokenPrefix?: string

  /**
   * 需要刷新的状态码
   */
  refreshStatusCodes?: number[]
}

/**
 * 并发控制配置
 */
export interface ConcurrencyConfig extends ConfigurableOptions {
  /**
   * 最大并发数
   */
  maxConcurrent?: number

  /**
   * 是否自动取消重复请求
   */
  cancelDuplicates?: boolean
}

/**
 * HTTP 客户端配置
 */
export interface HttpClientConfig {
  /**
   * 基础 URL
   */
  baseURL?: string

  /**
   * 默认超时时间
   */
  timeout?: number

  /**
   * 默认请求头
   */
  headers?: Record<string, string>

  /**
   * 重试配置
   */
  retry?: RetryConfig

  /**
   * 缓存配置
   */
  cache?: CacheConfig

  /**
   * Token 刷新配置
   */
  tokenRefresh?: TokenRefreshConfig

  /**
   * 并发控制配置
   */
  concurrency?: ConcurrencyConfig
}

/**
 * 请求状态
 */
export interface RequestState<T = any> {
  /**
   * 是否加载中
   */
  loading: boolean

  /**
   * 响应数据
   */
  data: T | null

  /**
   * 错误信息
   */
  error: Error | null

  /**
   * 是否成功
   */
  success: boolean
}

