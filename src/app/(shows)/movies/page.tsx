"use client"
import type { CategorizedShows } from "@/types"

// import { getShows } from "@/lib/fetchers"
// import { getCurrentUser } from "@/lib/session"
import ShowsContainer from "@/components/shows-container"
import { useEffect, useState } from "react"
import { getMovies } from "@/lib/api/movies"
import LoadingSpinner from "@/components/show-loading"


export default function MoviesPage() {
  const [loading, setLoading] = useState(true);
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
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
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  return (
    <section className="pb-16 pt-10">
      <ShowsContainer shows={allShowsByCategory} />
      { loading && <LoadingSpinner /> }
    </section>
  )
}
