"use client";

import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  return (
    <div>
      <div className="font-bold text-4xl text-center">Welcome</div>
      <div className="grid gap-4 grid-cols-2 mt-8">
        <div className="flex justify-center">
          <Button
            className="w-full h-20 text-lg"
            onClick={() => router.push("/admin/posts")}
          >
            Posts
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            className="w-full h-20 text-lg"
            onClick={() => router.push("/admin/author-requests")}
          >
            Author Requests
          </Button>
        </div>
      </div>
    </div>
  );
}
