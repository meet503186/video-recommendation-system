"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import VideoCard, { VideoCardSkeelton } from "@/components/video/VideoCard";
import VideoCategories from "@/components/video/VideoCategories";
import { api } from "@/convex/_generated/api";
import IResVideo from "@/interfaces/video.interface";
import { useAction, useQuery } from "convex/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const Videos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState<IResVideo[]>([]);
  const allVideos = useQuery(api.video.allVideos);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = useQuery(api.video.getCategories);

  const videoSearch = useAction(api.video.similarVideos);
  const videosByCategory = useAction(api.video.getVideosByCategory);

  const onChangeSelectedCategory = (newCategory: string) => {
    setSelectedCategory(newCategory);
    setIsLoading(true);
    videosByCategory({ category: newCategory })
      .then((data) => setVideos(data))
      .catch((err) => {
        console.log(err);
        toast("Error while loading videos");
      })
      .finally(() => setIsLoading(false));
  };

  const handleReset = () => {
    setSearch("");
    setVideos([]);
  };

  const handleVideoSearch = () => {
    if (!search) {
      return toast("Please enter something to search");
    }

    setIsLoading(true);
    videoSearch({
      query: search,
    })
      .then((data) => setVideos(data))
      .catch((err) => {
        console.log(err);
        toast("Got some error");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="w-full h-screen max-w-2xl m-auto">
      <div className="h-20 flex items-center justify-center">
        <p className="text-3xl font-medium">Videos</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={handleReset} variant={"outline"}>
            Reset
          </Button>
          <Button onClick={handleVideoSearch}>Search</Button>
        </div>
      </div>
      {allVideos?.length ? (
        <>
          {categories && (
            <VideoCategories
              categories={["All", ...categories]}
              selectedCategory={selectedCategory}
              onChangeSelectedCategory={onChangeSelectedCategory}
            />
          )}
          <div className="flex flex-col gap-2 m-auto">
            {isLoading
              ? [...new Array(4)].map((_, index) => {
                  return <VideoCardSkeelton key={index} />;
                })
              : (videos.length ? videos : allVideos)?.map((video) => {
                  return (
                    <Link href={`/videos/${video._id}`} key={video._id}>
                      <VideoCard data={video} />
                    </Link>
                  );
                })}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Videos;
