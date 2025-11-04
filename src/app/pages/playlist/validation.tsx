import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const CreatePlaylistSchema = toFormikValidationSchema(
  z.object({
    name: z.string().min(1, "Playlist title is required"),
    description: z
      .string()
      .min(10, "Description should be at least 10 characters")
      .max(500, "Description should be less than 500 characters"),
    isPublic: z.boolean().default(false),
  })
);

export type CreatePlaylistValues = z.infer<typeof CreatePlaylistSchema>;
