import axios from "axios";

const apiClient = axios.create()
 
apiClient.interceptors.request.use(async (config: any) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

apiClient.interceptors.response.use(async (response) => {
  if (!response.data) {
    return Promise.reject(response.data)
  }
  return response
}, async (err) => {
  return Promise.reject(err.response);
} )

export default apiClient;
