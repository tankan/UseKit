/**
 * 日期模块类型定义
 */

import type { Dayjs } from 'dayjs'

/**
 * 日期输入类型
 */
export type DateInput = string | number | Date | Dayjs

/**
 * 日期单位
 */
export type DateUnit = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'

/**
 * 日期操作类型
 */
export type DateOperation = 'add' | 'subtract'

/**
 * 日期格式化选项
 */
export interface FormatOptions {
  /**
   * 格式化模板
   */
  format?: string

  /**
   * 语言环境
   */
  locale?: string

  /**
   * 时区
   */
  timezone?: string
}

/**
 * 相对时间配置
 */
export interface RelativeTimeConfig {
  /**
   * 是否包含后缀（如 "ago"）
   */
  withSuffix?: boolean

  /**
   * 阈值配置
   */
  thresholds?: {
    s?: number  // 秒
    m?: number  // 分钟
    h?: number  // 小时
    d?: number  // 天
    w?: number  // 周
    M?: number  // 月
  }
}

/**
 * 时区配置
 */
export interface TimezoneConfig {
  /**
   * 默认时区
   */
  defaultTimezone?: string

  /**
   * 是否自动检测用户时区
   */
  autoDetect?: boolean
}

/**
 * 语言环境配置
 */
export interface LocaleConfig {
  /**
   * 默认语言
   */
  defaultLocale?: string

  /**
   * 可用语言列表
   */
  availableLocales?: string[]

  /**
   * 是否自动检测用户语言
   */
  autoDetect?: boolean
}

