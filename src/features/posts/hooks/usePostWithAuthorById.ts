"use client";

import { useQuery } from "@tanstack/react-query";
import { postService } from "@/features/posts/services/postService.client";
import { postKeys } from "@/features/posts/services/postKeys";

export const usePostWithAuthorById = (
  postId?: string,
  initialData?: unknown
) => {
  const query = useQuery({
    queryKey: postId ? postKeys.detail(postId) : postKeys.detail("new"),
    queryFn: async () => {
      if (!postId) return null;

      const { data, error } = await postService.getPostWithAuthorById(postId);

      if (error) {
        console.error("Failed to fetch post:", error.message);
        throw new Error("Failed to load post data.");
      }

      return data;
    },
    enabled: !!postId,
    initialData,
    staleTime: 1000 * 60, // 1 minute
  });

  return query;
};

