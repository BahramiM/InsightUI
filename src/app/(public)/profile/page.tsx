"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { supabase } from "@/lib/supabase/client";
import { useState } from "react";
import { AuthorStatus, AuthorStatusMessages } from "@/types/user";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { UserPosts } from "@/features/posts/components/lists/UserPostsList";

export default function ProfilePage() {
  const user = useAuthStore((s) => s.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-600">You need to log in to view this page.</p>
      </div>
    );
  }

  const handleRequestAuthor = async () => {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.from("author_requests").insert([
      {
        user_id: user.id,
        requested_at: new Date().toISOString(),
        status: "pending",
      },
    ]);

    if (error) {
      console.error(error);
      setMessage("Failed to send request. Please try again.");
    } else {
      setMessage("Your request has been sent successfully.");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-lg p-6">
      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="h-40 w-40 rounded-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-white mb-8">
          {user.name.charAt(0)}
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold mb-2">{user.name || "Unnamed"}</h1>

        {/* Other Info */}
        <p className="text-gray-600 mb-1">Role: {user.role || "N/A"}</p>
        <div></div>
        {+user.author_status === AuthorStatus.REJECTED ? (
          <div>{AuthorStatusMessages[user.author_status]}</div>
        ) : null}
        <div className="mt-4">
          {/* Request Button */}
          {user.author_status === AuthorStatus.NOT_REQUESTED ? (
            <Button onClick={handleRequestAuthor} disabled={loading}>
              {loading ? "Sending..." : "Request Author Access"}
            </Button>
          ) : null}
          {+user.author_status === AuthorStatus.APPROVED &&
          user.permissions.can_create_post ? (
            <Button onClick={() => router.push("/new-post")}>
              Write a new post
            </Button>
          ) : null}
        </div>
        {/* Message */}
        {message && <p className="mt-3 text-sm text-center">{message}</p>}

        <div className="mt-8 w-full">
          <UserPosts />
        </div>
      </div>
    </div>
  );
}
