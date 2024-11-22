import { UserLogin, UserSignup } from '@/types';
import axiosInstance from '../axiosInstance';
import { NextResponse, NextRequest } from 'next/server'
import Cookies from 'js-cookie';

export const login = async (data: UserLogin) => {
  try {
    const res = await axiosInstance.post('/users/login', data);
    if(res.status === 200) {
      Cookies.set('authToken', res.data.access_token, { expires: 7 });
      console.log('res.data.access_token', res.data.access_token);
      console.log('Cookies.get(authToken)', Cookies.get('authToken'));
      localStorage.setItem('authToken', res.data.access_token);
    }
    // axios.defaults.headers.common = {'Authorization': `Bearer ${Cookies.get('authToken')}`}
    return res.data;
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
