"use client";

import { LoginForm } from "@/features/auth/components/forms/LoginForm";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <LoginForm />
      <div className="mt-4 text-center">
        Not have any acuont yet?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-600 hover:text-blue-800 transition-all"
        >
          Signup
        </Link>
      </div>
    </>
  );
}
