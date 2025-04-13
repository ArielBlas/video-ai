import { mutation } from "./_generated/server";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    videoStyle: v.string(),
    caption: v.any(),
    voice: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
    credits: v.number(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      videoStyle: args.videoStyle,
      caption: args.caption,
      voice: args.voice,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
    });

    await ctx.db.patch(args.uid, {
      credits: args.credits - 1,
    });

    return result;
  },
});

export const UpdateVideoRecord = mutation({
  args: {
    record: v.id("videoData"),
    audioUrl: v.string(),
    images: v.any(),
    captionJSON: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.recordId, {
      audioUrl: args.audioUrl,
      images: args.images,
      captionJSON: args.captionJSON,
      status: "completed",
    });
    return result;
  },
});
