import { mutation } from "./_generated/server";

export const createNewUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    pictureURL: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (!user[0].email) {
      const result = ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        pictureURL: args.pictureURL,
        credits: 3,
      });

      return result;
    }

    return user[0];
  },
});
