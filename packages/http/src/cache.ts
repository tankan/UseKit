/**
 * 缓存工具
 */

/**
 * 创建 LRU 缓存
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>
  private maxSize: number

  constructor(maxSize: number = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  get(key: K): V | undefined {
    if (!this.cache.has(key)) {
      return undefined
    }

    // 更新访问顺序
    const value = this.cache.get(key)
    if (!value) return undefined
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  set(key: K, value: V): void {
    // 如果已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key)
    }

    // 添加新值
    this.cache.set(key, value)

    // 检查大小限制
    if (this.cache.size > this.maxSize) {
      // 删除最旧的项（Map 的第一个元素）
      const firstKey = this.cache.keys().next().value as K
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }
  }

  has(key: K): boolean {
    return this.cache.has(key)
  }

  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  get size(): number {
    return this.cache.size
  }
}

/**
 * 创建带过期时间的缓存
 */
export class TTLCache<K, V> {
  private cache: Map<K, { value: V; expiry: number }>
  private defaultTTL: number

  constructor(defaultTTL: number = 5 * 60 * 1000) {
    this.cache = new Map()
    this.defaultTTL = defaultTTL
  }

  get(key: K): V | undefined {
    const cached = this.cache.get(key)
    if (!cached) {
      return undefined
    }

    // 检查是否过期
    if (cached.expiry !== 0 && cached.expiry < Date.now()) {
      this.cache.delete(key)
      return undefined
    }

    return cached.value
  }

  set(key: K, value: V, ttl?: number): void {
    const expiry = ttl === 0 ? 0 : Date.now() + (ttl ?? this.defaultTTL)
    this.cache.set(key, { value, expiry })
  }

  has(key: K): boolean {
    const value = this.get(key)
    return value !== undefined
  }

  delete(key: K): boolean {
    return this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  get size(): number {
    return this.cache.size
  }

  /**
   * 清理过期项
   */
  cleanup(): void {
    const now = Date.now()
    for (const [key, { expiry }] of this.cache.entries()) {
      if (expiry !== 0 && expiry < now) {
        this.cache.delete(key)
      }
    }
  }
}

