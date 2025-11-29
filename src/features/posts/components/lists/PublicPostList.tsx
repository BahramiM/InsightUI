import { PostCard } from "@/features/posts/components/Card";
import { supabase } from "@/lib/supabase/client";

export default async function PublicPostList() {
  const { data: posts, error } = await supabase
    .from("posts_with_author")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <p>Some thing is wrong!</p>;
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
