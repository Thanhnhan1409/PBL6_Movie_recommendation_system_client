"use client"
import type { CategorizedShows } from "@/types"
import Hero from "@/components/hero"
import ShowsContainer from "@/components/shows-container"
import { getMovies } from "@/lib/api/movies"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/show-loading"
import { useLoadingStore } from "@/stores/loading"
import { useProfileStore } from "@/stores/profile"
import { motion } from "framer-motion"
import AddChildAccount from "@/components/forms/add-child-account"
import ProfileCard from "@/components/profile-card"

export default function Home() {

  // const [isLoading, setIsLoading] = useState(true);
  const loadingStore = useLoadingStore()
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);
  const profileStore  = useProfileStore()
  
  const onChooseProfile = () => { 
    profileStore.setChooseProfile(true);
  }
  
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
  }, [profileStore.chooseProfile]);
  
  return (
    <section>
      {profileStore?.chooseProfile || (profileStore.parentProfile?.age ?? 0) < 18 ? (
        <>
          <div className="pb-16 pt-10">
          <Hero shows={allShowsByCategory[0]?.shows ?? []} />
          <ShowsContainer shows={allShowsByCategory} />
        </div>
        {
          loadingStore.isLoading && <LoadingSpinner />
        }
      </>
      )
      : 
      (
        <motion.div
        className="flex min-h-screen w-full min-w-full flex-col items-center justify-center space-y-8 fixed inset-0 bg-[black] z-[100]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-center text-3xl font-medium sm:text-4xl">
          Who watching?
        </h1>
        <div className="flex flex-wrap items-start justify-center gap-2 pb-8 sm:gap-4 md:gap-8">
          <ProfileCard name={profileStore.parentProfile?.fullname} handleClick={onChooseProfile}/>
          {profileStore.childrenProfiles?.length > 0 && profileStore.childrenProfiles?.map((child, index) => (
            <ProfileCard key={index} name={child.fullname} image={index} handleClick={onChooseProfile}/>
          ))}
          {profileStore.childrenProfiles?.length < 4 && <AddChildAccount />}
        </div>
      </motion.div>
      )
      }
    </section>
  )
}
