import { useModalStore } from "@/stores/modal"
import * as React from "react"
import Image from "next/image"
import type { MovieItem, Show } from "@/types"

interface IShowCardProps {
  show: MovieItem
  recommedMode?: boolean
}

const ShowCard = ({ show, recommedMode }: IShowCardProps) => {
  return (
    <div className={`relative rounded-xl ${recommedMode? 'h-[250px]' : 'h-[420px] w-[240px]'} flex-none`}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${
          !recommedMode? show.poster_path : show.backdrop_path ?? ""
        }`}
        width={300}
        height={recommedMode? 150: 420}
        alt={show.title ?? "poster"}
        loading="lazy"
        className={`aspect-video cursor-pointer object-cover transition-all hover:z-20 hover:scale-110 rounded-lg hover:rounded-xl ${recommedMode? 'h-[150px]' : 'h-[420px] w-[240px]'} duration-300`}
        onClick={() => {
          console.log('click');
          useModalStore.setState({
            show,
            open: true,
            play: false,
          })
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
    </div>
  )
}

export default ShowCard;
