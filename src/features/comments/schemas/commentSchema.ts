import { z } from "zod";

export const commentSchema = z.object({
  postId: z.string().min(2, "post id is required"),
  comment: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(256, "Description should not be more than 256 characters"),
});

export type CommentFormValues = z.infer<typeof commentSchema>;
