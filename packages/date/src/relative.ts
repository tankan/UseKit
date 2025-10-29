/**
 * 相对时间处理
 */

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { DateInput, RelativeTimeConfig } from './types'

// 加载插件
dayjs.extend(relativeTime)

/**
 * 相对时间配置
 */
let config: RelativeTimeConfig = {
  withSuffix: true,
  thresholds: {
    s: 60,      // 60 秒内显示秒
    m: 60,      // 60 分钟内显示分钟
    h: 24,      // 24 小时内显示小时
    d: 30,      // 30 天内显示天
    w: 4,       // 4 周内显示周
    M: 12,      // 12 月内显示月
  },
}

/**
 * 设置相对时间配置
 */
export function setRelativeTimeConfig(newConfig: RelativeTimeConfig): void {
  config = { ...config, ...newConfig }
}

/**
 * 获取相对时间配置
 */
export function getRelativeTimeConfig(): RelativeTimeConfig {
  return { ...config }
}

/**
 * 获取相对时间（从现在起）
 */
export function fromNow(date: DateInput, withSuffix?: boolean): string {
  return dayjs(date).fromNow(withSuffix ?? config.withSuffix)
}

/**
 * 获取相对时间（到现在）
 */
export function toNow(date: DateInput, withSuffix?: boolean): string {
  return dayjs(date).toNow(withSuffix ?? config.withSuffix)
}

/**
 * 获取两个日期的相对时间
 */
export function from(date1: DateInput, date2: DateInput, withSuffix?: boolean): string {
  return dayjs(date1).from(dayjs(date2), withSuffix ?? config.withSuffix)
}

/**
 * 获取两个日期的相对时间（反向）
 */
export function to(date1: DateInput, date2: DateInput, withSuffix?: boolean): string {
  return dayjs(date1).to(dayjs(date2), withSuffix ?? config.withSuffix)
}

/**
 * 人性化的时间差
 */
export function humanize(date1: DateInput, date2?: DateInput): string {
  const d1 = dayjs(date1)
  const d2 = date2 ? dayjs(date2) : dayjs()
  
  const diff = Math.abs(d1.diff(d2))
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)
  
  if (years > 0) {
    return `${years} 年`
  } else if (months > 0) {
    return `${months} 个月`
  } else if (weeks > 0) {
    return `${weeks} 周`
  } else if (days > 0) {
    return `${days} 天`
  } else if (hours > 0) {
    return `${hours} 小时`
  } else if (minutes > 0) {
    return `${minutes} 分钟`
  } else {
    return `${seconds} 秒`
  }
}

/**
 * 智能时间显示
 * - 今天：显示时间
 * - 昨天：显示"昨天 + 时间"
 * - 本周：显示星期
 * - 本年：显示月日
 * - 往年：显示年月日
 */
export function smartFormat(date: DateInput): string {
  const d = dayjs(date)
  const now = dayjs()
  
  // 今天
  if (d.isSame(now, 'day')) {
    return d.format('HH:mm')
  }
  
  // 昨天
  if (d.isSame(now.subtract(1, 'day'), 'day')) {
    return `昨天 ${d.format('HH:mm')}`
  }
  
  // 本周
  if (d.isSame(now, 'week')) {
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return `${weekdays[d.day()]} ${d.format('HH:mm')}`
  }
  
  // 本年
  if (d.isSame(now, 'year')) {
    return d.format('MM-DD HH:mm')
  }
  
  // 往年
  return d.format('YYYY-MM-DD')
}

/**
 * 倒计时
 */
export function countdown(targetDate: DateInput): {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
} {
  const now = dayjs()
  const target = dayjs(targetDate)
  const diff = target.diff(now)
  
  if (diff < 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 }
  }
  
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  
  return {
    days,
    hours: hours % 24,
    minutes: minutes % 60,
    seconds: seconds % 60,
    total: diff,
  }
}

