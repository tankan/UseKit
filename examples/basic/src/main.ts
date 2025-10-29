/**
 * UseKit 基础示例
 */

import {
  // HTTP
  createHttpClient,
  
  // Date
  format,
  today,
  now,
  tomorrow,
  yesterday,
  add,
  subtract,
  diff,
  isBefore,
  isAfter,
  fromNow,
  smartFormat,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  DateFormats,
  
  // Utils
  debounce,
  throttle,
  deepClone,
  sleep,
} from '@hookkit/core'

// ==================== HTTP 示例 ====================

// 创建 HTTP 客户端（使用公开的测试 API）
const httpClient = createHttpClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  retry: {
    enabled: true,
    maxRetries: 3,
    retryDelay: 1000,
  },
  cache: {
    enabled: true,
    mode: 'memory',
    ttl: 60000, // 1 分钟
  },
})

// GET 请求示例
document.getElementById('btn-http-get')?.addEventListener('click', async () => {
  const resultEl = document.getElementById('http-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  resultEl.textContent = '加载中...'

  try {
    const response = await httpClient.get('/users/1')
    resultEl.className = 'result success'
    resultEl.textContent = `✅ 请求成功！\n\n${JSON.stringify(response.data, null, 2)}`
  } catch (error) {
    resultEl.className = 'result error'
    resultEl.textContent = `❌ 请求失败：${error}`
  }
})

// POST 请求示例
document.getElementById('btn-http-post')?.addEventListener('click', async () => {
  const resultEl = document.getElementById('http-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  resultEl.textContent = '加载中...'

  try {
    const response = await httpClient.post('/posts', {
      title: '测试文章',
      body: '这是一篇测试文章',
      userId: 1,
    })
    resultEl.className = 'result success'
    resultEl.textContent = `✅ 创建成功！\n\n${JSON.stringify(response.data, null, 2)}`
  } catch (error) {
    resultEl.className = 'result error'
    resultEl.textContent = `❌ 请求失败：${error}`
  }
})

// 缓存请求示例（首次）
document.getElementById('btn-http-cache')?.addEventListener('click', async () => {
  const resultEl = document.getElementById('cache-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  
  const startTime = Date.now()
  resultEl.textContent = '首次请求中（无缓存）...'

  try {
    const response = await httpClient.get('/posts/1')
    const duration = Date.now() - startTime
    resultEl.className = 'result success'
    resultEl.textContent = `✅ 首次请求完成（耗时 ${duration}ms）\n\n${JSON.stringify(response.data, null, 2)}`
  } catch (error) {
    resultEl.className = 'result error'
    resultEl.textContent = `❌ 请求失败：${error}`
  }
})

// 缓存请求示例（再次）
document.getElementById('btn-http-cache-again')?.addEventListener('click', async () => {
  const resultEl = document.getElementById('cache-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  
  const startTime = Date.now()
  resultEl.textContent = '再次请求中（应该使用缓存）...'

  try {
    const response = await httpClient.get('/posts/1')
    const duration = Date.now() - startTime
    resultEl.className = 'result success'
    resultEl.textContent = `✅ 缓存请求完成（耗时 ${duration}ms，远快于首次！）\n\n${JSON.stringify(response.data, null, 2)}`
  } catch (error) {
    resultEl.className = 'result error'
    resultEl.textContent = `❌ 请求失败：${error}`
  }
})

// ==================== 日期示例 ====================

// 日期格式化
document.getElementById('btn-date-format')?.addEventListener('click', () => {
  const resultEl = document.getElementById('date-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const date = now()
  const results = [
    `ISO 格式：${format(date, DateFormats.ISO)}`,
    `日期时间：${format(date, DateFormats.DATETIME)}`,
    `日期：${format(date, DateFormats.DATE)}`,
    `时间：${format(date, DateFormats.TIME)}`,
    `中文日期：${format(date, DateFormats.DATE_ZH)}`,
    `美式日期：${format(date, DateFormats.DATE_US)}`,
    `欧式日期：${format(date, DateFormats.DATE_EU)}`,
  ]
  
  resultEl.textContent = results.join('\n')
})

// 相对时间
document.getElementById('btn-date-relative')?.addEventListener('click', () => {
  const resultEl = document.getElementById('date-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const dates = [
    { label: '1 小时前', date: subtract(now(), 1, 'hour') },
    { label: '3 天前', date: subtract(now(), 3, 'day') },
    { label: '1 周前', date: subtract(now(), 1, 'week') },
    { label: '2 个月前', date: subtract(now(), 2, 'month') },
    { label: '1 年前', date: subtract(now(), 1, 'year') },
  ]
  
  const results = dates.map(({ label, date }) => 
    `${label}：${fromNow(date)}`
  )
  
  resultEl.textContent = results.join('\n')
})

// 智能显示
document.getElementById('btn-date-smart')?.addEventListener('click', () => {
  const resultEl = document.getElementById('date-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const dates = [
    { label: '现在', date: now() },
    { label: '今天早上 9 点', date: today().add(9, 'hour') },
    { label: '昨天下午 3 点', date: yesterday().add(15, 'hour') },
    { label: '3 天前', date: subtract(now(), 3, 'day') },
    { label: '上个月', date: subtract(now(), 1, 'month') },
    { label: '去年', date: subtract(now(), 1, 'year') },
  ]
  
  const results = dates.map(({ label, date }) => 
    `${label}：${smartFormat(date)}`
  )
  
  resultEl.textContent = results.join('\n')
})

// 日期加减
document.getElementById('btn-date-calc')?.addEventListener('click', () => {
  const resultEl = document.getElementById('calc-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const base = today()
  const results = [
    `基准日期：${format(base, DateFormats.DATE)}`,
    ``,
    `加 1 天：${format(add(base, 1, 'day'), DateFormats.DATE)}`,
    `加 1 周：${format(add(base, 1, 'week'), DateFormats.DATE)}`,
    `加 1 月：${format(add(base, 1, 'month'), DateFormats.DATE)}`,
    `加 1 年：${format(add(base, 1, 'year'), DateFormats.DATE)}`,
    ``,
    `减 1 天：${format(subtract(base, 1, 'day'), DateFormats.DATE)}`,
    `减 1 周：${format(subtract(base, 1, 'week'), DateFormats.DATE)}`,
    `减 1 月：${format(subtract(base, 1, 'month'), DateFormats.DATE)}`,
    `减 1 年：${format(subtract(base, 1, 'year'), DateFormats.DATE)}`,
  ]
  
  resultEl.textContent = results.join('\n')
})

// 日期差值
document.getElementById('btn-date-diff')?.addEventListener('click', () => {
  const resultEl = document.getElementById('calc-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const date1 = today()
  const date2 = add(date1, 100, 'day')
  
  const results = [
    `日期1：${format(date1, DateFormats.DATE)}`,
    `日期2：${format(date2, DateFormats.DATE)}`,
    ``,
    `相差天数：${diff(date2, date1, 'day')} 天`,
    `相差小时：${diff(date2, date1, 'hour')} 小时`,
    `相差分钟：${diff(date2, date1, 'minute')} 分钟`,
    `相差周数：${diff(date2, date1, 'week')} 周`,
    `相差月数：${diff(date2, date1, 'month')} 月`,
  ]
  
  resultEl.textContent = results.join('\n')
})

// 日期比较
document.getElementById('btn-date-compare')?.addEventListener('click', () => {
  const resultEl = document.getElementById('calc-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const t = today()
  const y = yesterday()
  const tm = tomorrow()
  
  const results = [
    `今天：${format(t, DateFormats.DATE)}`,
    `昨天：${format(y, DateFormats.DATE)}`,
    `明天：${format(tm, DateFormats.DATE)}`,
    ``,
    `昨天 < 今天：${isBefore(y, t)}`,
    `今天 < 明天：${isBefore(t, tm)}`,
    `明天 > 今天：${isAfter(tm, t)}`,
    `今天 > 昨天：${isAfter(t, y)}`,
  ]
  
  resultEl.textContent = results.join('\n')
})

// 更新当前时间信息
function updateTimeInfo() {
  document.getElementById('current-time')!.textContent = format(now(), DateFormats.TIME)
  document.getElementById('today-date')!.textContent = format(today(), DateFormats.DATE)
  document.getElementById('this-week')!.textContent = `${format(startOfWeek(), 'MM-DD')} ~ ${format(endOfWeek(), 'MM-DD')}`
  document.getElementById('this-month')!.textContent = `${format(startOfMonth(), 'MM-DD')} ~ ${format(endOfMonth(), 'MM-DD')}`
}

updateTimeInfo()
setInterval(updateTimeInfo, 1000)

// ==================== 工具函数示例 ====================

// 防抖示例
let debounceCount = 0
const debouncedFn = debounce(() => {
  const resultEl = document.getElementById('util-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  resultEl.textContent = `✅ 防抖函数执行（点击次数：${debounceCount}）\n最后一次点击 500ms 后才会执行`
  debounceCount = 0
}, 500)

document.getElementById('btn-debounce')?.addEventListener('click', () => {
  debounceCount++
  const resultEl = document.getElementById('util-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  resultEl.textContent = `点击次数：${debounceCount}\n等待中...（继续点击会重置计时器）`
  debouncedFn()
})

// 节流示例
let throttleCount = 0
let throttleExecuted = 0
const throttledFn = throttle(() => {
  throttleExecuted++
  const resultEl = document.getElementById('util-result')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  resultEl.textContent = `✅ 节流函数执行\n点击次数：${throttleCount}\n实际执行：${throttleExecuted} 次\n（每 1000ms 最多执行 1 次）`
}, 1000)

document.getElementById('btn-throttle')?.addEventListener('click', () => {
  throttleCount++
  throttledFn()
})

// 深度克隆示例
document.getElementById('btn-clone')?.addEventListener('click', () => {
  const resultEl = document.getElementById('util-result2')!
  resultEl.style.display = 'block'
  resultEl.className = 'result success'
  
  const original = {
    name: 'UseKit',
    version: '0.1.0',
    nested: {
      features: ['HTTP', 'Date', 'Utils'],
      config: { enabled: true },
    },
    date: new Date(),
  }
  
  const cloned = deepClone(original)
  cloned.nested.features.push('New Feature')
  
  resultEl.textContent = `原始对象：\n${JSON.stringify(original, null, 2)}\n\n克隆对象：\n${JSON.stringify(cloned, null, 2)}\n\n✅ 修改克隆对象不会影响原始对象`
})

// 延迟执行示例
document.getElementById('btn-sleep')?.addEventListener('click', async () => {
  const resultEl = document.getElementById('util-result2')!
  resultEl.style.display = 'block'
  resultEl.className = 'result loading'
  resultEl.textContent = '延迟 2 秒执行...'
  
  await sleep(2000)
  
  resultEl.className = 'result success'
  resultEl.textContent = '✅ 延迟执行完成！'
})

console.log('🚀 UseKit 示例已加载')

