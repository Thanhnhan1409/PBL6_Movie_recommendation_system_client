"use client"

import Image from "next/image"
import { useModalStore } from "@/stores/modal"
import type { MovieItem, Show } from "@/types"

import ShowModal from "@/components/show-modal"

interface SearchedShowsProps {
  shows: MovieItem[]
}

const ShowsGrid = ({ shows }: SearchedShowsProps) => {
  // modal store
  const modalStore = useModalStore()

  return (
    <section
      aria-label="Grid of shows"
      className="container w-full max-w-screen-2xl"
    >
      {modalStore.open ? (
        <ShowModal open={modalStore.open} setOpen={modalStore.setOpen} />
      ) : null}
      <div className="relative flex flex flex-wrap gap-y-8 gap-x-3">
        {shows?.map((show) => (
          <div key={show.id} className="relative">
            <Image
              src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path ?? show.poster_path}`}
              alt={show.title ?? "poster"}
              width={250}
              height={130}
              priority
              className="rounded cursor-pointer object-cover transition-all hover:z-20 hover:scale-105 max-w-[250px] max-h-[130px]"
              onClick={() => {
                modalStore.setShow(show)
                modalStore.setOpen(true)
                modalStore.setPlay(false)
              }}
            />
            <div className="w-full pt-3">
              <div className="text-white font-semibold w-full">{show?.title ?? show?.original_title}</div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="pr-3 border-r leading-4">T16</div>
                  <div className="pr-3 border-r leading-4">Korean</div>
                  <div>1g30ph</div>
                </div>
                <div className="text-xs text-[#6c6f74] w-[240px] line-clamp-2">{show?.overview}</div>
            </div>
            {/* <span className="absolute bottom-3.5 left-4 font-title">{show.title ?? show.original_title}</span> */}
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShowsGrid
