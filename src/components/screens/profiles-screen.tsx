"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useMounted } from "@/hooks/use-mounted"
import SiteFooter from "@/components/layouts/site-footer"
import SiteHeader from "@/components/layouts/site-header"

interface ProfilesScreenProps {
  children: React.ReactNode
}

const ProfilesScreen = ({ children }: ProfilesScreenProps) => {
  const [session, setSession] = React.useState<string>()
  React.useEffect(() => {
    const session = localStorage.getItem("session")
    if (session) {
      setSession(session)
    }
  }, [session])
  // profiles query
  // const profilesQuery = api.profile.getAll.useQuery(undefined, {
  //   enabled: !!session?.user,
  // })

  // profile store
  // const profileStore = useProfileStore()

  // reset profile store on sign out
  React.useEffect(() => {
    if (!session) {
      // useProfileStore.persist.clearStorage()
      console.log(111);
      
    }
  }, [session])

  // if (mounted) {
  //   return (
  //     <AnimatePresence>
  //       <motion.div
  //         className="container w-full max-w-screen-2xl"
  //         initial={{ opacity: 0, scale: 0.9 }}
  //         animate={{ opacity: 1, scale: 1 }}
  //         exit={{ opacity: 0, scale: 0.9 }}
  //         transition={{ duration: 0.3 }}
  //       >
  //         <PinForm />
  //       </motion.div>
  //     </AnimatePresence>
  //   )
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader/>
        <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}

export default ProfilesScreen
