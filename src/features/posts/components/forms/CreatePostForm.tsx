"use client";

import ImageUpload from "@/components/shared/ImageUpload/ImageUpload";
import { Button, Input, Textarea } from "@/components/ui";
import { usePostForm } from "@/features/posts/hooks/usePostForm";

interface CreatePostFormProps {
  postId?: string;
}

export const CreatePostForm = ({ postId }: CreatePostFormProps) => {
  const { form, hasAccess, loading, onSubmit } = usePostForm({
    postId,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = form;

  if (loading) {
    return <div>Loading post data...</div>;
  }

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
        <Input
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
        <Textarea
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
        <Textarea
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

      {errors.root?.message && (
        <p className="text-red-500 text-sm text-center">
          {errors.root.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {postId ? "Update Post" : "Create Post"}
      </Button>
    </form>
  );
};
