"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/useAuthStore";

export default function AuthWatcher() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("id, name, role, avatar_url, permissions, author_status")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        clearUser();
        return;
      }

      setUser({
        id: profile.id,
        name: profile.name,
        role: profile.role,
        avatar_url: profile.avatar_url,
        permissions: profile.permissions,
        author_status: profile.author_status,
      });
    };

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        fetchProfile(data.user.id);
      } else {
        clearUser();
      }
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        clearUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, clearUser]);

  return null;
}
