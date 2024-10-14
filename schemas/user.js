const { z } = require("zod");

const userCreateSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
});

module.exports = { userCreateSchema };
