"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schemas/authSchema";
import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui";

export const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);

    const { error, data } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      setErrorMessage("Login failed. Please check your credentials.");
    } else {
      switch (data.user.role) {
        case "admin":
          redirect("/admin");
        case "user":
          redirect("/profile");
        default:
          redirect("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto"
    >
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border rounded px-3 py-2"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Sign In
      </Button>
    </form>
  );
};
