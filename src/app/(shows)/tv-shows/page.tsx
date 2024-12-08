"use client";
// import type { Metadata } from "next"
import type { CategorizedShows } from "@/types"
import ShowsContainer from "@/components/shows-container"
import LoadingSpinner from "@/components/show-loading"
import React, { useEffect, useState } from "react"
import { tvPopularMoviesApi, tvTrendingMoviesApi } from "@/lib/api/movies"
import { useLoadingStore } from "@/stores/loading";

// export const metadata: Metadata = {
//   title: "TV Shows",
//   description: "All TV shows grouped by genre",
// }

export default async function TVShowsPage() {
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);
  const loadingStore = useLoadingStore()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        loadingStore.setIsLoading(true);
        const popularRes = await tvPopularMoviesApi();
        const trendingRes = await tvTrendingMoviesApi();
        const categorizedShows: CategorizedShows[] = [
          {
            title: "Popular TV shows",
            shows: popularRes.data?.data,
          },
          {
            title: "Trending TV Shows",
            shows: trendingRes.data?.data,
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
