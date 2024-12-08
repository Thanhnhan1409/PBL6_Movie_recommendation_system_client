"use client"
import type { CategorizedShows, ProfileDataState } from "@/types"
import Hero from "@/components/hero"
import ShowsContainer from "@/components/shows-container"
import { getMoviesByGenreApi, getRecentlyViewApi, trendingMoviesApi } from "@/lib/api/movies"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/show-loading"
import { useLoadingStore } from "@/stores/loading"
import { useProfileStore } from "@/stores/profile"
import { useSearchStore } from "@/stores/search"
import { ReloadOutlined } from "@ant-design/icons"

export default function Home() {

  const loadingStore = useLoadingStore()
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);
  const profileStore  = useProfileStore()
  const searchStore  = useSearchStore()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        loadingStore.setIsLoading(true);
        if(profileStore.activeProfile?.age && profileStore.activeProfile?.age >= 14){
          const trendingRes = await trendingMoviesApi();
          const actionRes = await getMoviesByGenreApi('12,28');
          const romanceRes = await getMoviesByGenreApi('10749');
          const comedyRes = await getMoviesByGenreApi('35');
          const recentlyViewRes = await getRecentlyViewApi();
          const categorizedShows: CategorizedShows[] = [
            {
              title: "Trending Now",
              shows: trendingRes.data?.data,
            },
            {
              title: "Continue Watching List",
              shows: recentlyViewRes.data?.data,
            },
            {
              title: "Action & Adventure Movies",
              shows: actionRes.data?.data,
            },
            {
              title: "Comedy Movies",
              shows: comedyRes.data?.data,
            },
            {
              title: "Romantice Movies",
              shows: romanceRes.data?.data,
            },
          ];
          setAllShowsByCategory(categorizedShows);
        } else {
          const firstCartoonRes = await getMoviesByGenreApi('16', 1);
          const secondCartoonRes = await getMoviesByGenreApi('16', 2);
          const firstFamilyRes = await getMoviesByGenreApi('10751');
          const recentlyViewRes = await getRecentlyViewApi();
          const secondFamilyRes = await getMoviesByGenreApi('10751', 2);
          const categorizedShows: CategorizedShows[] = [
            {
              title: "Netflix’s Top Animated Treasures",
              shows: firstCartoonRes.data?.data,
            },
            {
              title: "Continue Watching List",
              shows: recentlyViewRes.data?.data,
            },
            {
              title: "Must-See Animation on Netflix",
              shows: secondCartoonRes.data?.data,
            },
            {
              title: "Family Favorites on Netflix",
              shows: firstFamilyRes.data?.data,
            },
            {
              title: "Netflix Picks for Family Time",
              shows: secondFamilyRes.data?.data,
            },
          ];
          setAllShowsByCategory(categorizedShows);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setTimeout(() => loadingStore.setIsLoading(false), 500);
      }
    };
    fetchMovies();
  }, [profileStore.activeProfile]);

  return (
    <section>
        <div className="pb-16 pt-10">
          <Hero shows={allShowsByCategory[3]?.shows ?? []} />
          <ShowsContainer shows={allShowsByCategory} />
          {
            searchStore.isFetching && <ReloadOutlined className="animate-spin"/>
          }
        </div>
        {
          loadingStore.isLoading && <LoadingSpinner />
        }
    </section>
  )
}
