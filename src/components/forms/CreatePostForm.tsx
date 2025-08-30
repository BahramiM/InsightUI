"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostFormValues } from "@/schemas/postSchema";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ImageUpload from "../imageUpload";

export const CreatePostForm = () => {
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = async (data: CreatePostFormValues) => {
    setMessage(null);

    const { error } = await supabase.from("posts").insert([
      {
        title: data.title,
        content: data.content,
      },
    ]);

    if (error) {
      setMessage("Failed to create post.");
    } else {
      setMessage("Post created successfully!");
      reset();
    }
  };

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
          rows={6}
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
        Create Post
      </button>
    </form>
  );
};
