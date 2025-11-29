"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const router = useRouter();

  const handleLogout = () => {
    clearUser();
    router.push("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    return (
      <button
        onClick={() => router.push("/auth/login")}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        Login
      </button>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-gray-900"
      >
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
          {user.name ? user.name.charAt(0) : "U"}
        </div>
        <span className="text-sm font-medium">{user.name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg shadow-lg">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/profile");
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-900"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-900"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
