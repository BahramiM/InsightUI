"use client";

import { PostCard } from "@/components/cards/Post";
import { usePosts } from "@/hooks/usePosts";

export default function Home() {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <p>loading...</p>;
  if (isError) return <p>Some thing is wrong!</p>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
