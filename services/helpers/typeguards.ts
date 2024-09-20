import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return isObject(error) && 'status' in error
}

export function isApiError(error: unknown): error is ApiError {
  return isObject(error) && 'error' in error && 'statusCode' in error
}

type ApiError = {
  error: string
  messages: Array<{ field: string; message: string }> | string
  statusCode: number
}
