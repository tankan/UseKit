/**
 * 通用工具函数
 */

import type { MaybeRef } from './types'

/**
 * 判断是否为浏览器环境
 */
export const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'

/**
 * 判断是否为开发环境
 */
export const isDev = process.env.NODE_ENV === 'development'

/**
 * 获取值（支持 Ref 类型）
 */
export function unref<T>(value: MaybeRef<T>): T {
  return typeof value === 'object' && value !== null && 'value' in value
    ? (value as { value: T }).value
    : value
}

/**
 * 空函数
 */
export const noop = (): void => {}

/**
 * 延迟执行
 */
export const sleep = (ms: number): Promise<void> => 
  new Promise(resolve => setTimeout(resolve, ms))

/**
 * 深度克隆
 */
export function deepClone<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  if (value instanceof Array) {
    return value.map(item => deepClone(item)) as T
  }

  if (value instanceof Object) {
    const clonedObj = {} as T
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        clonedObj[key] = deepClone(value[key])
      }
    }
    return clonedObj
  }

  return value
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  return function (this: any, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      fn.apply(this, args)
    }
  }
}

