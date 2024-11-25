"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useModalStore } from "@/stores/modal";
import ReactPlayer from "react-player/lazy";
import type { Genre, MovieDetail, MovieItem, MovieRating, MovieRatingData, MovieVideo } from "@/types";
import ShowsCarousel from "@/components/shows-carousel";
import { detailMovieApi, recommendMoviesApi } from "@/lib/api/movies";
import { Icons } from "@/components/icons";
import ShowModal from "@/components/show-modal";
import { addMovieRatingApi, getMovieRatingApi } from "@/lib/api/rating";
import RatingItem from "@/components/rating/rating-item";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/show-loading";
import { Rate } from "antd";

export default function MovieDetail() {
  const params = useParams();
  const modalStore = useModalStore();

  const [trailer, setTrailer] = React.useState("");
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [movie, setMovie] = React.useState<MovieDetail | null>(null);
  const [recommendMovies, setRecommendMovies] = React.useState<MovieItem[] | undefined>();
  const [isFavorite] = React.useState(false);
  const [moviesRating, setMoviesRating] = React.useState<MovieRating[]>();
  const [ratingData, setRatingData] = React.useState<MovieRatingData>({
    comment: "" ,
    rating: 0,
    movie_id: Number(params?.id)
  })

  React.useEffect(() => {
    if (!params?.id) {
      console.error("No movie id found in URL");
      return;
    }

    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await detailMovieApi(Number(params.id));
        const data = response?.data?.data;
        setMovie(response.data)
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
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [params?.id]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await recommendMoviesApi(Number(params?.id));
        const ratingRes = await getMovieRatingApi(Number(params?.id));
        setRecommendMovies(res.data?.data);
        setMoviesRating(ratingRes.data?.data);
      } catch (error) {
        console.error(error);
      }
      finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params?.id]);

  const sendComment = async () => {
    try {
      const res = await addMovieRatingApi(ratingData);
      if (res.data) {
        setRatingData({...ratingData, comment: "", rating: 0});
        const ratingRes = await getMovieRatingApi(Number(params?.id));
        setMoviesRating(ratingRes.data?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* Video player */}
      <div className="relative aspect-video">
        <ReactPlayer
          style={{ position: "absolute", top: 0, left: 0 }}
          url={`https://www.youtube.com/watch?v=${trailer}`}
          width="100%"
          height="100%"
          controls
        />
      </div>

      {/* Movie details */}
      <div className="flex items-center justify-between px-10 pt-10 max-w-[1420px] mx-[auto]">
        <div className="grid gap-2.5 pb-10 w-2/3">
          <div className="flex justify-between items-center">
            <div className="text-lg font-medium leading-6 text-slate-50 sm:text-xl">
              {movie?.data.title ?? movie?.data?.original_title}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>123.456 views</div>
            <div className="flex items-center gap-2">
              <span>{ movie?.data?.vote_average }</span>
              <span className="h-4 w-4 text-yellow-400 block-inline mb-2">⭐</span>
              <span className="text-sm text-[#6c6f74]">({movie?.data?.vote_count})</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="pr-3 border-r leading-4">T16</div>
            <div className="pr-3 border-r leading-4">Korean</div>
            <div>1g30ph</div>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <span className="font-semibold">Description</span>
            <p className="text-sm">{movie?.data.overview}</p>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3">
            <div className="cursor-pointer">
              {!isFavorite ? <Icons.heart className="w-6 h-6 text-white" /> :
              <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>}
            </div>
            <Icons.messageSquare className="w-6 h-6 text-white cursor-pointer" />
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span className="text-slate-400">Genres:</span>
            {genres.map((genre) => genre.name).join(", ")}
          </div>
        </div>
      </div>
      {/* List recommend movies */}
      {recommendMovies && 
        <ShowsCarousel title="Recommend movies" shows={recommendMovies} recommendMode={true} />
      }
      {
        modalStore.open && <ShowModal open={modalStore.open} setOpen={modalStore.setOpen}  />
      }
      {/* Comment */}
      <div className="max-w-[1400px] mx-[auto] px-8 pt-6">
        <div className="fold-semibold px-1">Comments</div>
        <div className="flex flex-col gap-3 pt-4">
          <div className="flex items-start gap-3 pb-4">
            <div className="flex items-center justify-center px-1 rounded-full border relative w-[40px] h-[40px]">
              <Icons.user className="w-5 h-5 absolute" />
            </div>
            <div className="flex items-end gap-3 w-[99%]">
              <div className="w-11/12">
                <Rate 
                  defaultValue={3}
                  allowClear={false}
                  value={ratingData.rating}
                  className="pl-1 pb-2"
                  onChange={(value: number) => setRatingData({ ...ratingData, rating: value })}
                />
                <Input
                  id="comment"
                  type="text"
                  placeholder="Comment..."
                  className="rounded-2xl focus:outline-none"
                  value={ratingData.comment}
                  onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })}
                />
              </div>
              <Icons.send className="rotate-45 w-9 h-9 text-white p-1.5 border rounded-full cursor-pointer" onClick={sendComment}/>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {
              moviesRating?.map((rating) => ( 
                <RatingItem rating={rating} key={rating?._id} />
              ))
            }
          </div>
        </div>

      </div>
      {/* Loading spinner */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

