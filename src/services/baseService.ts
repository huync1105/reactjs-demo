import axios, {type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { useAuthStore } from '../store/authStore'

export class BaseService {
  protected client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL: `${import.meta.env.VITE_API_BASE_URL}${baseURL}` });

    this.client.interceptors.request.use((config) => {
      const token = useAuthStore.getState().accessToken
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        }
      }
      return config
    })
  }

  protected get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  protected post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config)
  }

  protected put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }

  protected delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }
}

