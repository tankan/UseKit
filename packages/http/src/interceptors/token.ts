/**
 * Token 刷新拦截器
 */

import type { TokenRefreshConfig } from '../types'
import { isBrowser } from '@hookkit/shared'

export class TokenRefreshInterceptor {
  private config: Required<TokenRefreshConfig>
  private refreshing = false
  private refreshPromise: Promise<string> | null = null

  constructor(config?: TokenRefreshConfig) {
    this.config = {
      enabled: config?.enabled ?? false,
      refreshToken: config?.refreshToken ?? (async () => ''),
      tokenKey: config?.tokenKey ?? 'access_token',
      tokenHeader: config?.tokenHeader ?? 'Authorization',
      tokenPrefix: config?.tokenPrefix ?? 'Bearer ',
      refreshStatusCodes: config?.refreshStatusCodes ?? [401],
    }
  }

  get enabled(): boolean {
    return this.config.enabled && !!this.config.refreshToken
  }

  /**
   * 获取当前 Token
   */
  getToken(): string | null {
    if (!isBrowser) return null

    try {
      return localStorage.getItem(this.config.tokenKey)
    } catch {
      return null
    }
  }

  /**
   * 设置 Token
   */
  setToken(token: string): void {
    if (!isBrowser) return

    try {
      localStorage.setItem(this.config.tokenKey, token)
    } catch {
      // 设置失败，忽略
    }
  }

  /**
   * 清除 Token
   */
  clearToken(): void {
    if (!isBrowser) return

    try {
      localStorage.removeItem(this.config.tokenKey)
    } catch {
      // 清除失败，忽略
    }
  }

  /**
   * 判断是否需要刷新
   */
  shouldRefresh(error: any): boolean {
    const status = error?.response?.status
    return status ? this.config.refreshStatusCodes.includes(status) : false
  }

  /**
   * 刷新 Token
   */
  async refresh(): Promise<string> {
    // 如果正在刷新，等待刷新完成
    if (this.refreshing && this.refreshPromise) {
      return this.refreshPromise
    }

    this.refreshing = true
    this.refreshPromise = this.config.refreshToken()

    try {
      const newToken = await this.refreshPromise
      this.setToken(newToken)
      return newToken
    } finally {
      this.refreshing = false
      this.refreshPromise = null
    }
  }

  /**
   * 确保 Token 有效
   */
  async ensureTokenValid(): Promise<void> {
    const token = this.getToken()
    if (!token) {
      await this.refresh()
    }
  }
}

