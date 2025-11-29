import { supabase } from "@/lib/supabase/client";

export const uploadImageToSupabase = async (file: File): Promise<string> => {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `public/${fileName}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file);

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  return data.publicUrl;
};
