import { getPostWithAuthorById } from "@/features/posts/services/postService.server";
import PostDetail from "@/features/posts/components/PostDetail";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: post, error } = await getPostWithAuthorById(id);

  return <PostDetail postId={id} initialData={error ? undefined : post} />;
}
