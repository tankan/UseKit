/**
 * 日期核心功能
 */

import dayjs, { type Dayjs } from 'dayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import dayOfYearPlugin from 'dayjs/plugin/dayOfYear'
import weekOfYearPlugin from 'dayjs/plugin/weekOfYear'
import type { DateInput, DateUnit } from './types'

// 加载dayjs插件
dayjs.extend(isBetweenPlugin)
dayjs.extend(dayOfYearPlugin)
dayjs.extend(weekOfYearPlugin)

/**
 * 创建日期实例
 */
export function createDate(input?: DateInput): Dayjs {
  return dayjs(input)
}

/**
 * 当前日期时间
 */
export function now(): Dayjs {
  return dayjs()
}

/**
 * 今天（时间部分归零）
 */
export function today(): Dayjs {
  return dayjs().startOf('day')
}

/**
 * 明天
 */
export function tomorrow(): Dayjs {
  return dayjs().add(1, 'day').startOf('day')
}

/**
 * 昨天
 */
export function yesterday(): Dayjs {
  return dayjs().subtract(1, 'day').startOf('day')
}

/**
 * 本周开始
 */
export function startOfWeek(date?: DateInput): Dayjs {
  return dayjs(date).startOf('week')
}

/**
 * 本周结束
 */
export function endOfWeek(date?: DateInput): Dayjs {
  return dayjs(date).endOf('week')
}

/**
 * 本月开始
 */
export function startOfMonth(date?: DateInput): Dayjs {
  return dayjs(date).startOf('month')
}

/**
 * 本月结束
 */
export function endOfMonth(date?: DateInput): Dayjs {
  return dayjs(date).endOf('month')
}

/**
 * 本年开始
 */
export function startOfYear(date?: DateInput): Dayjs {
  return dayjs(date).startOf('year')
}

/**
 * 本年结束
 */
export function endOfYear(date?: DateInput): Dayjs {
  return dayjs(date).endOf('year')
}

/**
 * 日期加法
 */
export function add(date: DateInput, amount: number, unit: DateUnit): Dayjs {
  return dayjs(date).add(amount, unit)
}

/**
 * 日期减法
 */
export function subtract(date: DateInput, amount: number, unit: DateUnit): Dayjs {
  return dayjs(date).subtract(amount, unit)
}

/**
 * 日期差值
 */
export function diff(date1: DateInput, date2: DateInput, unit?: DateUnit, precise?: boolean): number {
  return dayjs(date1).diff(dayjs(date2), unit, precise)
}

/**
 * 判断是否在之前
 */
export function isBefore(date1: DateInput, date2: DateInput, unit?: DateUnit): boolean {
  return dayjs(date1).isBefore(dayjs(date2), unit)
}

/**
 * 判断是否在之后
 */
export function isAfter(date1: DateInput, date2: DateInput, unit?: DateUnit): boolean {
  return dayjs(date1).isAfter(dayjs(date2), unit)
}

/**
 * 判断是否相同
 */
export function isSame(date1: DateInput, date2: DateInput, unit?: DateUnit): boolean {
  return dayjs(date1).isSame(dayjs(date2), unit)
}

/**
 * 判断是否在两个日期之间
 */
export function isBetween(date: DateInput, start: DateInput, end: DateInput, unit?: DateUnit, inclusivity?: '()' | '[]' | '[)' | '(]'): boolean {
  const d = dayjs(date)
  const s = dayjs(start)
  const e = dayjs(end)

  switch (inclusivity) {
    case '()':
      return d.isAfter(s, unit) && d.isBefore(e, unit)
    case '[]':
      return (d.isAfter(s, unit) || d.isSame(s, unit)) && (d.isBefore(e, unit) || d.isSame(e, unit))
    case '[)':
      return (d.isAfter(s, unit) || d.isSame(s, unit)) && d.isBefore(e, unit)
    case '(]':
      return d.isAfter(s, unit) && (d.isBefore(e, unit) || d.isSame(e, unit))
    default:
      return d.isAfter(s, unit) && d.isBefore(e, unit)
  }
}

/**
 * 判断是否是今天
 */
export function isToday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'day')
}

/**
 * 判断是否是明天
 */
export function isTomorrow(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().add(1, 'day'), 'day')
}

/**
 * 判断是否是昨天
 */
export function isYesterday(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')
}

/**
 * 判断是否是本周
 */
export function isThisWeek(date: DateInput): boolean {
  return dayjs(date).isBetween(startOfWeek(), endOfWeek(), null, '[]')
}

/**
 * 判断是否是本月
 */
export function isThisMonth(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'month')
}

/**
 * 判断是否是本年
 */
export function isThisYear(date: DateInput): boolean {
  return dayjs(date).isSame(dayjs(), 'year')
}

/**
 * 判断是否是闰年
 */
export function isLeapYear(date: DateInput): boolean {
  const year = dayjs(date).year()
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 判断是否是有效日期
 */
export function isValid(date: DateInput): boolean {
  return dayjs(date).isValid()
}

/**
 * 获取月份天数
 */
export function daysInMonth(date: DateInput): number {
  return dayjs(date).daysInMonth()
}

/**
 * 获取星期几（0-6，0 表示周日）
 */
export function dayOfWeek(date: DateInput): number {
  return dayjs(date).day()
}

/**
 * 获取一年中的第几天
 */
export function dayOfYear(date: DateInput): number {
  return dayjs(date).dayOfYear()
}

/**
 * 获取一年中的第几周
 */
export function weekOfYear(date: DateInput): number {
  return dayjs(date).week()
}

/**
 * 设置时间为一天的开始
 */
export function startOf(date: DateInput, unit: DateUnit): Dayjs {
  return dayjs(date).startOf(unit)
}

/**
 * 设置时间为一天的结束
 */
export function endOf(date: DateInput, unit: DateUnit): Dayjs {
  return dayjs(date).endOf(unit)
}

