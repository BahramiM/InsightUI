"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { postService } from "@/features/posts/services/postService.client";
import { postKeys } from "@/features/posts/services/postKeys";
import { Post } from "@/features/posts/types/postTypes";

export const usePostsList = (
  initialData?: Post[] | null
): UseQueryResult<Post[]> => {
  const query = useQuery<Post[]>({
    queryKey: postKeys.list({ type: "public" }),
    queryFn: async () => {
      const { data, error } = await postService.getPostsWithAuthor();

      if (error) {
        console.error("Failed to fetch posts:", error.message);
        throw new Error("Failed to load posts.");
      }

      return (data || []) as Post[];
    },
    initialData: initialData as Post[] | undefined,
    staleTime: 1000 * 60, // 1 minute
  });

  return query;
};
