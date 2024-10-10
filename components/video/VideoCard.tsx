import IResVideo from "@/interfaces/video.interface";
import React from "react";
import dayjs from "dayjs";
import { Skeleton } from "../ui/skeleton";

const VideoCard = ({ data }: { data: IResVideo }) => {
  const { _id, _creationTime, title, thumbnailUrl, description } = data;

  return (
    <div className="flex gap-4 rounded-lg border p-2 cursor-pointer">
      <div className="relative w-32 h-32">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-contain bg-black/10"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <p className="text-base font-medium">{title}</p>
          <p className="text-gray-500 text-sm line-clamp-2 overflow-hidden text-ellipsis">
            {description}
          </p>
        </div>
        <p className="text-right text-gray-800 text-xs">
          <span>{dayjs(_creationTime).format("DD MMM YYYY, hh:mm A")}</span>
        </p>
      </div>
    </div>
  );
};

export default VideoCard;

export const VideoCardSkeelton = () => {
  return (
    <div className="flex gap-4 rounded-lg border p-2 cursor-pointer">
      <Skeleton className="relative w-32 h-32" />

      <div className="flex-1 flex flex-col gap-1">
        <Skeleton className="text-base font-medium w-30 h-5" />
        <Skeleton className="w-full h-5 text-gray-500 text-sm line-clamp-2 overflow-hidden text-ellipsis" />
        <Skeleton className="w-full h-5 text-gray-500 text-sm line-clamp-2 overflow-hidden text-ellipsis" />
      </div>
    </div>
  );
};
