"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui";

type AuthorRequest = {
  user_id: string;
  status: string;
  requested_at: string;
  approved_at: string | null;
  profile_name?: string | null;
  profile_email?: string | null;
};

export default function AdminAuthorRequests() {
  const [requests, setRequests] = useState<AuthorRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("author_requests")
      .select(
        `
        user_id,
        status,
        requested_at,
        approved_at,
        profiles (
          name,
          email
        )
      `
      )
      .order("requested_at", { ascending: false });

    if (error) {
      console.error(error);
    } else if (data) {
      const formatted = data.map((r: any) => ({
        user_id: r.user_id,
        status: r.status,
        requested_at: r.requested_at,
        approved_at: r.approved_at,
        profile_name: r.profiles?.name,
        profile_email: r.profiles?.email,
      }));
      setRequests(formatted);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (
    user_id: string,
    action: "approved" | "rejected"
  ) => {
    const { error } = await supabase
      .from("author_requests")
      .update({
        status: action,
        approved_at: action === "approved" ? new Date().toISOString() : null,
      })
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
    } else {
      fetchRequests();
    }
  };

  if (loading) return <p className="text-center mt-4">Loading requests...</p>;
  if (requests.length === 0)
    return <p className="text-center mt-4">No requests found.</p>;

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Requested At</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.user_id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{req.profile_name || "Unknown"}</td>
              <td className="px-4 py-2">{req.profile_email || "-"}</td>
              <td className="px-4 py-2">
                {new Date(req.requested_at).toLocaleString("fa-IR")}
              </td>
              <td className="px-4 py-2 capitalize">{req.status}</td>
              <td className="px-4 py-2 space-x-2">
                {req.status === "pending" && (
                  <>
                    <Button
                      onClick={() => handleAction(req.user_id, "approved")}
                      className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleAction(req.user_id, "rejected")}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
