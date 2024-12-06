"use client"

import { usePathname } from "next/navigation"
import { useMounted } from "@/hooks/use-mounted"
import { useModalStore } from "@/stores/modal"
import { useSearchStore } from "@/stores/search"
import type { CategorizedShows, SessionUser } from "@/types"

import { cn } from "@/lib/utils"
import ShowModal from "@/components/show-modal"
import ShowsCarousel from "@/components/shows-carousel"
import ShowsGrid from "@/components/shows-grid"
import ShowsSkeleton from "@/components/shows-skeleton"
import { getMoviesSearchApi } from "@/lib/api/movies"

interface ShowsContainerProps {
  shows: CategorizedShows[]
}

const ShowsContainer = ({ shows }: ShowsContainerProps) => {
  const path = usePathname()
  const mounted = useMounted()

  // stores
  const modalStore = useModalStore()
  const searchStore = useSearchStore()

  if (!mounted) return <ShowsSkeleton />

  if (searchStore.query.length > 0) {
    return <ShowsGrid shows={searchStore.shows} />
    
  }

  return (
    <div
      className={cn("w-full space-y-5 sm:space-y-10", path === "/" && "pt-24")}
    >
      {modalStore.open ? (
        <ShowModal open={modalStore.open} setOpen={modalStore.setOpen} />
      ) : null}
      {shows?.map((item) => (
        <ShowsCarousel
          key={item.title}
          title={item.title}
          shows={item.shows ?? []}
        />
      ))}
    </div>
  )
}

export default ShowsContainer
