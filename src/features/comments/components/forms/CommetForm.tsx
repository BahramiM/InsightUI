"use client";

import { Button, Textarea } from "@/components/ui";
import { useCommentForm } from "../../hooks/useCommentForm";

interface CommentFormProps {
  postId?: string;
}

const CommentForm = ({ postId }: CommentFormProps) => {
  const { form, hasAccess, onSubmit } = useCommentForm({
    postId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  if (!hasAccess) {
    return (
      <div className="text-center text-red-600 mt-6">
        You do not have permission to create comment please login and try again.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-auto space-y-4">
      <div>
        <label className="block mb-1 font-medium">Comment</label>
        <Textarea
          rows={3}
          {...register("comment")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.comment && (
          <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>
        )}
      </div>

      {errors.root?.message && (
        <p className="text-red-500 text-sm text-center">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Send
      </Button>
    </form>
  );
};
export default CommentForm;
