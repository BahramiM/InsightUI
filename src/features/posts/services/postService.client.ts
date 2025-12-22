"use client";

import { supabase } from "@/lib/supabase/client";
import { CreatePostFormValues } from "@/features/posts/schemas/postSchema";

const sanitizePayload = (payload: CreatePostFormValues) => ({
  title: payload.title,
  description: payload.description,
  content: payload.content,
  image_url: payload.image_url || null,
});

const getPostById = (postId: string) => {
  return supabase.from("posts").select("*, user_id").eq("id", postId).single();
};

const updatePost = (postId: string, payload: CreatePostFormValues) => {
  return supabase
    .from("posts")
    .update(sanitizePayload(payload))
    .eq("id", postId);
};

const createPost = (payload: CreatePostFormValues) => {
  return supabase.from("posts").insert([sanitizePayload(payload)]);
};

const getPostWithAuthorById = (postId: string) => {
  return supabase
    .from("posts_with_author")
    .select("*")
    .eq("id", postId)
    .single();
};

const getPostsWithAuthor = () => {
  return supabase
    .from("posts_with_author")
    .select("*")
    .order("created_at", { ascending: false });
};

export const postService = {
  getPostById,
  updatePost,
  createPost,
  getPostWithAuthorById,
  getPostsWithAuthor,
};
