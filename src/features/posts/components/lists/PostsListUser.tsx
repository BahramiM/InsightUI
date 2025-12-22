"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Post } from "@/features/posts/types/postTypes";

export const UserPosts = () => {
  const user = useAuthStore((s) => s.user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!user) return;

    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [user]);

  if (!user) {
    return (
      <p className="text-gray-600 text-center mt-6">
        Please log in to see your posts.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-gray-600 text-center mt-6">Loading your posts...</p>
    );
  }

  if (posts.length === 0) {
    return (
      <p className="text-gray-600 text-center mt-6">
        You have not created any posts yet.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-800"
        >
          <div>
            <h2 className="font-semibold text-lg">{post.title}</h2>
            <p className="text-sm text-gray-500">
              Created at: {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          <Button
            onClick={() => router.push(`/post/${post.id}/edit`)}
            variant={"outline"}
          >
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
};
