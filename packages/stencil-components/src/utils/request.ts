import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://172.20.21.124:8443',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    Promise.reject(error)
  }
)

export default instance