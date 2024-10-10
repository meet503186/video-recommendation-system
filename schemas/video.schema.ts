import { z } from "zod";

export default z.object({
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  thumbnailUrl: z.string(),
  category: z.string(),
});
