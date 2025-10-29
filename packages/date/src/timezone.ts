/**
 * 时区处理
 */

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import type { DateInput, TimezoneConfig } from './types'

// 加载插件
dayjs.extend(utc)
dayjs.extend(timezone)

/**
 * 时区配置
 */
let config: TimezoneConfig = {
  defaultTimezone: 'Asia/Shanghai',
  autoDetect: true,
}

/**
 * 设置时区配置
 */
export function setTimezoneConfig(newConfig: TimezoneConfig): void {
  config = { ...config, ...newConfig }
}

/**
 * 获取当前时区配置
 */
export function getTimezoneConfig(): TimezoneConfig {
  return { ...config }
}

/**
 * 获取当前系统时区
 */
export function getSystemTimezone(): string {
  return dayjs.tz.guess()
}

/**
 * 转换为指定时区
 */
export function toTimezone(date: DateInput, timezone: string): dayjs.Dayjs {
  return dayjs(date).tz(timezone)
}

/**
 * 转换为 UTC
 */
export function toUTC(date: DateInput): dayjs.Dayjs {
  return dayjs(date).utc()
}

/**
 * 从 UTC 转换为本地时间
 */
export function fromUTC(date: DateInput): dayjs.Dayjs {
  return dayjs.utc(date).local()
}

/**
 * 获取时区偏移（分钟）
 */
export function getTimezoneOffset(date: DateInput, timezone?: string): number {
  if (timezone) {
    return dayjs(date).tz(timezone).utcOffset()
  }
  return dayjs(date).utcOffset()
}

/**
 * 判断是否是 UTC 时间
 */
export function isUTC(date: DateInput): boolean {
  return dayjs(date).utcOffset() === 0
}

/**
 * 获取默认时区
 */
export function getDefaultTimezone(): string {
  if (config.autoDetect) {
    return getSystemTimezone()
  }
  return config.defaultTimezone || 'Asia/Shanghai'
}

/**
 * 转换为默认时区
 */
export function toDefaultTimezone(date: DateInput): dayjs.Dayjs {
  return toTimezone(date, getDefaultTimezone())
}

