// lib/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';
import { cookies } from 'next/headers'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});
const isServer = typeof window === 'undefined'
// Add a request interceptor
axiosInstance.interceptors.request.use(
  async function (config) {
    // if(isServer) {
    //   const cookieStore = await cookies()
    //   const token = cookieStore.get('authToken')
    //   config.headers['Authorization'] = `Bearer ${token?.value}`
    // } else {
    //   const token = Cookies.get('authToken');
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    // console.log('Request:', token);
    
    config.headers['Authorization'] = "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjczYTA4NjAzNjljNjdmMWJkNWVlYmI4IiwiZXhwaXJlcyI6MTczMjI5NDk3Ny4wNjg2MDg1fQ.UNe2Q45HisAGZEzPpAnzVB1veYp2fYDyObEL6bWMl5A"
    return config
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    console.log('Response:', response);
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized, logging out...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;