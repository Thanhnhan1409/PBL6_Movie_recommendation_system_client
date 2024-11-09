import { UserLogin, UserSignup } from '@/types';
import axiosInstance from '../axiosInstance';

export const login = async (data: UserLogin ) => {
  try {
    const response = await axiosInstance.post('/users/login', data);
    if(response.status === 200) {
      localStorage.setItem('authToken', response.data.access_token);
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: UserSignup) => {
  try {
    const response = await axiosInstance.post('/users', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
