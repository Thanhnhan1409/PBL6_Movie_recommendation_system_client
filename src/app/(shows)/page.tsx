"use client"
import type { CategorizedShows, ProfileDataState } from "@/types"
import Hero from "@/components/hero"
import ShowsContainer from "@/components/shows-container"
import { getMoviesByGenreApi, getRecentlyViewApi, trendingMoviesApi } from "@/lib/api/movies"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/show-loading"
import { useLoadingStore } from "@/stores/loading"
import { useProfileStore } from "@/stores/profile"
import { motion } from "framer-motion"
import AddChildAccount from "@/components/forms/add-child-account"
import ProfileCard from "@/components/profile-card"
import { chooseProfileApi, getChildrenApi } from "@/lib/api/auth"
import { useSearchStore } from "@/stores/search"
import { ReloadOutlined } from "@ant-design/icons"
import { redirect } from "next/navigation"

export default function Home() {

  const loadingStore = useLoadingStore()
  const [allShowsByCategory, setAllShowsByCategory] = useState<CategorizedShows[]>([]);
  const profileStore  = useProfileStore()
  const searchStore  = useSearchStore()
  const [isChangeProfile, setIsChangeProfile] = useState<number>(0);
  const [isChild, setIsChild] = useState<boolean>(false);
  
  const onChooseProfile = async (data: ProfileDataState) => {
    profileStore.setActiveProfile(data);
    profileStore.setChooseProfile(true);
    setIsChangeProfile(pre => pre + 1);
    if(data?.age && data.age < 13){
      setIsChild(true);
    } else setIsChild(false);
    try {
      loadingStore.setIsLoading(true);
      const res = await chooseProfileApi({
        user_id: data.id,
        parent_id: data.parent_id
      });
      localStorage.setItem('authToken', res?.data?.access_token ?? '');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const session = localStorage.getItem('authToken');
    if(!session) {
      redirect('/login')
    }
    loadingStore.setIsLoading(true);
    const getListChildren = async () => {
      try {
        loadingStore.setIsLoading(true);
        const res = await getChildrenApi();
        profileStore.setChildrenProfiles(res?.data);
      } catch (error) {
        console.error("Failed to fetch children:", error);
      } finally {
        // setTimeout(() => loadingStore.setIsLoading(false), 500);
      }
    }

    getListChildren();
  }, [profileStore.chooseProfile]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        loadingStore.setIsLoading(true);
        if(!isChild){
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
          const secondFamilyRes = await getMoviesByGenreApi('10751', 2);
          const categorizedShows: CategorizedShows[] = [
            {
              title: "Netflix’s Top Animated Treasures",
              shows: firstCartoonRes.data?.data,
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
  }, [isChangeProfile]);

  return (
    <section>
      {profileStore?.chooseProfile || (profileStore.parentProfile?.age ?? 0) < 18 ? (
        <>
          <div className="pb-16 pt-10">
          <Hero shows={allShowsByCategory[0]?.shows ?? []} />
          <ShowsContainer shows={allShowsByCategory} />
          {
            searchStore.isFetching && <ReloadOutlined className="animate-spin"/>
          }
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
        <h2 className="text-center text-3xl font-medium sm:text-4xl">
          Who watching?
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-2 pb-8 sm:gap-4 md:gap-8">
          <ProfileCard profile={profileStore.parentProfile} handleClick={() => onChooseProfile({
            ...profileStore.parentProfile,
            avatar: '/images/Netfli5.png'
          })}/>
          {profileStore.childrenProfiles?.length > 0 && profileStore.childrenProfiles?.map((child, index) => (
            <ProfileCard key={index} profile={profileStore.childrenProfiles[index]} image={index+1} handleClick={() => onChooseProfile({
              ...profileStore.childrenProfiles[index],
              avatar: `/images/Netfli${index + 1}.png`
            })}/>
          ))}
          {profileStore.childrenProfiles?.length < 4 && <AddChildAccount />}
        </div>
      </motion.div>
      )
      }
    </section>
  )
}
