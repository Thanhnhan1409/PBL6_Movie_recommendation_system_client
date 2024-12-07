import { UserLogin, UserSignup, ChildUserSignup, ProfileDataState, ChildProfile } from '@/types';
import axiosInstance from '../hooks/axiosInstance';
import axios from 'axios';
import Cookies from 'js-cookie';

export const login = async (data: UserLogin) => {
  try {
    const res = await axiosInstance.post('/users/login', data);
    if(res.status === 200) {
      localStorage.setItem('authToken', res.data.access_token);
      localStorage.setItem('parentAuthToken', res.data.access_token);
      Cookies.set('authToken', res.data.access_token, { expires: 7 });
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (data: UserSignup) => {
  return await axiosInstance.post('/users', data);
}

export const getMe = async () => {
  return await axiosInstance.get('/users/get-me');
}

export const signupChild = async (data: ChildUserSignup) => {
  return await axiosInstance.post('/users/childs', data);
}

export const getChildrenApi = async () => {
  const token = localStorage.getItem("parentAuthToken")
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/childs`, { headers: { Authorization: `Bearer ${token}` } });
}

export const chooseProfileApi = async (data: ChildProfile) => {
  return axiosInstance.post('/users/choose-profile', data);
}
