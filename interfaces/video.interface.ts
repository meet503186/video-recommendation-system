import { Id } from "@/convex/_generated/dataModel";

interface IResVideo {
  _id: Id<"videos">;
  _creationTime: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  embeddings: number[];
}

export default IResVideo;
