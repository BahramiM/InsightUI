export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="auth-layout">
      <main className="container mx-auto">
        <div className="flex items-center w-screen h-screen before:content-[''] before:absolute before:top-0 before:left-0 before:w-[50%] before:h-full before:bg-gray-800 before:opacity-60">
          <div className="flex-1 flex flex-col items-center justify-center">
            Logo
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
