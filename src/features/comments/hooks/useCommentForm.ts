"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  commentSchema,
  CommentFormValues,
} from "@/features/comments/schemas/commentSchema";
import { useAuthStore } from "@/stores/useAuthStore";
import { commentService } from "../services/commentService.client";

interface UseCommentFormParams {
  postId?: string;
}

export const useCommentForm = ({ postId }: UseCommentFormParams) => {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const form = useForm<CommentFormValues>({
    resolver: zodResolver(commentSchema),
  });

  const { reset, setError } = form;

  useEffect(() => {
    if (!postId) return;

    reset({
      comment: "",
      postId,
    });
  }, [postId, reset]);

  //   const hasAccess = useMemo(() => {
  //     return !!user && !postId;
  //   }, [user, postId]);

  const hasAccess = true;

  const handleFormSubmit = async (data: CommentFormValues) => {
    if (!hasAccess) {
      setError("root", {
        type: "manual",
        message: "You do not have permission to perform this action.",
      });
      return;
    }

    if (postId) {
      const { error } = await commentService.createComment(data);

      if (error) {
        toast.error("Failed to create comment.");
      } else {
        toast.success("Thank you for you comment!");
      }

      return;
    }

    const { error } = await commentService.createComment(data);

    if (error) {
      toast.error("Failed to create comment.");
    } else {
      toast.success("Comment posted successfully!");
      form.reset();
    }
  };

  return {
    form,
    hasAccess,
    onSubmit: handleFormSubmit,
  };
};
