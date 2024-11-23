import axiosInstance from '../axiosInstance';

export const popularMoviesApi = async (page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/polular?page=${page}`)
}

export const trendingMoviesApi = async (page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/trending?page=${page}`)
}

export const tvPopularMoviesApi = async (page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/tv/popular?page=${page}`)
}

export const tvTrendingMoviesApi = async (page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/tv/trending?page=${page}`)
}

export const detailMovieApi = async (id: number) => {
  return await axiosInstance.get(`/tmdb-movies/?movie_id=${id}`)
}

export const recommendMoviesApi = async (id: number, page: number = 1) => {
  return await axiosInstance.get(`/tmdb-movies/recommendations?movie_id=${id}&page=${page}`)
}

export const getMovies = async (page: number = 1) => {
  // const token = localStorage.getItem('authToken');
  try {
    console.log(11111111);
    
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
