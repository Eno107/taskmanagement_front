import { apiClient, ApiError } from './client'

type CreateUserPayload = {
  clerkId: string
  email: string
  name: string
  avatarUrl?: string
}

type User = {
  id: string
  clerkId: string
  email: string
  name: string
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

export async function createUser(token: string, payload: CreateUserPayload): Promise<User> {
  return apiClient<User>('/users', {
    method: 'POST',
    token,
    body: payload,
  })
}

export async function getMe(token: string): Promise<User | null> {
  try {
    return await apiClient<User>('/users/me', { token })
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) {
      return null
    }
    throw err
  }
}
