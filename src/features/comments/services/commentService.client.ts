"use client";

import { supabase } from "@/lib/supabase/client";
import { CommentFormValues } from "../schemas/commentSchema";

const sanitizePayload = (payload: CommentFormValues) => ({
  postId: payload.postId,
  comment: payload.comment,
});

export const createComment = async (payload: CommentFormValues) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User is not authenticated");
  }

  const sanitizedPayload = sanitizePayload(payload);

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        ...sanitizedPayload,
        user_id: user.id,
      },
    ])
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const commentService = {
  createComment,
};
