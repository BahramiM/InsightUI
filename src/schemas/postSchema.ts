import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(256, "Description should not be more than 256 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  image_url: z.string(),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
