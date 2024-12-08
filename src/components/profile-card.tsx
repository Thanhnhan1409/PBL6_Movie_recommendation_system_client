import * as React from "react"
import Image from "next/image"
import { ProfileDataState } from "@/types";

interface IProfileCardProps {
  image?: number;
  handleClick? : () => void;
  profile?: ProfileDataState;
}

const ProfileCard = ({ image, profile, handleClick }: IProfileCardProps) => {
  return (
    <div className="relative rounded-xl flex-none" onClick={handleClick}>
      <Image
        src={!image ? '/images/Netfli5.png' : `/images/Netfli${image}.png`}
        width={156}
        height={156}
        alt={profile?.fullname ?? 'user'}
        loading="lazy"
        className="cursor-pointer object-cover rounded transition-all rounded-lg hover:border hover:scale-1.1 duration-200"
      />
      {(profile?.age ?? 0) < 13 && <p className="text-sm rounded-l-lg px-2 py-1 absolute right-0 bottom-7 backdrop-blur-lg bg-[#000000b3]">Kids</p>}
      <div className="text-[grey] text-[1.3vw] leading-normal overflow-hidden text-center text-ellipsis min-h-[1.8rem]">{profile?.fullname}</div>
    </div>
  )
}
export default ProfileCard;
