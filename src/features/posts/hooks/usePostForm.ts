"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  createPostSchema,
  CreatePostFormValues,
} from "@/features/posts/schemas/postSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { postService } from "@/features/posts/services/postService.client";
import { usePostById } from "@/features/posts/hooks/usePostById";

interface UsePostFormParams {
  postId?: string;
}

export const usePostForm = ({ postId }: UsePostFormParams) => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
  });

  const { reset, setError } = form;

  const { data: post, isLoading } = usePostById(postId);

  useEffect(() => {
    if (!post) return;

    reset({
      title: post.title,
      description: post.description,
      content: post.content,
      image_url: post.image_url || "",
    });
  }, [post, reset]);

  const hasAccess = useMemo(() => {
    return (
      !!user &&
      (user.role === "admin" ||
        !postId ||
        (user.permissions?.can_create_post && user.id === post?.user_id))
    );
  }, [user, postId, post?.user_id]);

  const handleFormSubmit = async (data: CreatePostFormValues) => {
    if (!hasAccess) {
      setError("root", {
        type: "manual",
        message: "You do not have permission to perform this action.",
      });
      return;
    }

    if (postId) {
      const { error } = await postService.updatePost(postId, data);

      if (error) {
        toast.error("Failed to update post.");
      } else {
        toast.success("Post updated successfully!");
        router.push("/admin/posts");
      }

      return;
    }

    const { error } = await postService.createPost(data);

    if (error) {
      toast.error("Failed to create post.");
    } else {
      toast.success("Post created successfully!");
      form.reset();
      router.push("/admin/posts");
    }
  };

  return {
    form,
    loading: isLoading,
    hasAccess,
    onSubmit: handleFormSubmit,
  };
};
