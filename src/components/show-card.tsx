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
    <div className={`relative rounded-xl overflow-hidden ${recommedMode? 'h-[250px] w-[310px]' : 'h-[330px] w-[200px]'} flex-none`}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${
          !recommedMode? show.poster_path : show.backdrop_path ?? ""
        }`}
        width={recommedMode? 300: 200}
        height={recommedMode? 150: 330}
        alt={show.title ?? "poster"}
        loading="lazy"
        className={`aspect-video cursor-pointer object-cover transition-all hover:z-20 hover:scale-110 rounded-lg hover:rounded-xl ${recommedMode? 'h-[150px]' : 'h-[330px] w-[200px]'} duration-300`}
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
        <div className="text-white font-semibold w-full text-wrap">{show?.title ?? show?.original_title}</div>
          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <span>{ show?.vote_average }</span>
              <span className="h-4 w-4 text-yellow-400 block-inline mb-1.5">⭐</span>
              <span className="text-sm text-[#6c6f74]">({show?.vote_count})</span>
            </div>
          </div>
          <div className="text-xs text-[#6c6f74] w-[240px] line-clamp-2">{show?.overview}</div>
      </div>
    </div>
  )
}

export default ShowCard;
