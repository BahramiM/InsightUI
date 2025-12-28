"use client";

import { Button } from "@/components/ui";
import { supabase } from "@/lib/supabase/client";
import { Post } from "@/features/posts/types/postTypes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Posts() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error.message);
      } else {
        setPosts(data);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="text-2xl font-bold">Posts</div>
        <div>
          <Button onClick={() => router.push("/admin/post")}>New Post</Button>
        </div>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : posts.length === 0 ? (
          <div>No posts found.</div>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-800">
                <th className="border px-4 py-2 text-left"></th>
                <th className="border px-4 py-2 text-left">Title</th>
                <th className="border px-4 py-2 text-left">Created At</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{post.title}</td>
                  <td className="border px-4 py-2">
                    {new Date(post.created_at).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/admin/post/${post.id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
