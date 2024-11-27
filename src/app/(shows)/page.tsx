"use client"
import type { CategorizedShows } from "@/types"
import Hero from "@/components/hero"
import ShowsContainer from "@/components/shows-container"
import { getMovies } from "@/lib/api/movies"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/show-loading"
import { useLoadingStore } from "@/stores/loading"

export default function Home() {

  // const [isLoading, setIsLoading] = useState(true);
  const loadingStore = useLoadingStore()
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // setIsLoading(true);
        loadingStore.setIsLoading(true);
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
    <section>
      <div className="pb-16 pt-10">
        <Hero shows={allShowsByCategory[0]?.shows ?? []} />
        <ShowsContainer shows={allShowsByCategory} />
      </div>
      {
        loadingStore.isLoading && <LoadingSpinner />
      }
    </section>
  )
}
