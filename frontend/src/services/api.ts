import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000',
})

api.interceptors.request.use((config: AxiosRequestConfig) => {

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = "bearer " + token
  }

  return config
})


export default api;
