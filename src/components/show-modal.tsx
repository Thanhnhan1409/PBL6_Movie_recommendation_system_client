"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useModalStore } from "@/stores/modal"
import type { Genre, MovieVideo } from "@/types"
import ReactPlayer from "react-player/lazy"

import { cn } from "@/lib/utils"
import DynamicTooltip from "@/components/dynamic-tooltip"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import LoadingSpinner from "./show-loading"
import { detailMovieApi } from "@/lib/api/movies"
import { useLoadingStore } from "@/stores/loading"

interface ShowModalProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const ShowModal = ({ open, setOpen }: ShowModalProps) => {
  const router = useRouter()
  const modalStore = useModalStore()

  const [trailer, setTrailer] = React.useState("")
  const [genres, setGenres] = React.useState<Genre[]>([])
  const [isMuted, setIsMuted] = React.useState<boolean>(false)
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false)
  const [isAdded, setIsAdded] = React.useState<boolean>(false)
  const loadingStore = useLoadingStore()

  React.useEffect(() => {
    const getShow = async () => {
      if (!modalStore.show) return

      try {
        loadingStore.setIsLoading(true);
        const response = await detailMovieApi(modalStore.show?.id)
        const data = response?.data?.data;
        if (data?.videos?.results?.length) {
          const trailerIndex = data.videos.results.findIndex(
            (video: MovieVideo) => video.type === "Trailer"
          );
          setTrailer(data.videos.results[trailerIndex]?.key ?? "");
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
      } catch (error) {
        console.error(error);
      } finally {
        loadingStore.setIsLoading(false);
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

  const onWatchMovie = () => {
    loadingStore.setIsLoading(true);
    router.push(`/movies/${modalStore.show?.id}`);
    onOpenChange();
  };


  const onOpenChange = () => {
    setOpen(!open)
    modalStore.setShow(null)
  }

  return (
    <Dialog
      aria-label="Modal containing show's details"
      onOpenChange={onOpenChange}
      open={open}
    >
      <DialogContent className="w-full overflow-hidden rounded-md bg-zinc-900 p-0 text-left align-middle shadow-xl dark:bg-zinc-900 sm:max-w-3xl">
        <div className="relative aspect-video">
          <div
            className={cn(
              "bg-black/10 bg-gradient-to-b from-neutral-900/10 to-neutral-900",
              "absolute inset-0 z-10 h-full w-full"
            )}
          />
          <ReactPlayer
            style={{ position: "absolute", top: 0, left: 0 }}
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            muted={isMuted}
            playing={isPlaying}
            controls={false}
            onStart={() => setIsPlaying(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />
          <div className="absolute bottom-6 z-20 flex w-full items-center justify-between gap-2 px-10">
            <div className="flex items-center gap-2.5">
              <Button
                aria-label={`${isPlaying ? "Pause" : "Play"} show`}
                className="group h-auto rounded py-1.5"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <>
                    <Icons.pause
                      className="mr-1.5 h-6 w-6 fill-current"
                      aria-hidden="true"
                    />
                    Pause
                  </>
                ) : (
                  <>
                    <Icons.play
                      className="mr-1.5 h-6 w-6 fill-current"
                      aria-hidden="true"
                    />
                    Play
                  </>
                )}
              </Button>
              <DynamicTooltip
                text={isAdded ? "Remove from My List" : "Add to My List"}
              >
                {/* <Button
                  aria-label={
                    isAdded ? "Remove from My List" : "Add to My List"
                  }
                  variant="ghost"
                  className="h-auto rounded-full bg-neutral-800 p-1.5 ring-1 ring-slate-400 hover:bg-neutral-800 hover:ring-white focus:ring-offset-0 dark:bg-neutral-800 dark:hover:bg-neutral-800"
                  onClick={onInteracMylist}
                  disabled={
                    !userQuery.data ||
                    !modalStore.show ||
                    !profileStore.profile ||
                    mutationCount > 0
                  }
                >
                  {isAdded ||
                  myShowsQuery?.data?.find(
                    (item) => item.id === modalStore.show?.id
                  ) ? (
                    <Icons.check className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Icons.add className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button> */}
              </DynamicTooltip>
            </div>
            <Button
              aria-label={`${isMuted ? "Unmute" : "Mute"} video`}
              variant="ghost"
              className="h-auto rounded-full bg-neutral-800 p-1.5 opacity-50 ring-1 ring-slate-400 hover:bg-neutral-800 hover:opacity-100 hover:ring-white focus:ring-offset-0 dark:bg-neutral-800 dark:hover:bg-neutral-800"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? (
                <Icons.volumneMute className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.volumne className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
        <div className="grid gap-2.5 px-10 pb-10">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-lg font-medium leading-6 text-slate-50 sm:text-xl">
              {modalStore.show?.title ?? modalStore.show?.original_title}
            </DialogTitle>
            <Button onClick={onWatchMovie}>
              Watch movie now
            </Button>
          </div>
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            <p className="font-semibold text-green-400">
              {Math.round((Number(modalStore.show?.vote_average) / 10) * 100) ??
                "-"}
              % Match
            </p>
            {/* {modalStore.show?.release_date ? (
              <p>{getYear(modalStore.show?.release_date)}</p>
            ) : modalStore.show?.first_air_date ? (
              <p>{getYear(modalStore.show?.first_air_date)}</p>
            ) : null} */}
            {modalStore.show?.original_language && (
              <span className="grid h-4 w-7 place-items-center text-xs font-bold text-neutral-400 ring-1 ring-neutral-400">
                {modalStore.show.original_language.toUpperCase()}
              </span>
            )}
          </div>
          <DialogDescription className="line-clamp-3 text-xs text-slate-50 dark:text-slate-50 sm:text-sm">
            {modalStore.show?.overview ?? "-"}
          </DialogDescription>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-400">Genres:</span>
            {genres.map((genre) => genre.name).join(", ")}
          </div>
        </div>
        {
          loadingStore.isLoading && <LoadingSpinner />
        }
      </DialogContent>
    </Dialog>
  )
}

export default ShowModal
