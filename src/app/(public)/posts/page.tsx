import { getPostsWithAuthor } from "@/features/posts/services/postService.server";
import PublicPostList from "@/features/posts/components/lists/PostListPublic";
import getQueryClient from "@/lib/react-query/getQueryClient";
import { postKeys } from "@/features/posts/services/postKeys";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Posts() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: postKeys.list({ type: "public" }),
    queryFn: getPostsWithAuthor,
  });

  const hydrationState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={hydrationState}>
      <PublicPostList />
    </HydrationBoundary>
  );
}
