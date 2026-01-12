import { z } from "zod";

export const upsertUserFromOAuthSchema = z.object({
  email: z.string().email(),
  name: z.string().optional().nullable(),
  image: z.string().url().optional().nullable(),
});
