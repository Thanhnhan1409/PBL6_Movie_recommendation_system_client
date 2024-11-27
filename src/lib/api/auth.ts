import { UserLogin, UserSignup } from '@/types';
import axiosInstance from '../hooks/axiosInstance';
export const login = async (data: UserLogin) => {
  try {
    const res = await axiosInstance.post('/users/login', data);
    if(res.status === 200) {
      localStorage.setItem('authToken', res.data.access_token);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: UserSignup) => {
  return await axiosInstance.post('/users', data);
}
