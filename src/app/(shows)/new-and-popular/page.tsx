"use client"
import type { Metadata } from "next"
import type { CategorizedShows } from "@/types"

import { getNewAndPopularShows } from "@/lib/fetchers"
import ShowsContainer from "@/components/shows-container"
import { getMovies, popularMoviesApi, tvPopularMoviesApi } from "@/lib/api/movies"
import { useEffect, useState } from "react"
import { useLoadingStore } from "@/stores/loading"
import LoadingSpinner from "@/components/show-loading"

export default async function NewAndPopularPage() {
  const loadingStore = useLoadingStore();
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      loadingStore.setIsLoading(true);
      try {
        const allShows = await getMovies();
        const categorizedShows: CategorizedShows[] = [
          {
            title: "Trending Now",
            shows: allShows?.trendingMovies,
          },
          {
            title: "Popular on Netflix",
            shows: allShows?.popularMovies,
          },
          {
            title: "Popular TV Shows",
            shows: allShows?.tvPopularMovies,
          },
          {
            title: "Trending TV Shows",
            shows: allShows?.tvTrendingMovies,
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
