import axiosInstance from '../hooks/axiosInstance';
import { MovieRatingData } from '@/types';

export const getMovieRatingApi = async (id: number) => {
  return await axiosInstance.get(`/ratings?movie_id=${id}`);
};

export const addMovieRatingApi = async (data: MovieRatingData) => {
  return await axiosInstance.post('/ratings', data);
}

export const updateMovieRatingApi = async (data: MovieRatingData, id: string) => {
  return await axiosInstance.put(`/ratings/${id}`, data);
}

export const deleteMovieRatingApi = async (id: string) => {
  return await axiosInstance.delete(`/ratings/${id}`);
}
