/**
 * HTTP 客户端实现
 */

import { createAlova } from 'alova'
import adapterFetch from 'alova/fetch'
import type { HttpClientConfig, RequestConfig, ResponseData } from './types'
import { RetryInterceptor } from './interceptors/retry'
import { CacheInterceptor } from './interceptors/cache'
import { TokenRefreshInterceptor } from './interceptors/token'
import { ConcurrencyInterceptor } from './interceptors/concurrency'

/**
 * 创建 HTTP 客户端
 */
export function createHttpClient(config: HttpClientConfig = {}) {
  const {
    baseURL = '',
    timeout = 30000,
    headers = {},
    retry,
    cache,
    tokenRefresh,
    concurrency,
  } = config

  // 创建 alova 实例
  const alovaInstance = createAlova({
    baseURL,
    timeout,
    requestAdapter: adapterFetch(),
    beforeRequest(method) {
      // 设置默认请求头
      method.config.headers = {
        'Content-Type': 'application/json',
        ...headers,
        ...method.config.headers,
      }
    },
    responded: {
      onSuccess: async (response) => {
        const data = await response.json()
        return {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
        } as ResponseData
      },
      onError: (error) => {
        throw error
      },
    },
  })

  // 创建拦截器
  const retryInterceptor = new RetryInterceptor(retry)
  const cacheInterceptor = new CacheInterceptor(cache)
  const tokenRefreshInterceptor = new TokenRefreshInterceptor(tokenRefresh)
  const concurrencyInterceptor = new ConcurrencyInterceptor(concurrency)

  /**
   * 发送请求
   */
  async function request<T = any>(config: RequestConfig): Promise<ResponseData<T>> {
    const { url, method = 'GET', params, data, ...rest } = config

    // 并发控制
    if (concurrencyInterceptor.enabled) {
      concurrencyInterceptor.checkConcurrency(config)
    }

    // 缓存检查
    if (cacheInterceptor.enabled && method === 'GET') {
      const cachedData = cacheInterceptor.get<T>(config)
      if (cachedData) {
        return cachedData
      }
    }

    // Token 刷新
    if (tokenRefreshInterceptor.enabled) {
      await tokenRefreshInterceptor.ensureTokenValid()
    }

    try {
      // 创建请求方法
      let methodInstance
      switch (method) {
        case 'GET':
          methodInstance = alovaInstance.Get(url, { params, ...rest })
          break
        case 'POST':
          methodInstance = alovaInstance.Post(url, data, { params, ...rest })
          break
        case 'PUT':
          methodInstance = alovaInstance.Put(url, data, { params, ...rest })
          break
        case 'DELETE':
          methodInstance = alovaInstance.Delete(url, { params, ...rest })
          break
        case 'PATCH':
          methodInstance = alovaInstance.Patch(url, data, { params, ...rest })
          break
        case 'HEAD':
          methodInstance = alovaInstance.Head(url, { params, ...rest })
          break
        case 'OPTIONS':
          methodInstance = alovaInstance.Options(url, { params, ...rest })
          break
        default:
          throw new Error(`Unsupported method: ${method}`)
      }

      // 执行请求（带重试）
      let response: ResponseData<T>
      if (retryInterceptor.enabled) {
        response = await retryInterceptor.execute(() => methodInstance.send()) as ResponseData<T>
      } else {
        response = await methodInstance.send() as ResponseData<T>
      }

      // 缓存响应
      if (cacheInterceptor.enabled && method === 'GET') {
        cacheInterceptor.set(config, response)
      }

      return response
    } catch (error) {
      // Token 刷新失败处理
      if (tokenRefreshInterceptor.enabled && tokenRefreshInterceptor.shouldRefresh(error)) {
        await tokenRefreshInterceptor.refresh()
        return request<T>(config)
      }

      throw error
    } finally {
      // 并发控制释放
      if (concurrencyInterceptor.enabled) {
        concurrencyInterceptor.release(config)
      }
    }
  }

  /**
   * GET 请求
   */
  function get<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ResponseData<T>> {
    return request<T>({ ...config, url, method: 'GET' })
  }

  /**
   * POST 请求
   */
  function post<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ResponseData<T>> {
    return request<T>({ ...config, url, method: 'POST', data })
  }

  /**
   * PUT 请求
   */
  function put<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ResponseData<T>> {
    return request<T>({ ...config, url, method: 'PUT', data })
  }

  /**
   * DELETE 请求
   */
  function del<T = any>(url: string, config?: Omit<RequestConfig, 'url' | 'method'>): Promise<ResponseData<T>> {
    return request<T>({ ...config, url, method: 'DELETE' })
  }

  /**
   * PATCH 请求
   */
  function patch<T = any>(url: string, data?: any, config?: Omit<RequestConfig, 'url' | 'method' | 'data'>): Promise<ResponseData<T>> {
    return request<T>({ ...config, url, method: 'PATCH', data })
  }

  return {
    request,
    get,
    post,
    put,
    delete: del,
    patch,
    alova: alovaInstance,
  }
}

/**
 * 导出类型
 */
export type HttpClient = ReturnType<typeof createHttpClient>

