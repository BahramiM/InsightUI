import Logo from "@/components/shared/Logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="auth-layout">
      <main className="w-full">
        <div className="flex items-center w-screen h-screen">
          <div className="flex-1 flex flex-col items-center h-screen bg-gray-800 justify-center">
            <Logo />
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-2xl max-w-full">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
