import { SignupForm } from "@/features/auth/components/forms/SignupForm";
import Link from "next/link";

export default function Signup() {
  return (
    <>
      <SignupForm />
      <div className="mt-4 text-center">
        Already have an acount?{" "}
        <Link
          href="/auth/login"
          className="hover:text-blue-800 text-blue-600 transition-all"
        >
          Login
        </Link>
      </div>
    </>
  );
}
