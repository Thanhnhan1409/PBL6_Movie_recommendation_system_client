import { UserLogin, UserSignup } from '@/types';
import axiosInstance from '../hooks/axiosInstance';
import { NextResponse, NextRequest } from 'next/server'
import Cookies from 'js-cookie';

export const login = async (data: UserLogin) => {
  try {
    const res = await axiosInstance.post('/users/login', data);
    if(res.status === 200) {
      // Cookies.set('authToken', res.data.access_token, { expires: 7 });
      localStorage.setItem('authToken', res.data.access_token);
    }
    // axios.defaults.headers.common = {'Authorization': `Bearer ${Cookies.get('authToken')}`}
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: UserSignup) => {
  return await axiosInstance.post('/users', data);
}
