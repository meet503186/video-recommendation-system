"use client";

import { Skeleton } from "@/components/ui/skeleton";
import VideoCard from "@/components/video/VideoCard";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import IResVideo from "@/interfaces/video.interface";
import { useAction, useQuery } from "convex/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Video = ({ params }: { params: { id: Id<"videos"> } }) => {
  const video = useQuery(api.video.getVideo, {
    id: params.id,
  });

  const videoSearch = useAction(api.video.similarVideos);

  const [similarVideos, setSimilarVideos] = useState<IResVideo[]>([]);

  useEffect(() => {
    if (video && video.title) {
      videoSearch({ query: video.title }).then((videos) =>
        setSimilarVideos(videos.slice(1))
      );
    }
  }, [video]);

  return (
    <div className="w-full h-screen max-w-2xl m-auto">
      <div className="h-20 flex items-center justify-center">
        <p className="text-3xl font-medium">Video Detail</p>
      </div>

      {!video ? (
        <Loader />
      ) : (
        <>
          {video && (
            <div className="flex flex-col items-center gap-4 mb-6">
              <div className="bg-gray-50 w-full h-96">
                <iframe
                  className="w-full h-full"
                  src={video.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex flex-col w-full">
                <p className="text-xl font-semibold">{video.title}</p>
                <p className="text-sm text-gray-500">{video.description}</p>
              </div>
            </div>
          )}

          {!!similarVideos.length && (
            <div className="my-2">
              <p className="text-lg font-semibold mb-2">Upcoming Videos</p>
              <div className="flex flex-col gap-2">
                {similarVideos.map((_video) => {
                  return (
                    <Link key={_video._id} href={`/videos/${_video._id}`}>
                      <VideoCard data={_video} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Video;

const Loader = () => {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <Skeleton className="w-full h-96" />
      <div className="flex flex-col w-full gap-2">
        <Skeleton className="text-xl h-8 font-semibold" />
        <Skeleton className="text-sm h-4 text-gray-500" />
        <Skeleton className="text-sm h-4 text-gray-500" />
        <Skeleton className="text-sm h-4 text-gray-500" />
        <Skeleton className="text-sm h-4 text-gray-500" />
      </div>
    </div>
  );
};
