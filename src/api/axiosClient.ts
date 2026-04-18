
import axios from "axios";

const axiosClient = axios.create({

   baseURL: "https://thanhhoai23-dermatology-hospital-api.hf.space",
   timeout: 120000, // 120s - Space có thể mất vài phút để khởi động nếu đang ngủ
});

// Add request interceptor
axiosClient.interceptors.request.use(
   function (config: any) {
      // Add authorization header with JWT token
    
      const token = localStorage.getItem('token');
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   function (error) {
      return Promise.reject(error);
   }
);


axiosClient.interceptors.response.use(
   function (response) {
   
      return response;
   },
   function (error) {
      
      if (error.response) {
       
         return Promise.reject(error.response.data);
      } else if (error.request) {
         
         return Promise.reject({ message: 'No response from server' });
      } else {
         
         return Promise.reject({ message: error.message });
      }
   }
);

export default axiosClient;


