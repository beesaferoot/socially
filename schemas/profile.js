const { z } = require("zod");

const profileCreateSchema = z.object({
  userId: z.string(),
  dob: z.coerce.date(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  livesAt: z.string().optional(),
});

const profileUpdateSchema = z.object({
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  dob: z.string().optional(),
  livesAt: z.string().optional(),
});

module.exports = { profileCreateSchema, profileUpdateSchema };
