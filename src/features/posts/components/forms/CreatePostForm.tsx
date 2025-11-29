"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostFormValues } from "@/schemas/postSchema";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import ImageUpload from "../../../../components/shared/imageUpload";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

interface CreatePostFormProps {
  postId?: string;
}

export const CreatePostForm = ({ postId }: CreatePostFormProps) => {
  const user = useAuthStore((s) => s.user);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!!postId);
  const [postOwnerId, setPostOwnerId] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
  });

  // load editing post
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("posts")
        .select("*, user_id")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Failed to fetch post:", error.message);
        setMessage("Failed to load post data.");
      } else if (data) {
        reset({
          title: data.title,
          description: data.description,
          content: data.content,
          image_url: data.image_url || "",
        });
        setPostOwnerId(data.user_id);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId, reset]);

  const hasAccess =
    user &&
    (user.role === "admin" ||
      !postId ||
      (user.permissions?.can_create_post && user.id === postOwnerId));

  const onSubmit = async (data: CreatePostFormValues) => {
    if (!hasAccess) {
      setMessage("You do not have permission to perform this action.");
      return;
    }

    setMessage(null);

    if (postId) {
      // edit post
      const { error } = await supabase
        .from("posts")
        .update({
          title: data.title,
          description: data.description,
          content: data.content,
          image_url: data.image_url || null,
        })
        .eq("id", postId);

      if (error) {
        setMessage("Failed to update post.");
      } else {
        setMessage("Post updated successfully!");
        router.push("/admin/posts");
      }
    } else {
      // create new post
      const { error } = await supabase.from("posts").insert([
        {
          title: data.title,
          description: data.description,
          content: data.content,
          image_url: data.image_url || null,
        },
      ]);

      if (error) {
        setMessage("Failed to create post.");
      } else {
        setMessage("Post created successfully!");
        reset();
        router.push("/admin/posts");
      }
    }
  };

  if (loading) return <div>Loading post data...</div>;

  if (!hasAccess) {
    return (
      <div className="text-center text-red-600 mt-6">
        You do not have permission to {postId ? "edit" : "create"} this post.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register("title")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          rows={3}
          {...register("description")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Content</label>
        <textarea
          rows={6}
          {...register("content")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div>
        <ImageUpload
          initialUrl={watch("image_url")}
          onUpload={(url) =>
            setValue("image_url", url, { shouldValidate: true })
          }
        />
      </div>

      {message && <p className="text-sm text-center">{message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {postId ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
};
