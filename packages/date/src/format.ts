/**
 * 日期格式化
 */

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { DateInput, FormatOptions } from './types'

// 加载插件
dayjs.extend(customParseFormat)

/**
 * 常用日期格式
 */
export const DateFormats = {
  /**
   * ISO 8601 格式
   */
  ISO: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  
  /**
   * 日期时间格式
   */
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  
  /**
   * 日期格式
   */
  DATE: 'YYYY-MM-DD',
  
  /**
   * 时间格式
   */
  TIME: 'HH:mm:ss',
  
  /**
   * 年月格式
   */
  YEAR_MONTH: 'YYYY-MM',
  
  /**
   * 月日格式
   */
  MONTH_DAY: 'MM-DD',
  
  /**
   * 时分格式
   */
  HOUR_MINUTE: 'HH:mm',
  
  /**
   * 中文日期时间格式
   */
  DATETIME_ZH: 'YYYY年MM月DD日 HH:mm:ss',
  
  /**
   * 中文日期格式
   */
  DATE_ZH: 'YYYY年MM月DD日',
  
  /**
   * 美式日期格式
   */
  DATE_US: 'MM/DD/YYYY',
  
  /**
   * 欧式日期格式
   */
  DATE_EU: 'DD/MM/YYYY',
} as const

/**
 * 格式化日期
 */
export function format(date: DateInput, template?: string, options?: FormatOptions): string {
  const d = dayjs(date)
  const formatStr = template || options?.format || DateFormats.DATETIME
  
  // TODO: 支持时区和语言环境
  return d.format(formatStr)
}

/**
 * 格式化为 ISO 字符串
 */
export function toISO(date: DateInput): string {
  return dayjs(date).toISOString()
}

/**
 * 格式化为日期字符串
 */
export function toDateString(date: DateInput): string {
  return format(date, DateFormats.DATE)
}

/**
 * 格式化为时间字符串
 */
export function toTimeString(date: DateInput): string {
  return format(date, DateFormats.TIME)
}

/**
 * 格式化为日期时间字符串
 */
export function toDateTimeString(date: DateInput): string {
  return format(date, DateFormats.DATETIME)
}

/**
 * 解析日期字符串
 */
export function parse(dateString: string, formatStr?: string): dayjs.Dayjs {
  if (formatStr) {
    return dayjs(dateString, formatStr)
  }
  return dayjs(dateString)
}

/**
 * 解析 ISO 字符串
 */
export function parseISO(isoString: string): dayjs.Dayjs {
  return dayjs(isoString)
}

/**
 * 转换为 Unix 时间戳（秒）
 */
export function toUnix(date: DateInput): number {
  return dayjs(date).unix()
}

/**
 * 转换为毫秒时间戳
 */
export function toTimestamp(date: DateInput): number {
  return dayjs(date).valueOf()
}

/**
 * 从 Unix 时间戳创建日期
 */
export function fromUnix(timestamp: number): dayjs.Dayjs {
  return dayjs.unix(timestamp)
}

/**
 * 从毫秒时间戳创建日期
 */
export function fromTimestamp(timestamp: number): dayjs.Dayjs {
  return dayjs(timestamp)
}

