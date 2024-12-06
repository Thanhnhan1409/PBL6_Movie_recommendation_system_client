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
      <div className="relative flex flex justify-center flex-wrap gap-y-8 gap-x-2">
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
            <span className="absolute bottom-3.5 left-4 font-title">{show.title ?? show.original_title}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ShowsGrid
