"use client";

import { Post } from "@/features/posts/types/postTypes";
import Image from "next/image";
import Link from "next/link";

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="flex not-last:border-b not-last:border-gray-900 pb-4 not-last:mb-4 w-full justify-between">
      <div>
        <Link href={`/post/${post.id}`}>
          <h2 className="text-2xl mb-2">{post.title}</h2>
        </Link>
        <p className="text-gray-600 dark:text-gray-200 mb-1">
          {post.description}
        </p>
        <div className="flex justify-between text-gray-400">
          <span>{post.author.name}</span>
          <span>{new Date(post.created_at).toLocaleString()}</span>
        </div>
      </div>
      {post.image_url ? (
        <div className="overflow-hidden ml-4 min-w-[250px] min-h-[150px]">
          <Image
            src={post.image_url}
            alt={post.title}
            height="150"
            width="250"
          />
        </div>
      ) : null}
    </div>
  );
};
