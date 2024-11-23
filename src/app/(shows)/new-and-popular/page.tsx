import type { Metadata } from "next"
import type { CategorizedShows } from "@/types"

import { getNewAndPopularShows } from "@/lib/fetchers"
import ShowsContainer from "@/components/shows-container"
import { popularMoviesApi, tvPopularMoviesApi } from "@/lib/api/movies"

export const metadata: Metadata = {
  title: "New & Popular",
  description: "All new and popular shows grouped by genre",
}

export default async function NewAndPopularPage() {
  const popularMovie = await popularMoviesApi()
  const tvPopular = await tvPopularMoviesApi()

  const allShowsByCategory: CategorizedShows[] = [
    {
      title: "Popular TV Shows",
      shows: popularMovie.data.data,
    },
    {
      title: "Popular Movies",
      shows:  popularMovie.data.data,
    },
  ]

  return (
    <section className="pb-16 pt-10">
      <ShowsContainer shows={allShowsByCategory} />
    </section>
  )
}
