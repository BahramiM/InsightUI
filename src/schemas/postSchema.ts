import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(5, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;
