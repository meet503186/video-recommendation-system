import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { embedd } from "@/lib/embedd";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

export const fetchVideosData = internalQuery({
  args: {
    ids: v.array(v.id("videos")),
  },
  handler: async (ctx, args) => {
    const results = [];

    for (const id of args.ids) {
      const video = await ctx.db.get(id);

      if (video) {
        results.push(video);
      }
    }

    return results;
  },
});

export const similarVideos = action({
  args: {
    query: v.string(),
  },
  handler: async (ctx, args) => {
    if (!args.query) {
      throw new Error("Query required");
    }

    console.log(args.query);

    // 1. Generate an embedding from you favorite third party API:
    const embedding = await embedd(args.query);
    // 2. Then search for similar foods!
    const results = await ctx.vectorSearch("videos", "by_search", {
      vector: embedding,
      limit: 2,
    });

    const videoIds = results.map((r) => r._id);

    const videos: Array<Doc<"videos">> = await ctx.runQuery(
      internal.video.fetchVideosData,
      {
        ids: videoIds,
      }
    );

    return videos;
  },
});

export const insertVideo = internalMutation({
  args: {
    title: v.string(),
    description: v.string(),
    videoUrl: v.string(),
    thumbnailUrl: v.string(),
    category: v.string(),
    embeddings: v.array(v.float64()),
  },
  handler: async (ctx, args) => {
    if (
      !args.category ||
      !args.description ||
      !args.thumbnailUrl ||
      !args.title ||
      !args.videoUrl ||
      !args.embeddings
    ) {
      throw new Error("All fields are required!");
    }

    const video = await ctx.db.insert("videos", {
      category: args.category,
      description: args.description,
      embeddings: args.embeddings,
      thumbnailUrl: args.thumbnailUrl,
      title: args.title,
      videoUrl: args.videoUrl,
    });

    return video;
  },
});

export const addVideo = action({
  args: {
    title: v.string(),
    description: v.string(),
    videoUrl: v.string(),
    thumbnailUrl: v.string(),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    if (
      !args.category ||
      !args.description ||
      !args.thumbnailUrl ||
      !args.title ||
      !args.videoUrl
    ) {
      throw new Error("All fields are required!");
    }

    // convert video title to embedding
    const embeddings = await embedd(args.title);

    await ctx.runMutation(internal.video.insertVideo, {
      category: args.category,
      description: args.description,
      thumbnailUrl: args.thumbnailUrl,
      title: args.title,
      videoUrl: args.videoUrl,
      embeddings: embeddings,
    });

    return true;
  },
});

export const allVideos = query({
  handler: async (ctx) => {
    const videos = await ctx.db.query("videos").collect();
    return videos;
  },
});

export const getVideo = query({
  args: {
    id: v.id("videos"),
  },
  handler: async (ctx, args) => {
    const video = await ctx.db.get(args.id);

    return video;
  },
});

export const getCategories = query({
  handler: async (ctx) => {
    const categories = (await ctx.db.query("videos").collect()).map(
      (video) => video.category
    );

    const uniqueCategories = Array.from(new Set(categories));
    return uniqueCategories;
  },
});

export const fetchVideosByCategory = internalQuery({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const videos = await ctx.db
      .query("videos")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();

    return videos;
  },
});

export const getVideosByCategory = action({
  args: {
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const videos: Array<Doc<"videos">> = await ctx.runQuery(
      internal.video.fetchVideosByCategory,
      {
        category: args.category,
      }
    );

    return videos;
  },
});
