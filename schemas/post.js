const { z } = require("zod");

const postCreateSchema = z.object({
  userId: z.string(),
  content: z.string(),
  mediaUrls: z.array(z.string()),
});

const commentCreateSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  content: z.string(),
});

module.exports = { commentCreateSchema, postCreateSchema };
