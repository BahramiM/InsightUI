export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin-layout">
      <main className="container mx-auto">{children}</main>
    </div>
  );
}
