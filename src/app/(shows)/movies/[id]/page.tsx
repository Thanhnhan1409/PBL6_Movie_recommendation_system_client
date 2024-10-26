"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { env } from "@/env.mjs"
import { useModalStore } from "@/stores/modal"
import { useProfileStore } from "@/stores/profile"
import type { Genre, ShowWithGenreAndVideo } from "@/types"
import { useIsMutating } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import ReactPlayer from "react-player/lazy"
import { cn, getYear } from "@/lib/utils"
import DynamicTooltip from "@/components/dynamic-tooltip"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"

interface ShowModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const MovieDetail = ({ open, setOpen }: ShowModalProps) => {
  const router = useRouter()
  // stores
  const modalStore = useModalStore()
  const profileStore = useProfileStore()

  const [trailer, setTrailer] = React.useState("")
  const [genres, setGenres] = React.useState<Genre[]>([])
  const [isMuted, setIsMuted] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isAdded, setIsAdded] = React.useState(false)

  // get trailer and genres of show
  React.useEffect(() => {
    const getShow = async () => {
      if (!modalStore.show) return

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${modalStore.show?.id}?api_key=${
            env.NEXT_PUBLIC_TMDB_API_KEY
          }&language=en-US&append_to_response=videos`
        )
        const data = (await response.json()) as ShowWithGenreAndVideo
        if (data?.videos) {
          const trailerIndex = data.videos.results.findIndex(
            (item) => item.type === "Trailer"
          )
          setTrailer(data.videos?.results[trailerIndex]?.key ?? "")
        }
        if (data?.genres) {
          setGenres(data.genres)
        }
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Something went wrong"
        )
      }
    }
    void getShow()
  }, [modalStore.show])

  React.useEffect(() => {
    if (modalStore.play) {
      setIsPlaying(true)
    } else {
      setIsPlaying(false)
    }
  }, [modalStore.play])

  React.useEffect(() => {
    if (isPlaying) {
      setIsMuted(false)
    } else {
      setIsMuted(true)
    }
  }, [isPlaying])

  // user query
  
  return (
    <div>hijiii</div>
  )
}

export default MovieDetail
