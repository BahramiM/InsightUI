import AdminSideBar from "@/components/shared/AdminSideBar";
import Logo from "@/components/shared/Logo";
import Link from "next/link";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container max-w-[1080px] mx-auto">
      <div className="mb-8 border-b border-gray-700 py-4">
        <Logo />
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[350px] md:border-r md:border-gray-700 md:mr-6 md:pr-6">
          <AdminSideBar />
        </div>
        <main className="container mx-auto">{children}</main>
      </div>
    </div>
  );
}
