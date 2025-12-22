"use client";

import React, { useRef, useState, useCallback } from "react";
import { uploadImageToSupabase } from "@/lib/uploadImage";

type ImageUploadProps = {
  onUpload: (url: string) => void;
  initialUrl?: string | null;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUpload,
  initialUrl = null,
}) => {
  const [preview, setPreview] = useState<string | null>(initialUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }

      setPreview(URL.createObjectURL(file));
      setError(null);
      setLoading(true);

      try {
        const uploadedUrl = await uploadImageToSupabase(file);
        onUpload(uploadedUrl);
      } catch (err: any) {
        setError(err.message || "Upload failed.");
      } finally {
        setLoading(false);
      }
    },
    [onUpload]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-500 transition"
    >
      {loading ? (
        <p className="text-gray-500">Uploading...</p>
      ) : preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto max-h-48 object-contain rounded-md"
        />
      ) : (
        <p className="text-gray-500">Click or drag an image to upload</p>
      )}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={onFileChange}
        className="hidden"
      />

      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUpload;
