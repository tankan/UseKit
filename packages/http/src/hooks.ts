/**
 * HTTP Hooks
 * 提供响应式的 HTTP 请求能力
 */

import type { RequestState } from './types'

/**
 * 创建请求状态
 */
export function createRequestState<T = any>(): RequestState<T> {
  return {
    loading: false,
    data: null,
    error: null,
    success: false,
  }
}

/**
 * 更新请求状态
 */
export function updateRequestState<T = any>(
  state: RequestState<T>,
  updates: Partial<RequestState<T>>
): RequestState<T> {
  return { ...state, ...updates }
}

/**
 * useRequest Hook 工厂
 * 用于在不同框架中实现响应式请求
 */
export function createUseRequest() {
  return function useRequest<T = any>(
    requestFn: () => Promise<T>,
    config?: {
      immediate?: boolean
      onSuccess?: (data: T) => void
      onError?: (error: Error) => void
    }
  ) {
    const state = createRequestState<T>()

    const execute = async () => {
      state.loading = true
      state.error = null

      try {
        const data = await requestFn()
        state.data = data
        state.success = true
        config?.onSuccess?.(data)
      } catch (error) {
        state.error = error as Error
        state.success = false
        config?.onError?.(error as Error)
      } finally {
        state.loading = false
      }
    }

    if (config?.immediate !== false) {
      execute()
    }

    return {
      state,
      execute,
      reset: () => {
        Object.assign(state, createRequestState<T>())
      },
    }
  }
}

