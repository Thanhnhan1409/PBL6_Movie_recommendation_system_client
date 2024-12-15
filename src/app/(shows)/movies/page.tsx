"use client"
import type { CategorizedShows } from "@/types"

import ShowsContainer from "@/components/shows-container"
import { useEffect, useState } from "react"
import { popularMoviesApi, trendingMoviesApi } from "@/lib/api/movies"
import LoadingSpinner from "@/components/show-loading"
import { useLoadingStore } from "@/stores/loading"


export default function MoviesPage() {
  const loadingStore = useLoadingStore();
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      loadingStore.setIsLoading(true);
      try {
        const popularMovies = await popularMoviesApi()
        const secondPopularMovies = await popularMoviesApi(2)
        const trendingMovies = await trendingMoviesApi()
        const categorizedShows: CategorizedShows[] = [
          {
            title: "Trending Movies Now",
            shows: trendingMovies?.data?.data,
          },
          {
            title: "Popular on Netflix",
            shows: popularMovies?.data?.data,
          },
          {
            title: "Must Watch Movies",
            shows: secondPopularMovies?.data?.data
          },
        ];
        setAllShowsByCategory(categorizedShows);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        loadingStore.setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <section className="pb-16 pt-10">
      <ShowsContainer shows={allShowsByCategory} />
      { loadingStore.isLoading && <LoadingSpinner /> }
    </section>
  )
}
