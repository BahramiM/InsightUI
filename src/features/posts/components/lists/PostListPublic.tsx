"use client";

import { PostCard } from "@/features/posts/components/card/PostCard";
import { usePostsList } from "@/features/posts/hooks/usePostsList";
import { Post } from "@/features/posts/types/postTypes";

interface PublicPostListProps {
  initialData?: Post[] | null;
}

export default function PublicPostList({ initialData }: PublicPostListProps) {
  const { data: posts, isLoading, error } = usePostsList(initialData);

  if (isLoading) {
    return <p className="text-center mt-10">Loading posts...</p>;
  }

  if (error) {
    return <p className="text-center mt-10">Something went wrong!</p>;
  }

  if (!posts || posts.length === 0) {
    return <p className="text-center mt-10">No posts found.</p>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
