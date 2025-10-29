/**
 * 语言环境处理
 */

import dayjs from 'dayjs'
import type { LocaleConfig } from './types'

// 导入常用语言包
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import 'dayjs/locale/ja'
import 'dayjs/locale/ko'
import 'dayjs/locale/es'
import 'dayjs/locale/fr'
import 'dayjs/locale/de'
import 'dayjs/locale/ru'

/**
 * 语言环境配置
 */
let config: LocaleConfig = {
  defaultLocale: 'zh-cn',
  availableLocales: ['zh-cn', 'en', 'ja', 'ko', 'es', 'fr', 'de', 'ru'],
  autoDetect: true,
}

/**
 * 设置语言环境配置
 */
export function setLocaleConfig(newConfig: LocaleConfig): void {
  config = { ...config, ...newConfig }
  
  // 设置全局默认语言
  if (config.defaultLocale) {
    dayjs.locale(config.defaultLocale)
  }
}

/**
 * 获取当前语言环境配置
 */
export function getLocaleConfig(): LocaleConfig {
  return { ...config }
}

/**
 * 获取浏览器语言
 */
export function getBrowserLocale(): string {
  if (typeof navigator === 'undefined') {
    return 'en'
  }
  
  const lang = navigator.language || (navigator as any).userLanguage
  return lang?.toLowerCase() || 'en'
}

/**
 * 设置全局语言
 */
export function setGlobalLocale(locale: string): void {
  dayjs.locale(locale)
}

/**
 * 获取当前全局语言
 */
export function getGlobalLocale(): string {
  return dayjs.locale()
}

/**
 * 获取默认语言
 */
export function getDefaultLocale(): string {
  if (config.autoDetect) {
    const browserLocale = getBrowserLocale()
    
    // 检查浏览器语言是否在可用列表中
    if (config.availableLocales?.includes(browserLocale)) {
      return browserLocale
    }
    
    // 尝试匹配语言代码前缀（如 en-US -> en）
    const langCode = browserLocale.split('-')[0]
      if (langCode) {
        const matched = config.availableLocales?.find(locale => locale.startsWith(langCode))
        if (matched) {
          return matched
        }
      }
  }
  
  return config.defaultLocale || 'zh-cn'
}

/**
 * 检查语言是否可用
 */
export function isLocaleAvailable(locale: string): boolean {
  return config.availableLocales?.includes(locale) ?? false
}

/**
 * 获取所有可用语言
 */
export function getAvailableLocales(): string[] {
  return config.availableLocales || []
}

/**
 * 动态加载语言包
 */
export async function loadLocale(locale: string): Promise<void> {
  try {
    await import(`dayjs/locale/${locale}.js`)
  } catch (error) {
    console.warn(`Failed to load locale: ${locale}`, error)
  }
}

// 初始化：设置默认语言
setGlobalLocale(getDefaultLocale())

