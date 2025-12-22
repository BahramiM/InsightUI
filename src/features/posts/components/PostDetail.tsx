"use client";

import TitleBar from "@/components/shared/TitleBar/TitleBar";
import { usePostWithAuthorById } from "@/features/posts/hooks/usePostWithAuthorById";
import Image from "next/image";

interface PostDetailProps {
  postId: string;
  initialData?: unknown;
}

export default function PostDetail({
  postId,
  initialData,
}: PostDetailProps) {
  const { data: post, isLoading, error } = usePostWithAuthorById(
    postId,
    initialData
  );

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error || !post) {
    return <p className="text-center mt-10">Not found</p>;
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4 space-y-6">
      <TitleBar
        title={post.title}
        subTitle={`${post.author.name} . ${new Date(
          post.created_at
        ).toLocaleDateString()}`}
      />

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

