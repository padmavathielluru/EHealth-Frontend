import axios, { AxiosError } from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/",
  headers: { "Content-Type": "application/json" },
});

// ✅ Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
   if(error.response){
    if (error.response?.status === 401) {
      console.error("Unauthorized! Logging out...");
    }
     if (error.response?.status === 404) {
      console.error("Unauthorized! Logging out...");
    }
     if (error.response?.status === 500) {
      console.error("Unauthorized! Logging out...");
    }
  }else{
    console.error("Network Error:",error.message);
  }
    return Promise.reject(error);
  }
);

export default apiClient;
