import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const CreateSongSchema = toFormikValidationSchema(
  z.object({
    title: z.string().min(1, "Song title is required"),
    artistId: z.string().min(1, "Artist ID is required"),
    albumId: z.string().min(1, "Album ID is required"),
    genres: z
      .array(z.string().min(1))
      .min(1, "At least one genre must be selected"),

    spotifyUrl: z.string().url("Must be a valid URL").optional(),
    preview_url: z.string().url("Must be a valid URL").optional(),
    image: z.string().url("Must be a valid image URL").optional(),
  })
);

export type CreateSongValues = z.infer<typeof CreateSongSchema>;
