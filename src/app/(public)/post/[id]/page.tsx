import { supabase } from "@/lib/supabase/client";
import Image from "next/image";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { data: post, error } = await supabase
    .from("posts_with_author")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !post) {
    return <p className="text-center mt-10">Not found</p>;
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>

      <div className="text-gray-500 text-sm flex justify-between">
        <span className="font-medium">{post.author.name}</span>
        <span>{new Date(post.created_at).toLocaleDateString()}</span>
      </div>

      {post.description && (
        <p className="text-gray-300 leading-relaxed">{post.description}</p>
      )}

      {post.image_url && (
        <div className="w-full my-6">
          <Image
            src={post.image_url}
            alt={post.title}
            width={800}
            height={500}
            className="rounded-lg mx-auto"
          />
        </div>
      )}

      <div>{post.content}</div>
    </article>
  );
}
