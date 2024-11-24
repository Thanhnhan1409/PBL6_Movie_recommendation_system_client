import { MovieRating } from "@/types";
import { Icons } from "../icons";
import { formatRatingDate } from "@/lib/utils";

interface IRatingItemProps {
  rating: MovieRating;
}

const RatingItem = ({ rating }: IRatingItemProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        <div className="flex items-center justify-center px-1 rounded-full border relative w-[40px] h-[40px]">
          <Icons.user className="w-5 h-5 absolute" />
        </div>
        <div>
          <div className="font-semibold">{String(rating?.user_id?.id)}</div>
          <div className="flex items-center">
            <div>
              { Array.from({ length: rating?.rating }, (_, index) => (
                <span key={index} className="h-4 w-4 text-yellow-400 block-inline mb-2">⭐</span>
              ))}
            </div>
          </div>
          <div className="text-[#6c6f74] ">
            {rating?.comment}
          </div>
        </div>
      </div>
      <div className="text-[#6c6f74] text-sm">{formatRatingDate(rating?.timestamp)}</div>
    </div>
  )
};

export default RatingItem;