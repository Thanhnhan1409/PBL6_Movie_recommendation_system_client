import { useModalStore } from "@/stores/modal"
import * as React from "react"
import Image from "next/image"
import type { MovieItem, Show } from "@/types"

const ShowCard = ({ show }: { show: MovieItem }) => {
  return (
    <div className="relative rounded-xl w-[240px] h-[420px] flex-none">
      <Image
        src={`https://image.tmdb.org/t/p/w500/${
          show.poster_path ?? show.backdrop_path ?? ""
        }`}
        width={300}
        height={420}
        alt={show.title ?? "poster"}
        loading="lazy"
        className="aspect-video cursor-pointer object-cover transition-all hover:z-20 hover:scale-110 rounded-lg hover:rounded-xl h-[420px] w-[300px] duration-300"
        onClick={() => {
          useModalStore.setState({
            show,
            open: true,
            play: false,
          })
        }}
      />
    </div>
  )
}

export default ShowCard