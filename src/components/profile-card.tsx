import * as React from "react"
import Image from "next/image"

interface IProfileCardProps {
  image?: number;
  name?: string;
  handleClick? : () => void;
}

const ProfileCard = ({ image, name, handleClick }: IProfileCardProps) => {
  return (
    <div className="relative rounded-xl flex-none" onClick={handleClick}>
      <Image
        src={image ? '/images/Netfli5.png' : `/images/Netfli${ image?? + 1}.png`}
        width={156}
        height={156}
        alt={name ?? 'user'}
        loading="lazy"
        className="cursor-pointer object-cover rounded transition-all rounded-lg hover:border hover:scale-1.1 duration-200"
      />
      <div className="text-[grey] text-[1.3vw] leading-normal overflow-hidden text-center text-ellipsis min-h-[1.8rem]">{name}</div>
    </div>
  )
}
export default ProfileCard;
