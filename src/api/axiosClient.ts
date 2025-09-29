
import axios from "axios";

const axiosClient = axios.create({

   baseURL: "http://127.0.0.1:8000", // Replace with your API base URL
   timeout: 10000,
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


