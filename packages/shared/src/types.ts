/**
 * 通用类型定义
 */

/**
 * 可能为 null 或 undefined 的类型
 */
export type Nullable<T> = T | null | undefined

/**
 * 可选的类型
 */
export type MaybeRef<T> = T | { value: T }

/**
 * Promise 或普通值
 */
export type Awaitable<T> = T | Promise<T>

/**
 * 函数类型
 */
export type Fn = () => void

/**
 * 任意函数类型
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFn = (...args: any[]) => any

/**
 * 配置选项基类
 */
export interface ConfigurableOptions {
  /**
   * 是否启用
   */
  enabled?: boolean
}

