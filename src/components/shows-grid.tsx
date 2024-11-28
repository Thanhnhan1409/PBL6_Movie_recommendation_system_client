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
      <div className="flex flex justify-center flex-wrap gap-y-6 gap-x-7">
        {shows?.map((show) => (
          <Image
            key={show.id}
            src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
            alt={show.title ?? "poster"}
            width={300}
            height={400}
            priority
            className="rounded-xl cursor-pointer object-cover transition-all hover:z-20 hover:scale-105"
            onClick={() => {
              modalStore.setShow(show)
              modalStore.setOpen(true)
              modalStore.setPlay(false)
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default ShowsGrid
