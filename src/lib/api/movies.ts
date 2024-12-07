import { AllMoviesData } from '@/types';
import axiosInstance from '../hooks/axiosInstance';

export const popularMoviesApi = async (page: number = 1)=> {
  return await axiosInstance.get(`/tmdb-movies/polular?page=${page}`)
}

export const trendingMoviesApi = async (page: number = 1)=> {
  return await axiosInstance.get(`/tmdb-movies/trending?page=${page}`)
}

export const tvPopularMoviesApi = async (page: number = 1)=> {
  return await axiosInstance.get(`/tmdb-movies/tv/popular?page=${page}`)
}

export const tvTrendingMoviesApi = async (page: number = 1)=> {
  return await axiosInstance.get(`/tmdb-movies/tv/trending?page=${page}`)
}

export const detailMovieApi = async (id: number)=> {
  return await axiosInstance.get(`/tmdb-movies/?movie_id=${id}`)
}

export const recommendMoviesApi = async (id: number, page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/recommendations?movie_id=${id}&page=${page}`)
}

export const getMovies = async (page: number = 1) : Promise<AllMoviesData> => {
  try {
    const popularMovies = await popularMoviesApi(page)
    const trendingMovies = await trendingMoviesApi(page)
    const tvPopularMovies = await tvPopularMoviesApi(page)
    const tvTrendingMovies = await tvTrendingMoviesApi(page)
    return {
      popularMovies: popularMovies.data?.data ?? [],
      trendingMovies: trendingMovies.data?.data ?? [],
      tvPopularMovies: tvPopularMovies.data?.data ?? [],
      tvTrendingMovies: tvTrendingMovies.data?.data ?? []
    }
  } catch (error) {
    console.error(error);
    return {
      popularMovies: [],
      trendingMovies: [],
      tvPopularMovies: [],
      tvTrendingMovies: []
    };
  }
}

export const getMoviesSearchApi = async ( page: number = 1, query: string = '') => {
  return await axiosInstance.get(`/tmdb-movies/search?key_word=${query}&page=${page}`)
}

export const getRecentlyViewApi = async () => {
  return await axiosInstance.get(`/tmdb-movies/recently-viewed`)
}

export const getGenresApi = async () => {
  return await axiosInstance.get(`/tmdb-movies/genres`)
}

export const getMoviesByGenreApi = async (genreId: string, page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/discover?page=${page}&genre=${genreId}`)
}

export const viewMoviewByIdApi = async (movie_id: number) => {
  return await axiosInstance.post(`/tmdb-movies/view?movie_id=${movie_id}`)
}