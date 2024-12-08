"use client"
import { useEffect } from "react"
import { motion } from "framer-motion"
import AddChildAccount from "../forms/add-child-account"
import ProfileCard from "../profile-card"
import { chooseProfileApi, getChildrenApi } from "@/lib/api/auth"
import { useProfileStore } from "@/stores/profile"
import { useLoadingStore } from "@/stores/loading"
import { redirect, useRouter } from "next/navigation"
import { ProfileDataState } from "@/types"

const ProfilePicker = () => {
  const loadingStore = useLoadingStore()
  const profileStore  = useProfileStore()
  const router = useRouter()
  
  const onChooseProfile = async (data: ProfileDataState) => {
    profileStore.setActiveProfile(data);
    profileStore.setChooseProfile(true);
    try {
      loadingStore.setIsLoading(true);
      const res = await chooseProfileApi({
        user_id: data.id,
        parent_id: data.parent_id
      });
      localStorage.setItem('authToken', res?.data?.access_token ?? '');
      setTimeout(() => router.push('/'), 500)
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
        loadingStore.setIsLoading(false);
      }
    }

    getListChildren();
  }, [profileStore.chooseProfile]);

  return (
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

export default ProfilePicker;