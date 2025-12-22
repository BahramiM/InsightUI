import { createServerSupabase } from "@/lib/supabase/server";

export const getPostWithAuthorById = async (postId: string) => {
  const supabase = await createServerSupabase();
  return supabase
    .from("posts_with_author")
    .select("*")
    .eq("id", postId)
    .single();
};

export const getPostsWithAuthor = async () => {
  const supabase = await createServerSupabase();
  return supabase
    .from("posts_with_author")
    .select("*")
    .order("created_at", { ascending: false });
};

export const getUserPosts = async (userId: string) => {
  const supabase = await createServerSupabase();
  return supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
};

